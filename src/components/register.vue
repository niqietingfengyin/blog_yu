<template>
    <div class="register">
        <div class='form_area w80 pr'>
				<!--<img src='../assets/img/form_bg.png' class='w100'>-->
				<div class='input_area'>
					<h1>Sign Up</h1>
					<p class='pb5'>Want to sign up fill out this form!</p>
					<form>
						<span class='title'>Name</span>
						<input class='input' type="text" placeholder="Username" required="required" ref='user' name="username" v-model="username" id="txtUserName" />
						<br />
						<span class='title pt5'>Password</span>
						<input class='input' type="password" placeholder="Password" required="required" ref='pwd' name="pwd" v-model="password" id="txtUserPass" />
						<br />
						<span class='title pt5'>RePassword</span>
						<input class='input' type='password' placeholder="RePassword" ref='repwd' required="" v-model='repassword' />
						<br />
						<input class='sign_btn' type="button" @click="checkUser()" value="Sign Up" />
                        <input class='check_btn' type="checkbox" id="chkRememberPass" name="chkRememberPass" checked="" /><span class='remember'>Remember me</span>
					</form>
				</div>
                <div :class="[classBg, classFade]" ref='bg'>
                    <div class="modal" id="myModal" tabindex="2" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click='closemodel()' ><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title" id="myModalLabel">提示</h4>
                                </div>
                                <div class="modal-body">{{errInfo}}</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import axios from "axios" 
export default {
    name: 'register',
    data() {
        return {
            username: "",
            password: "",
            repassword: "",
            classFade: 'hide',
            classBg: 'bg',
            errInfo:'服务器忙碌，请稍后重试'
        }
    },
    methods:{
        closemodel: function(){
            this.classFade = "hide" ;
        },
        addUser: function(){
            var username = this.username ;
            var password = this.password ;
            var self = this ;
            axios({
                method:'post',
                url: 'api/user/addUser',
                data:{
                    username:username,
                    password:password,
                },
                timeout: 3000
            }).then(function(response){
                self.errInfo = "注册成功";
                self.classFade = "" ;
                setTimeout(function(){
                    window.location.href= "#/login" ;
                },2000)
            }).catch(function(err){
                self.errInfo = "注册失败，发生未知错误";
                self.classFade = "" ;
            })
              
        },
        checkUser: function(){
            var username = this.username,
                password = this.password,
                repassword = this.repassword,
                self = this ;
            if(username && password && repassword){
                if(password == repassword){
                    axios({
                        url: 'api/user/searchUser',
                        method: 'post',
                        data: {
                            username: username,
                            password: password
                        },
                        timeout: 3000
                    }).then(function(res){
                        var response = res.data ;
                        if(response.code == -1){
                            self.errInfo = response.message ;
                            self.classFade = '' ;
                            return ;
                        }
                        var flag = 'no' ;
                        for(var i=0; i<response.userlist.length ;i++){
                    
                            if( username == response.userlist[i]['username']){
                                self.errInfo = "用户名已经存在，请更换用户名重试";
                                self.classFade = "" ;
                                flag = 'exist' ;
                                break ;
                            }
                        }
                        if(flag == 'no'){
                            self.addUser() ;
                        }
                    }).catch(function(err){
                        self.errInfo = err.message ;
                        self.classFade = "" ;
                    })
                }else{
                    self.errInfo = "两次密码不一致，请确认";
                    self.classFade = "" ;
                }
            }else{
                self.errInfo = "信息输入不完整";
                self.classFade = "" ;
            }
        },
    }
}
</script>
<style scoped src="../assets/css/register.css" />