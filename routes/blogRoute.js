const express = require("express");
const blogController = require("../controllers/blogCont");
const blogRouter = express.Router();
const { blogOwnerCheck } = require("../controllers/blogOwnerCheck")
const { useToken } = require("../auth");

blogRouter.get("/", blogController.getAllPublishedStates);

blogRouter.get("/id", blogController.getPublishedState);

blogRouter.get("/author", blogController.getAuthor);

blogRouter.get("/title", blogController.getTitle);

blogRouter.get("/tag", blogController.getTag);

blogRouter.get("/draft", useToken, blogOwnerCheck, blogController.getDraftStateById);

blogRouter.post("/", useToken, blogController.createBlog);

blogRouter.put("/", useToken, blogOwnerCheck, blogController.updateBlog);

blogRouter.delete("/", useToken, blogOwnerCheck, blogController.deleteBlog);

module.exports = blogRouter;
