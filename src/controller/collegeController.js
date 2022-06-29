const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")





const getCollegeInternList = async (req,res)=>{
    let name = req.query.name;
    if(name && typeof name !=='string' && name ==="") return (res.send.status(400).send({status:false,message:"Invalid Query"}));
    let college = await collegeModel.findOne({name:name});
    if(college) return res.status(404).send({status:false,message:"Colege Not Found"})
    let internList = internModel.find({collegeId:college._id})
    if(internList.length==0) return res.status(404).send({status:false,message:"No Intern Available for this college"})
    college.interns = internList
    res.status(200).send({status:true,data:college})

}