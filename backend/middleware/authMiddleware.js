
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const handler = require("express-async-handler")


const protect = handler( async (req,res,next)  =>{
    let token 
    // lazm format ta3 headers authorization is 'Bearer token' bech tabda s7e7a

    if(req.headers.authorization && ( req.headers.authorization.startsWith('Bearer')))
    {
        try {
            //bech n9asmou chaine bel espacet w kol 7ajtin binethom espace yetsamou tableau
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

             req.user = await User.findById(decoded.id).select('-password');
             next();

        } catch (error) {
            res.status(401)
            throw new Error(error)
        }
    }
    if(!token){
        throw new Error('not authorized, NO token')
    }
})
module.exports = {protect}