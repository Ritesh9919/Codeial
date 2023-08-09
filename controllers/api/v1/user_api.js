const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/envirement');

module.exports.createSession = async (req, res) => {
    try{
    const user = await User.findOne({email:req.body.email});
    if(!user || user.password != req.body.password) {
        return res.json(422, {
            message:'Invalid username or password'
        });
    }
    
        return res.json(200, {
            message:'Sign in successfully',
            data:{
                token:jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn:'100000'})
            }
        })
    }catch(err) {
        console.log('*******', err);
        return res.json(500, {
            message:'Internal server error'
        });
    }
    
}