import request from '@/utils/request'

export function Auth(socialite) {
  return request({
    url: '/socialite-api/socialites/auth',
    method: 'post',
    data: {
      socialite: socialite
    }
  })
}

export function All() {
  return request({
    url: '/socialite-api/configs/all',
    method: 'post',
    data: {
    }
  })
}

export function List(data) {
  return request({
    url: '/socialite-api/configs/list',
    method: 'post',
    data: {
      'list_query': data
    }
  })
}

export function Get(data) {
  return request({
    url: '/socialite-api/configs/get',
    method: 'post',
    data: {
      'config': data
    }
  })
}

export function Create(data) {
  return request({
    url: '/socialite-api/configs/create',
    method: 'post',
    data: {
      'config': data
    }
  })
}
export function Update(data) {
  return request({
    url: '/socialite-api/configs/update',
    method: 'post',
    data: {
      'config': data
    }
  })
}
export function Delete(data) {
  return request({
    url: '/socialite-api/configs/delete',
    method: 'post',
    data: {
      'config': data
    }
  })
}
