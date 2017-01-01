const HttpError = require('../HttpError');

module.exports = HttpError.extends({
    name: 'NotFoundHttpError',
    message: 'Page not found',
    status: 404
});