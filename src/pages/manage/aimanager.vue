<template>
  <div class="content">
    <div class="content-main">
      <div class="left-content">
        <div class="sbTree" style="border:none;padding-top:10px;">
          <el-tree
            :data="data"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick">
          </el-tree>
        </div>
      </div>
      <div class="right-content">
        <div class="header">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-form-item class="" label="机构名称" prop="name">
                <el-input v-model="searchForm.name" size="mini" placeholder="请输入机构名称"></el-input>
              </el-form-item>
              <el-form-item class="" label="机构编码" prop="code">
                <el-input v-model="searchForm.code" size="mini" placeholder="请输入机构编码"></el-input>
              </el-form-item>
              <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
              <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 进入智能管理子系统</i></el-button>
              <div class="clear"></div>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="id"
            label="类型"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="内容">
          </el-table-column>
          <el-table-column
            prop="type"
            label="时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="标准">
          </el-table-column>
          <el-table-column
            prop="amount2"
            label="实际情况">
          </el-table-column>
          <el-table-column
            prop="amount3"
            label="备注">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [{
          label: '管道公司',
          children: [{
            label: '设备管理处',
            children: [{
              label: '运行一班'
            }, {
              label: '运行二班'
            }, {
              label: '运行三班'
            }]
          }, {
            label: '保障管理处',
            children: [{
              label: '检修一班',
            }, {
              label: '检修一班'
            }]
          }]
        }],
        tableData: [{
          id: '基础管理',
          name: '班组出勤率',
          type: '2020/03/01-2020/03/31',
          amount1: '32',
          amount2: '30',
          amount3: '新增一个员工'
        }, {
          id: '日常管理',
          name: '设备运行',
          type: '2020/03/01-2020/03/31',
          amount1: '165',
          amount2: '165',
          amount3: '设备更换一次'
        }, {
          id: '日常管理',
          name: '日常巡检',
          type: '2020/03/01-2020/03/31',
          amount1: '165',
          amount2: '165',
          amount3: 12
        }, {
          id: '安全管理',
          name: '隐患排查',
          type: '2020/03/01-2020/03/31',
          amount1: '0',
          amount2: '5',
          amount3: 9
        }, {
          id: '安全管理',
          name: '设备故障',
          type: '2020/03/01-2020/03/31',
          amount1: '0',
          amount2: '15',
          amount3: 9
        }, {
          id: '安全管理',
          name: '人员伤亡',
          type: '2020/03/01-2020/03/31',
          amount1: '0',
          amount2: '死0,伤1',
          amount3: 17
        }, {
          id: '文化建设',
          name: '学习文件精神',
          type: '2020/03/01-2020/03/31',
          amount1: '5',
          amount2: '5',
          amount3: 15
        }, {
          id: '文化建设',
          name: '举办职工活动',
          type: '2020/03/01-2020/03/31',
          amount1: '15',
          amount2: '15',
          amount3: 15
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        total: 10,
        currentPage: 1,
        pageSize: 10,
        searchForm:{}
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data)
      },
      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      handleNodeClick(val){

      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 3 === 0) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    margin:0px;
    padding:0px;
  .content-main {
    width: 100%;
    padding-top: 5px;
    height: calc(100vh - 150px) !important;
    display: flex;
    flex-wrap: nowrap;
    .left-content {
      width: 15%;
      height: calc(100vh - 150px) !important;
      background-color: #ffffff;
      overflow: auto;
      .sbTree{
          width: 100%;
      }
    }
  .right-content {
    width: 85%;
    height: calc(100vh - 150px) !important;
    margin: 0px;
    overflow: auto;
    background-color: #ffffff;
  }
  .header {
    padding: 10px 0px;
  }
  }
  .footer {
    border-top:1px solid #f3f3f3;
    text-align: center;
    height: 44px;
    background: #fff;
  }
  }
</style>

