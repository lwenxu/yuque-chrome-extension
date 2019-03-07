import Main from '../components/Main';
import Login from '../components/Login';
import VueRouter from 'vue-router';

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/main',
      component: Main
    }
  ]
});
