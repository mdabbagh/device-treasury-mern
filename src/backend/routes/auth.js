const router = require('express').Router();
const jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var Token = require('../models/tokens.model');

router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({'email': email}).then(user => {
    if(!user) {
      return res.status(400).json("Failed LOG IN");
    }

    user.comparePassword(password, (err, isMatch) => {
      if(err) res.status(400).json("ERROR during password comparison");

      if(!isMatch) {
        res.status(400).json("FAILED password check");
      } else {
        const userDetails = {id: user.id, isAdmin: user.isAdmin, fullname: user.fullname, email: user.email};
        const token = generateAccessToken(user.id);
        const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_SECRET_TOKEN, {expiresIn: '24h'})
        res.status(200).json({authenticated: true, token: token, refreshToken: refreshToken, user: userDetails});
      }
    })
  })
});

router.route('/token').post((req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.status(401);
  Token.findOne({'token': refreshToken}).then((token, err) => {
    if (err) return res.status(403);
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN).then((err, userId) => {
      if (err) return res.status(403);
      const accessToken = generateAccessToken(userId);
      res.status(200).json({authenticated: true, token: accessToken})
    })
  })
})

function generateAccessToken(userId) {
  return jwt.sign({id: userId}, process.env.SECRET_TOKEN, {expiresIn: '30m'})
}

module.exports = router;