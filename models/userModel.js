const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new mongoose.Schema({
  id: ObjectId,
  first_name: {
    type: String,
    required: [true, "can't be blank"],
  },
  last_name: {
    type: String,
    required: [true, "can't be blank"],
  },
  email: {
    type: String,
    required: [true, "can't be blank"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
  },
  token: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
});


module.exports = mongoose.model("User", UserSchema);
