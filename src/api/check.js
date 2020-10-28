import axios from './axios'
//===================考核项接口===================
/**
 *  考核项查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectCheckitem = _params => {
    return axios.get(`checkdetail/list`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  考核项添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addCheckitem = _params => {
    return axios.post(`checkdetail/add`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  考核项修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateCheckitem = _params => {
    return axios.post(`checkdetail/update`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  考核项删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteCheckitem = _params => {
    return axios.get(`checkdetail/deleteall`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  通过考核制度ID查询考核项
 * @param _params
 * @returns {AxiosPromise}
 */
export const getListByIndexId = _params => {
  return axios.get(`checkdetail/getListByIndexId`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
//===================考核制度接口===================
/**
 *  考核制度查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectCheckindex = _params => {
  return axios.get(`checkindex/list`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  考核制度添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addCheckindex = _params => {
  return axios.post(`checkindex/add`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  考核制度修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateCheckindex = _params => {
  return axios.post(`checkindex/update`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 考核制度删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteCheckindex = _params => {
  return axios.get(`checkindex/deleteall`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 查询已经分配考核项
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectByAssgined = _params => {
  return axios.get(`checkindex/selectByAssgined`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 查询未分配考核项
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectByNotAssgined = _params => {
  return axios.get(`checkindex/selectByNotAssgined`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 查询全部考核项
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectByAllAssgined = _params => {
  return axios.get(`checkindex/selectByAllAssgined`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 考核制度绑定考核项
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateCheckdetail = _params => {
  return axios.get(`checkindex/updateIndex`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}

//===================区队考核接口===================
/**
 *  区队考核结果查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectResultqd = _params => {
  return axios.get(`checkresultqd/list`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  区队考核结果添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addResultqd = _params => {
  return axios.post(`checkresultqd/add`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  区队考核结果修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateResultqd = _params => {
  return axios.post(`checkresultqd/update`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 区队考核结果删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteResultqd = _params => {
  return axios.get(`checkresultqd/deleteall`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 区队考核修改结果及插入考核详情
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateqdDetail = _params => {
  return axios.post(`checkresultqd/updateqdDetail`, _params,{
    baseURL: config.baseUrlSBGL
  })
}

/**
 * 通过区队考核id查询考核项和考核结果详情
 * @param _params
 * @returns {AxiosPromise}
 */
export const getLisIndexResultqdById = _params => {
  return axios.get(`checkresultqd/getLisIndexResultqdById`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 通过区队考核id及name查询考核项和考核分类统计结果详情
 * @param _params
 * @returns {AxiosPromise}
 */
export const getLisIndexResultqdAnalysisById = _params => {
  return axios.get(`checkresultqd/getLisIndexResultqdAnalysisById`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 查询班组和区队考核结果树
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectCheckTree = _params => {
  return axios.get(`checkresultqd/selectCheckTree`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}

//===================班组考核接口===================
/**
 *  班组考核结果查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectResultbz = _params => {
  return axios.get(`checkresultbz/list`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  班组考核结果添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addResultbz = _params => {
  return axios.post(`checkresultbz/add`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  班组考核结果修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateResultbz = _params => {
  return axios.post(`checkresultbz/update`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 班组考核结果删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteResultbz = _params => {
  return axios.get(`checkresultbz/deleteall`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 班组考核修改结果及插入考核详情
 * @param _params
 * @returns {AxiosPromise}
 */
export const updatebzDetail = _params => {
  return axios.post(`checkresultbz/updatebzDetail`, _params,{
    baseURL: config.baseUrlSBGL
  })
}

/**
 * 通过班组考核id查询考核项和考核结果详情
 * @param _params
 * @returns {AxiosPromise}
 */
export const getLisIndexResultbzById = _params => {
  return axios.get(`checkresultbz/getLisIndexResultbzById`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 通过班组考核id及name查询考核项和考核分类统计结果详情
 * @param _params
 * @returns {AxiosPromise}
 */
export const getLisIndexResultbzAnalysisById = _params => {
  return axios.get(`checkresultbz/getLisIndexResultbzAnalysisById`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}




