import mongoose from "mongoose";
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

export default mongoose.model("User", userSchema);
