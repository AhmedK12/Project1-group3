const express = require('express')
const router = express.Router()
const  {createCollege,collegeInterns} = require('../controllers/collegeController')
const internController = require('../controllers/internController')
const validation = require('../validators/validator')
 







router.post('/functionup/colleges',validation.collegeValidation,createCollege)
router.post('/functionup/interns',validation.internValidation,internController.createIntern)
router.get('/functionup/collegeDetails', collegeInterns )

 


module.exports = router;