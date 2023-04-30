const router = require("express").Router()
const middleware = require("./middleware")
const Post = require('../schemas/postSchema')

router.post('/create',middleware.checkToken,async (req,res)=>{
    const title = req.body.title
    const postMessage = req.body.message

    try{
        await Post.create({
            title,
            message: postMessage,
            createdBy: req.data.id,
            createdOn: Date.now()
        })

        res.status(201)
        res.json({
            message: "Post Created."
        })
    }
    catch(e){
        res.status(400)
        res.json({
            message: e
        })
    }
    

})



router.post('/delete',middleware.checkToken,async (req,res)=>{

    try{
        await Post.deleteOne({_id: req.body.postId})

        res.status(200)
        res.json({
            message: "Post Deleted."
        })
    }
    catch(e){
        res.status(400)
        res.json({
            message: e
        })
    }

})


router.post('/postslist',middleware.checkToken,async (req,res)=>{

    try{
        let result = await Post.find({createdBy: req.data.id})

        res.status(200)
        res.json({
            data: result
        })
    }
    catch(e){
        res.status(400)
        res.json({
            message: e
        })
    }

})







module.exports = router