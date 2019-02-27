import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Apply from '../components/welfareManagement/Apply'
import Examine from '../components/welfareManagement/Examine'
import Record from '../components/welfareManagement/Record'
import RoleManagement from "../components/welfareManagement/RolePlayer";
import ZoneList from "../components/gameServerManagement/ZoneList";
import Recommend from "../components/gameServerManagement/Recommend"
import OpenZone from "../components/gameServerManagement/OpenZone";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: 'server_management/zone_list', name: 'zone_list', component: ZoneList, props: true },
        { path: 'server_management/open_zone', name: 'open_zone', component: OpenZone, props: true },
        { path: 'server_management/recommend', name: 'recommend', component: Recommend, props: true },
        { path: 'welfare_management/apply', name: 'apply', component: Apply, props: true },
        { path: 'welfare_management/examine', name: 'examine', component: Examine, props: true },
        { path: 'welfare_management/record', name: 'record', component: Record, props: true },
        { path: 'welfare_management/role_management', name: 'role_management', component: RoleManagement, props: true },
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
