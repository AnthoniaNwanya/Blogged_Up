const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const BlogSchema = new mongoose.Schema({
  id: ObjectId,
  title: {
    type: String,

    unique: true,
  },
  description: String,
  author: {
    type: String,
  },
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  read_count: {
    type: Number,
    default: 1,
  },
  reading_time: String,
  tags: Array,

  body: {
    type: String,
  },
  timestamp: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

BlogSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
