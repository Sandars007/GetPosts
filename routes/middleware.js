const jwt = require("jsonwebtoken")

const  checkToken = (req,res,next)  => {
    const token = req.body.token

    try{
        data = jwt.verify(token,process.env.SECRET_KEY)
        req.data = data
        next()
    }
    catch(e){
        res.status(400)
        res.json({
            message: e
        })
    }
}


module.exports = {checkToken}