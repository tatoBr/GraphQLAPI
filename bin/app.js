const express = require( 'express' );
const app = express();

//setup middlewares
app.use( express.json());

//setup routes
app.get('/', ( req, res ) => {
    res.status( 200 ).send('Route is working');
})

module.exports = app;