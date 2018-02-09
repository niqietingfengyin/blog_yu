const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    registerTime: {type:Date, default:Date.now} ,
    blogs:[{title:String, content: String, date: Date}],
    comments: [{ content: String, date: Date }],
})
userSchema.methods.findByName = function (cb) {
    return this.model('User').find({ username: this.username }, cb);
};
var User = mongoose.model('User', userSchema);
module.exports = User;