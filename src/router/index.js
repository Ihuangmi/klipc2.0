import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken, setToken } from '@/utils/token'
import Layout from '@/views/layout/layout'
import { logout } from "@/api/user";
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login'),
    hidden: true,//在菜单栏隐藏
    props: true,//传参
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register'),
    hidden: true,
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('../views/reset-password'),
    hidden: true,
  },
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    meta: { title: "menu.dashboard", shortTitle: 'menu.dashboardShort', icon: 'home', icon2: 'home2', icon3: 'home3', icon4: 'home4' },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/my-assets/my-assets'),
        meta: { title: "menu.my_assets" },
      },
      {
        path: '/dashboard/link-account',
        component: () => import('@/views/dashboard/link-account/link-account'),
        meta: { title: "menu.link_account" },
      },
      {
        path: '/dashboard/doc-management/Docmanage',
        component: () => import('@/views/dashboard/doc-management/Docmanage'),
        meta: { title: "menu.docmanage" },
      },
      {
        path: '/dashboard/signalmanage/Signalmanage',
        component: () => import('@/views/dashboard/signalmanage/Signalmanage'),
        meta: { title: "menu.signalmanage" },
      },
      {
        path: '/dashboard/housekeeper',
        component: () => import('@/views/dashboard/housekeeper/housekeeper'),
        meta: { title: "menu.housekeeper" },
        popos: true,
      },
    ]
  },
  {
    path: '/signalpool',
    name: 'signalpool',
    component: Layout,
    meta: { title: "menu.signalpool", shortTitle: 'menu.signalpoolShort', icon: 'signalpool', icon2: 'signalpool2', icon3: 'signalpool3', icon4: 'signalpool4' },
    children: [
      {
        path: '/signalpool',
        component: () => import('../views/signalpool/signalpool.vue'),
      }
    ]
  },
  {
    path: '/signalpool/master',
    component: Layout,
    name: 'master1',
    children: [
      {
        path: '/signalpool/master/:masterId',
        component: () => import('../views/signalpool/master.vue'),
        props: true,//传参
      }
    ],
    hidden: true
  },
  {
    path: '/signalpool/share_page/:masterId',
    name: 'share_page',
    component: () => import('../views/signalpool/master2.vue'),
    props: true,//传参
    hidden: true
  },
  {
    path: '/risk',
    name: 'risk',
    component: Layout,
    meta: { title: "menu.risk", shortTitle: 'menu.riskShort', icon: 'risk', icon2: 'risk2', icon3: 'risk3', icon4: 'risk4' },
    children: [
      {
        path: '/risk',
        component: () => import('../views/risk/exposure/exposure.vue'),
        meta: { title: "menu.risk_exposure" },
      },
      {
        path: '/risk/report',
        component: () => import('../views/risk/report/report.vue'),
        meta: { title: "menu.report" },
      },
      {
        path: '/risk/analysis',
        component: () => import('../views/risk/analysis/analysis.vue'),
        meta: { title: "menu.analysis" },
      },
    ]
  },
  {
    path: '/strategySummary',
    name: 'Strategy',
    meta: { title: "menu.strategy", shortTitle: 'menu.strategyShort', icon: 'strategy', icon2: 'strategy2', icon3: 'strategy3', icon4: 'strategy4' },
    component: Layout,
    children: [{
      name: 'Summary',
      path: '/strategySummary',
      component: () => import('../views/strategy/Strategy.vue'),
    }]
  },
  {
    path: '/logout',
    redirect: '/login',
    name: 'logout',
    component: () => import('@/views/login'),
    meta: { title: "menu.logout", shortTitle: 'menu.logoutShort', icon: 'logout', icon2: 'logout2', icon3: 'logout3', icon4: 'logout4' },
  },
]

const router = new VueRouter({
  routes
})

// 全局路由前置卫士
router.beforeEach((to, from, next) => {
  const nextRoutes = ['/register', '/reset-password', '/login', '/signalpool/share_page/:masterId', '/dashboard/housekeeper'];//无需登录访问页面
  const hasToken = getToken("user-token")
  
  // console.log(`to=`, to)
  if (nextRoutes.indexOf(to.path) < 0) {
    if (to.path.indexOf('/signalpool/share_page/') >= 0) {
      next()
    } else {
      if (hasToken) {
        // console.log(`from=`, from)
        next()
      } else {
        var { token } = to.query;
        if (token) {
          setToken("user-token", token);
          next();
        } else {
          next({ path: '/login' })//若无token，跳转登录页
            // next({ name: 'login', query: { redirect: to.fullPath } })
        }
      }
    }
  } else {
    next()
  }
  if (to.redirectedFrom === '/logout') {//退出
    logout().then(() => {
      console.log('logout')
      sessionStorage.clear()
    })
    next()
  }
})


export default router


