const mongoose = require("mongoose")

const adminDBSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:7
    }
})

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