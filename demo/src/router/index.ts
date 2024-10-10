import { createRouter, createWebHashHistory } from 'vue-router';

const BinaryLogo = () => import('../views/BinaryLogo.vue');

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/binary-logo',
    },
    {
      path: '/binary-logo',
      name: 'BinaryLogo',
      component: BinaryLogo,
    },
  ],
});

export default router;
