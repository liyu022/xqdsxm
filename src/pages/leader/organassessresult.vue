<template>
  <div class="chart-container">
    <el-table :data="tableData" v-if="refresh" style="width: 100%" @expand-change="expandChange">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table border :data="props.row.children" v-loading="props.row.loading" style="width: 100%"
            :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column prop="UNCHECKUSERNAME" label="被考核人">
            </el-table-column>
            <el-table-column prop="CREATENAME" label="考核人">
            </el-table-column>
            <el-table-column prop="CHECKRESULT" label="分数">

            </el-table-column>
            <el-table-column prop="CREATETIME" label="考核时间">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column type="index" label="排名" width="100">
      </el-table-column>
      <el-table-column prop="USERNAME" label="被考核人">
      </el-table-column>
      <el-table-column label="总分">
        <template slot-scope="props">
          {{Number(props.row.RESULT).toFixed(2)}}
        </template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="props">
          <span>{{Number(props.row.TOTAL) == Number(props.row.UNTOTAL) ? "有效" : "无效" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已考核人数" prop="UNTOTAL">
      </el-table-column>
      <el-table-column label="总人数" prop="TOTAL">
      </el-table-column>
      <el-table-column label="考核人">
        -
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">雷达图</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">折线图</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="统计图表" custom-class="viewPage" :visible.sync="showView" width="800px">

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
        refresh: true
      }
    },
    created() {
      this.getcadreresultCadrelist()
    },

    methods: {
      getcadreresultCadrelist() {
        approveApi.cadreresultCadrelist().then(res => {
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
            userid: row.UNCHECKUSERID
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
                  console.log(taskData, 77)
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
        this.chart = echarts.init(document.getElementById('echarts'))
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
        const theta = Math.PI * 2 / dataSet[2].length;

        const getPoints = (R, ps, max) => ps.map((v, i) => {
          const t = i * theta;
          const d = v / max;
          const x = R - Math.sin(t) * R * d;
          const y = R - Math.cos(t) * R * d;
          return [x, y];
        });
        let option = {
          backgroundColor: '#000000',
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
              name: 's1',
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
      initLineChart() {
        this.chart = echarts.init(document.getElementById('echarts'))
        let option = {
          backgroundColor: '#080b30',
          title: {
            text: '多线图',
            textStyle: {
              align: 'center',
              color: '#fff',
              fontSize: 20,
            },
            top: '5%',
            left: 'center',
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
            data: ['A', 'B', 'C', 'D', 'E', 'F'],

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
          series: [{
              name: '注册总量',
              type: 'line',
              smooth: true, //是否平滑
              showAllSymbol: true,
              // symbol: 'image://./static/images/guang-circle.png',
              symbol: 'circle',
              symbolSize: 15,
              lineStyle: {
                normal: {
                  color: "#00b3f4",
                  shadowColor: 'rgba(0, 0, 0, .3)',
                  shadowBlur: 0,
                  shadowOffsetY: 5,
                  shadowOffsetX: 5,
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
                show: false
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(0,179,244,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,179,244,0)'
                    }
                  ], false),
                  shadowColor: 'rgba(0,179,244, 0.9)',
                  shadowBlur: 20
                }
              },
              data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02, ]
            },
            {
              name: '注册总量',
              type: 'line',
              smooth: true, //是否平滑
              showAllSymbol: true,
              // symbol: 'image://./static/images/guang-circle.png',
              symbol: 'circle',
              symbolSize: 15,
              lineStyle: {
                normal: {
                  color: "#00ca95",
                  shadowColor: 'rgba(0, 0, 0, .3)',
                  shadowBlur: 0,
                  shadowOffsetY: 5,
                  shadowOffsetX: 5,
                },
              },
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#00ca95',
                }
              },

              itemStyle: {
                color: "#00ca95",
                borderColor: "#fff",
                borderWidth: 3,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
              },
              tooltip: {
                show: false
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(0,202,149,0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,202,149,0)'
                    }
                  ], false),
                  shadowColor: 'rgba(0,202,149, 0.9)',
                  shadowBlur: 20
                }
              },
              data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14, ],
            },
          ]
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
        let params = {
          userid: row.UNCHECKUSERID
        }
        // this.$set(row, 'loading', true);
        approveApi.cadreresultcount(params).then((res) => {
          if (res.data.code === 0) {
            console.log(res.data.data, 777)
            let da = res.data.data
            let indicator = [],
              data = []
            for (let i = 0; i < da.length; i++) {
              let obj = {
                name: da[i].NAME,

              }
              indicator.push(da[i].NAME)
              data.push(da[i].VALUE)
            }
            console.log(indicator, data)
            this.initRadarChart(indicator, data)
          }
        })
      },
      handleDelete(row) {
        // 折线图
        console.log(row, 555)
      }
    }
  }
</script>

<style lang="scss">
  #echarts {
    width: 800px;
    height: 800px;
  }

  .chart-container {
    position: relative;
    margin: 10px;
  }
 
  .viewPage {
    top: 10%;

    .el-dialog__header {
      background: #97a8be;
    }
    .el-dialog__body{
      padding: 0px;
      width: 800px;
      height: 800px;
    }
    .el-dialog__title,
    .el-dialog__headerbtn .el-dialog__close {
      font-weight: 800;
      color: #fff;
    }

     
  }
</style>