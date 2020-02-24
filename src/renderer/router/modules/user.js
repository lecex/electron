/** When your routing user is too long, you can split it into small modules **/

import Layout from '@/layout'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  name: 'user',
  meta: {
    title: '终端',
    icon: 'user',
    roles: ['user']
  },
  children: [
    {
      path: 'cashier',
      name: 'Cashier',
      component: () => import('@/views/user/cashier/index'),
      meta: {
        title: '收银',
        icon: 'cashier',
        permits: ['ui_user_index'],
        roles: ['user']
      }
    },
    {
      path: 'order',
      name: 'Order',
      component: () => import('@/views/user/order/index'),
      meta: {
        title: '订单',
        icon: 'order',
        permits: ['ui_user_order'],
        roles: ['user']
      }
    },
    {
      path: 'inventory',
      name: 'Inventory',
      component: () => import('@/views/user/inventory/index'),
      meta: {
        title: '盘点',
        icon: 'inventory',
        permits: ['ui_user_inventory'],
        roles: ['user']
      }
    },
    {
      path: 'config',
      name: 'Config',
      component: () => import('@/views/user/config/index'),
      meta: {
        title: '配置',
        icon: 'config',
        permits: ['ui_user_config'],
        roles: ['user']
      }
    }
  ]
}
