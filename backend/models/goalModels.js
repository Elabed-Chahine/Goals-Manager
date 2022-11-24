const mongoose = require('mongoose');

const goalschema= mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'user'
    },
    text:{
        type: 'string',
        required: [true,'please add a text Value']
    }

},{timestamps:true})

module.exports= mongoose.model('Goal',goalschema)