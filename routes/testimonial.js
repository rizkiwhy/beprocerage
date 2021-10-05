const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const verifyFile = require('../middleware/verifyFile')
const testimonialController = require('../controllers/testimonial')


router.get('/all-testimonials', testimonialController.findAllTestimonials)

router
    .route('/testimonials')
    .get(verifyToken, testimonialController.findTestimonials)
    .post(verifyToken, verifyFile.uploadImage.single('image'), testimonialController.createTestimonials)

router
    .route('/testimonials/:testimonialId')
    .put(verifyToken, verifyFile.uploadImage.single('image'), testimonialController.updateTestimonials)
    .delete(verifyToken, testimonialController.deleteTestimonials)

module.exports = router