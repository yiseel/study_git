import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Works',
      name: 'Works',
      component: () => import('../views/Works.vue'),
      meta: { title: 'Works - M4A' }
    },
    {
      path: '/WorksDetail1',
      name: 'WorksDetail1',
      component: () => import('../views/WorksDetail1.vue'),
      meta: { title: '마이카 리뉴얼 - M4A' }
    },
    {
      path: '/WorksDetail2',
      name: 'WorksDetail2',
      component: () => import('../views/WorksDetail2.vue')
    },
    {
      path: '/WorksDetail3',
      name: 'WorksDetail3',
      component: () => import('../views/WorksDetail3.vue')
    },
    {
      path: '/WorksDetail4',
      name: 'WorksDetail4',
      component: () => import('../views/WorksDetail4.vue')
    },
    {
      path: '/WorksDetail5',
      name: 'WorksDetail5',
      component: () => import('../views/WorksDetail5.vue')
    },
    {
      path: '/About',
      name: 'About',
      component: () => import('../views/About.vue'),
      meta: { title: 'About - M4A' }
    },
    {
      path: '/Contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue'),
      meta: { title: 'Contact - M4A' }
    },
    {
      path: '/Members',
      name: 'Members',
      component: () => import('../views/Members.vue'),
      meta: { title: 'Members - M4A' }
    }
  ]
})

//타이틀 변경
const baseTitle = '미디어포스 얼라이언스';
router.afterEach((to, from) => {
  //title
  document.title = to.meta.title || baseTitle;
  //canoical
  document.querySelectorAll('link').forEach((link) =>{
    if(link.hasAttribute('rel')&&link.getAttribute('rel')=='canonical'){
      link.setAttribute('href', 'http://test.m4a.co.kr' + to.path)
    }
  })
  //meta title
  ///
});

export default router
