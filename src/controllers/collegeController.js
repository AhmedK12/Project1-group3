const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validator = require("./validators")






const isValidBody = function (y) {
    return Object.keys(y).length > 0
}



const isValid = function (x) {
    return (!x || typeof x!=='string' ||  x.trim()==="") ?false:true;
}
const college = async function (req, res) {
    try {


        let data = req.body
        let errorMsg = {}
        errorMsg.name = !data.name?"Required":validator.isValid(data.name)
        errorMsg.fullName = !data.fullName?"Required":validator.isValid(data.fullName)
        errorMsg.logoLink = !data.logoLink?"Required":validator.isValid(data.logoLink)
        Object.keys(errorMsg).forEach(key => errorMsg[key] === true && delete errorMsg[key])
        if(Object.keys(errorMsg).length!==0) return res.status(400).send({status:false,msg:errorMsg})
        let createCollege = await collegeModel.create(data)
        res.status(201).send({ status: true, data: createCollege })










        let collegename = req.body.name

        if (!isValidBody(data)) return res.status(400).send({ status: false, msg: "data not found" })

        if (!data.name || !isValid(data.name)|| !data.name.match(/^[a-zA-Z]+$/)) return res.status(400).send({ status: false, msg: "College name is not found in valid Format" })
        let repeatedName = await collegeModel.findOne({ name: collegename })
        if (repeatedName) return res.status(400).send({ status: false, msg: `${collegename} is Already Registered ` })

        if (!data.fullName || !isValid(data.fullName) || !data.fullName.match(/^\w[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/) ) return res.status(400).send({ status: false, msg: "College fullName is not found in valid Format" })

        if (!data.logoLink ) return res.status(400).send({ status: false, msg: "link not found" })

        // let createCollege = await collegeModel.create(data)
        // res.status(201).send({ status: true, data: createCollege })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


const getCollegeInternList = async (req,res)=>{
    let name = req.query.name.toLowerCase();
    if(!name || typeof name !=='string' || name.trim() ==="") return (res.send.status(400).send({status:false,message:"Invalid Query"}));
    let college = await collegeModel.findOne({name:name});
    if(!college)  college = await validator.nearestCollege(name) ;                         
    let internList = await internModel.find({collegeId:college._id},{_id:1,name:1,email:1,mobile:1})
    if(internList.length==0) return res.status(404).send({status:false,message:"No Intern Available for this college"})
    let data1 = {}
    data1.name = college.name;
    data1.fullName = college.fullName; 
    data1.logoLink=college.logoLink   
    data1.interns = internList;     
    res.status(200).send({status:true,data:data1})

}








module.exports.getCollegeInternList = getCollegeInternList
module.exports.college = college
