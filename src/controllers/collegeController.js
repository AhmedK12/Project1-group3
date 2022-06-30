const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")






/***************************************************************** POST API **************************************************************/



const createCollege = async function (req, res) {
    try {
        const details ={}
        details.name = req.body.name;
        details.fullName = req.body.fullName;
        details.fullName = req.body.logoLink
        const savedCollege = await collegeModel.create(details);
        return res.status(201).send({ status: true, data: savedCollege });
    }   catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, messsage: error.message })
    }
}





/***************************************************************** GET API **************************************************************/



const collegeInterns = async function (req, res) {
    try {
        let {_id,name,fullName,logoLink} = req.headers.data[0];
        const internsList = await internModel.find({collegeId : _id}).select({name:1, email:1, mobile:1});
        if(internsList.length === 0) return res.status(404).send({status:false,message:"currently, there a no any interns at this college"})
        return res.status(200).send({ status: true, data: {name:name,fullName:fullName,logoLink:logoLink,interns:internsList} });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error.message })
    }
}












module.exports = { createCollege, collegeInterns }
