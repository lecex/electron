/** When your routing user is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/user-list',
  name: 'User',
  meta: {
    title: '用户',
    icon: 'user'
  },
  children: [
    {
      path: 'user/list',
      component: () => import('@/views/user/list'),
      name: 'UserList',
      meta: {
        title: '用户列表',
        permits: ['ui_user_list']
      }
    },
    {
      path: 'user/role',
      component: () => import('@/views/user/role'),
      name: 'UserRole',
      meta: {
        title: '用户角色',
        permits: ['ui_role_list']
      }
    },
    {
      path: 'user/permission/front',
      component: () => import('@/views/user/permission/front'),
      name: 'FrontPermission',
      meta: {
        title: '前端权限',
        permits: ['ui_front_permit_list']
      }
    },
    {
      path: 'user/permission/micro',
      component: () => import('@/views/user/permission/micro'),
      name: 'MicroPermission',
      meta: {
        title: '微服务权限',
        permits: ['ui_micro_permit_list']
      }
    }
  ]
}
export default userRouter
