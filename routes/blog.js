const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const verifyFile = require('../middleware/verifyFile')
const blogController = require('../controllers/blog')


router.get('/beranda', blogController.findBeranda)
router.get('/all-blogs', blogController.findAllBlogs)
router.get('/blogs/:blogKey', blogController.findBlogsByKey)
router.get('/detail-blog/:title', blogController.findBlogByTitle)
router.get('/detail-blog/:sortItem', blogController.findAllBlogsSortBy)

router
    .route('/blogs')
    .get(verifyToken, blogController.findBlogs)
    .post(verifyToken, verifyFile.uploadImage.single('image'), blogController.createBlogs)

router
    .route('/blogs/:blogId')
    .put(verifyToken, verifyFile.uploadImage.single('image'), blogController.updateBlogs)
    .delete(verifyToken, blogController.deleteBlogs)

module.exports = router