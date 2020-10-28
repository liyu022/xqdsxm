<template>
<div :id="id" :class="className" :style="{height:height,width:width}"/>
  </template>
  <script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    piedate: {
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
          text: '重点加分项占比统计',
          subtext: '真实数据',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          top: 1,
          left: 'center',
          data: ['加分', '扣分', '加分或扣分']
        },
        series: [
          {
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            selectedMode: '占比',
            data: [
              {value: 48,name: '扣分'},
              {value: 14, name: '加分'},
              {value: 5, name: '加分或扣分'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
   }
}
</script>
