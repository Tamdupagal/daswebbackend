// const asynHandler = require('express-async-handler');
// const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')
const Admin = require('../model/adminLogin');
// const bookRouter = require('../routes/bookRoutes')
const authMiddleware = async (req, res, next) => {
  // let token;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
    try {
      const token = req.cookie.jwt;
      // console.log(token);
      const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(verifyUser);
      // const user = await Admin.findById(verifyUser.id);
      const user = await Admin.findById({_id:verifyUser._id});
      console.log(user);
      rew.token = token;
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorize User');
    }
  }
// })

module.exports = authMiddleware;
