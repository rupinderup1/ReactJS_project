const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.headers['x-auth-token'];
    if(!token) return res.status(401).send("No Auth Token");

    try {
        const decoded = jwt.verify(token, config.get('jwtprivateket'));
        req.user = decoded;
        next();
    }
    catch(ex) {
        return res.status(401).send("Invalid Auth Token");
    }
}

module.exports = auth;
