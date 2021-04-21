import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404')
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403')
    },
    {
      path: '/',
      component: TabsView,
      redirect: '/dashboard/workplace',
      children: [
        {
          path: 'dashboard',
          name: '首页',
          meta: {
            icon: 'dashboard'
          },
          component: BlankView,
          children: [
            {
              path: 'workplace',
              name: '工作台',
              meta: {
                page: {
                  closable: false
                }
              },
              component: () => import('@/pages/dashboard/workplace')
            }
          ]
        },
        {
          path: 'systeam',
          name: '系统配置',
          meta: {
            icon: 'setting'
          },
          component: PageView,
          children: [
            {
              path: 'menu',
              name: '菜单管理',
              component: () => import('@/pages/systeam/menu')
            },
            {
              path: 'role',
              name: '角色管理',
              component: () => import('@/pages/systeam/role')
            },
            {
              path: 'account',
              name: '账号管理',
              component: () => import('@/pages/systeam/account')
            }
          ]
        },
        {
          path: 'room',
          name: '宿舍管理',
          meta: {
            icon: 'control'
          },
          component: PageView,
          children: [
            {
              path: 'config',
              name: '电器配置',
              component: () => import('@/pages/room/config')
            }
          ]
        }
      ]
    }
  ]
}

export default options
