const mongoose = require('mongoose');



const userschema = mongoose.Schema({
    name:{type:'string', required:[true,'please add Name']},
    email:{type:'string', unique:true ,required:[true,'please add Email']},
    password:{type:'string', required:[true,'please add Password']},
    
}, {timestamps:true});



module.exports= mongoose.model('User',userschema)