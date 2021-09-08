const express = require("express")
const Admin = require("../model/adminLogin")
const router = new express.Router()
const Register = require("../model/register")
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')


router.post("/adminLogin",async(req,res)=>{
    const admin = await Admin.findByCredentials(req.body.name,req.body.password)
    const token = await admin.generateAuthToken()
    if(admin && token){
        res.send(token)
        console.log(token)
    }else{
        throw new Error("Unidentified admin!") 
    }
})

router.post("/adminRegister",async(req,res)=>{
    const admin = new Admin({
        name:"Akshat",
        password:"Akshat123"
    })

    try{
        await admin.save()
        // const token = await admin.generateAuthToken()
        // res.cookie('auth_token', token)
        res.send({admin,token})
    }catch(e){
        res.status(400).send()
    }
})

router.patch("/edit-data/:id",async(req,res)=>{
    const user_id = req.params.id
    try{
        const user = await Register.findByIdAndUpdate(user_id,req.body,{new:true})
        res.send(user)
    }catch(e){
        res.send(e)
    }
    
})

// getting user data from database
router.get('/data',async(req,res)=>{
    const user = await Register.find({})
    res.send(user)
})

module.exports = router

