var mongoose        = require('../../libs/mongoose');
var Schema          = mongoose.Schema;

var schema = new Schema({
    firstName: String,
    lastName: String,
    birthday: Date,
    userId: Schema.Types.ObjectId,
});

var Profile = mongoose.model('Profile', schema);

module.exports.Profile = Profile;