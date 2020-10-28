import axios from './axios'
//===================考核制度审批接口===================
/**
 *  考核制度审批查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectApproveIndexList = _params => {
    return axios.get(`approve/list`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  考核制度审批添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addApproveIndex = _params => {
    return axios.post(`approve/add`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  考核制度审批修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateApproveIndex = _params => {
    return axios.post(`approve/update`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  考核制度审批删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteApproveIndex = _params => {
    return axios.get(`approve/deleteall`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}

