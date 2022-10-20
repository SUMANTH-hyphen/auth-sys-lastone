const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
// const bodyParser = require('body-parser')
// const multer = require('multer')
// const fs = require('fs')
// const path = require('path')
// const fileupload = require('express-fileupload')


// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) =>{
//         cb( null, file.fieldname+'-'+Date.now())
//     }
// }) 
// const upload = multer({storage: storage})

app.use(cors())
app.use(express.json())
// app.use(fileupload)
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
// app.set("view engine", "ejs")

mongoose.connect('mongodb+srv://ninegap:ninegaptask@ninegapcluster0.i2b1o58.mongodb.net/?retryWrites=true&w=majority')
// upload.single('image'),
app.post('/api/register', async (req, res)=>{
    // const file = req.body.img
    try{
        await User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            passwd: req.body.passwd,
            // img: {
            //     // filename: req.body.img,
            //     // filepath: `/uploads/${file}`,
            //     data: fs.readFileSync(path.join(__dirname+'/uploads/'+req.body.img)),
            //     contentType: 'image/png',
            // },
        })
        res.json({status: 'ok'})
    }catch(err){
        res.json({status: 'error', error: 'Duplicate email'})
        console.log(err)
    }

    // file.mv(`${__dirname}/server/uploads/${file}`,err=>{
    //     if(err){
    //         console.log("file not in uploads")
    //     }
    // })
    
})

app.post('/api/login',async (req, res)=>{
    const user = await User.findOne({
        email: req.body.email,
        passwd: req.body.passwd,
    })
    if(user){
        const token = jwt.sign({
            email : req.body.email,
        },'secret123')
        return res.json({user: true, status: token})
    }
    else{
        return res.json({user: false})
    }
})

app.get('/api/dashboard',async (req, res)=>{

    const token = req.headers['x-access-token']
    try{
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({email: email})
        return res.json({ status: 'ok', user: user })
        
    }catch(error){
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }
    
})





app.listen(1337,() =>{
    console.log("running on port 1337")
})