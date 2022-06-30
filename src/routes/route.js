const express = require('express')
const router = express.Router()
const  {createCollege,collegeInterns} = require('../controllers/collegeController')
const internController = require('../controllers/internController')
const middleware = require("../middlewares/middlewares")












router.post('/functionup/colleges',middleware.processCollegeRequest, createCollege) 
router.post('/functionup/interns',middleware.processInternRequest, internController.createIntern)
router.get('/functionup/collegeDetails',middleware.processGetRequest, collegeInterns )  

 

module.exports = router;