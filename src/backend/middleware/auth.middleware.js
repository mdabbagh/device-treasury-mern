const jwt = require('jsonwebtoken'); 

const auth = (req, res, next) => { 
  try { 
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ error: "No authentication token, access denied" }); 

    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
      if(err) {
        return res.status(403).json({ error: err.message }); 
      }
      req.user = decoded.id;
      next();
    }); 
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  } 
}

module.exports = auth;