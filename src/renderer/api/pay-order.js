import request from '@/utils/request'

export function SelfAmount(data) {
  return request({
    url: '/pay-api/orders/selfAmount',
    method: 'post',
    data: {
      'list_query': data
    }
  })
}
export function SelfList(data) {
  return request({
    url: '/pay-api/orders/selfAmount',
    method: 'post',
    data: {
      'list_query': data
    }
  })
}

export function List(data) {
  return request({
    url: '/pay-api/orders/selfAmount',
    method: 'post',
    data: {
      'list_query': data
    }
  })
}

export function Get(data) {
  return request({
    url: '/pay-api/orders/selfAmount',
    method: 'post',
    data: {
      'config': data
    }
  })
}

export function Create(data) {
  return request({
    url: '/pay-api/orders/selfAmount',
    method: 'post',
    data: {
      'config': data
    }
  })
}
export function Update(data) {
  return request({
    url: '/pay-api/orders/selfAmount',
    method: 'post',
    data: {
      'config': data
    }
  })
}
export function Delete(data) {
  return request({
    url: '/pay-api/orders/selfAmount',
    method: 'post',
    data: {
      'config': data
    }
  })
}
