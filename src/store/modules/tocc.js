// import Vue from 'vue'
// import * as api from '../../api/vehicle/vehicles'
 import axios from 'axios'
import {
 
  GET_VEHICLES,
  UPDATE_VEHICLEDIALOG,
  GET_STATISTICS,
  GET_PLACE,
  GET_VEHICLEGPSDETAIL,
  GET_WISHTREESTATUS,
  GET_WISHTREELIST,
  GET_WAREHOUSELAVEL,
  GET_WAREHOUSELIST,
  UPDATE_WAREHOUSEDIALOG,
  GET_BRIDGELIST,
  BRIDGE_LOGIN,
  UPDATE_WISHTREEDIALOG,
  GET_BRIDGESTATUS,
  GET_BRIDGEVISIBLE, GET_POLYGONVEHICLE
} from '../mutation-types'
// import {ip} from '../../helper/util'
const state = {
 
  vehicles:[],//获取车辆数目
  polygonVehicles:[],//获取范围内的车辆
  vehicleDlgVisible:false,//车辆弹框是否显示
  wareHouserVisible:false,//仓库弹窗是否显示
  vehicleDetail:{},//车辆详情
  statistics:{},//车辆在线状态
  vehicleGpsDetail:{},//车辆动态信息查询
  place:'',//所在省市县
  wishTreeStatus:{},//智慧路桩状态
  wishTreeList:[],//智慧路桩列表
  wishTreeVisible:false,//智慧路桩弹框
  wareHouseLavel:{},//仓库等级
  wareHouseList:[],//仓库列表
  wareHouseDetail:{},
  bridgeToken:"",//桥梁token
  bridgeList:[],//桥梁列表
  bridgeStatus:{},//桥梁状态
  bridgeVisible:false,//桥梁弹框
}

// getters
const getters = {
  wishTreeStatus:state=>state.wishTreeStatus,
 
  vehicles:state=>state.vehicles,
  polygonVehicles:state=>state.polygonVehicles,
  vehicleDetail:state=>state.vehicleDetail,
  vehicleGpsDetail:state=> state.vehicleGpsDetail,
  vehicleDlgVisible:state=>state.vehicleDlgVisible,
  statistics:state=>state.statistics,
  place:state=>state.place,
  wishTreeList:state=>state.wishTreeList,
  wishTreeVisible:state=>state.wishTreeVisible,
  wareHouseLavel:state=>state.wareHouseLavel,
  wareHouseList:state=>state.wareHouseList,
  wareHouseDetail:state=>state.wareHouseDetail,
  wareHouserVisible:state=>state.wareHouserVisible,
  bridgeToken:state=>state.bridgeToken,
  bridgeList:state=>state.bridgeList,
  bridgeStatus:state=>state.bridgeStatus,
  bridgeVisible:state=>state.bridgeVisible
}

