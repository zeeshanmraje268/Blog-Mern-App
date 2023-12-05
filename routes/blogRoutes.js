const express = require("express");
const router = express.Router();
const {
  getAllBlogController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  getUserBlogController,
} = require("../controller/blogController");

router.get("/all-blog", getAllBlogController);
router.post("/create-blog", createBlogController);
router.put("/update-blog/:id", updateBlogController);
router.get("/get-blog/:id", getBlogByIdController);
router.delete("/delete-blog/:id", deleteBlogController);
router.get('/user-blog/:id',getUserBlogController);
module.exports = router;
