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

/**
 *  查询干部考核机关战队
 * @param _params
 * @returns {AxiosPromise}
 */
export const cadreitemList = _params => {
    return axios.get(`cadreitem/list`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}
/**
 *  查询干部考核机关战队
 * @param _params
 * @returns {AxiosPromise}
 */
export const cadreplanGetMaxList = _params => {
    return axios.get(`cadreplan/getMaxList`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}

/**
 *  sysroleproportion
 * @param _params
 * @returns {AxiosPromise}
 */
export const sysroleproportionList = _params => {
    return axios.get(`sysroleproportion/list`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
}



/**
 *  update
 * @param _params
 * @returns {AxiosPromise}
 */
export const sysroleproportionUpdate = _params => {
    return axios.post(`sysroleproportion/update`, _params,{
        baseURL: config.baseUrlSBGL
    })
}


/**
 *  cadreresultdetailCadreResult
 * @param _params
 * @returns {AxiosPromise}
 */
export const cadreresultdetailCadreResult = _params => {
    return axios.post(`cadreresultdetail/cadreResult`, _params,{
        baseURL: config.baseUrlSBGL
    })
}

 

//==================科级干部考核项接口===================
/**
 *  科级干部考核项查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectHbcadreitemList = _params => {
    return axios.get(`hbcadreitemst`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }
  /**
  *  科级干部考核项添加
  * @param _params
  * @returns {AxiosPromise}
  */
  export const addHbcadreitem = _params => {
    return axios.post(`hbcadreitem/add`, _params,{
        baseURL: config.baseUrlSBGL
    })
  }
  /**
  *  科级干部考核项修改
  * @param _params
  * @returns {AxiosPromise}
  */
  export const updateHbcadreitem = _params => {
    return axios.post(`hbcadreitem/update`, _params,{
        baseURL: config.baseUrlSBGL
    })
  }
  /**
  *  科级干部考核项删除
  * @param _params
  * @returns {AxiosPromise}
  */
  export const deleteHbcadreitem = _params => {
    return axios.get(`hbcadreitem/deleteall`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }

 

  export const hbcadreitemList = _params => {
    return axios.get(`hbcadreitem/list`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }