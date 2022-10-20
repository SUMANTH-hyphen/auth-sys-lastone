const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 1337

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://ninegap:ninegaptask@ninegapcluster0.i2b1o58.mongodb.net/?retryWrites=true&w=majority')

app.post('/api/register', async (req, res)=>{
    try{
        await User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            passwd: req.body.passwd,
        })
        res.json({status: 'ok'})
    }catch(err){
        res.json({status: 'error', error: 'Duplicate email'})
        console.log(err)
    }
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

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../vite-client/dist')))

    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'../','vite-client','dist','index.html')))
}else{
    app.get('/',(req,res)=>res.send("set to production"))
}

app.listen(port,() =>{
    console.log(`running on port ${port}`)
})