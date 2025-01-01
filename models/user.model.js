import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: { 
    type: String,
    required: true, 
    enum: ['admin', 'user', 'manager'],
    default: 'user' 
  },
  token: {
    type: String,
  },
  team: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const User = mongoose.model("User", userSchema);
export default User;
