const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const registrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
  },
  // lastName:{
  //     type:String,
  //     trim:true
  // },
  email: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
});

registrationSchema.statics.findUser = async (email, password) => {
  const user = await Register.findOne({ email });

  if (!user) {
    throw new Error("No user exists by this email!");
  }

  const hashedpassword = await bcrypt.hash(password, 8);

  user.password = hashedpassword;

  await user.save();
  return user;
};

registrationSchema.statics.findByCredentials = async (email, password) => {
  const user = await Register.findOne({ email });

  if (!user) {
    throw new Error("Did not find email");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// registrationSchema.pre("save", async function (next) {
//   const user = this;

//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }

//   next();
// });

const Register = mongoose.model("Register", registrationSchema);

module.exports = Register;
