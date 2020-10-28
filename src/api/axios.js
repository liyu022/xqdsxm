import axios from 'axios'

let base = 'http://192.168.0.188:8821'
// let base = 'http://localhost:8082'
// let base = 'http://localhost:8801'
const defaults = {
  baseURL: base + '',
  headers: {
    'Authorization': '',
    'token': '',
    'X-Requested-With': '',
    'Content-Type': 'application/json',
    post: {
      'Content-Type': 'application/json'
    },
    get: {
      'Content-Type': 'application/json'
    }
  }
}
Object.assign(axios.defaults, defaults)
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token=JSON.parse(localStorage.getItem('token'))
      config.headers.Authorization=JSON.parse(localStorage.getItem('userid'))
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器

axios.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 2: case 5:
        console.log(response.data.code)
        // 返回 401 清除token信息并跳转到登录页面
        // sessionStorage.clear()
        // window.location.href = '/'
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401: case 403:
          // 返回 401 清除token信息并跳转到登录页面
          // sessionStorage.clear()
          // window.location.href = '/'
      }
    }
    return Promise.reject(error.response) // 返回接口返回的错误信息
  })
  export default axios
