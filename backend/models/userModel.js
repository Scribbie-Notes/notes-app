const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  createdOn: { type: Date, default: new Date().getTime() },
  profilePhoto: { type: String },
  isEmailVerified: { type: Boolean, default: false },
});
// hashing the password before saving it to the database by using PRE
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //this will hash  the password only the password field is bieng modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//creating a our own method for validating the password entered  by the user
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
