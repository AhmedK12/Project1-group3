const authorModel = require('../Models/authorModel')
const authorModel = require('../Models/blogModel')
const jwt = require("jsonwebtoken");



const authenticate = async function (req, res, next) {

    try {
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: true, msg: "token must be present" })
        let decodedToken = jwt.verify(token, "blogProject");

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

    next()

}




const authorise = function (req, res, next) {
    try {


        let token = req.headers["x-api-key"];
        if (!token) {

            token = req.headers["X-Api-Key"];
        }
        let decodedToken = jwt.verify(token, "blogProject");
        let findAuthorId = decodedToken.authorId
        let checkAuthor = req.params.authorId
        if (checkAuthor !== findAuthorId)
            return res.status(400).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
        next()
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }




}




module.exports.authorise = authorise
module.exports.authenticate = authenticate