// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  root: {
    path: '/',
    redirect: '/login',
    component: view.tabs
  },
  /* 首页 */
  dashboard: {
    name: '首页',
    icon: 'dashboard',
    meta: {
      page: {
        closable: false
      }
    },
    component: () => import('@/pages/dashboard/workplace')
  },
  // 宿舍管理
  room: {
    name: '宿舍管理',
    icon: 'control',
    component: view.page
  },
  config: {
    name: '电器配置',
    component: () => import('@/pages/room/config')
  },
  // 系统配置
  systeam: {
    name: '系统配置',
    icon: 'setting',
    authority: '*',
    component: view.page
  },
  menu: {
    name: '菜单管理',
    authority: '*',
    component: () => import('@/pages/systeam/menu')
  },
  role: {
    name: '角色管理',
    authority: '*',
    component: () => import('@/pages/systeam/role')
  },
  account: {
    name: '账号管理',
    authority: '*',
    component: () => import('@/pages/systeam/account')
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  }
}
export default routerMap

