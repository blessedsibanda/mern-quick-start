const express = require('express')
const app = express()

// middleware that will add a property `allowed` to
// the request object if the query has `allowme`

app.use((request, response, next) => {
    request.allowed = Reflect.has(request.query, 'allowme')
    next()
})

app.get('/', (request, response, next) => {
    if (request.allowed) {
        response.send('Hello secret world!')
    } else {
        response.send('You are not allowed to enter')
    }
})

app.listen( 
    1337, 
    () => console.log('Web Server running on port 1337'), 
)