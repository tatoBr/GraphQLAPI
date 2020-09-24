const express = require( 'express' );
const app = express();
const { graphqlHTTP } = require( 'express-graphql' );
const { buildSchema } = require( 'graphql' );
const EventModel = require('../models/eventModel' );
const events = [];

//setup middlewares
app.use( express.json());

app.use( '/graphql', graphqlHTTP({
    schema: buildSchema(`
    type Event {
        _id: ID
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input EventInput {        
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
        createEvent( event: EventInput ): Event
        deleteEvent( _id: String!): Event
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }`),
    rootValue: {
        events: async function(){
            try{
                return await EventModel.find().exec();
            }
            catch( err ){
                console.error( err.message, err );
                throw err;
            }
            // return EventModel.find().exec()
            // .then( query_result => {
            //     console.log( query_result );
            //     return query_result;
            // })
            // .catch( err => {
            //     console.error( err.message, err );
            //     throw err;
            // });
        },
        createEvent: function( args ){
            let { event : { title, description, price, date }} = args
            
            let event = new EventModel({                
                title,
                description,
                price,
                date: new Date( date ) 
            });
            return event.save()
            .then( save_result => {
                console.log( save_result );
                return save_result
            })
            .catch( err => {
                console.error( err.message, err);
                throw err;
            });
        },
        deleteEvent: async function( args ){
            try {
                let delete_result = await await EventModel.findByIdAndDelete( args._id ).exec();
                console.log( delete_result );
                return delete_result;
            } catch ( err ) {
                console.error( err.message, err);
                throw err;
            }
        }
    },
    graphiql: true
}));

//setup routes
app.get('/', ( req, res ) => {
    res.status( 200 ).send('Route is working');
})

module.exports = app;