import debug from 'debug'
import mongoose from 'mongoose'
import express from 'express'
import http from 'node:http'
import {
  Server
} from 'socket.io'
import getTifModel from '#server/models/tif'
import getMongoDBUri from '#config/get-mongodb-uri'

const {
  env: {
    PORT = 3000
  }
} = process

async function connect () {
  const {
    readyState = DISCONNECTED
  } = connection

  if (readyState < CONNECTED) await mongoose.connect(getMongoDBUri())
}

async function disconnect () {
  const {
    readyState = DISCONNECTED
  } = connection

  if (
    readyState === CONNECTED ||
    readyState === CONNECTING
  ) await mongoose.disconnect()
}

const log = debug('@sequencemedia/tag')
const info = debug('@sequencemedia/tag:info')
const warn = debug('@sequencemedia/tag:warn')
const error = debug('@sequencemedia/tag:error')
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  transports: [
    'websocket'
  ]
})

const tifModel = getTifModel()

const DISCONNECTED = 0
const CONNECTED = 1
const CONNECTING = 2

/*
 *  const DISCONNECTED = 0
 *  const CONNECTED = 1
 *  const CONNECTING = 2
 *  const DISCONNECTING = 3
 */

const {
  connection = {}
} = mongoose

connection
  .on('open', () => {
    info('open')
  })
  .on('connected', () => {
    info('connected')
  })
  .on('connecting', () => {
    info('connecting')
  })
  .on('reconnected', () => {
    warn('reconnected')
  })
  .on('error', ({ message }) => {
    error(`errror - "${message}"`)
  })
  .on('disconnected', () => {
    warn('disconnected')
  })

process
  .on('SIGHUP', async (signal) => {
    const {
      stdout
    } = process

    if ('clearLine' in stdout) {
      stdout.clearLine()
      stdout.cursorTo(0)
    }

    log(signal)

    await disconnect()

    process.exit(0)
  })
  .on('SIGINT', async (signal) => {
    const {
      stdout
    } = process

    if ('clearLine' in stdout) {
      stdout.clearLine()
      stdout.cursorTo(0)
    }

    log(signal)

    await disconnect()

    process.exit(0)
  })
  .on('SIGBREAK', async (signal) => {
    log(signal)

    await disconnect()

    process.exit(0)
  })
  .on('SIGQUIT', async (signal) => {
    log(signal)

    await disconnect()

    process.exit(0)
  })
  .on('SIGTERM', async (signal) => {
    log(signal)

    await disconnect()

    process.exit(0)
  })
  .on('SIGPIPE', async (signal) => {
    log(signal)

    await disconnect()
  })
  .on('beforeExit', async (code) => {
    log('beforeExit', code)

    await disconnect()
  })
  .on('exit', async (code) => {
    log('exit', code)

    await disconnect()
  })
  .on('uncaughtException', async ({ message }) => {
    log('uncaughtException', message)

    await disconnect()

    process.exit(1)
  })
  .on('unhandledRejection', async (reason, promise) => {
    log('unhandledRejection', reason, promise)

    await disconnect()

    process.exit(1)
  })

log(process.pid)

app.use('/favicon.ico', express.static('./public/favicon.ico'))
app.use('/assets', express.static('./public'))

app.get('/', (req, res) => {
  res.sendFile('server/views/index.html', { root: '.' })
})

io.on('connection', (socket) => {
  log('connection')

  socket.on('disconnect', () => {
    log('disconnect')
  })
})

server.listen(PORT, async () => {
  info(PORT)

  await connect()

  tifModel
    .watch()
    .on('change', (data) => {
      log('change')

      const {
        documentKey: {
          _id
        },
        operationType
      } = data

      const id = _id.toString()

      switch (operationType) {
        case 'insert': {
          const {
            fullDocument
          } = data

          io.emit(operationType, { _id: id, document: fullDocument })
          break
        }

        case 'update': {
          const {
            updateDescription: {
              updatedFields
            }
          } = data

          io.emit(operationType, { _id: id, fields: updatedFields })
          break
        }
      }
    })
})
