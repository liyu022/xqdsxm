import axios from './axios'
/**
 *  组织机构带人员班组考核结果树查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectOrganizationCheckTree = _params => {
  return axios.get(`organzation/selectOrganizationCheckTree`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  组织机构带人员树查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectOrganizationTreeUser = _params => {
    return axios.get(`organzation/selectOrganizationTreeUser`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  组织机构树查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectOrganizationTree = _params => {
  return axios.get(`organzation/selectOrganizationTree`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
/**
 *  组织机构查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectOrganzationList = _params => {
    return axios.get(`organzation/list`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  组织机构添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addOrganzation = _params => {
    return axios.post(`organzation/add`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  组织机构修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateOrganzation = _params => {
    return axios.post(`organzation/update`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  组织机构删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteOrganzation = _params => {
    return axios.get(`organzation/deleteall`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
//============================组织机构管理接口end=======================
export const selectPageUserByOrgid = _params => {
    return axios.get(`user/selectPageUserByOrgid`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
export const cadreitemInserts = _params => {
    return axios.post(`cadreitem/inserts`, _params,{
      baseURL: config.baseUrlSBGL
  })
  }

/**
 *  系统管理用户管理查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selecUserList = _params => {
    return axios.get(`user/list`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  系统管理用户管理添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addUser = _params => {
    return axios.post(`user/add`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 * 系统管理用户管理修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateUser = _params => {
    return axios.post(`user/update`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  系统管理用户管理删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteUserAll = _params => {
    return axios.get(`user/deleteall`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  系统管理用户管理App授权
 * @param _params
 * @returns {AxiosPromise}
 */
export const appPower = _params => {
  return axios.get(`user/apppower`, {
    params: _params,
    baseURL: config.baseUrlSBGL
  })
}
//============================用户管理接口end=======================
/**
 *  系统管理角色管理查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selecRoleList = _params => {
    return axios.get(`role/list`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  系统管理角色管理添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addRole = _params => {
    return axios.post(`role/add`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 * 系统管理角色管理修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateRole = _params => {
    return axios.post(`role/update`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  系统管理角色管理删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteRoleAll = _params => {
    return axios.get(`role/deleteall`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
//============================角色管理接口end=======================
/**
 *  系统管理角色管理删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectFunctionTree = (params) => {
    return axios.get(`function/selectFunctionTree`, {
        params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  系统管理角色管理删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const permission = (params) => {
    return axios.get(`/role/permission`, {
        params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  系统管理角色管理删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const getRoleByUserId = (userid) => {
    return axios.get(`role/getRoleByUserId`, {
        params:{
            userid
        },
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  系统管理角色管理删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const userRole = (params) => {
    return axios.get(`user/userRole`, {
        params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  系统管理角色管理删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const SelectleaderResult = (params) => {
    return axios.get(`/lresult/SelectleaderResult`,  {
        params,
        baseURL: config.baseUrlSBGL
    })
}


/**
 *  模块管理查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectFunction = (params) => {
    return axios.get(`/function/list`, {
        params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  系统模块添加
 * @param _params
 * @returns {AxiosPromise}
 */
export const addFunction = _params => {
    return axios.post(`function/add`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 * 系统模块修改
 * @param _params
 * @returns {AxiosPromise}
 */
export const updateFunction = _params => {
    return axios.post(`function/update`, _params,{
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  系统模块删除
 * @param _params
 * @returns {AxiosPromise}
 */
export const deleteFunctionAll = _params => {
    return axios.get(`function/deleteall`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
