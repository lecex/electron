import request from '@/utils/request'

export function AopF2F(data) {
  return request({
    method: 'post',
    data: {
      service: 'pay-api',
      method: 'Pays.AopF2F',
      request: {
        order: data
      }
    }
  })
}

export function Refund(data) {
  return request({
    method: 'post',
    data: {
      service: 'pay-api',
      method: 'Pays.Refund',
      request: {
        order: data
      }
    }
  })
}
