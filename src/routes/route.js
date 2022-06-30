
const express = require('express');
const router = express.Router();

const internController = require('../controllers/internController.js')
const collegeController = require('../controllers/collegeController')
// const validator = require('../validator/validator.js')

// router.post('/functionup/colleges', collegeController.createCollege )    //1. 
router.post('/functionup/interns', internController.createIntern)    //2.
router.get('/functionup/collegeDetails', collegeController.collegeInterns )    //3. GET API

 


module.exports = router;