const mongoose = require("mongoose")
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    });