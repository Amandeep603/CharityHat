// Importing
import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import cors from 'cors'
import router from './apis.js'
import User from './modals/User.js'

// App Config
const app = express()
const port = process.env.PORT || 3000

// Main Account Messages Channle Keys
const pusher = new Pusher({
    // Puhser Credentials
  });
// Main Account User Channle Keys
const userPusher = new Pusher({
       // Puhser Credentials
  });
  

// Middleware
app.use(express.json())
app.use(cors())

// DB Config
const connectionUrl = 'mongodb connection url'
const db = mongoose.connection;

// Setting up Pusher for real time updates
db.once("open",()=> {

    console.log("Database Connectd")

    const msgCollection = db.collection("messagecontents")
    const userCollection = db.collection("users")

    const changeStream = msgCollection.watch()
    const userChangeStream = userCollection.watch()
    

    // Puhser for Message Changes
    changeStream.on("change",(change)=>{

        if(change.operationType === "insert")
        {
         
            const messageDetails = change.fullDocument
            pusher.trigger('messages','inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                _id: messageDetails._id,
                combinedId: messageDetails.combinedId,
                senderId: messageDetails.senderId
                
            })
        }
        
    })
    // Pusher For User channels
    userChangeStream.on("change",(change)=>{
        
        if (change.operationType === 'update')
        {
            
            // Id of updated user
            const id = change.documentKey._id;
            // Fetching the updated user and send it to the pusher
            User.findById( {_id: id}, (err,data)=>{
                if(err)
                {
                    console.log(err.message)
                }
                if(data)
                {

                  userPusher.trigger('users','updated', data)
                }
            })
        }
    })

})


mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
} )
// ????

// Api Routes
app.get('/',(req,res)=>{
    res.status(200).send({"status": "Working Fine"})
})
app.use('/api/', router)

// Listen
app.listen(port, () => console.log(`app is listening at port ${port}`))
