import axios from './axios'
const ip='http://192.168.0.188:8888'

//获取车辆列表
export const getVehicles = _params => {
  return axios.get(`VEHICLE-BASE-WEB/gps/list`,{
    params: _params,
    // baseURL: config.businessUrlcs
    baseURL:'http://192.168.0.188:8888/'
  })
}

/**
 * 获取物资列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const getSupplies = _params => {
  return axios.get(`ckywxcl/selectCkywXclglAll`,{
    params: _params,
    baseURL:config.baseEmgresUrl
  })
}

//根据车牌号获取详情
export const getByPlateNumber=(params)=>{
  return axios.get(`http://192.168.0.188:8821/vehicle/getByPlateNumber`,params)
}



