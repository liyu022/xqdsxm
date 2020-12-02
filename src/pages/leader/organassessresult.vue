<template>
  <div class="chart-container">
    <div v-if="isStart">
    <el-table :data="tableData" v-if="refresh" style="width: 100%" @expand-change="expandChange">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table border :data="props.row.children" v-loading="props.row.loading" style="width: 100%"
             >
            <el-table-column prop="UNCHECKUSERNAME" label="被考核人">
            </el-table-column>
            <el-table-column prop="CREATENAME" label="考核人">
            </el-table-column>
            <el-table-column prop="ORGNAME" label="考核人组织机构">
            </el-table-column>
            <el-table-column prop="ROLENAME" label="考核人角色">
            </el-table-column>
            <el-table-column prop="CHECKRESULT" label="考核人打分">
            </el-table-column>
            <el-table-column prop="PROPORTION" label="考核人权重">
            </el-table-column>
            <el-table-column prop="CREATETIME" label="考核时间">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column  label="排名" width="100">
          <template slot-scope="props">
            <span v-if="props.$index==0" class="first">{{Number(props.$index) + 1}}</span>
            <span v-else-if="props.$index==1" class="second">{{Number(props.$index) + 1}}</span>
            <span v-else-if="props.$index==2" class="three">{{Number(props.$index) + 1}}</span>
            <span v-else  class="gen">{{Number(props.$index) + 1}}</span>
         
        </template>
      </el-table-column>
      <el-table-column prop="USERNAME" label="被考核人">
      </el-table-column>
      <el-table-column prop="ORGNAME" label="组织机构">
      </el-table-column>
      <el-table-column label="总分">
        <template slot-scope="props">
          {{Number(props.row.RESULT).toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="props">
          <span :class='Number(props.row.TOTAL) == Number(props.row.UNTOTAL) ? "green" : "red"'>{{Number(props.row.TOTAL) == Number(props.row.UNTOTAL) ? "有效" : "无效" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已考核人数" prop="UNTOTAL">
      </el-table-column>
      <el-table-column label="总人数" prop="TOTAL">
      </el-table-column>
      <el-table-column label="考核人">
        ---
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="btn41" size="mini" @click="handleEdit(scope.row)"><svg-icon class-name="rad-icon" icon-class="rad" /></el-button>
          <el-button class="btn41" size="mini" @click="handleDelete(scope.row)"><svg-icon class-name="rad-icon" icon-class="line" /></el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div class="hd" v-else>
      暂未启动机关考核计划
    </div>

    <el-dialog :title="ctitle" custom-class="viewPages" :visible.sync="showView" width="800px">

      <div id="echarts">

      </div>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="showView = false">取 消</el-button>
        <el-button type="primary" @click="showView = false">提 交</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
  import * as approveApi from '@/api/approve'
  import echarts from 'echarts'
  export default {
    name: 'MixChart',
    data() {
      return {
        chart: null,
        showView: false,
        limit: 3,
        multipleSelection: [],
        tableData: [],
        refresh: true,
        ctitle:'',
        isStart: false,
        planId:''
      }
    },
    created() {
      let planId=''
      let params = {
        uid: JSON.parse(localStorage.getItem('userid'))
      }
      approveApi.selectPlanAndProportion(params).then(res => {
        if (res.data.code == 0) {
          let plan = res.data.data.plan
            for (let i = 0; i < plan.length; i++) {
              if (plan[i].TYPE == '机关考核') {
                this.planId=plan[i].ID
                planId=plan[i].ID
                this.isStart = true
              }
            }
            if (!this.isStart) {
              return
            } else {
              this.getcadreresultCadrelist(planId)
            }
          

        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
      
    },

    methods: {
      getcadreresultCadrelist(planId) {
        let params={
          planid:planId
        }
        approveApi.cadreresultCadrelist(params).then(res => {
          if (res.data.code == 0) {
            res.data.data.map((item, index) => {
              item.children = []; // 添加子表格数据
              item.loading = false
            });
            this.tableData = res.data.data

          }
        })
      },
      expandChange(row, expandedRows) {

        if (row.children.length == 0) {
          // 通过$set属性可设置loading实现实时加载loading效果(经过测试,通过$set直接给父层数据声明子层数据时会出现报错,所以才在获取父层表格数据时声明子层表格数据)
          let params = {
            userid: row.UNCHECKUSERID,
            planid: this.planId
          }
          // this.$set(row, 'loading', true);
          approveApi.cadrelistbyuserid(params).then((res) => {
            if (res.data.code === 0) {

              const taskData = JSON.parse(JSON.stringify(res.data.data));
              // 遍历父层表格数据
              this.$set(row, 'children', taskData);

              this.tableData.forEach((temp, index) => {
                // 找到当前展开的行，把获取到的数据赋值进去
                if (temp.ID === row.ID) {
        
                  this.tableData[index].children = taskData || [];
                }
              });
            }
            this.$set(row, 'loading', false);
          }, (err) => {
            this.$set(row, 'loading', false);
          });
        }
      },
      initRadarChart(ins, data) {
        this.chart = null
        this.chart = echarts.init(document.getElementById('echarts'))
        this.chart.clear()
        const createSvg = ({
          width,
          height,
          shadowColor,
          shadowBlur,
          points
        }) => {
          const ret = [`M${points[0][0]} ${points[0][1]}`];
          for (let i = 1; i < points.length; i++) {
            ret.push(`L${points[i][0]} ${points[i][1]}`);
          }
          ret.push('Z');
          const rectPath = ret.join(' ');
          return (`
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
            x="0px" y="0px" 
            width="${width}"
            height="${height}"
        >
            <style>
                .st1 {
                    fill: transparent;
                    stroke: ${shadowColor};
                    stroke-width: ${shadowBlur}px;
                    filter: url(#chart-inset-shadow);
                    clip-path: url(#chart-clip);
                }

            </style>
            <defs>
              
                <clipPath id="chart-clip">
                    <path d="${rectPath}" />
                </clipPath>
                
                <filter id="chart-inset-shadow" width="200%" height="200%" x="-50%" y="-50%">
            		<feGaussianBlur in="SourceGraphic" result="gass" stdDeviation="${shadowBlur * 0.75}" />
            		<feMerge>
            			<feMergeNode in="gass" />
            		</feMerge>
            	</filter>

            </defs>
            <g>
                <path class="st1" d="${rectPath}" />
            </g>
        </svg>
    `);

        };

        const cretateSvgUrl = (svgOption) => {
          const svgString = createSvg(svgOption);
          const svg = new Blob([svgString], {
            type: "image/svg+xml;charset=utf-8"
          });

          const DOMURL = window.URL || window.webkitURL || window;
          const insetShadowUrl = DOMURL.createObjectURL(svg);

          return insetShadowUrl;
        };

        const dataSet = [
          ins,
          data
        ];

        const maxValue = [...dataSet[1]].reduce((m, v) => Math.max(m, v), -Infinity);

        const radius = 0.8;
        const theta = Math.PI * 2 / dataSet[1].length;

        const getPoints = (R, ps, max) => ps.map((v, i) => {
          const t = i * theta;
          const d = v / max;
          const x = R - Math.sin(t) * R * d;
          const y = R - Math.cos(t) * R * d;
          return [x, y];
        });
        let option = {
          backgroundColor: 'rgba(0,0,0,0.8)',
          tooltip: {
            // trigger: 'axis',
            // show: true
          },
          polar: {
            radius: radius * 100 + '%',
            center: ['50%', '50%'],
          },
          angleAxis: {
            type: 'category',
            clockwise: false,
            boundaryGap: false,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false
            }
          },
          radiusAxis: {
            type: 'value',
            max: 100,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          radar: {
            indicator: dataSet[0].map((v, i) => ({
              name: v,
              max: maxValue
            })),
            radius: radius * 100 + '%',
            center: ['50%', '50%'],
            shape: 'polygon',
            splitNumber: 4,
            name: {
              textStyle: {
                color: '#ffffff',
                fontSize: 22
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  'rgba(255,255,255,0.1)',
                  'rgba(255,255,255,0.03)',
                  'rgba(255,255,255,0.1)',
                  'rgba(255,255,255,0.03)',
                ]
              }
            },
            splitLine: {
              lineStyle: {
                color: [
                  '#6b6b6b', '#6b6b6b',
                  '#6b6b6b', '#6b6b6b',
                  '#6b6b6b', '#6b6b6b'
                ].reverse(),
                width: 3
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(238,238,238, 0.2)'
              }
            }
          },

          series: [{
              type: 'custom',
              name: 's1-inset-shadow',
              silent: true,
              coordinateSystem: 'polar',
              data: [0],
              renderItem: (params, api) => {
                const R = params.coordSys.r;
                const cx = params.coordSys.cx;
                const cy = params.coordSys.cy;

                const x = cx - R;
                const y = cy - R;
                const width = 2 * R;
                const height = 2 * R;

                return {
                  type: 'image',
                  style: {
                    image: cretateSvgUrl({
                      width,
                      height,
                      shadowColor: 'rgba(13, 178, 255, 1)',
                      shadowBlur: 30,
                      points: getPoints(R, dataSet[1], 100)
                    }),
                    x,
                    y,
                    width,
                    height,
                  },
                };
              },
            },
            {
              name: '七项指标统计',
              type: 'radar',
              tooltip: {
                trigger: 'item'
              },
              data: [{
                value: dataSet[1]
              }],
              symbol: 'circle',
              symbolSize: 12,
              itemStyle: {
                normal: {
                  color: 'rgba(87,201,255,0.8)',
                  borderColor: 'rgba(87,201,255,0.2)',
                  borderWidth: 12,
                }
              },
              areaStyle: {
                normal: {
                  color: 'transparent',
                }
              },
              lineStyle: {
                normal: {
                  color: 'rgba(13, 178, 255, 1)',
                  width: 5
                }
              },

            },
          ]


        };
        this.chart.setOption(option)
      },
       Scolor(){
         var r=Math.floor(Math.random()*256);
       var g=Math.floor(Math.random()*256);
       var b=Math.floor(Math.random()*256);
       return [r,g,b]
       },
      initLineChart(xLabel,sys) {
        this.chart=null

        this.chart = echarts.init(document.getElementById('echarts'))
        this.chart.clear()
        let series=[]
        for (let i = 0; i < sys.length; i++) {
          let c=this.Scolor()
          series.push({
              name: sys[i].name,
              type: 'line',
              smooth: true, //是否平滑
              showAllSymbol: true,
              // symbol: 'image://./static/images/guang-circle.png',
              symbol: 'circle',
              symbolSize: 15,
              lineStyle: {
                normal: {
                  color: "rgb("+c[0]+','+c[1]+','+c[2]+")",
                  // shadowColor: 'rgba(0, 0, 0, .3)',
                  // shadowBlur: 0,
                  // shadowOffsetY: 5,
                  // shadowOffsetX: 5,
                },
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#00b3f4',
                }
              },
              itemStyle: {
                color: "#00b3f4",
                borderColor: "#fff",
                borderWidth: 3,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
              },
              tooltip: {
                show: true
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(8,8,128,0.4)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(70,130,180,0.4)',
                    }
                  ], false),
                  shadowColor: 'rgba(70,206,209,0.4)',
                  shadowBlur: 20
                }
              },
              data: sys[i].data
            })
          
        }
        let option = {
          backgroundColor: '#080b30',
          title: {
      
            textStyle: {
              align: 'center',
              color: '#fff',
              fontSize: 20,
            },
            top: '5%',
            left: 'center',
          },
          legend: {
       right: 10,
       top: 10,
       textStyle:{//图例文字的样式
            color:'#fff',
        }
        },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(0, 255, 233,0)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(255, 255, 255,1)',
                  }, {
                    offset: 1,
                    color: 'rgba(0, 255, 233,0)'
                  }],
                  global: false
                }
              },
            },
          },
          grid: {
            top: '15%',
            left: '5%',
            right: '5%',
            bottom: '15%',
            // containLabel: true
          },
          xAxis: [{
            type: 'category',
            axisLine: {
              show: true
            },
            splitArea: {
              // show: true,
              color: '#f00',
              lineStyle: {
                color: '#f00'
              },
            },
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              show: false
            },
            boundaryGap: false,
            data: xLabel,

          }],

          yAxis: [{
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.1)'
              }
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
              margin: 20,
              textStyle: {
                color: '#d1e6eb',

              },
            },
            axisTick: {
              show: false,
            },
          }],
          series: series
        };
        this.chart.setOption(option)
      },
      handleSelectionChange(rows) {
        if (rows.length > this.limit) { //单选时为1，需要选择n项改数值为n就可以     
          this.$refs.multipleTable.toggleRowSelection(rows[0], false); //超出指定选择个数后，把第一个选中的selection设为false
          rows.splice(0, 1); //同时要把选中第一项移除
        }
        this.multipleSelection = rows;
      },
      handleEdit(row) {
        //雷达图
     
        this.showView = true
        this.ctitle= row.USERNAME+ '综合指标分析'
        let params = {
          userid: row.UNCHECKUSERID,
          planid:this.planId
        }
        // this.$set(row, 'loading', true);
        approveApi.cadreresultcount(params).then((res) => {
          if (res.data.code === 0) {
           
            let da = res.data.data
            let indicator = [],
              data = []
            for (let i = 0; i < da.length; i++) {
              let obj = {
                name: da[i].NAME,

              }
              indicator.push(da[i].NAME)
              data.push(da[i].VALUE.toFixed(2))
            }
          
            this.initRadarChart(indicator, data)
          }
        })
      },
      handleDelete(row) {
        // 折线图
        this.showView = true
        this.ctitle= row.USERNAME+ '综合指标分析'
        let params = {
          userid: row.UNCHECKUSERID,
          planid:this.planId
        }
        // this.$set(row, 'loading', true);
        approveApi.cadreresultcountbyrole(params).then((res) => {
          if (res.data.code === 0) {
            console.log(res.data.data, 777)
            let da = res.data.data
            let xLabel = []
            let sys=[]
            let temp=[]
            for (let i = 0; i < da.length; i++) {
              if (xLabel.indexOf(da[i].NAME)==-1) {
                   xLabel.push(da[i].NAME)
              }
             
            }
            da.map(item=>{
              if (temp.indexOf(item.ROLENAME)==-1) {
                 
                temp.push(item.ROLENAME)
                let ob = {
                  name:item.ROLENAME,
                  data:[]
                }
                sys.push(ob)

              }
            })
           
            for (let i = 0; i < sys.length; i++) {
              
               for (let j = 0; j < da.length; j++) {

                  if (sys[i].name==da[j].ROLENAME) {
                    sys[i].data.push(da[j].VALUE)
                  }
                 
               }
              
            }

            
            this.initLineChart(xLabel, sys)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.green{
color: #67C23A;
}
.red{
color:#F56C6C;
}
.first,.second,.three{
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
}
.gen{
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  color: #000;
  text-align: center;
}
.first{
  background:#F56C6C;
}
.second{
 background: #E6A23C;
}
.three{
  background: #67C23A;
}
.btn41{
  padding: 0px 10px!important;
}
.rad-icon{
  width: 30px!important;
  height: 30px!important;
}
.el-table th {
    overflow: hidden;
    -ms-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background: #e1e2ed;
}

  #echarts {
    width: 800px;
    height: 700px;
  }

  .chart-container {
    position: relative;
    margin: 10px;
  }
 
  .viewPages {
    top: 10%;

    .el-dialog__header {
      background: #8e8272;
    }
    .el-dialog__body{
      margin: 0px;
      padding: 0px!important;
      width: 800px;
      height: 700px;
    }
    .el-dialog__title,
    .el-dialog__headerbtn .el-dialog__close {
      font-weight: 800;
      color: #fff;
    }

     
  }
</style>