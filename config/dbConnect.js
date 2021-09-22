const mongoose = require("mongoose")
require('dotenv').config();
const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

};
module.exports = dbConnect;