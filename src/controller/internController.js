const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')

exports.createIntern = async function(req,res){
    try{
        const savedObj = {}
        const {collegeName,name,email,mobile} = data
        if(collegeName) nameObj.name = req.body.collegeName 
        if(name) savedObj.name = req.body.name
        if(email) savedObj.email = req.body.email
        if(mobile) savedObj.mobile = req.body.mobile

        const findIdofCollege = await collegeModel.findOne(savedObj.name).select({_id : 1})
        if(!findIdofCollege) return res.status(404).send({status:false,messsge:"College Not Exist"})
        savedObj.collegeId = findIdofCollege._id.toString()
        const savedData = await internModel.create(savedObj)
        
        console.log(id)
        // const updateId = await internModel.findOneAndUpdate(savedObj,{$set:{collegeId : id}},{new:true})
        res.send({msg : updateId})

    } catch(err){
        res.status(500).send(err.message)
    }
}