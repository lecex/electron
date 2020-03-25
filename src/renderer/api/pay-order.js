import request from '@/utils/request'

export function SelfAmount(data) {
  return request({
    method: 'post',
    data: {
      'service': 'pay-api',
      'method': 'Orders.SelfAmount',
      'request': {
        'list_query': data
      }
    }
  })
}
export function SelfList(data) {
  return request({
    method: 'post',
    data: {
      'service': 'pay-api',
      'method': 'Orders.SelfList',
      'request': {
        'list_query': data
      }
    }
  })
}

export function List(data) {
  return request({
    method: 'post',
    data: {
      'service': 'pay-api',
      'method': 'Orders.List',
      'request': {
        'list_query': data
      }
    }
  })
}

export function Get(data) {
  return request({
    method: 'post',
    data: {
      'service': 'pay-api',
      'method': 'Orders.Get',
      'request': {
        'config': data
      }
    }
  })
}

export function Create(data) {
  return request({
    method: 'post',
    data: {
      'service': 'pay-api',
      'method': 'Orders.Create',
      'request': {
        'config': data
      }
    }
  })
}
export function Update(data) {
  return request({
    method: 'post',
    data: {
      'service': 'pay-api',
      'method': 'Orders.Update',
      'request': {
        'config': data
      }
    }
  })
}
export function Delete(data) {
  return request({
    method: 'post',
    data: {
      'service': 'pay-api',
      'method': 'Orders.Delete',
      'request': {
        'config': data
      }
    }
  })
}
