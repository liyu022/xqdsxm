import axios from './axios'
//===================消息推送+入库数据接口===================
/**
 *  消息推送+入库查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectMessageList = _params => {
  return axios.get(`message/list`, {
    params: _params,
    baseURL: config.AppUrlSBGL
  })
}
/**
 *  消息推送+入库添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addMessage = _params => {
  return axios.post(`message/add`, _params,{
    baseURL: config.AppUrlSBGL
  })
}
/**
 *  消息推送+入库修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateMessage = _params => {
  return axios.post(`message/update`, _params,{
    baseURL: config.AppUrlSBGL
  })
}
/**
 *  消息推送+入库删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteMessage = _params => {
  return axios.get(`message/deleteall`, {
    params: _params,
    baseURL: config.AppUrlSBGL
  })
}

