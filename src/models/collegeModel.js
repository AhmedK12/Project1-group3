const mongoose = require('mongoose');


const collegeSchema = new mongoose.Schema({

    name: {type:String, required:true, unique:true, lowercase :true},    //lowerCase true means even if user will send value in u.c it will still save in l.c
    fullName: {type:String, required:true},                                //syntax lowercase not lowerCase or lowercase()
    logoLink: {type:String, required:true},     
    isDeleted: {type:Boolean, default:false}  

},{timestamps: true});


module.exports = mongoose.model("College", collegeSchema);
