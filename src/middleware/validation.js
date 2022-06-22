
const tags = []
const category = []
const subCategory = []
function minimumCost(a, b)
{
    // Stores the frequency of string
    // a and b respectively
    var fre1 = Array(256).fill(0), fre2= Array(256).fill(0);
 
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
    return mincost ;
}






const validateTags = (tags)=>{
  if(!Array.isArray(tags)){
      return tags.split(",")
  }
  return tags

}


const validateSubCategory = (subCategory)=>{
    if(!Array.isArray(subCategory)){
        return subCategory.split(",")
    }
    return subCategory
}

const validateCategory = (category)=>{

}

const validatePassword = (password)=>{

}

const validateName = (Name,res,whatis)=>{
      let regex = /[A-Z]{1}[a-z]{2}[a-z]*/
      if(!regex.test(Name)) return res.status(400).send({status:false,msg:"Name is Not Valid"})


}








const validateObjectId = (id,res,whatIs)=>{
    var regex = /[a-f0-9]{24}/;
    if(!regex.test(id)) return res.status(400).send({status:false,msg:`${whatIs} is Not Valid`})
    
}





const validateEmail = (email,res)=>{
    var regex = /\S+@\S+\.\S+/;
    if(!regex.test(email)) return res.status(400).send({status:false,msg:"Email is Not Valid"})


  }
 

const validateRequest = (req,res,next)=>{
    if(req.query){
       if(req.query.authoeId)
          validateObjectId(req.authoeId,res,"Author Id")
       if(req.query.blogId)
          validateObjectId(req.blogId,res,"BlogId Id")
       if(req.query.tags)
          req.query.tags = validateTags(req.query.tags)
       if(req.query.subCategory)
          req.query.subCategory = validateTags(req.query.subCategory)
    }

    if(req.param){
        if(req.param.authoeId)
           validateObjectId(req.authoeId,res,"Author Id")
        if(req.param.blogId)
           validateObjectId(req.blogId,res,"BlogId Id")
    }

    if(req.body){
        if(req.body.authoeId)
           validateObjectId(req.body.authoeId);
        if(req.body.tags)
           validateTags(req.body.tags);
        if(req.body.sebCategory)
           validateSubCategory(req.body.sebCategory);
        if(req.body.fname);
           validateName(req.body.fname,res,"help")
        if(req.body.lname);
           validateName(req.body.lname,res,"help")
           
    }

    next()
}


