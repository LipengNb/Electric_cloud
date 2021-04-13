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
    component: view.page
  },
  role: {
    name: '角色管理',
    component: () => import('@/pages/systeam/role')
  },
  account: {
    name: '账号管理',
    component: () => import('@/pages/systeam/account')
  },
  // 表单管理
  form: {
    name: '表单页',
    icon: 'form',
    component: view.page
  },
  advanceForm: {
    path: 'advance',
    name: '高级表单',
    component: () => import('@/pages/form/advance')
  },
  // 列表
  list: {
    name: '列表页',
    icon: 'table',
    component: view.page
  },
  queryList: {
    path: 'query',
    name: '查询表格',
    component: () => import('@/pages/list/QueryList')
  },
  primaryList: {
    path: 'primary',
    name: '标准列表',
    component: () => import('@/pages/list/StandardList')
  },
  cardList: {
    path: 'card',
    name: '卡片列表',
    component: () => import('@/pages/list/CardList')
  },
  exception: {
    name: '异常页',
    icon: 'warning',
    component: view.blank
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

