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

export function ConfigGet() {
  return request({
    url: '/socialite-api/configs/get',
    method: 'post',
    data: {
    }
  })
}

export function ConfigUpdate(data) {
  return request({
    url: '/socialite-api/configs/update',
    method: 'post',
    data: {
      'config': data
    }
  })
}
