const collegeModel = require("../models/collegeModel");


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
   await list.push(collegeNames[i], await mincost(name,collegeNames[i].name.toLowerCase()))
 }

 await list.sort((a,b)=>{
     return a[1]-b[1]
 })
 return list[0]
}

const isValid = function (x) {
    return (!x || typeof x!=='string' ||  x.trim()==="" || !/^\w[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/.test(x)) ?"Invalid":true;
}








module.exports.nearestCollege = nearestCollege
module.exports.isValid = isValid