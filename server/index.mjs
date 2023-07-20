import debug from 'debug'
import express from 'express'
import http from 'node:http'
import {
  Server
} from 'socket.io'

const {
  env: {
    PORT = 3000
  }
} = process

const log = debug('@sequencemedia/tag')
const app = express()
const server = http.createServer(app)
const io = new Server(server)

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
})