// mutations
const mutations = {
  //获取所有车辆
  [GET_VEHICLES] (state, params) {
   /* api.getVehicles().then(data=>{
      if(data.data.code==0){
        params.callback(data.data.data.features)
        state.vehicles = data.data.data.features
      }
    })*/
  },


  [UPDATE_VEHICLEDIALOG] (state, data) {
    //更新弹框状态，传入车牌号和visible
    //打开弹框
    state.vehicleDlgVisible = data.visible
    if (!data.plateNumber) {
      return
    }
    /*api.getVehicleById({plateNumber:data.plateNumber}).then(data=>{
      if(data.data.code==0){
        state.vehicleDetail = data.data.data
      }
    })*/
  },
  [GET_STATISTICS] (state, params) {
   /* api.getStatics().then(data=>{
      if(data.data.code==0){
        if(params.callback){
          params.callback(data.data.data)
        }
        state.statistics = data.data.data
      }
    })*/
  },
  //获取车辆动态信息服务
  [GET_VEHICLEGPSDETAIL] (state, params) {
    /*api.getVehicleGpsById({plateNumber:params.plateNumber}).then(data=>{
      if (data.data.code == 0) {
        if(params.callback){
          params.callback(data.data.data)
        }
        state.vehicleGpsDetail = data.data.data.properties
      }
    })*/

  },

  //根据经纬度获取当前省市县
  [GET_PLACE] (state, data) {
    /*api.getPlaceBylonlat({lat:data.lat,lon:data.lon}).then(data=>{
      if (data.data.code == 0) {
        let result = data.data.data
        const provname = result.properties.provname
        const cityname = result.properties.cityname
        const name = result.properties.name
        state.place = provname + cityname + name
      }
    })*/

  },

  //获取智慧树桩在线状态
  [GET_WISHTREESTATUS] (state, data) {
    fetch(`http://hdsx.ahdcloud.com/stat/getDeviceInfoGroup`)
      .then(response => response.json())
      .then(data => {
        if (data.code == 200) {
          state.wishTreeStatus.onlineNum = data.data[0].num;
          state.wishTreeStatus.offlineNum = data.data[1].num;
          state.wishTreeStatus.onlineRate = data.data[0].num / (data.data[0].num + data.data[1].num)
        }
      })
  },
  //获取智慧路桩列表
  [GET_WISHTREELIST] (state, params) {
    fetch(`http://hdsx.ahdcloud.com/rtdData/getRtdEsdCoordinateDataByPage?pageNo=1&pageSize=10`)
      .then(response => response.json())
      .then(data => {
        if (data.total > 0) {
          params.callback(data.list)
          state.wishTreeList = data.list
        }
      })
  },
  //更新智慧路桩弹框
  [UPDATE_WISHTREEDIALOG](state,data){
    state.wishTreeVisible=data.visible
  },
  //获取仓库等级
  [GET_WAREHOUSELAVEL] (state, params) {
    /*api.getWareHouseLevel().then(data=>{
      if (data.data.code == 0) {
        let arr = data.data.data
        let sum = arr[0].cnt + arr[1].cnt + arr[2].cnt
        for(let i=0;i<arr.length;i++){
          if(sum!=0){
            arr[i].lavel=(arr[i].cnt/sum)
          }else{
            arr[i].lavel=0.33
          }

        }
        state.wareHouseLavel=arr
      }
    })*/
  },

  //获取仓库列表
  [GET_WAREHOUSELIST] (state, params) {
    /*api.getWareHouseList().then(data=>{
      if(data.data.code==0){
        params.callback(data.data)
        state.wareHouseList = data.data.data
      }

    })*/
  },
  //更新仓库弹框
  [UPDATE_WAREHOUSEDIALOG](state,params){
    if(params.id){
      /*api.getWareHouseDetail({id:params.id}).then(data=>{
        if(data.data.code==0){
          state.wareHouseDetail=data.data.data.properties
        }
      })*/
    }
    if(params.visible!=undefined){
      state.wareHouserVisible=params.visible
    }
  },

  //桥梁接口登录
  [BRIDGE_LOGIN](state,params){
    //登录桥梁接口
    fetch(`http://211.101.37.245:9007/auth`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1MjY0NTMwNzQyMDMsImV4cCI6MTUyNzA1Nzg3NH0.iahrcI43mGFq1AMvDIlYRRWCHUq_as5c1jzSa-nxH3qOdnO22OgPnh_WlVcmILjUAUn3ZFC8ASdFwLb5EdpSHg"},
      body:JSON.stringify({
        "password": "123456",
        "username": "admin"
      })
    })
      .then(res=>res.json())
      .then(data=>{
        localStorage.setItem('bridgeToken',data.token)
      }).catch(err=>{
      console.log(err)
    })
  },
  //获取桥梁列表
  [GET_BRIDGELIST](state,params){
    //获取桥梁列表
    fetch(`http://211.101.37.245:9007/info/getList`,{
      method:'get',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':localStorage.getItem('bridgeToken')
      },
    })
      .then(res=>res.json())
      .then(data=>{
        params.callback(data)
        if(data){
          //获取列表
          state.bridgeList=data
        }
      }).catch(err=>{
      console.log(err)
    })
  },
  //获取桥梁状态
  [GET_BRIDGESTATUS](state,params){
    fetch(`http://211.101.37.245:9007/xxkb/getSbzt`,{
      method:'get',
      headers:{
        'Content-Type': 'application/json',
        'Authorization':localStorage.getItem('bridgeToken')
      },
    })
      .then(res=>res.json())
      .then(data=>{
        if(data){
          //获取列表
          let count=data.zcCount+data.ycCount
          state.bridgeStatus.ZCRate=(data.zcCount/count*100).toFixed(0)
          state.bridgeStatus.YCRate=(data.ycCount/count*100).toFixed(0)
        }
      }).catch(err=>{
      console.log(err)
    })
  },
  //更新桥梁弹框状态
  [GET_BRIDGEVISIBLE](state,params){
    state.bridgeVisible=params.visible
  }
}


// actions
const actions = {
 

  //获取车辆数据列表
  getVehicles({commit},params){
    if(params.wkt){
      commit(GET_POLYGONVEHICLE,params)
    }else{
      commit(GET_VEHICLES,params)
    }

  },


  updateVehicleDlg({commit},params){
    commit(UPDATE_VEHICLEDIALOG,params)
  },
  getStatistics({commit},params){
    commit(GET_STATISTICS,params)
  },
  getVehicleGpsDetail({commit},params){
    commit(GET_VEHICLEGPSDETAIL,params)
  },
  getPlaceBylonlat({commit},params){
    commit(GET_PLACE,params)
  },
  getWishTreeStatus({commit},params){
    commit(GET_WISHTREESTATUS,params)
  },
  getWishTreeList({commit},params){
    commit(GET_WISHTREELIST,params)
  },
  updateWishTree({commit},params){
    commit(UPDATE_WISHTREEDIALOG,params)
  },
  getWareHouseLavel({commit},params){
    commit(GET_WAREHOUSELAVEL,params)
  },
  getWareHouseList({commit},params){
    commit(GET_WAREHOUSELIST,params)
  },
  updateWareHouse({commit},params){
    commit(UPDATE_WAREHOUSEDIALOG,params)
  },
  bridgeLogin({commit},params){
    commit(BRIDGE_LOGIN,params)
  },
  getBridgeList({commit},params){
    commit(GET_BRIDGELIST,params)
  },
  getBridgeStatus({commit},params){
    commit(GET_BRIDGESTATUS,params)
  },
  updateBridge({commit},params){
    commit(GET_BRIDGEVISIBLE,params)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
