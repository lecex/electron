import request from '@/utils/request'

export function UpdateOrCreate(data) {
  return request({
    url: '/user-api/frontPermits/updateOrCreate',
    method: 'post',
    data: {
      'front_permit': data
    }
  })
}

export function All() {
  return request({
    url: '/user-api/frontPermits/all',
    method: 'post',
    data: {
    }
  })
}

export function List(data) {
  return request({
    url: '/user-api/frontPermits/list',
    method: 'post',
    data: {
      'list_query': data
    }
  })
}

export function Get(data) {
  return request({
    url: '/user-api/frontPermits/get',
    method: 'post',
    data: {
      'front_permit': data
    }
  })
}

export function Create(data) {
  return request({
    url: '/user-api/frontPermits/create',
    method: 'post',
    data: {
      'front_permit': data
    }
  })
}
export function Update(data) {
  return request({
    url: '/user-api/frontPermits/update',
    method: 'post',
    data: {
      'front_permit': data
    }
  })
}
export function Delete(data) {
  return request({
    url: '/user-api/frontPermits/delete',
    method: 'post',
    data: {
      'front_permit': data
    }
  })
}
