const express = require("express")
const Register = require("../models/register")
const router = new express.Router()

router.post("/register",async(req,res)=>{
    const user = new Register({
        firstName:req.body.fname,
        lastName:req.body.lname,
        email:req.body.email,
        password:req.body.password
    })
    try{
    await user.save()
    res.send(user)
    }catch(e){
    res.send(e)
    }
})

router.get("/register",async(req,res)=>{
    res.render('register')
})

module.exports = router