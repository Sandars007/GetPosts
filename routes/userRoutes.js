const router = require("express").Router()
const jwt = require("jsonwebtoken")
const middleware = require("./middleware")
const User = require("../schemas/userSchema")
const bcrypt = require("bcryptjs")
const { request } = require("express")


router.post('/login',async (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    let token = ""
    try{
        const user = await User.findOne({email})
        if (user == null){throw Error('No User found')}

        if(!bcrypt.compareSync(password,user.password)){
            throw new Error('Wrong Password')
    }


    token = jwt.sign({id: user._id,email,timestamp: Date.now()}, process.env.SECRET_KEY,{expiresIn: "10m"})

    res.status(200)
    res.json({
        message: "Login Successful",
        token
    })
}
catch(e){
    res.status(400)
    res.json({message: e.message})
}
})



router.post('/signup',async (req,res) => {
   try{
        const email = req.body.email
        const name = req.body.name
        const password = req.body.password

        hashPassword = bcrypt.hashSync(password,10)
        await User.create({
            name,
            email,
            password: hashPassword,
        })
    
        res.status(201)
        res.json({
            message: "User successfuly created."
        })

    }
    catch(e){
        res.status(400)
        res.json({
            message: e
        })
}

})

router.post("/subscribe",middleware.checkToken,async (req,res)=>{
    const subscribeTo = req.body.userId
    try{
        //Pending to check the user is already an subscriber or no?

        await User.findOneAndUpdate({_id: req.data.id},{$push: {subscribed: {id: subscribeTo}}})
        await User.findOneAndUpdate({_id:subscribeTo},{$push:{subscribers: {id: req.data.id}}})

    res.status(200)
    res.json({message: "Successfully Subscribed."})
    }
    catch(e){
        res.status(400)
        res.json({message:e})
    }
})

router.post("/unsubscribe",middleware.checkToken, async (req,res)=>{
    const unsubscribeTo = req.body.userId
    
    try{
        
        //Pending to check the user is already an subscriber or no?
        //Check whether the users exist first or no

        await User.findOneAndUpdate({_id: req.data.id},{$pull: {subscribed: {id: unsubscribeTo}}})
        await User.findOneAndUpdate({_id: unsubscribeTo},{$pull: {subscribers: {id: req.data.id}}})

        res.status(200)
        res.json({
            message: "You are now Unsubscribed"
        })
    }
    catch(e){
        res.status(400)
        res.json({message: e})
    }
})


module.exports = router