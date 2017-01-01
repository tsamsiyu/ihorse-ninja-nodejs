let patched = false;

module.exports = function() {
    if (!patched) {
        require('./fsPatch')();
        return true;
    }
    patched = true;
    return false;
};