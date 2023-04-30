const mongoose = require('mongoose')

const db = async () =>{
    await mongoose.connect(process.env.MONGODB_CONNECTION_URI).then(()=>{
        console.log("Database is connected")
    }).catch((e)=>{
        console.log("Unable to Connect to database")
    });
}

module.exports = db