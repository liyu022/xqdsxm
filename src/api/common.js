import axios from 'axios'

export const signIn = _params => {
    return axios.get(`auth/login`,{
      params: _params,
      baseURL: config.baseUrlSBGL
    })
  }
  export const signOut = _params => {
    return axios.get(`auth/loginOut`,{
      params: _params,
      baseURL: config.baseUrlSBGL
    })
  }
export const importExcel = _params => {
  let url = 'http://127.0.0.1:8888/XQDS-WEB/excel/importExcel'
  let config = {
    headers: {
      "token": JSON.parse(localStorage.getItem('token')),
      'Authorization': JSON.parse(localStorage.getItem('userid'))
    }
  }
  return axios.post(url, _params, config)
}
export const importLeanExcel = _params => {
  let url = 'http://127.0.0.1:8888/XQDS-WEB/excel/importLeanExcel'
  let config = {
    headers: {
      "token": JSON.parse(localStorage.getItem('token')),
      'Authorization': JSON.parse(localStorage.getItem('userid'))
    }
  }
  return axios.post(url, _params, config)
}
 
