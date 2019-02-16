import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Apply from '@/components/welfareManagement/Apply'
import Examine from '@/components/welfareManagement/Examine'
import test from '@/components/gameServerManagement/test'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {path: 'welfare_management/apply', name: 'apply', component: Apply, props: true},
        {path: 'welfare_management/examine', name: 'examine', component: Examine, props: true},
        {path: 'test', name: 'test', component: test, props: true},
        // {path: 'welfare_payment_management', name: 'welfare_payment_management', component: Page2, props: true},
        // {path: 'welfare_payment_management', name: 'welfare_payment_management', component: Page2, props: true},
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ]
});

router.beforeEach((to, from ,next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = sessionStorage.getItem('userToken');
    if (token === null || token === '') {
      next('/login')
    } else {
      next();
    }
  }
});

export default router
