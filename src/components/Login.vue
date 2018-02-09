<template>
    <div class="mylogin h100" style="height:600px;">
        <div class="login h100">
        <form>
            <div class="form-area">
                <div class="login-icon"><img style="width:100%" class="pic-full" src="../assets/img/user.png" /></div>
                <input type="text" name="username" placeholder="username"  v-model="username" required />
                <div class='login-icon'><img style="width:100%" src='../assets/img/pwd.png' class='pic-full' /></div>
                <input type="password"  name="password" placeholder="password"  v-model="password"  required/>
                <div class="two-btns">
                    <input type="button" @click="checkUser()"  class="f1" value="登录" />
                    <router-link to="/register"><input type="button"  value="注册" class="f1" /></router-link>
                </div>
            </div>    
        </form>
        <div :class="[classbg, classFade]" ref='bg'>
					<div class="modal" id="myModal" tabindex="2" role="dialog" aria-labelledby="myModalLabel">
						<div class="modal-dialog">
							<div class="modal-content fadeIn">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" @click='closeModel()'>
					&times;
				</button>
									<h4 class="modal-title" id="myModalLabel">
                                                            提示
                    </h4>
								</div>
								<div class="modal-body">
									<span>{{notice_info}}</span>
									<span :class='[info_hide, pl2]'><router-link to="/diary/d_edit"><span>發表動態</span></router-link><span :class='direct'>|</span><span><router-link to="/message_board/m_edit">給我留言🍀</router-link></span></span>
								</div>
							</div>
						</div>
					</div>
				</div>
        </div>
    
    
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {

      username: '',
      password: '',
      classFade : 'hide',
      classbg: 'bg',
      direct: 'direct',
      pl2 :'pl2',
      info_hide : 'hide',
      notice_info: '用戶名或者密碼錯誤或者不存在！'
    }
  },
  created(){
      this.classFade = 'hide' ;
  },
  methods:{
      closeModel: function(){
          this.classFade = 'hide' ;
      },
      checkUser: function(){
          var username = this.username,
          password = this.password ;
          var self = this ;
          var flag = false ; 
          if(username && password){
              axios({
                  method: 'post',
                  url: 'api/user/searchUser',
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
                  var list = response.userlist ;
                  for(var i in list){
                      if(list[i].username == username && list[i].password == password){
                         flag = true ;
                         break ;
                      }
                  }
                  if(flag){
                      self.classFade = '' ;
                      self.notice_info = "登录成功" ;
                      setTimeout(function(){
                          window.location.href = "#/diary_show"
                      },3000)
                  }else{
                    self.classFade = '' ;
                    self.notice_info = "用户名或密码不对！"
                  }
              }).catch(function(error){
                 self.classFade = 'hide' ;
                 self.notice_info = "服务器繁忙，查询错误，请稍后重试"
              }) ;
          }else{
              this.classFade = '' ;
              this.notice_info = "信息不完整" ;
        }
      }
  }  
}
</script>
<style scoped src="../assets/css/login.css"/>
