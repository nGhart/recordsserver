const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function requireAuth(request, response, next) {
  //read token
  const token = `request.cookies.Authorization`;
  //console.log('req token', token);
   // const token =
   //  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGZjZTMxZmUzNjhkNDEzNDUyY2MzZDQiLCJleHAiOjE2OTgxODY0NzY5MTksImlhdCI6MTY5NTU5NDQ3Nn0.Z0g0hhB-R9K_JlSdT7VKnb4-b5wPAKUHfpY0OKXwBRQ';
  try {
    //decode token
    const decoded = jwt.verify(token, process.env.SECRET);
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
    next();
    return response.sendStatus(401);
  }
}
module.exports = requireAuth;
