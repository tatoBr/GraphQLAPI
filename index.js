const server = require('./bin/app');
let { variables : { serverVars : { PORT } }} = require( './bin/variables' );

const listener = server.listen(
    PORT || process.env.PORT,
    () => console.log( `Server running at port ${ listener.address().port }`
));