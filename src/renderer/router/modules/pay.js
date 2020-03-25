/** When your routing pay is too long, you can split it into small modules **/

import Layout from '@/layout'

const payRouter = {
  path: '/pay',
  component: Layout,
  redirect: '/pay/pay-index',
  name: 'Pay',
  meta: {
    title: '支付',
    icon: 'pay'
  },
  children: [
    {
      path: 'pay/self',
      component: () => import('@/views/pay/config/self'),
      name: 'PaySelf',
      meta: {
        title: '支付配置',
        permits: ['ui_pay_self']
      }
    },
    {
      path: 'pay/config',
      component: () => import('@/views/pay/config'),
      name: 'PayConfig',
      meta: {
        title: '配置列表',
        permits: ['ui_pay_config']
      }
    },
    {
      path: 'pay/order',
      component: () => import('@/views/pay/order'),
      name: 'PayOrder',
      meta: {
        title: '订单列表',
        permits: ['ui_pay_order']
      }
    },
    {
      path: 'pay/dashboard',
      component: () => import('@/views/pay/order/dashboard'),
      name: 'PayDashboard',
      meta: {
        title: '收款统计',
        permits: ['ui_pay_dashboard']
      }
    }

  ]
}
export default payRouter
