import request from '@/utils/request'

export function VerifySend(data) {
  return request({
    url: '/message-api/message/sendCaptcha',
    method: 'post',
    data: data
  })
}

export function ConfigGet() {
  return request({
    url: '/message-api/configs/get',
    method: 'post',
    data: {
    }
  })
}

export function ConfigUpdate(data) {
  return request({
    url: '/message-api/configs/update',
    method: 'post',
    data: {
      'config': data
    }
  })
}

export function TemplateList(data) {
  return request({
    url: '/message-api/templates/list',
    method: 'post',
    data: {
      'list_query': data
    }
  })
}
export function TemplateDelete(data) {
  return request({
    url: '/message-api/templates/delete',
    method: 'post',
    data: {
      'template': data
    }
  })
}

export function TemplateGet(data) {
  return request({
    url: '/template-api/templates/get',
    method: 'post',
    data: {
      'template': data
    }
  })
}
export function TemplateCreate(data) {
  return request({
    url: '/template-api/templates/create',
    method: 'post',
    data: {
      'template': data
    }
  })
}
export function TemplateUpdate(data) {
  return request({
    url: '/template-api/templates/update',
    method: 'post',
    data: {
      'template': data
    }
  })
}
