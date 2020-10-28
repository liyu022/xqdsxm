import axios from './axios'
//==================干部考核项接口===================
/**
 *  干部考核项查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectLeaderItemList = _params => {
    return axios.get(`litem/list`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  干部考核项添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addLeaderItem = _params => {
    return axios.post(`litem/add`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  干部考核项修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateLeaderItem = _params => {
    return axios.post(`litem/update`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  干部考核项删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteLeaderItem = _params => {
    return axios.get(`litem/deleteall`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}

//==================干部考核计划接口===================
/**
 *  干部考核计划查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectLeaderPlanList = _params => {
  return axios.get(`lplan/list`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 干部考核计划添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addLeaderPlan = _params => {
  return axios.post(`lplan/add`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  干部考核计划修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateLeaderPlan = _params => {
  return axios.post(`lplan/update`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  干部考核计划删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteLeaderPlan = _params => {
  return axios.get(`lplan/deleteall`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  干部考核计划中获取全部的考核项
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectLeaderPlanByAllAssgined = _params => {
  return axios.get(`lplan/selectLeaderPlanByAllAssgined`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  干部考核计划中获取当前计划已经分配的考核项
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectLeaderPlanByAssgined = _params => {
  return axios.get(`lplan/selectLeaderPlanByAssgined`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  干部考核计划关联考核项设置
 * @param _params
 * @returns {AxiosPromise}
 */
export const insertLeaderPlanItem = _params => {
  return axios.get(`lplan/updateIndex`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  干部考核计划树查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectLeaderPlanTree = _params => {
    return axios.get(`lplan/selectLeaderPlanTree`, {
      params: _params,
      baseURL: config.baseUrlSBGL
    })
  }
/**
 *  通过考核计划查询考核项接口
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectLeaderItemByPlanid = _params => {
  return axios.get(`lplan/selectLeaderItemByPlanid`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
//==================考核干部管理接口===================
/**
 *  考核干部管理查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectLeaderCheckList = _params => {
  return axios.get(`lcheck/list`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 考核部管理添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addLeaderCheck = _params => {
  return axios.post(`lcheck/add`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  考核干部管理修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateLeaderCheck = _params => {
  return axios.post(`lcheck/update`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  考核干部管理删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteLeaderCheck = _params => {
  return axios.get(`lcheck/deleteall`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}

export const selectTreeLeaderCheck = _params => {
  return axios.get(`lcheck/selectTreeLeaderCheck`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
//==================后备干部管理接口===================
/**
 *  后备干部管理查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectLeaderUncheckList = _params => {
  return axios.get(`luncheck/list`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 后备干部管理添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addLeaderUncheck = _params => {
  return axios.post(`luncheck/add`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  后备干部管理修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateLeaderUncheck = _params => {
  return axios.post(`luncheck/update`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  后备干部管理删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteLeaderUncheck = _params => {
  return axios.get(`luncheck/deleteall`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}

//==================干部考核结果接口===================
/**
 *  干部考核结果查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectLeaderResultList = _params => {
  return axios.get(`lresult/list`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 * 干部考核结果添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addLeaderResult = _params => {
  return axios.post(`lresult/add`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  干部考核结果修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateLeaderResult = _params => {
  return axios.post(`lresult/update`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  干部考核结果删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteLeaderResult = _params => {
  return axios.get(`lresult/delete`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  保存后备干部考核结果
 * @param _params
 * @returns {AxiosPromise}
 */
export const leaderResult = _params => {
  return axios.post(`lresult/leaderResult`, _params,{
    baseURL: config.baseUrlSBGL
  })
}
