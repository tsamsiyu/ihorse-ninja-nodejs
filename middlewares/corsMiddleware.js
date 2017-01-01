module.exports = function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "localhost");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, HEAD, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    next();
};