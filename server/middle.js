const jwt = require('jsonwebtoken')


const jwtAuth = (req,res,next)=>{

    let jwtToken;

    const authH = req.headers['authorization']

    if(authH !== undefined){
        jwtToken = authH.split(" ")[1];
    }

    if (authH === undefined){
        res.json({message:'error'})
    }else{
        jwt.verify(jwtToken,'KEY',(error,payLoad)=>{
            if (error){
                return res.json({message:'error'})
            }else{
                req.id = payLoad.id
                next();
            }
        })
    }
}


module.exports = jwtAuth;