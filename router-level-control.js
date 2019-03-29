const express = require('express')
const app = express()

const router = express.Router()

router.use((request, response, next) => {
    if (!request.query.id) {
        next('router') // Next, out of Router
    } else {
        next() // Next, in Router
    }
})


// route method to handle GET requests for path '/'
// which will be executed only if the middleware function 
// passes control to it
router.get('/', (request, response, next) => {
    const id = request.query.id 
    response.send(`You specified a user ID => ${id}`)
})


// route method to handle GET requests for path '/'
// outside of the router
app.get('/', router, (request, response, next) => {
    response 
        .status(400)
        .send('A user ID needs to be specified')
})

app.listen( 
    1337, 
    () => console.log('Web Server running on port 1337'), 
) 