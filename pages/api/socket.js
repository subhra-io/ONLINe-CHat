import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    })
    res.socket.server.io = io

    io.on('connection', socket => {
      console.log('User connected:', socket.id)

      socket.on('join-room', (username) => {
        socket.username = username
        socket.broadcast.emit('user-joined', username)
      })

      socket.on('send-message', (data) => {
        io.emit('receive-message', {
          message: data.message,
          username: socket.username,
          timestamp: new Date().toLocaleTimeString()
        })
      })

      socket.on('disconnect', () => {
        if (socket.username) {
          socket.broadcast.emit('user-left', socket.username)
        }
        console.log('User disconnected:', socket.id)
      })
    })
  }
  res.end()
}

export default SocketHandler