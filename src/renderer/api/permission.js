import request from '@/utils/request'

export function All() {
  return request({
    url: '/user-api/permissions/all',
    method: 'post',
    data: {
    }
  })
}

export function List(data) {
  return request({
    url: '/user-api/permissions/list',
    method: 'post',
    data: {
      'list_query': data
    }
  })
}

export function Get(data) {
  return request({
    url: '/user-api/permissions/get',
    method: 'post',
    data: {
      'permission': data
    }
  })
}

export function Create(data) {
  return request({
    url: '/user-api/permissions/create',
    method: 'post',
    data: {
      'permission': data
    }
  })
}
export function Update(data) {
  return request({
    url: '/user-api/permissions/update',
    method: 'post',
    data: {
      'permission': data
    }
  })
}
export function Delete(data) {
  return request({
    url: '/user-api/permissions/delete',
    method: 'post',
    data: {
      'permission': data
    }
  })
}
