const jwt = require('jsonwebtoken'); 
var User = require('../models/user.model');

const admin = (req, res, next) => { 
  try { 
    //console.log("THE REQ IN MIDDLEWARE IS: " + JSON.stringify(req.headers))
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ error: "No authentication token, access denied" }); 

    const verified = jwt.verify(token, process.env.SECRET_TOKEN); 
    if (!verified) return res.status(401).json({ error: "Token verification failed, authorization denied" }); 
    req.user = verified.id; 
    User.findById(req.user).select('isAdmin')
      .then(user => {
        if(user.isAdmin) {
          next();
        } else {
          res.status(401).json("You don't have acccess to this resource");
        }
      })
      .catch(err => res.status(400).json('Error: ' + err));
    
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  } 
}

module.exports = admin;