import request from '@/utils/request'

export function All() {
  return request({
    url: '/user-api/roles/all',
    method: 'post',
    data: {
    }
  })
}

export function List(data) {
  return request({
    url: '/user-api/roles/list',
    method: 'post',
    data: {
      'list_query': data
    }
  })
}

export function Get(data) {
  return request({
    url: '/user-api/roles/get',
    method: 'post',
    data: {
      'role': data
    }
  })
}

export function Create(data) {
  return request({
    url: '/user-api/roles/create',
    method: 'post',
    data: {
      'role': data
    }
  })
}
export function Update(data) {
  return request({
    url: '/user-api/roles/update',
    method: 'post',
    data: {
      'role': data
    }
  })
}
export function Delete(data) {
  return request({
    url: '/user-api/roles/delete',
    method: 'post',
    data: {
      'role': data
    }
  })
}
