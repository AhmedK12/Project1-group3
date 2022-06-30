const internModel = require('../models/internModel')









/***************************************************************** POST API **************************************************************/



const createIntern = async function(req, res){
    try {
        const details ={}
        details.name = req.body.name.trim();
        details.email = req.body.email.trim();
        details.mobile = req.body.mobile.trim()
        details.collegeId = req.headers.collegeId
        const savedIntern = await internModel.create(details);
        return res.status(201).send({status:true, data:savedIntern});
    } catch (error) {
        console.log(error)
        return res.status(500).send({status:false, messsage: error.message})
    }
    
}




module.exports.createIntern = createIntern
