/** When your routing socialite is too long, you can split it into small modules **/

import Layout from '@/layout'

const socialiteRouter = {
  path: '/socialite',
  component: Layout,
  redirect: '/socialite/socialite-list',
  name: 'Socialite',
  meta: {
    title: '社会登录',
    icon: 'socialite'
  },
  children: [
    {
      path: 'socialite/config',
      component: () => import('@/views/socialite/config'),
      name: 'SocialiteConfig',
      meta: {
        title: '登录配置',
        permits: ['ui_socialite_config']
      }
    },
    {
      path: 'socialite/user',
      component: () => import('@/views/socialite/config'),
      name: 'SocialiteUser',
      meta: {
        title: '用户列表',
        permits: ['ui_socialite_user']
      }
    }
  ]
}
export default socialiteRouter
