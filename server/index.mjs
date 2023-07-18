import debug from 'debug'
import express from 'express'
import http from 'node:http'
import {
  Server
} from 'socket.io'
import {
  resolve,
  extname,
  join
} from 'node:path'
import chokidar from 'chokidar'
import crypto from 'node:crypto'
import {
  readFile
} from 'node:fs/promises'

const {
  env: {
    PORT = 3000
  }
} = process

const DIR = resolve('.files')

const log = debug('@sequencemedia/tag')
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const isTif = (fileName) => /\.(?:tif|tiff)$/i.test(extname(fileName))
async function getHashFor (fileName) {
  const filePath = join(DIR, fileName)
  const fileBuffer = await readFile(filePath)
  const uint8Array = new Uint8Array(fileBuffer)
  return (
    crypto
      .createHash('md5')
      .update(uint8Array)
      .digest('hex')
  )
}

app.get('/', (req, res) => {
  res.sendFile('server/views/index.html', { root: '.' })
})

io.on('connection', (socket) => {
  log('connection')

  socket.on('disconnect', () => {
    log('disconnect')
  })
})

server.listen(PORT, () => {
  log(PORT)

  const watcher = chokidar
    .watch(DIR, {
      cwd: DIR,
      ignored: '!*.(tif|TIF|tiff|TIFF)',
      awaitWriteFinish: true
    })

  watcher
    .on('add', async (fileName, stats) => {
      if (!isTif(fileName)) return

      log('add', { fileName, stats }, await getHashFor(fileName))
    })
    .on('addDir', (...args) => {
      log('addDir', ...args)
    })
    .on('change', (fileName, stats) => {
      if (isTif(fileName)) log('change', { fileName, stats })
    })
    .on('changeDir', (...args) => {
      log('changeDir', ...args)
    })
    .on('unlink', (fileName, stats) => {
      if (isTif(fileName)) log('unlink', { fileName, stats })
    })
    .on('unlinkDir', (...args) => {
      log('unlinkDir', ...args)
    })
    .on('ready', () => {
      log('ready')
    })
})
