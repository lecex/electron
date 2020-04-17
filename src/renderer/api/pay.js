import request from '@/utils/request'
request.defaults.error = false // 关闭错误提示
export function AopF2F(data) {
  return request({
    url: '/pay-api/pays/aopF2F',
    method: 'post',
    data: {
      order: data
    }
  })
}
