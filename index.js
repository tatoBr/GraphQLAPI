require('dotenv').config();

const server = require('./bin/app');
const mongoose = require('mongoose');

let { variables: { serverVars: { PORT } }, variables: { databaseVars } } = require('./bin/variables');

//connect into the database
mongoose.connect( databaseVars.uri, { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
        if ( err ) {
            console.log('Unable to connect to the database')
            console.error(err.message, err);
        }
        else {
            console.log('Connected to mongoDb.')
        }
    });

const listener = server.listen(
    process.env.PORT || PORT,
    () => console.log(`Server running at port ${listener.address().port}`
    ));