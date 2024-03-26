import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import LogoutPage from "../views/LogoutPage.vue";
import UserList from "../views/userMaster/list/ListPage.vue";
import UpdateUser from "../views/userMaster/option/OptionPage.vue";
import IssuedBooks from "../views/IssuedBooks.vue";
import AdminApproval from '../views/AdminApproval.vue';
import UserRequest from '../views/UserRequest.vue';
import store from '@/stores';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/logout',
      name: 'LogoutPage',
      component: LogoutPage,
    },
    {
      path: '/userList',
      name: 'UserList',
      component: UserList,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/updateUser/:id',
      name: 'UpdateUser',
      component: UpdateUser,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/issuedBooks',
      name: 'IssuedBooks',
      component: IssuedBooks,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/approval',
      name: 'AdminApproval',
      component: AdminApproval,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/booksrequests',
      name: 'UserRequest',
      component: UserRequest,
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.getters.isAuthenticated;
  let isAdmin = store.getters.getUser?.role?.roleName == 'admin' ? true : false;

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next({name: "LoginPage"})
      
    } else if (to.meta.requiresAdmin && !isAdmin) {
      next({name: from.name})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
