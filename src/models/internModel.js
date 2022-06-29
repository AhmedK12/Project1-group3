const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        required : true
    },
    collegeId : {
        type : ObjectId,
        ref : 'College', 
        default : null
    },
    isDeleted : {
        type : Boolean,
        default : false
    }

},{timestamps: true});

module.exports = mongoose.model('internModel', internSchema)