require('dotenv').config();
const express = require('express')
const dbConnect = require("./config/dbConnect");
const dotenv = require('dotenv');
const app = express()
const PORT = process.env.PORT | 5000;
var cors = require('cors');
var cookieParser = require('cookie-parser')
// require("./config/dbConnect");

// DB connect
dotenv.config();
dbConnect();

// importing routes
// const Mail = require('./routes/mail');
const registerRouter = require("./routes/registerRouter");
const adminRouter = require("./routes/adminRoute");

app.use(cors());
app.use(cookieParser())
app.use(express.json());


// app.use("/api",Mail);
app.use("/api",registerRouter);
app.use("/api",adminRouter);

  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })

  // EMAIL = tamdupagal@gmail.com;
// PASSWORD = Jasondean@1989;
// MONGO_URI = mongodb+srv://chandan-123:chandan@123@cluster0.goa9p.mongodb.net/DAS?retryWrites=true&w=majority;
