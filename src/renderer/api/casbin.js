import request from '@/utils/request'

export function GetRoles(data) {
  return request({
    url: '/user-api/casbin/getRoles',
    method: 'post',
    data: data
  })
}

export function UpdateRoles(data) {
  return request({
    url: '/user-api/casbin/updateRoles',
    method: 'post',
    data: data
  })
}

export function GetPermissions(data) {
  return request({
    url: '/user-api/casbin/getPermissions',
    method: 'post',
    data: data
  })
}

export function UpdatePermissions(data) {
  return request({
    url: '/user-api/casbin/updatePermissions',
    method: 'post',
    data: data
  })
}

