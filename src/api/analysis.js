import axios from './axios'
//===================隐患排查接口===================
/**
 *  隐患排查查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectAnalyseList = _params => {
    return axios.get(`analysedanger/list`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  隐患排查添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addAnalyseIndex = _params => {
    return axios.post(`analysedanger/add`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  隐患排查修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateAnalyseIndex = _params => {
    return axios.post(`analysedanger/update`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  隐患排查删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteAnalyseIndex = _params => {
    return axios.get(`analysedanger/deleteall`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  隐患排查导入
 * @param _params
 * @returns {AxiosPromise}
 */
export const ImportAnalyseExcel = _params => {
    return axios.post(`excel/importDangerExcel`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  隐患排查导入
 * @param _params
 * @returns {AxiosPromise}
 */

export const exportExcel = _params => {
    return axios.get(`excel/exportExcel`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}

