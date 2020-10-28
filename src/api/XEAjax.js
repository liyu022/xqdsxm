import XEAjax from 'xe-ajax'

XEAjax.setup({
  // 除非 url 是绝对路径（'/api/list' 或 '//test.com/api/list' 或 'https://test.com/api/list'），
  // 否则 baseURL 会拼接在 url 之前
  baseURL: 'http://124.70.144.177:8888/XQDS-WEB/',
  bodyType: 'json-data',
  headers: {
    'Accept': 'application/json, text/plain, \*/\*;',
    'Authorization': '',
    'token': '',
    'X-Requested-With': ''
  },
/*  validateStatus (response) {
    // 注：如何需要实现复杂的场景判断，请使用拦截器
    // 如果是 fetch 函数，则会将状态赋值给 ok 属性
    // 除了 fetch 函数，其他函数如果状态返回 false 则会进入 catch
    return response.status >= 200 && response.status < 300
  },*/
 /* transformParams (params, request) {
    // 用于在请求发送之前改变URL参数
    if (request.method === 'GET') {
      params.queryDate = params.queryDate.getTime()
    }
    return params
  },*/
 /* paramsSerializer (params, request) {
    // 自定义URL序列化函数,最终拼接在url
    // 执行顺序 transformParams > paramsSerializer
    return XEAjax.serialize(params)
  },*/
/*  transformBody (body, request) {
    // 用于在请求发送之前改变提交数据
    body.startTime = body.startDate.getTime()
    return body
  },*/
  /*stringifyBody (body, request) {
    // 自定义格式化提交数据函数
    // 执行顺序 transformBody > stringifyBody
    return JSON.stringify(body)
  }*/
})
// 请求之前拦截器
XEAjax.interceptors.request.use((request, next) => {
  // 用于请求的权限拦截、设置请求头、Token 验证、参数等处理...
  // 设置 Token 验证，预防 XSRF/CSRF 攻击
  request.headers.token=JSON.parse(localStorage.getItem('token'))
  request.headers.Authorization=JSON.parse(localStorage.getItem('userid'))
  // 调用 next(),继续执行下一个拦截器
  next()
})
// 请求完成之后拦截
XEAjax.interceptors.response.use((response, next) => {
  // 请求完成之后统一处理，例如校验登录是否失效、消息提示，特殊场景处理等...
  // 例子: 判断登录失效跳转
  if (response.status === 403) {
    router.replace({path: '/login'})
  } else {
    next()
  }
})

// 请求完成之后改变响应结果
XEAjax.interceptors.response.use((response, next) => {
  // 例如，对所有请求结果进行处理，返回统一的数据
  response.json().then(data => {
    let { status, statusText, headers } = response
    let body = {
      message: status === 200 ? 'success' : 'error',
      result: data
    }
    // 改变响应结果并继续执行下一个拦截器
    next({status, statusText, headers, body})
  })
}, (e, next) => {
  // 对所有请求错误返回统一的数据
  let body = {
    message: 'error',
    result: null
  }
  // 改变响应结果并继续执行下一个拦截器
  next({status: 200, body})
})
export default XEAjax
