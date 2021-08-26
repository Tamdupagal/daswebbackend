const express = require('express');
const routes = express.Router();


const {sendMail} = require('../controller/mail');

routes.post("/sendmail",sendMail);
module.exports = routes; 
