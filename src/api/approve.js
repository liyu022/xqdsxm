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


  
//==================后备干部推荐票接口===================
/**
 *  后备干部推荐查询
 * @param _params
 * @returns {AxiosPromise}
 */
export const selectHbcadreResultList = _params => {
  return axios.get(`hbcadreresult/list`, {
      params: _params,
      baseURL: config.baseUrlSBGL
  })
}
/**
*  查询用户是否考核过了
* @param _params
* @returns {AxiosPromise}
*/
export const hbcadResultByUserId = _params => {
  return axios.get(`hbcadreresult/selectByUserId`, {
      params: _params,
      baseURL: config.baseUrlSBGL
  })
}

/**
*  查询为推荐人
* @param _params
* @returns {AxiosPromise}
*/
export const selectNoHbcadre = _params => {
    return axios.get(`hbcadreresult/selectNoHbcadre`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }
  
/**
*  批量添加考核投票
* @param _params
* @returns {AxiosPromise}
*/
export const hbcadResultAdds = _params => {
  return axios.post(`hbcadreresult/adds`, _params,{
    baseURL: config.baseUrlSBGL
})
}

// 干部考核结果

export const cadreresultCadrelist = _params => {
    return axios.get(`cadreresult/cadrelist`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }

  // 干部考核结果详情

export const cadrelistbyuserid = _params => {
    return axios.get(`cadreresult/cadrelistbyuserid`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }

//   雷达图

export const cadreresultcount = _params => {
    return axios.get(`cadreresult/cadreresultcount`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }

// 折线图

export const cadreresultcountbyrole = _params => {
    return axios.get(`cadreresult/cadreresultcountbyrole`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }


  //导入数据

  export const importhbcadreExcel = _params => {
    return axios.post(`excel/importhbcadreExcel`, _params,{
      baseURL: config.baseUrlSBGL
  })
  }
  
  
  export const importUserExcel = _params => {
    return axios.post(`excel/importUserExcel`, _params,{
      baseURL: config.baseUrlSBGL
  })
  }
  //修改密码

  export const changepassword = _params => {
    return axios.get(`user/changepassword`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }
 
  //权重

  
  export const getProportionByPlanid = _params => {
    return axios.get(`cadreplan/getProportionByPlanid`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }
  
  

  export const sysroleproportion = _params => {
    return axios.post(`sysroleproportion/inserts`, _params,{
      baseURL: config.baseUrlSBGL
  })
  }


 
  
  export const selectStateByPlanid = _params => {
    return axios.get(`cadreplan/selectStateByPlanid`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }
  
  export const selectPlanAndProportion = _params => {
    return axios.get(`cadreplan/selectPlanAndProportion`, {
        params: _params,
        baseURL: config.baseUrlSBGL
    })
  }