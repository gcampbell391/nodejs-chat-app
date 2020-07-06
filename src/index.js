const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

//socket.emit sends data to one connection...io.emit sends data to all connections...
//socket.broadcast.emit sends data to all connections but itselfs 
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    let message = 'Welcome!'
    socket.emit('message', message)

    socket.broadcast.emit('message', 'A new user has joined')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.lat},${coords.long}`)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    })

})

server.listen(port, () => {
    console.log(`Server is running on ${port}...`)
})