var mongoose        = require('../../libs/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

var Language = mongoose.model('Language', schema);

module.exports.Language = Language;