import axios from "../api/axios";

export const ip='http://124.70.144.177:8888'

//小数转百分数
const toPercent=function (point) {
  var str=Number(point*100).toFixed(1);
  str+="%";
  return str;
}

//根据名称移除图层
export function removeLayerByName(map,name){
  //遍历地图图层
  let layers = map.getLayers()
  for (let i = 0; i < layers.getLength(); i++) {
    if (layers.item(i).get("name") == name) {
      map.removeLayer(layers.item(i))
    }
  }
}
//根据名称获取图层
export function getLayerByName(map,name){
  let layer
  //遍历地图图层
  let layers = map.getLayers()
  for (let i = 0; i < layers.getLength(); i++) {
    if (layers.item(i).get("name") == name) {
      layer=layers.item(i)
    }
  }
  return layer
}
export function getFormatTime(timeStr){
  return moment(timeStr).format('YYYY.MM.DD HH:mm:ss')
}

//获取树中的id
export function getIdfromTree(tree,temp){
  //遍历树一级节点，将id放入数组中
  tree.forEach(treeNode=>{
    temp.push(treeNode.id)
    if(treeNode.children.length>0){
      getIdfromTree(treeNode.children,temp)
    }
  })
  return temp
}

//移除图层中的某个要素
export function removeFeatFromLayer (layer,id,romovedFeatures) {
  //获取图层的数据源
  let source=layer.getSource()
  //获取全部要素
  let features=source.getFeatures()
  if(features.length>0){
    features.forEach(fea=>{
      if(fea.get("id")==id){
        source.removeFeature(fea)
        romovedFeatures.push(fea)
      }
    })
  }
  return romovedFeatures
}

//添加要素到图层中
export function addFeatureToLayer(layer,id,romovedFeatures) {
  //获取图层的数据源
  let source=layer.getSource()
  //遍历移除的要素数组，获取某个要素
  for(let i=0;i<romovedFeatures.length;i++){
    //如果存在这个要素，就把他添加到数据源中去
    if(romovedFeatures[i].get('id')==id){
      source.addFeature(romovedFeatures[i])
      romovedFeatures.splice(i,1)
    }
  }
  layer.setSource(source)

  return romovedFeatures
}

//移除多余的图层
export function removeLayers (map) {
  for(let i=1;i<map.getLayers().getLength();i++){
    map.removeLayer(map.getLayers().item(i))
  }
}

/**
 * 地图配置
 * @type {{controls: {loading: boolean, zoomSlider: boolean, scaleLine: boolean, attribution: boolean, fullScreen: boolean}, view: {center: number[], projection: string, zoom: number, minZoom: number, maxZoom: number}, baseLayers: *[], layers: Array}}
 */
export const mapConfig={
  controls: {
    loading: true,
    zoomSlider: true,
    scaleLine:true,
    attribution:true,
    fullScreen:false
  },
  view: {
    center: [91.177654,29.659881],
    projection: 'EPSG:4326',
    zoom: 6, // resolution
    minZoom:6,
    maxZoom:18
  },
  baseLayers: [
    {
          layerName: 'Gaode',
          isDefault: true,
          layerType: 'GaoDe',
          crossOrigin:'anonymous',//允许跨域，截图使用
          layerUrl: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=8&x={x}&y={y}&z={z}'
    },
    {
      layerName: 'WMSLayer',
      isDefault: true,
      layerType: 'TileWMS',
      layerUrl: config.baseMapUrl+'/hdmapserver/wms',
      layers: 'xzyj_map',
      // layers:'xzyj:xzyj_dishimian,xzyj:xzyj_dijishi,xzyj:xzyj_guodao',
      styles: '',
      projection: 'EPSG:4326',
      srs: 'EPSG:4326',
      bbox: '78.394417,26.85377,99.109838,36.48490900000007',
      tiled: true,
      tiledsorrigin: '113.23591752486,24.389814897017'
    },
  ],layers:[

  ]
}

/**
 * 只有底图
 * @type {{controls: {loading: boolean, zoomSlider: boolean, scaleLine: boolean, attribution: boolean, fullScreen: boolean}, view: {center: number[], projection: string, zoom: number, minZoom: number, maxZoom: number}, baseLayers: {layerName: string, isDefault: boolean, layerType: string, crossOrigin: string, layerUrl: string}[], layers: Array}}
 */
export const mapConfig1={
  controls: {
    loading: true,
    zoomSlider: true,
    scaleLine:true,
    attribution:true,
    fullScreen:false,
    // OverviewMap:false
  },
  view: {
    center: [91.177654,29.659881],
    projection: 'EPSG:4326',
    zoom: 6, // resolution
    minZoom:6,
    maxZoom:18
  },
  baseLayers: [
    // {
    //   layerName: 'Gaode',
    //   isDefault: true,
    //   layerType: 'GaoDe',
    //   crossOrigin:'anonymous',//允许跨域，截图使用
    //   layerUrl: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=8&x={x}&y={y}&z={z}'
    // },
    {
      layerName: 'WMSLayer',
      isDefault: true,
      layerType: 'TileWMS',
      layerUrl: config.baseMapUrl+'/hdmapserver/wms',
      // layers: 'xzyj_map',
      layers:'xzyj:xzyj_base',
      styles: '',
      projection: 'EPSG:4326',
      srs: 'EPSG:4326',
      bbox: '78.394417,26.85377,99.109838,36.48490900000007',
      tiled: true,
      // crossOrigin:"Anonymous"
    },
  ],layers:[

  ]
}

