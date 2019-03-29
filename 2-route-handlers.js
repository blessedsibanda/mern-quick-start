const express = require('express')
const app = express()

app.get('/one', (request, response, next) => {
    response.type('text/plain')
    response.write('Hello ')
    next()
})

app.get('/one', (request, response, next) => {
    response.status(200).end('World!')
})

app.get('/two', 
    (request, response, next) => {
        response.type('text/plain')
        response.write('Hello ')
        next()
    },
    (request, response, next) => {
        response.status(200).end('Moon!')
    }
)

app.listen(
    1337,
    () => console.log('Web Server running on port 1337')
)