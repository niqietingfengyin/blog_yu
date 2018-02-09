const express = require('express');
const router = express.Router();
const dao = require('./dao');

var status = {
    'SUCCESS': {
        code: 1,
        message: 'success' 
    },
    'FAIL': {
        code: -1,
        message: 'fail'
    }

}

router.use('/searchUser', function (req, res) {
    //查询用户，并返回
    var obj = {};
    obj.username = req.body.username;
    dao.searchUser(obj, function (err, userlist) {
        if (err instanceof Error) {
            var ret = status['FAIL'];
            ret.message = "查询用户操作失败，请稍后重试";
        } else {
            var ret = status['SUCCESS'];
            ret.userlist = userlist;
        }
        res.json(ret); 
    });
});
router.use('/addUser', function (req, res) {
    //存入数据库
    var obj = {};
    obj.username = req.body.username;
    obj.password = req.body.password;
    dao.addUser(obj, function (err, list) {
        if (err instanceof Error) {
            var ret = status['FAIL'];
            ret.message = "添加用户操作失败，请稍后重试";
        } else {
            var ret = status['SUCCESS'];
            ret.message = "保存成功！";
        }
        res.json(ret); 
    });
})

module.exports = router;