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
      name: '首页',
      component: TabsView,
      redirect: '/dashboard/analysis',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
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
        // {
        //   path: 'form',
        //   name: '表单页',
        //   meta: {
        //     icon: 'form',
        //     page: {
        //       cacheAble: false
        //     }
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'advance',
        //       name: '高级表单',
        //       component: () => import('@/pages/form/advance')
        //     }
        //   ]
        // },
        // {
        //   path: 'list',
        //   name: '列表页',
        //   meta: {
        //     icon: 'table'
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'query',
        //       name: '查询表格',
        //       meta: {
        //         authority: 'queryForm'
        //       },
        //       component: () => import('@/pages/list/QueryList')
        //     },
        //     {
        //       path: 'primary',
        //       name: '标准列表',
        //       component: () => import('@/pages/list/StandardList')
        //     },
        //     {
        //       path: 'card',
        //       name: '卡片列表',
        //       component: () => import('@/pages/list/CardList')
        //     },
        //     {
        //       path: 'search',
        //       name: '搜索列表',
        //       component: () => import('@/pages/list/search/SearchLayout'),
        //       children: [
        //         {
        //           path: 'article',
        //           name: '文章',
        //           component: () => import('@/pages/list/search/ArticleList')
        //         },
        //         {
        //           path: 'application',
        //           name: '应用',
        //           component: () => import('@/pages/list/search/ApplicationList')
        //         },
        //         {
        //           path: 'project',
        //           name: '项目',
        //           component: () => import('@/pages/list/search/ProjectList')
        //         }
        //       ]
        //     }
        //   ]
        // },
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
