const fs = require('fs');
const path = require('path');

// TODO: remake to use like mixin
module.exports = function () {
  fs.walkDeepThroughDir = function (folderPath, cb, async = true) {
    const scanner = async ? fs.readdir : fs.readdirSync;
    let stopScan = false;
    scanner(folderPath, function (err, files) {
      if (stopScan) {
        return;
      }
      if (err) {
        if (cb(err)) {
          stopScan = true;
        }
      } else {
        for (let i = 0; i < files.length; i++) {
          const filePath = path.join(folderPath, files[i]);
          const thrown = fs.walkDeepThroughFile(filePath, cb, async);
          if (thrown) {
            stopScan = true;
            break;
          }
        }
      }
    });
  };

  fs.walkDeepThroughFile = function (filePath, cb, async = true) {
    fs.stat(filePath, (err, stat) => {
      if (err) {
        return cb(err);
      } else if (stat.isDirectory()) {
        fs.walkDeepThroughDir(filePath, cb, async);
      } else {
        cb(null, filePath, stat);
      }
    });
  };
};
