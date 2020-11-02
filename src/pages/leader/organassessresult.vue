<template>
  <div class="chart-container">
    <el-table :data="tableData" v-if="refresh" style="width: 100%" @expand-change="expandChange">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table border :data="props.row.children" v-loading="props.row.loading"  style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column prop="UNCHECKUSERNAME" label="被考核人">
            </el-table-column>
            <el-table-column prop="CREATENAME" label="考核人"  >
      </el-table-column>
       <el-table-column prop="CHECKRESULT"   label="分数">
         
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
      <el-table-column   label="总分">
         <template slot-scope="props">
            {{Number(props.row.RESULT).toFixed(2)}}
          </template>
      </el-table-column>
      <el-table-column label="是否有效" >
          <template slot-scope="props">
              <span>{{Number(props.row.TOTAL) == Number(props.row.UNTOTAL) ? "有效" : "无效" }}</span>
          </template>
      </el-table-column>
      <el-table-column label="已考核人数" prop="UNTOTAL">
      </el-table-column>
      <el-table-column label="总人数" prop="TOTAL">
      </el-table-column>
      <el-table-column label="考核人"  >
        -
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">雷达图</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">折线图</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="统计图表" custom-class="viewPage" :visible.sync="showView" width="70%">

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
        refresh:true
      }
    },
    created() {
      this.getcadreresultCadrelist()
    },

    methods: {
      getcadreresultCadrelist(){
        approveApi.cadreresultCadrelist().then(res=>{
          if (res.data.code==0) {
            res.data.data.map((item, index) => {
                        item.children = []; // 添加子表格数据
                        item.loading= false
                    });
            this.tableData=res.data.data
         
          }  
        })
      },
     expandChange (row, expandedRows) {
           
            if (row.children.length==0) {
            	// 通过$set属性可设置loading实现实时加载loading效果(经过测试,通过$set直接给父层数据声明子层数据时会出现报错,所以才在获取父层表格数据时声明子层表格数据)
                let params={
                  userid:row.UNCHECKUSERID
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
                               console.log(taskData,77 )
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
      initRadarChart(ins,data) {
        this.chart = echarts.init(document.getElementById('echarts'))
        console.log(this.chart,10 )
        let option = {
          title: {
            text: '干部考核7项指标合计统计'
          },
          tooltip: {},

          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: ins
          },
          series: [{
            name: '干部考核7项指标合计统计',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
            {
                value: data,
                name: '干部考核7项指标合计统计'
            },

        ]
          }]
        };
        this.chart.setOption(option)
      },
      initLineChart() {
        this.chart = echarts.init(document.getElementById('echarts'))
        let option = {
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
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
         this.showView=true
         let params={
                  userid:row.UNCHECKUSERID
                }
                // this.$set(row, 'loading', true);
                approveApi.cadreresultcount(params).then((res) => {
                    if (res.data.code === 0) {
                        console.log(res.data.data,777)
                        let da=res.data.data
                        let indicator=[],data=[]
                        for (let i = 0; i < da.length; i++) {
                          let obj={
                            name:da[i].NAME,
                            
                          }
                          indicator.push(obj)
                          data.push(da[i].VALUE)
                        }
                       console.log(indicator, data)
                        this.initRadarChart(indicator,data)
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
    height: 400px;
  }

  .chart-container {
    position: relative;
    margin: 10px;
  }

  .el-table>>>.DisabledSelection .cell .el-checkbox__inner {
    display: none;
    position: relative;
  }

  .elrow {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }

  .btn-group {
    text-align: center;
    line-height: 50px;
  }

  .viewPage {
    top: 10%;

    .el-dialog__header {
      background: #97a8be;
    }

    .el-dialog__title,
    .el-dialog__headerbtn .el-dialog__close {
      font-weight: 800;
      color: #fff;
    }

    ul {
      li {
        list-style: none;
        min-height: 200px;

        .item {
          >div {
            line-height: 30px;

            .label {
              display: inline-block;
              width: 50px;
              text-align: center;
            }
          }

          cursor: pointer;
          width: 150px;
          height: 70px;
          border: 1px solid #909399;
          border-radius: 5px;
        }
      }

      .empty {
        height: 200px;
        line-height: 200px;
        text-align: center;
        font-size: 20px;
      }
    }
  }
</style>