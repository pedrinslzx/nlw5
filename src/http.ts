import express from 'express'
import path from 'path'
import './database'
import { routes } from './routes'

import { createServer as createHTTPServer } from 'http'
import { Server as WebSocketServer } from 'socket.io'

const app = express()

const httpServer = createHTTPServer(app)
const io = new WebSocketServer(httpServer)

io.on('connection', (s) => console.log('[new Socket]', s.id))
io.on('connection', (s) =>
  s.on('disconnect', () => console.log('[    Socket]', s.id))
)

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(express.json())
app.use(routes)

export { httpServer, io }
