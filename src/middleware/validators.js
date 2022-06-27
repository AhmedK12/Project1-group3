
const tags = []
const category = []
const subCategory = []
function minimumCost(a, b) {
    // Stores the frequency of string
    // a and b respectively
    var fre1 = Array(256).fill(0), fre2 = Array(256).fill(0);

    // Store the frequencies of
    // characters in a
    a.split('').forEach(c => {
        fre1[c.charCodeAt(0)]++;
    });

    // Store the frequencies of
    // characters in b
    b.split('').forEach(c => {
        fre2[c.charCodeAt(0)]++;
    });

    // Minimum cost to convert A to B
    var mincost = 0;

    // Find the minimum cost
    for (var i = 0; i < 256; i++) {
        mincost += Math.abs(fre1[i]
            - fre2[i]);
    }

    // Print the minimum cost
    return mincost;
}


// Validating Author Title
const validateAuthorTitle = (title)=>{
    return title==="Mr" || title==="Mrs" || title==="Miss" ?undefined:"any one from [Mr, Miss, Mrs]"
}



// Formeting Tags
const validateTags = (tags) => {
    return !Array.isArray(tags)? tags.replace("[","").replace("]","").split(",").filter((tag) => {return tag !== "" }):tags
}




// Formeting SubCategory
const validateSubCategory = (subCategory) => {
    return !Array.isArray(subCategory)? tags.replace("[","").replace("]","").split(",").filter((tag) => {return tag !== "" }):subCategory
}



const validateCategory = (category) => {
}


// Validating Password
const validatePassword = (password) => {
    return /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*|=?><{}])[a-zA-Z0-9!@#$%^&*]{6,16}/.test(password)===false?"Password must contain atleast one uppercase , one lowercase,one special charactor,and lenght of paasword must be in range [6,16]" :undefined
}




// Validating Name
const validateName = (Name,whatis) => {
    return  /^[a-zA-Z]{3,15}$/.test(Name) === false ? `${whatis} must start with alphbet, no special charactors allowed and length must be greater than 2`:undefined
}



// Validating ObjectId
const validateObjectId = (id, whatIs) => {
    return  /^[0-9a-f]{24}$/.test(id)===false?`${whatIs} is Not Valid`:undefined
}



// Validating Email
const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)===false?"Email should look like this anything@anything.anything":undefined
}

















module.exports.validateEmail = validateEmail
module.exports.validateName = validateName
module.exports.validateObjectId = validateObjectId
module.exports.validatePassword = validatePassword
module.exports.validateSubCategory = validateSubCategory
module.exports.validateTags = validateTags
module.exports.validateAuthorTitle = validateAuthorTitle