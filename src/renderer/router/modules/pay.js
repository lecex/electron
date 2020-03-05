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
  ]
}
export default payRouter
