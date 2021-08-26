const express = require("express")
const Admin = require("../model/adminLogin")
const router = new express.Router()
const Register = require("../model/register")

router.post("/adminLogin",async(req,res)=>{
    const admin = await Admin.findByCredentials(req.body.name,req.body.password)
    res.send(admin)
})

router.post("/adminRegister",async(req,res)=>{
    const admin = new Admin({
        name:"Abdullah",
        password:"Abdullah123"
    })

    try{
        await admin.save()
        res.send(admin)
    }catch(e){
        res.status(400).send()
    }
})

// getting user dat from database
router.get('/data',async(req,res)=>{
    const user = await Register.find({})
    res.send(user)
})

module.exports = router

