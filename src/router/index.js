import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../components/Login'
import Register from '../components/register'
import Diary_show from "../components/diary_show"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path: '/register',
      name: "Register",
      component: Register
    },
    {
      path: '/diary_show',
      name: 'Diary_show',
      component: Diary_show
    }
  ]
})
