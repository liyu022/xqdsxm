/**
 * Created by FDD on 2017/9/14.
 * @desc 地图及地图工具store
 */

import {
  SET_MAP_LOAD_STATE,
  SET_TOOL_PANEL,
  SHOW_TOOL_BAR,
  SHOW_TRAFFIC,
  SET_TOP_TOOL,
  SET_AUTH_STATE,
  SET_AUTH_HEADER, SET_PANO, SET_PANO_POS,
  INIT_MAP,
  ADD_VEHICLELAYER,
  ADD_WISHTREELAYER,
  ADD_WAREHOUSELAYER,
  ADD_BRIDGELAYER
} from '../mutation-types'
import {getLayerByName,mapConfig} from '../../helper/util'

//import {uuid} from 'helper'

// initial state
const state = {
  loadMapSuccess: false,
  map:null,
  toolPanel: {
    type: '',
    params: ''
  },
  activeTool: {
    type: '',
    active: false
  },
  showToolBar: false,
  showTraffic: true,
  num:0,//车辆请求的次数
  // actionAuth: {
  //   id: uuid(),
  //   state: false
  // },
  authHeader: null,
  pano: {
    visible: false
  }
}



// actions 行为，set赋值
const actions = {
  //初始化地图
  initMap({commit,state},param){
    commit(INIT_MAP,param)
  },
  addLayer({commit,state},param){
    if(param.name=='vehicle'||param.name=='vehicle1'){
      commit(ADD_VEHICLELAYER,param)
    }else if(param.name=='wishTree'){
      commit(ADD_WISHTREELAYER,param)
    }else if(param.name=='warehouse'){
      commit(ADD_WAREHOUSELAYER,param)
    }else if(param.name=='bridge'){
      commit(ADD_BRIDGELAYER,param)
    }

  },
  actionMapState ({commit, state}, param) {
    commit(SET_MAP_LOAD_STATE, param)
  },
  actionToolPanel ({commit, state}, param) {
    commit(SET_TOOL_PANEL, param)
  },
  showToolBar ({commit, state}, param) {
    commit(SHOW_TOOL_BAR, {
      id: Math.random(),
      value: param
    })
  },
  showTraffic ({commit, state}, param) {
    commit(SHOW_TRAFFIC, param)
  }
}

// mutations动作，对应methods
const mutations = {
  [INIT_MAP](state,data){
    state.map=new HMap('map',mapConfig)
  }
  ,
  //加载车辆图层
  [ADD_VEHICLELAYER](state,params){
    let features1=[]
    //遍历获取要素
    let features=params.vehicles
    for(let i=0;i<features.length;i++){
      let coord=[]
      if(features[i].geometry){
        coord=features[i].geometry.coordinates
      }else{
        continue
      }

      //根据次数对位置进行移动，经度加0.1，纬度加0.1
      coord[0]+=Math.random()*0.1;
      coord[1]+=Math.random()*0.1;
      let feature=new ol.Feature({
        geometry:new ol.geom.Point(coord),
        id:features[i].properties.plateNumber,
        //plateNumber:features[i].properties.plateNumber,
        properties:features[i].properties,
        //geometry:features[i].geometry 这种方法会报错
      })
      feature.setStyle(params.createStyle(feature))
      features1.push(feature)
    }
    state.num+=1
    let source= new ol.source.Vector({
      features:features1,
      format: new ol.format.GeoJSON()
    })
    //判断是否有这个图层
    let vehicleLayer=getLayerByName(state.map,params.name)
    if(vehicleLayer){
      vehicleLayer.setSource(source)
    }else{
      let layer=new ol.layer.Vector({
        source:source,
        name:params.name
      })
      state.map.addLayer(layer)
    }
  },

  //加载智慧路桩
  [ADD_WISHTREELAYER](state,params){
    let features1=[]
    //遍历获取要素
    let features=params.wishTreeList
    for(let i=0;i<features.length;i++){
      let coord=[]
      coord[0]=features[i].dev_lon
      coord[1]=features[i].dev_lat
      let feature=new ol.Feature({
        geometry:new ol.geom.Point(coord),
        dev_name:features[i].dev_name,
        id:features[i].id,
        //geometry:features[i].geometry 这种方法会报错
      })
      features1.push(feature)
    }
    let layer=new ol.layer.Vector({
      source:new ol.source.Vector({
        features:features1,
        //url: params.url,
        format: new ol.format.GeoJSON()
      }),
      style:params.style,
      name:params.name
    })
    state.map.addLayer(layer)
  },

  //加载应急仓库图层
  [ADD_WAREHOUSELAYER](state,params){
    let features1=[]
    //遍历获取要素
    let features=params.warehouses
    for(let i=0;i<features.length;i++){
      let coord=[]
      //let feature={}
      if(features[i].geometry){
        //feature=new ol.format.GeoJSON().readFeature(features[i])
        coord=features[i].geometry.coordinates
      }else{
        continue
      }


      let feature=new ol.Feature({
        geometry:new ol.geom.Point(coord),
        id:features[i].properties.id,
        ckqc:features[i].properties.ckqc,
        properties:features[i].properties
      })
      feature.setStyle(params.createStyle(feature))
      features1.push(feature)
    }
    let layer=new ol.layer.Vector({
      source:new ol.source.Vector({
        features:features1,
        //url: params.url,
        //format: new ol.format.GeoJSON()
      }),
      //style:params.style,
      name:params.name
    })
    state.map.addLayer(layer)
  },
  //加载桥梁图层
  [ADD_BRIDGELAYER](state,params){
    let features1=[]
    //遍历获取要素
    let features=params.bridges
    for(let i=0;i<features.length;i++){
      let coord=[]
      coord[0]=features[i].briLon
      coord[1]=features[i].briLat
      let feature=new ol.Feature({
        geometry:new ol.geom.Point(coord),
        dev_name:features[i].name,
        //geometry:features[i].geometry 这种方法会报错
      })
      features1.push(feature)
    }
    let layer=new ol.layer.Vector({
      source:new ol.source.Vector({
        features:features1,
        //url: params.url,
        format: new ol.format.GeoJSON()
      }),
      style:params.style,
      name:params.name
    })
    state.map.addLayer(layer)
  },

  [SET_MAP_LOAD_STATE] (state, data) {
    state.loadMapSuccess = data
  },
  [SET_TOOL_PANEL] (state, data) {
    state.toolPanel = data
  },
  [SHOW_TOOL_BAR] (state, data) {
    state.showToolBar = data
  },
  [SHOW_TRAFFIC] (state, data) {
    state.showTraffic = data
  },
  [SET_TOP_TOOL] (state, data) {
    state.activeTool = data
  },
  [SET_AUTH_STATE] (state, data) {
    state.actionAuth = {
      id: uuid(),
      state: data
    }
  },
  [SET_AUTH_HEADER] (state, data) {
    state.authHeader = data
  },
  [SET_PANO] (state) {
    state.pano.visible = !state.pano.visible
  },
  [SET_PANO_POS] (state, data) {
    state.pano.pos_top = data.top
    state.pano.pos_left = data.left
  }
}



//getters 取值操作--对应计算属性
const getters = {
  map:state=>state.map,
  loadMapSuccess: state => state.loadMapSuccess,
  toolPanel: state => state.toolPanel,
  showToolBar: state => state.showToolBar,
  showTraffic: state => state.showTraffic,
  activeTool: state => state.activeTool,
  actionAuth: state => state.actionAuth,
  authHeader: state => state.authHeader,
  pano: state => state.pano
}



export default {
  state,
  getters,
  actions,
  mutations
}

