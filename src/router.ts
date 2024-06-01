import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from './components/pages/login/Login.page.vue';

import Home from './components/pages/home/Home.page.vue';
import CorrespondenceReceived from './components/pages/correspondence-received/CorrespondenceReceived.page.vue';
import CorrespondenceSent from './components/pages/correspondence-sent/CorrespondenceSent.page.vue';
import Dashboard from './components/pages/dashboard/Dashboard.page.vue';
import Filing from './components/pages/filing/Filing.page.vue';
import FilingPublicLogin from './components/pages/filing-public-login/FilingPublicLogin.page.vue';
import FilingPublic from './components/pages/filing-public/FilingPublic.page.vue';
import Dependence from './components/pages/dependences/Dependences.page.vue';
import User from './components/pages/user/User.page.vue';
import Role from './components/pages/role/Role.page.vue';
import Series from './components/pages/series/Series.page.vue';
import Subseries from './components/pages/subseries/Subseries.page.vue';
import TypeDocumental from './components/pages/type-documental/TypeDocumental.page.vue';
import MatrixRelation from './components/pages/matrix-relation/MatrixRelation.page.vue';
import Trd from './components/pages/trd/Trd.page.vue';
import Profile from './components/pages/profile/Profile.page.vue';
import VerifyEmail from './components/pages/verify-email/VerifyEmail.page.vue';
import ResetPassword from './components/pages/reset-password/ResetPassword.page.vue';
import SendMail from './components/pages/send-mail/SendMail.page.vue';
import Files from './components/pages/files/Files.page.vue';
import CentralFiles from './components/pages/central-files/CentralFiles.page.vue';
import HistoricalFiles from './components/pages/historical-files/HistoricalFiles.page.vue';
import UploadFiles from './components/pages/upload-files/UploadFiles.page.vue';


import authGuard from './guards/authGuard.guard';
import { isAuth } from './guards/isAuth.guard';



//Definition routes
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: isAuth
  },
  {
    path: '/new-password',
    children: [
      {
        path: 'verify-email',
        component: VerifyEmail,
      },
      {
        path: 'reset',
        component: ResetPassword
      }
    ]
  },
  {
    path: '/recovery-password',
    children: [
      {
        path: 'verify-email',
        component: SendMail,
      },
      {
        path: 'reset',
        component: ResetPassword
      }
    ]
  },
  {
    path: '/filing',
    component: FilingPublicLogin
  },
  {
    path: '/filing-correspondence',
    component: FilingPublic
  },
  {
    path: '/home',
    component: Home,
    meta: { requiresAuth: true },
    beforeEnter: authGuard,
    children: [
      {
        path: 'correspondence/received',
        component: CorrespondenceReceived
      },
      {
        path: 'correspondence/sent',
        component: CorrespondenceSent
      },
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'filing/:id',
        component: Filing
      },
      {
        path: 'dependences',
        component: Dependence
      },
      {
        path: 'user',
        component: User
      },

      {
        path: 'role',
        component: Role
      },
      {
        path: 'series',
        component: Series
      },
      {
        path: 'subseries',
        component: Subseries
      },
      {
        path: 'type-documental',
        component: TypeDocumental
      },
      {
        path: 'matrix-relation',
        component: MatrixRelation
      },
      {
        path: 'trd',
        component: Trd
      },
      {
        path: 'files',
        component: Files
      },
      {
        path: 'files/central_files',
        component: CentralFiles
      },
      {
        path: 'files/historical_files',
        component: HistoricalFiles
      },
      {
        path: 'files/upload_files',
        component: UploadFiles
      },
      {
        path: 'profile',
        component: Profile
      },

      {
        path: '/home',
        redirect: '/home/dashboard'
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/home/dashboard'
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;