module.exports = function (req, res, next) {
  res.json = function (data) {
    if (typeof data === 'object') {
      this.end(JSON.stringify(data));
    } else {
      this.end(null);
    }
  };

  next();
};
