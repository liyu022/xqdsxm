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
                   <el-form-item class="" label="违章名称" prop="name">
                       <el-input v-model="searchForm.name" size="mini" placeholder="请输入违章名称"></el-input>
                   </el-form-item>
                   <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
                   <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 进入智能监督子系统</i></el-button>
                   <div class="clear"></div>
               </el-form-item>
           </el-form>
       </div>
        <el-table
          :data="tableData"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="id"
            label="责任人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            width="250"
            label="内容">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="amount2"
            label="级别">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
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
          id: '李佳奇',
          name: '绞车机房工作区域抽烟',
          type: '人工上报',
          amount1: '2020-03-21',
          amount2: '一级',
          status: '已处理',
          amount3: '学习制度一次'
        }, {
          id: '李佳奇',
          name: '检修设备未关闭电源',
          type: '人工上报',
          amount1: '2020-03-21',
          amount2: '一级',
          status: '已处理',
          amount3: '学习制度一次'
        }, {
          id: '李佳奇',
          name: '故障操作未带安全帽',
          type: '人工上报',
          amount1: '2020-03-21',
          amount2: '一级',
          status: '已处理',
          amount3: '学习制度一次'
        }, {
          id: '李佳奇',
          name: '隐患排查',
          type: '人工上报',
          amount1: '2020-03-21',
          amount2: '一级',
          status: '已处理',
          amount3: '学习制度一次'
        }, {
          id: '李佳奇',
          name: '设备故障',
          type: '人工上报',
          amount1: '2020-03-21',
          amount2: '一级',
          status: '已处理',
          amount3: '学习制度一次'
        }, {
          id: '李佳奇',
          name: '人员伤亡',
          type: '自动识别',
          amount1: '2020-03-21',
          amount2: '一级',
          status: '已处理',
          amount3: '学习制度一次'
        }, {
          id: '李佳奇',
          name: '学习文件精神',
          type: '自动识别',
          amount1: '2020-03-21',
          amount2: '一级',
          status: '已处理',
          amount3: '学习制度一次'
        }, {
          id: '李佳奇',
          name: '举办职工活动',
          type: '自动识别',
          amount1: '2020-03-21',
          amount2: '一级',
          status: '已处理',
          amount3: '学习制度一次'
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
  .left-content {
    width: 20%;
    height: calc(100vh - 150px) !important;
    background-color: #ffffff;
    float: left;
    overflow: auto;
  }
  .right-content {
    width: 80%;
    height: calc(100vh - 150px) !important;
    margin: 0px;
    float: left;
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

