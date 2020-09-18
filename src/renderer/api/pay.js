import request from '@/utils/request'
export function AopF2F(data) {
  request.defaults.error = false // 关闭错误提示
  return request({
    url: '/pay-api/pays/aopF2F',
    method: 'post',
    data: {
      order: data
    }
  })
}
export function Query(data) {
  request.defaults.error = false // 关闭错误提示
  return request({
    url: '/pay-api/pays/query',
    method: 'post',
    data: {
      order: data
    }
  })
}

export function Cancel(data) {
  request.defaults.error = false // 关闭错误提示
  return request({
    url: '/pay-api/pays/cancel',
    method: 'post',
    data: {
      order: data
    }
  })
}

export function Refund(data) {
  request.defaults.error = false // 关闭错误提示
  return request({
    url: '/pay-api/pays/refund',
    method: 'post',
    data: {
      order: data
    }
  })
}

export function OpenRefund(data) {
  request.defaults.error = false // 关闭错误提示
  return request({
    url: '/pay-api/pays/openRefund',
    method: 'post',
    data: {
      order: data
    }
  })
}

export function AffirmRefund(data) {
  request.defaults.error = false // 关闭错误提示
  return request({
    url: '/pay-api/pays/affirmRefund',
    method: 'post',
    data: {
      order: data
    }
  })
}
