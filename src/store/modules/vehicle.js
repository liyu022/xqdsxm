// import Vue from 'vue'
import {
  GET_VEHICLETREE,
  GET_HISROUTE,
  UPDATE_WAREHOUSEDETAIL
} from '../mutation-types'
import {getIdfromTree} from '../../helper/util'

const ip='http://192.168.0.188:8888/VEHICLE-BASE-WEB'
const state = {
  vehicleTree:[],
  hisRoute:null
}

// getters
const getters = {
  vehicleTree:state=>state.vehicleTree,
  defaultCheckedKey:state=>{
    //遍历树，获取id
    let ids=getIdfromTree(state.vehicleTree,[])
    return ids
  },
  hisRoute:state=>{state.hisRoute}
}

// mutations
const mutations = {
  //获取车辆树
  [GET_VEHICLETREE](state,params){
      fetch(`${ip}/vehicle/listTreeByBm?bmId=201905131332442908402`)
      .then(res=>res.json())
      .then(data=>{
        if(params.callback&&data.data.length>0){
          params.callback(data.data[0].children)
        }
        state.vehicleTree=data.data
      })
  },
  //获取历史轨迹
  [GET_HISROUTE](state,params){
    fetch(`${ip}/gps/listHis?gpsTimeBegin=${params.gpsTimeBegin}&gpsTimeEnd=${params.gpsTimeEnd}&plateNumber=${params.plateNumber}`,{
      method: 'get',
      headers: {
        'token':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZG1pbiIsImlhdCI6MTU1ODUxNTM5Miwic3ViIjoie1widXNlcklkXCI6XCIzZTM0ZjIzYTkzNDE0ZTg2YjMzMjY4NTVjNTNkNjBkNlwiLFwidXNlck5hbWVcIjpcImFkbWluXCJ9IiwiZXhwIjozMTE3MDMwNzg1fQ.BOELC8Xh5yA-NPobLhsl_J67hIH0MHmmnWrsG3Ttn-4'
      }
    }).then(res=>res.json())
      .then(data=>{
        params.callback(data)
      })
  },
  //修改仓库属性
  [UPDATE_WAREHOUSEDETAIL](state,params){
    console.log(params)
    fetch(`http://192.168.0.188:8801/jcsj_ck/updateck`,{method:'post',
      body :JSON.stringify(params.jcsjcbs),
      headers:{
        'Content-Type': 'application/json',
      },
    })
      .then(res=>res.json())
      .then(data=>{
        params.callback(data)
      })
  }
}

// actions
const actions = {
  getVehicleTree ({commit}, payload) {
    commit(GET_VEHICLETREE, payload)
  },
  getHisRoute({commit},payload){
    commit(GET_HISROUTE, payload)
  },
  updateWareHouseDetail({commit},payload){
    commit(UPDATE_WAREHOUSEDETAIL,payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
