const mongoose = require( 'mongoose' );
const { variables: { databaseVars: { models }}} = require( '../bin/variables' );

let { label, fields: { _id, title, description, price, date }} = models.event;

const schema = new mongoose.Schema({    
    [title]: { type: String, require: true },
    [description]: { type: String, require: true },
    [price]: { type: Number, require: true },
    [date]: { type: Date, require: true }
});

module.exports = mongoose.model( label, schema );