/**
 * 添加车辆图层
 * @param map
 */
export function addVehicle(map,features){
    let features1=[]
  if(features!=null){
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
      feature.setStyle(new ol.style.Style({
        image: new ol.style.Icon(({
          src: './static/img/vehicle1.png'
        })),
        text: new ol.style.Text({
          font: "仿宋 8px",
          text: feature.get("id"),
          offsetY: -20,
          // backgroundFill: new ol.style.Fill({
          //           //   color: 'rgba(148,216,246,0.8)'
          //           //   //color:'rgba(0,0,0,1)'
          //           // }),
          stroke: new ol.style.Stroke({    //文字边界宽度与颜色
            color: '#fff',
            width: 3
          }),
          // stroke: new ol.style.Stroke({
          //   width: 0.1,
          //   color: 'rgba(255, 255, 255, 1)'
          // })
        })
      }))
      features1.push(feature)
    }
    let source= new ol.source.Vector({
      features:features1,
      format: new ol.format.GeoJSON()
    })
    //判断是否有这个图层
    let vehicleLayer=getLayerByName(map,'车辆')
    if(vehicleLayer){
      vehicleLayer.setSource(source)
    }
    else{
      let layer=new ol.layer.Vector({
        source:source,
        name:'车辆',
        declutter:true
      })
      map.addLayer(layer)
    }
  }

}

/**
 * 添加仓库
 * @param map
 */
export function addHouseware (map) {
  //获取仓库
  axios.get(`jcsj_ck/selectFeature`, {
    // params: _params,
    baseURL: config.baseEmgresUrl
  }).then(data => {
      if (data.data.code == 0) {
        let features1=[]
        //遍历获取要素
        let features=data.data.data
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
          feature.setStyle(new ol.style.Style({
            image: new ol.style.Icon(({
              src:'./static/images/house.png'
            })),
            text:new ol.style.Text({
              font:"12px Calibri,sans-serif",
              text:feature.get("ckqc"),
              offsetY:-20,
              color:'#d0923c',
              stroke: new ol.style.Stroke({    //文字边界宽度与颜色
                color: '#fff',
                width: 3
              }),
              fill: new ol.style.Fill({
                color: '#000'
              }),
            })
          }))
          features1.push(feature)
        }
        let layer=new ol.layer.Vector({
          source:new ol.source.Vector({
            features:features1,
          }),
          name:"仓库"
        })
        map.addLayer(layer)
        return true
      }
    })

}

/**
 *添加智慧树桩
 * @param map
 */
export function addWishTrees(map) {
  //获取智慧树桩列表
  fetch(`http://hdsx.ahdcloud.com/rtdData/getRtdEsdCoordinateDataByPage?pageNo=1&pageSize=10`)
    .then(response => response.json())
    .then(data => {
      if (data.total > 0) {
        let features1=[]
        //遍历获取要素
        let features=data.list
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
          style:new ol.style.Style({
            text:new ol.style.Text({
              font:"华文行楷 5px",
              text:"雾",
              scale:1.5,
              backgroundFill:new ol.style.Fill({
                color:'rgba(255,250,153, 1)'
              }),
              backgroundStroke:new ol.style.Stroke({
                color:'rgba(0, 0, 0, 1)'
              })
            })
            // image: new ol.style.Icon(({
            //   src:'../../../static/img/wishTree.png'
            // }))
          }),
          name:'路桩'
        })
        map.addLayer(layer)
      }
    })
}

/**
 * 添加应急队伍
 */
export function addTeam (map) {
  axios.get(`emergency/search`, {
    params: {
      type:2
    },
    baseURL: config.baseVehicleUrl
  }).then(data => {
      if(data.data.code==0){
        let features1=[]
        //遍历获取要素
        let features=data.data.data.team
        for(let i=0;i<features.length;i++){
          let feature = new ol.format.WKT().readFeature(features[i].wkt);
          feature.setProperties(features[i].properties)
          feature.set("name",features[i].properties.name)
          feature.set("id",features[i].id)
          feature.setStyle(new ol.style.Style({
            image: new ol.style.Icon(({
              src: './static/img/team.png'
            })),
            text: new ol.style.Text({
              font: "华文行楷 5px",
              text: feature.get("name"),
              offsetY: -20,
              backgroundFill: new ol.style.Fill({
                color: '#f9ff00'
              }),
              stroke: new ol.style.Stroke({
                width: 0.1,
                color: '#ff0000ed'
              })
            })
          }))
          features1.push(feature)

      }
        let teamLayer=new ol.layer.Vector({
          source:new ol.source.Vector({
            features:features1,
            //url: params.url,
            //format: new ol.format.GeoJSON()
          }),
          name:'队伍'
        })
        map.addLayer(teamLayer)
      }
    })
}
