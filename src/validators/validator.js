const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel.js');

const strregEx = /^\w[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/
let urlregEx = /^(https:\/\/www\.|http:\/\/www\.|www\.)[a-zA-Z0-9\-_.$]+\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?(.png|.jpeg|.jpg)$/gm


const collegeValidation = async function (req, res, next) {
    try {
        let data = req.body
        // console.log(data)

        let collegename = req.body.name

        if (data == null) return res.status(400).send({ status: false, msg: "data not found" })

        if (!data.name || typeof (data.name) != 'string' || !data.name.match(strregEx)) return res.status(400).send({ status: false, msg: "College name is not found in valid Format" })
        let repeatedName = await collegeModel.findOne({ name: collegename })
        if (repeatedName) return res.status(400).send({ status: false, msg: `${collegename} is Already Registered ` })


        if (!data.fullName || typeof (data.fullName) != 'string' || !data.fullName.match(strregEx)) return res.status(400).send({ status: false, msg: "College fullName is not found in valid Format" })


        if (!data.logoLink || !data.logoLink.match(urlregEx)) return res.status(400).send({ status: false, msg: "link not found" })
        next()
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const internValidation = async function (req, res, next) {
    try {
        const { collegeName, name, email, mobile } = data
        if (!(/^[A-Za-z ]{1,29}$/.test(name))) {
            return res
                .status(400)
                .send({ status: false, message: `name is invalid or blank` });
        }
        if (email.length == 0) {
            return res.status(400).send({ status: false, msg: "email is blank" })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({
                status: false,
                message: `${email} should be a valid email address`,
            });
        }
        if (!(/^[0-9]{1,10}$/.test(mobile))) {
            return res.status(400).send({ status: false, msg: "mobile no is invalid or blank" })
        }
        let numberExist = await internModel.findOne({ "mobile": mobile })
        if (numberExist) {
            return res.status(400).send({ status: false, msg: "mobile number is already registered" })
        }
        let nameExist = await collegeModel.findOne({ name: collegeName })
        // console.log(nameExist)
        if (!nameExist) {
            return res.status(400).send({ status: false, msg: "this collegeName is not present in db" })
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.collegeValidation = collegeValidation

module.exports.internValidation = internValidation




