<template>
  <div class='common_head'>
      <span @click='toLogin'>{{welcome_info}}{{user_name}}</span><span :class='[exit,pl8]' @click='exitLogin'>|  退出</span>
      <input type="hidden" :value=user_name class='nametest' ref='nametest' />
    </div>
</template>
<script>
export default {
    data() {
        return {
            welcome_info : '欢迎你',
            user_name: 'yyy',
            exit: 'hidden',
            pl8: ''
        }
    },
    created() {
        var username = this.user_name ; //读取cookie
        if(username){
            this.exit = '';
        }else{
            this.welcome_info = "请登录";
            this.exit = 'hidden';
        }
    },
    methods:{
        toLogin: function(){
            if(this.welcome_info == '请登录'){
               this.$router.push('#/login');
            }
        },
        exitLogin: function(){
            //清除cookie,
            this.$router.push('#/login');
        }
    }
}
</script>