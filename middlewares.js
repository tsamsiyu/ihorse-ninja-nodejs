const corsMiddleware        = require('middlewares/corsMiddleware');
const authMiddleware        = require('middlewares/authMiddleware');
const mongooseMiddleware    = require('middlewares/mongooseMiddleware');
const requestMiddleware     = require('middlewares/requestMiddleware');
const responseMiddleware    = require('middlewares/responseMiddleware');
const errorMiddleware       = require('middlewares/errorMiddleware');

module.exports = function(app, config) {
    app.use(corsMiddleware);
    app.use(requestMiddleware);
    app.use(authMiddleware);
    app.use(responseMiddleware);
    app.use(errorMiddleware);

    app.get('/echo', (req, res) => {
        res.end('echo');
    });
};