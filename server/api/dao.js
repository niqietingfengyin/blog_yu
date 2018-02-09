var mongoose = require('mongoose');
var User = require('../db/model/user');

mongoose.connect('mongodb://10.134.81.191/lj');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection mongodb error'));
db.on('open', function () {
    console.log('connect to lj database ;');
});

function addUser(obj, cb) {
    obj.registerTime = Date.now();
    console.info(obj);
    var user = new User(obj);
    user.save(cb);
}
function searchUser(obj, cb) {
    User.find(obj, cb);
}
function checkUser(obj, cb) {
    searchUser(obj, function (err,userlist) {
        
    }); 
}
module.exports = {
    addUser: addUser,
    searchUser: searchUser,
    checkUser: checkUser
}
