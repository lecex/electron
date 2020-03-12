import request from '@/utils/request'

export function SelfUpdate(data) {
  return request({
    method: 'post',
    data: {
      'service': 'pay-api',
      'method': 'Configs.SelfUpdate',
      'request': {
        'config': data
      }
    }
  })
}

export function Info() {
  return request({
    method: 'post',
    data: {
      'service': 'pay-api',
      'method': 'Configs.Info',
      'request': {
      }
    }
  })
}

export function List(data) {
  return request({
    method: 'post',
    data: {
      'service': 'pay-api',
      'method': 'Configs.List',
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
      'method': 'Configs.Get',
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
      'method': 'Configs.Create',
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
      'method': 'Configs.Update',
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
      'method': 'Configs.Delete',
      'request': {
        'config': data
      }
    }
  })
}
