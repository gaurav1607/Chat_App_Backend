const User = require("../models/userModel");
const jwt = require("jsonwebtoken")


const requireAuth = async  (req,res,next)=>{

    const {authorization} = req.headers;
   
  if (!authorization) {
    return res.status(401).json([{error: 'Authorization token required'}])
  }

  const token = authorization.split(" ")[1];

  try {
    const {id} = jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user = await User.findOne({_id : id}).select('_id')
    next()
  } catch (error) {
    res.status(401).json({error: 'Request is not authorized'})
    
  }
}   

module.exports = requireAuth