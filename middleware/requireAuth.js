const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function requireAuth(request, response, next) {
  try {
    //read token
    const token = request.cookies.Authorization;
    // if(token){
    //   jwt.verify(token,"ASEFTHYKLJBGMYTHZ", async(err,decoded)=>{
    //     if(err){
    //       console.log(err)
    //     }else{
    //       if (Date.now() > decoded.exp) return response.sendStatus(401);
    //       //find user
    //          const user = await User.findById(decoded.sub);
    //        //if user not found
    //         if (!user) return console.log("user not found");
    //         //if user found
    //           request.user = user;
    //       console.log(request.user)
    //       next();
    //     }
    //   }); 
    // }else{
    //   console.log("token not found")
    // }

    //changes
    //decode token
    change
    const decoded = jwt.verify(token,"ASEFTHYKLJBGMYTHZ");
    //make sure token is not expired
    if (Date.now() > decoded.exp) return response.sendStatus(401);
    //find user
    const user = await User.findById(decoded.sub);
    //if user not found
    if (!user) return response.sendStatus(401);
    //if user found
    request.user = user;
    next();

    
  } catch (error) {
    
    console.log('root of the', error);
    return response.sendStatus(401);
  }
}
module.exports = requireAuth;
