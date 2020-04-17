import request from '@/utils/request'

export function SelfUpdate(data) {
  return request({
    url: '/pay-api/configs/selfUpdate',
    method: 'post',
    data: {
      'config': data
    }
  })
}

export function Info() {
  return request({
    url: '/pay-api/configs/info',
    method: 'post',
    data: {
    }
  })
}

export function List(data) {
  return request({
    url: '/pay-api/configs/list',
    method: 'post',
    data: {
      'list_query': data
    }
  })
}

export function Get(data) {
  return request({
    url: '/pay-api/configs/get',
    method: 'post',
    data: {
      'config': data
    }
  })
}

export function Create(data) {
  return request({
    url: '/pay-api/configs/create',
    method: 'post',
    data: {
      'config': data
    }
  })
}
export function Update(data) {
  return request({
    url: '/pay-api/configs/update',
    method: 'post',
    data: {
      'config': data
    }
  })
}
export function Delete(data) {
  return request({
    url: '/pay-api/configs/delete',
    method: 'post',
    data: {
      'config': data
    }
  })
}
