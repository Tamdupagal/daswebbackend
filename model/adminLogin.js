const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')


const adminDBSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:7
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
})

adminDBSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismysecret')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}


adminDBSchema.statics.findByCredentials = async (name,password) =>{
    const user = await Admin.findOne({name})

    if(!user){
        throw new Error('Did not find user')
    }

    if(user.password === password){
        isMatch = true
    }

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}



const Admin = mongoose.model("Admin",adminDBSchema)

module.exports = Admin