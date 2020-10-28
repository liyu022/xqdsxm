import axios from './axios'
//===================考核制度下达接口===================
/**
 *  考核制度下达查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectNoticeIndexList = _params => {
    return axios.get(`notice/list`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  考核制度下达添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addNoticeIndex = _params => {
    return axios.post(`notice/add`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  考核制度下达修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateNoticeIndex = _params => {
    return axios.post(`notice/update`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  考核制度下达删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteNoticeIndex = _params => {
    return axios.get(`notice/deleteall`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}

