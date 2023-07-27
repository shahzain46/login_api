const jwt = require('jsonwebtoken');


module.exports= (req,res,next)=>{
try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    next();
}catch(error){
    return res.status(401).json({
        msg:"invalid token"
    })
}
}