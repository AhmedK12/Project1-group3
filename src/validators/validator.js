const collegeModel = require('../models/collegeModel')





const isEmail = (x)=>{
    return (typeof x !=='string' || x.trim()===0  || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x))?"Inavlid Email":true;
}

const isMobile = (x)=>{
    return (typeof x ==='null' || x.toString.trim()===0  || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x.toString))?"Invalid Mobile No":true;
}


const isName = (x)=>{
    return (typeof x !=='string' || x.trim()===0  || !/^[A-Za-z ]{1,29}$/.test(x))?"Invalid Name":true;
}


const isCollege = (x)=>{
    return (typeof x !=='string' || x.trim()===0  || !/^\s*(?=[A-Za-z])[a-zA-Z\s\.\,]{2,}\s*$/.test(x))?"Invalid College Name":true;
}


function isLinkValid(x) {
   return (typeof x !=='string' || x.trim() === 0 || !(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg|jpeg)/.test(x)))?"Invalid LogoLink!":true;
}

const isAllreadyPresent = async (atribute,value,req)=>{ 
    let data = await collegeModel.findOne({ [atribute]: value });
    req.headers.collegId = data._id;
    return data?true:false;
}

const mincost = async (a, b)=>
{
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

	
}



const nearestCollege = async (name)=>{
 let collegeNames = await collegeModel.find();
 let list = []; 
 for(let i=0;i<collegeNames.length;i++){
   await list.push([collegeNames[i], await mincost(name,collegeNames[i].name.toLowerCase())])
 }

 await list.sort((a,b)=>{
     return a[1]-b[1]
 })
 return list[0]
}
















module.exports.nearestCollege = nearestCollege
module.exports.isAllreadyPresent = isAllreadyPresent;
module.exports.isName = isName;
module.exports.isCollege = isCollege;
module.exports.isEmail = isEmail;
module.exports.isMobile = isMobile;
module.exports.isLinkValid = isLinkValid;