const jwt = require('jsonwebtoken'); 
const { isCompositeComponent } = require('react-dom/test-utils');

const auth = (req, res, next) => { 
  try { 
    //console.log("THE REQ IN MIDDLEWARE IS: " + JSON.stringify(req.headers))
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ error: "No authentication token, access denied" }); 

    const verified = jwt.verify(token, process.env.SECRET_TOKEN); 
    if (!verified) return res.status(403).json({ error: "Token verification failed, authorization denied" }); 
    req.user = verified.id;
    next(); 
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  } 
}

module.exports = auth;