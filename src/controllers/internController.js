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

//create intern
const createIntern = async function(req, res){
    try {
        const details = req.body;

        const clgName = req.body.collegeName;
        const clg = await collegeModel.findOne({name:clgName});
        if(!clg) return res.status(400).send({status:false, message: "sorry! this college has been not registered yet"})

        details.collegeId = clg._id;
        delete details.collegeName;

        const savedIntern = await internModel.create(details);
        return res.status(201).send({status:true, data:savedIntern});
    } catch (error) {
        console.log(error)
        return res.status(500).send({status:false, messsage: error.message})
    }
}

module.exports.createIntern = createIntern;
