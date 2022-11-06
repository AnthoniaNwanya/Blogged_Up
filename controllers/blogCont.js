const express = require("express");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const readTime = require("../readTime");

const app = express();
app.use(express.json());

const createBlog = async (req, res) => {
  const { title, description, author, tags, body } = req.body;
  const userId = req.User.validUser_id;
  const currUser = await userModel.findById(userId);
  const reading_time = readTime.readingTime(body);

  const newBlog = await blogModel.create({
    title,
    description,
    author,
    reading_time,
    tags,
    body,
    timestamp: new Date(),
    user: userId,
  });
  const savedBlog = await newBlog.save();
  currUser.blogs = currUser.blogs.concat(savedBlog._id);
  await currUser.save();
  res.status(201).json({ status: true, savedBlog });
};

const getAllPublishedStates = async (req, res) => {
  
    const { query } = req;
    const {
      read_count,
      reading_time,
      timestamp,
      page = 1,
      per_page = 20,
    } = query;
    const sortQuery = {};
    if (read_count) {
      sortQuery.read_count = await blogModel.find(read_count);
    }
    if (reading_time) {
      sortQuery.read_count = await blogModel.find(reading_time);
    }
    if (timestamp) {
      sortQuery.read_count = await blogModel.find(timestamp);
    }
    const getAllBlogs = await blogModel
      .find({ state: "published" }, sortQuery)
      .populate("user", { first_name: 1, last_name: 1 })
      .skip(page)
      .limit(per_page);

    return res.status(200).send({ status: true, getAllBlogs });
  
};

const getPublishedState = async (req, res) => {
  const id = req.query.id;
  const getBlog = await blogModel
    .findById(id)
    .populate("user", { first_name: 1, last_name: 1 });

  if (getBlog.state !== "published") {
    return res.status(403).send("Unauthorized user");
  }
  getBlog.read_count += 1;
  await getBlog.save();

  return res.status(200).send({ status: true, getBlog });
};

const getDraftStateById = async (req, res) => {
  const { query } = req;
  const {
    read_count,
    reading_time,
    timestamp,
    page = 1,
    per_page = 20,
  } = query;
  const sortQuery = {};
  if (read_count) {
    sortQuery.read_count = await blogModel.find(read_count);
  }
  if (reading_time) {
    sortQuery.read_count = await blogModel.find(reading_time);
  }
  if (timestamp) {
    sortQuery.read_count = await blogModel.find(timestamp);
  }

  const getAuthorDrafts = await blogModel
    .find({ state: "draft" }, sortQuery)
    .skip(page)
    .limit(per_page);

  return res.status(200).send({ status: true, getAuthorDrafts });
};

const getAuthor = async (req, res) => {
  try {
    const author = req.query.author;
    const blogAuthor = await blogModel.find(author);

    return res.status(200).send({ status: true, blogAuthor });
  } catch (err) {
    res.status(400).send("Error occurred");
  }
};

const getTitle = async (req, res) => {
  try {
    const title = req.query.title;
    const blogTitle = await blogModel.find(title);

    return res.status(200).send({ status: true, blogTitle });
  } catch (err) {
    res.status(400).send("Error occurred");
  }
};

const getTag = async (req, res) => {
  try {
    const tags = req.query.tags;
    const blogTag = await blogModel.find({ tags: { $in: [] } });

    return res.status(200).send({ status: true, blogTag });
  } catch (err) {
    res.status(400).send("Error occurred");
  }
};

const updateBlog = async (req, res) => {
  const id = req.query.id;
  const blogUpdate = req.body;

  const updateId = await blogModel.findByIdAndUpdate(id, blogUpdate, {
    new: true,
  });
  return res.status(200).send({ message: "Updated successfully", data: updateId });
};

const deleteBlog = async (req, res) => {
  const id = req.query.id;

  const delBlog = await blogModel.findByIdAndDelete(id);
  return res
    .status(200)
    .send({ message: "Blog deleted successfully", data: delBlog });
};

module.exports = {
  getAllPublishedStates,
  getPublishedState,
  getDraftStateById,
  getAuthor,
  getTitle,
  getTag,
  createBlog,
  updateBlog,
  deleteBlog,
};
