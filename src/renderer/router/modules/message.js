/** When your routing message is too long, you can split it into small modules **/

import Layout from '@/layout'

const messageRouter = {
  path: '/message',
  component: Layout,
  redirect: '/message/message-list',
  name: 'Message',
  meta: {
    title: '消息',
    icon: 'message'
  },
  children: [
    {
      path: 'message/template',
      component: () => import('@/views/message/template'),
      name: 'MessageTemplate',
      meta: {
        title: '消息模板',
        permits: ['ui_message_template']
      }
    },
    {
      path: 'message/config',
      component: () => import('@/views/message/config'),
      name: 'MessageConfig',
      meta: {
        title: '消息配置',
        permits: ['ui_message_config']
      }
    }
  ]
}
export default messageRouter
