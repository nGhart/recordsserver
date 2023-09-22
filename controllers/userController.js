const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function signup(request, response) {
  try {
    const { email, password } = request.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    await User.create({
      email,

      password: hashedPassword,
    });
    response.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
}

async function login(request, response) {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) return response.sendStatus(401);
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return response.sendStatus(401);
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
    console.log(token);

    response.cookie('Authorization', token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: 'lax',
      //if set to true will only work on secure sites, this lets it work on the local host when we are developing
      secure: process.env.NODE_ENV === 'production',
    });
    response.sendStatus(200);
    console.log('hi', response);
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
}
function logout(request, response) {
  try {
    response.clearCookie('Authorization');
    response.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400).json({ error: 'Failed' });
  }
}

function checkAuth(request, response) {
  try {
    response.sendStatus(200);
    console.log('look', request.user);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  signup,
  login,
  logout,
  //deploy
  //checkAuth,
};
