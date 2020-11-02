<template>
  <div class="chart-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.children" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column prop="khx" label="考核项" width="100">
            </el-table-column>
            <el-table-column prop="fs" label="分数">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排名" width="100">
      </el-table-column>
      <el-table-column prop="bkhr" label="被考核人">
      </el-table-column>
      <el-table-column prop="fs" label="总分">
      </el-table-column>
      <el-table-column label="是否有效" prop="id">
      </el-table-column>
      <el-table-column label="已考核人数" prop="name">
      </el-table-column>
      <el-table-column label="总人数" prop="desc">
      </el-table-column>
      <el-table-column label="考核人" prop="desc">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="统计图表" custom-class="viewPage" :visible.sync="showView" width="70%">

      <div id="echarts">

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showView = false">取 消</el-button>
        <el-button type="primary" @click="showView = false">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'MixChart',
    data() {
      return {
        chart: null,
        showView: false,
        limit: 3,
        multipleSelection: [],
        tableData: []
      }
    },
    created() {

    },

    methods: {
      initRadarChart() {
        this.chart = echarts.init(document.getElementById('echarts'))
        let option = {
          title: {
            text: '基础雷达图'
          },
          tooltip: {},
          legend: {
            data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
          },
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
            indicator: [{
                name: '销售（sales）',
                max: 6500
              },
              {
                name: '管理（Administration）',
                max: 16000
              },
              {
                name: '信息技术（Information Techology）',
                max: 30000
              },
              {
                name: '客服（Customer Support）',
                max: 38000
              },
              {
                name: '研发（Development）',
                max: 52000
              },
              {
                name: '市场（Marketing）',
                max: 25000
              }
            ]
          },
          series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [{
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '预算分配（Allocated Budget）'
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '实际开销（Actual Spending）'
              }
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
        console.log(row, 555)
      },
      handleDelete(row) {
        console.log(row, 555)
      }
    }
  }
</script>

<style lang="scss">
  .echarts {
    width: 500px;
    height: 200px;
  }

  .chart-container {
    position: relative;
    width: 95%;
    margin: 0 auto;
    height: calc(100vh - 50px);
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