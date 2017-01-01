var mongoose        = require('../../libs/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    languageId: {
        type: Number,
        required: true,
    },
    userId: {
        type: Number,
        required: true
    }
});

var Language = mongoose.model('Language', schema);

module.exports.Language = Language;