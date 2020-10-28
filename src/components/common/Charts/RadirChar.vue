<template>
<div :id="id" :class="className" :style="{height:height,width:width}"/>
  </template>
  <script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    radate: {
      type: Array,
      required: true
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
  mounted() {
    this.initChart()
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
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        title: {
          show: false,
          text: '考核分析雷达图',
          left: 'center'
        },
        tooltip: {},
        legend: {
          data: ['本次考核', '平均考核'],
          top: 0
        },
        radar: {
          shape: 'circle',
          radius: '70%',
          name: {
            textStyle: {
              color: '#060306',
              border: 1,
            }
          },
          indicator: [
            {name: '其他', max: 50},
            {name: '合规性指标', max: 50},
            {name: 'HSE指标', max: 50},
            {name: '管道管理', max: 50},
            {name: '加分项', max: 50},
            {name: '库房及资产管理', max: 50},
            {name: '生产运行管理', max: 50},
            {name: '系统录入类指标', max: 50},
            {name: '应急管理', max: 50}
          ]
        },
        series: [{
          name: '本次 vs 平均',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [12, 32, 35, 14, 36, 45,21,49,45],
              name: '本次考核'
            },
            {
              value: [32, 22, 25, 50, 6, 15,11,26,34],
              name: '平均考核'
            }
          ]
        }]
      })
    }
  }
}
</script>
