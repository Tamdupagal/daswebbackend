const express = require("express")
const asynchHandler = require('express-async-handler');
const Admin = require("../model/adminLogin")
const router = new express.Router()
const Register = require("../model/register")

// router.post("/adminLogin",async(req,res)=>{
//     const admin = await Admin.findByCredentials(req.body.name,req.body.password)
//     res.send(admin)
// })

router.post("/adminLogin",asynchHandler(async (req, res) => {
    const { name, password } = req.body;
    const user = await Admin.findOne({ name: name });
    //Compare password
    if (user && (await user.isPasswordMatch(password))) {
      res.status(201);
      res.status(200);
      res.json({
        _id: user._id,
        name: user.name,
        password: user.password,
        // email: user.email,
        // token: authTokenGenerator(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid login credentials');
    }
  })
);  

// router.post("/adminRegister",async(req,res)=>{
//     const admin = new Admin({
//         name:"Abdullah",
//         password:"Abdullah123"
//     })

//     try{
//         await admin.save()
//         res.send(admin)
//     }catch(e){
//         res.status(400).send()
//     }
// })
router.post(
  '/adminRegister',
  asynchHandler(async (req, res) => {
    const { name,password } = req.body;

    const userExists = await Admin.findOne({ name: name });
    if (userExists) {
      throw new Error('User Exist');
    }
    const userCreated = await Admin.create({ name,password });
    // res.send(userCreated);
    res.json({
      _id: userCreated.id,
      name: userCreated.name,
      password: userCreated.password,
      // email: userCreated.email,
      // token: generateToken(userCreated._id)
    })
  })
)

// getting user dat from database
router.get('/data',async(req,res)=>{
    const user = await Register.find({})
    res.send(user)
})

// update disposition and user
router.put(
  '/data/:id',
  asynchHandler(async (req, res) => {
    try {
      const book = await Register.findByIdAndUpdate(req.params.id, req.body);
      res.status(200);
      res.json(book);
    } catch (error) {
      res.status(500);
      // throw new Error('Update failed');
      console.log(error);
    }
  })
);

module.exports = router

