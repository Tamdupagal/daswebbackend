const express = require("express")
const asynchHandler = require('express-async-handler');
const authMiddleware = require('../middlewares/authMiddlewareHandler');
const expressAsyncHandler = require('../middlewares/authMiddlewareHandler');
const Admin = require("../model/adminLogin")
// const jwt = require('jsonwebtoken')
const router = new express.Router()
// const generateToken = require('../utils/generateToken');
const Register = require("../model/register")

// router.post("/adminLogin",async(req,res)=>{
//     const admin = await Admin.findByCredentials(req.body.name,req.body.password)
//     res.send(admin)
// })

router.post("/adminLogin", asynchHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await Admin.findOne({ name: name });
  const token = await user.generateAuthToken();
  console.log("the tokem part is" + token);
  // The res.cookie() function is used to set the cookie name to value
  // the value parameter may be a strong or object converted to JSON

  // Syntax
  // res.cookie(name,value,[options])
  res.cookie("JWT", token, {
    expaires: new Date(Date.now() + 600000),
    httpOnly: true,
    // secure:true
  })
  // console.log("cookie" + cookie);
  //Compare password
  if (user && (await user.isPasswordMatch(password))) {
    res.status(201);
    res.status(200);
    res.json({
      _id: user._id,
      name: user.name,
      password: user.password,
    });
  } else {
    res.status(401);
    throw new Error('Invalid login credentials');
  }
})
);

router.post(
  '/adminRegister',
  asynchHandler(async (req, res) => {
    const { name, password } = req.body;
    const userExists = await Admin.findOne({ name: name });
    if (userExists) {
      throw new Error('User Exist');
    }

    const userCreated = await Admin.create({ name, password });
    const token = await userCreated.generateAuthToken();

    res.json({
      _id: userCreated.id,
      name: userCreated.name,
      password: userCreated.password,
    })
  })
)

// getting user dat from database
router.get('/data', authMiddleware, asynchHandler(async (req, res) => {
  const user = await Register.find({})
  res.send(user)
})
);

// Logout Admin
router.get('/logout', authMiddleware, asynchHandler(async (req, res) => {
  try {
    // the filter() method creates a new array with all elements that pass the test implemented by the provided function.
    // logout from current device
    // req.user.tokens = req.user.tokens.filter((currElement)=>{
    //   return currElement.token != req.token;
    // });

    // logout from all devices
    rew.user.tokens = [];
    res.clearCookie("jwt");
    console.log("logout sucessfully")
    await req.user.save();
  } catch (error) {
    res.status(500).send(error);
  }

})
);


// geeting single user data from database
router.get('/data/:id', asynchHandler(async (req, res) => {
  const book = await Register.find({ _id: req.params.id })
  res.status(200);
  res.json(book);
})
);

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

module.exports = router;

