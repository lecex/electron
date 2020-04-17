import request from '@/utils/request'

export function Exist(data) {
  return request({
    url: '/user-api/users/exist',
    method: 'post',
    data: {
      'user': data
    }
  })
}

export function Info() {
  return request({
    url: '/user-api/users/info',
    method: 'post',
    data: {
    }
  })
}

export function List(data) {
  return request({
    url: '/user-api/users/list',
    method: 'post',
    data: {
      'list_query': data
    }
  })
}

export function Get(data) {
  return request({
    url: '/user-api/users/get',
    method: 'post',
    data: {
      'user': data
    }
  })
}

export function Create(data) {
  return request({
    url: '/user-api/users/create',
    method: 'post',
    data: {
      'user': data
    }
  })
}
export function Update(data) {
  return request({
    url: '/user-api/users/update',
    method: 'post',
    data: {
      'user': data
    }
  })
}
export function Delete(data) {
  return request({
    url: '/user-api/users/delete',
    method: 'post',
    data: {
      'user': data
    }
  })
}
