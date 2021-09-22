const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
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
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

adminDBSchema.methods.generateAuthToken= async function() {
    try {
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        // res.send("the error part" + error);
        console.log(error);
    }
}

// adminDBSchema.statics.findByCredentials = async (name,password) =>{
//     const user = await Admin.findOne({name})

//     if(!user){
//         throw new Error('Did not find user')
//     }

//     if(user.password === password){
//         isMatch = true
//     }

//     if (!isMatch) {
//         throw new Error('Unable to login')
//     }

//     return user
// }

//hashpassword
adminDBSchema.pre('save', async function (next) {
    //We only want to do this if the password is sent or modified, this is because when a user later update their password this will run and the user cannot login
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Verify password for login
//Methods: Apply to an instance of this model
adminDBSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin",adminDBSchema)

module.exports = Admin