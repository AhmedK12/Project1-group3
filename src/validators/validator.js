const collegeModel = require('../models/collegeModel')



const isEmail =  async (x)=>{
    return (typeof x !=='string' || x.trim()===0  || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x))?"Inavlid Email":await isAllreadyPresent("email",x)?"Email Allready Used":"No Error";
}
const isMobile = (x)=>{
    return (typeof x ==='null' || x.toString.trim()===""  || !/^[6-9]{1}[0-9]{9}$/.test(x.toString))?"Invalid Mobile No":"No Error";
}
const isName = (x)=>{
    return (typeof x !=='string' || x.trim()===""  || !/^[A-Za-z ]{1,29}$/.test(x))?"Invalid Name":"No Error";
}
const isCollege = (x)=>{
    return (typeof x !=='string' || x.trim()===""  || !/^\s*(?=[A-Za-z])[a-zA-Z\s\.\,]{2,}\s*$/.test(x))?"Invalid College Name":"No Error";
}
function isLinkValid(x) {
   return (typeof x !=='string' || x.trim() === 0 || !(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg|jpeg)/.test(x)))?"Invalid LogoLink!":"No Error";
}
const isAllreadyPresent = async (atribute,value,req)=>{ 
    let data = await collegeModel.findOne({ [atribute]: value });
    if(data) req.headers.collegId = data._id;
    console.log(data)
    let p = data?true:false;
    return p
}





const mincost = async (a, b)=>
{

   try {
    let dp = Array(a.length+1).fill().map(() => Array(b.length+1));
    for(let i=0;i<=a.length;i++){
        for(let j=0;j<=b.length;j++){
            if(i==0)
                dp[i][j] = j;
            else if(j==0)
                dp[i][j] = i;
            else if(a.charCodeAt(i-1) == b.charCodeAt(j-1))
                dp[i][j] = dp[i-1][j-1];
            else{
                dp[i][j] = 1 + Math.min(dp[i-1][j], Math.min(dp[i][j-1], dp[i-1][j-1]));
            }
        }
    }
    return dp[a.length][b.length];

   } catch (error) {
    return res.status(500).send({ status: false, messsage: error.message })
   }
	
}




const nearestCollege = async (name)=>{
 try {
    let collegeNames = await collegeModel.find();
 let list = []; 
 for(let i=0;i<collegeNames.length;i++){
   await list.push([collegeNames[i], await mincost(name,collegeNames[i].name.toLowerCase())])
 }

 await list.sort((a,b)=>{
     return a[1]-b[1]
 })
 return list[0] 
 } catch (error) {
    return res.status(500).send({ status: false, messsage: error.message })
 }
}
















module.exports.nearestCollege = nearestCollege
module.exports.isAllreadyPresent = isAllreadyPresent;
module.exports.isName = isName;
module.exports.isCollege = isCollege;
module.exports.isEmail = isEmail;
module.exports.isMobile = isMobile;
module.exports.isLinkValid = isLinkValid;