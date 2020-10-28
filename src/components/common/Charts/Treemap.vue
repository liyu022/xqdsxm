<template>
<div :id="id" :class="className" :style="{height:height,width:width}"/>
  </template>
  <script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    obj: {
      type: Object,
      default: function () {
        return {
          use: [],
          org: []
        }
      }
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
   'obj.use': function (value) {
      if (value != null && value.length > 0) {
        this.initChart()
      }
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      let dataall = []
      dataall.push({
        id: "00001",
        name: "班组考核",
        value: 5,
        path: '',
        type: "年度",
        children: this.obj.org
      })
      dataall.push({
        id: "00002",
        name: "人员考核",
        type: "年度",
        path: '',
        value: 5,
        children: this.obj.use
      })
      console.log(dataall)
      this.chart = echarts.init(document.getElementById(this.id))
      let formatUtil = echarts.format;
      this.chart.setOption({
        title: {
          text: '陕甘管理处考核汇总表',
          left: 'center'
        },
        tooltip: {
          formatter: function (info) {
            let value = info.result;
            let treePathInfo = info.treePathInfo;
            let treePath = [];

            for (let i = 1; i < treePathInfo.length; i++) {
              treePath.push(treePathInfo[i].name);
            }
            return [
              '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
              '考核对象：'+info.data.name+',\n考核成绩：'+info.data.result+',\n考核排名：'+info.data.rownum
            ].join('');
          }
        },

        series: [
          {
            name: '甘陕管理处',
            type: 'treemap',
            visibleMin: 300,
            label: {
              show: true,
              color: '#fff',
              fontSize:24,
              formatter: function(params){
                //let str = '考核对象：'+params.data.name+',\n考核成绩：'+params.data.result+',\n考核排名：'+params.data.rownum
                let str=''
                if(params.data.status==='未考核'){
                  str=params.data.name+'\n\n 未考核'
                }else{
                  str=params.data.name+'\n\n'+params.data.rownum
                }
                return str
              },
            },
            itemStyle: {
              borderColor: '#fff'
            },
            levels: this.getLevelOption(),
            data: dataall
          }
        ]
      });
    },
    getLevelOption() {
      return [
        {
          itemStyle: {
            borderWidth: 0,
            gapWidth: 10
          }
        },
        {
          itemStyle: {
            gapWidth: 1
          }
        },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: {
            gapWidth: 1,
            borderColorSaturation: 0.6
          }
        }
      ]
    },
    colorMappingChange(value) {
        let levelOption = this.getLevelOption(value);
        this.chart.setOption({
            series: [{
              levels: levelOption
            }]
        });
     }
   }
}
</script>
