/*
    Socket.IO server that will notify all the connected
    clients to the 'commonRoom' room when a new socket
    is connected.
*/

const http = require('http')
const fs = require('fs')
const path = require('path')
const io = require('socket.io')()

const app = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile( 
            path.resolve(__dirname, 'rooms-client.html'), 
            (err, data) => { 
               if (err) { 
                    res.writeHead(500) 
                    return void res.end() 
                } 
                res.writeHead(200) 
                res.end(data) 
            } 
        )
    } else {
        res.writeHead(403) 
        res.end() 
    }
})

// specify the path where new connections will be made
io.path('/socket.io')

// use the root namespace to listen for events
const root = io.of('/')

const notifyClients = () => {
    root.clients((error, clients) => {
        if (error) throw error
        root.to('commonRoom').emit(
            'updateClientCount',
            clients.length
        )
    })
}

root.on('connection', socket => {
    socket.join('commonRoom')
    socket.emit('welcome', `Welcome client: ${socket.id}`)
    socket.on('disconnect', notifyClients)
    notifyClients()
})

io.attach(app.listen(1337, () => { 
    console.log( 
        'HTTP Server and Socket.IO running on port 1337' 
    ) 
})) 