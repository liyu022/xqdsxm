<template>
  <div class="content">
    <div class="content-main">
      <div class="content-table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="登陆日期"
            width="150">
          </el-table-column>
            <el-table-column
              prop="name"
              label="用户"
              width="120">
            </el-table-column>
              <el-table-column
                prop="province"
                label="模块描述">
              </el-table-column>
              <el-table-column
                prop="city"
                label="类型"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="上报人员"
                width="200">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="级别"
                width="120">
              </el-table-column>
          <el-table-column
            prop="status"
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
    data(){
      return{
        tableData: [{
          date: '2016-05-03',
          name: '系统管理员',
          province: '推出登陆',
          city: 'ssss',
          address: '管理员',
          status: '已处理',
          zip: '一级隐患'
        }, {
          date: '2016-05-02',
          name: '系统管理员',
          province: '皮带运输机周围温度过高',
          city: '设备隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '一级隐患'
        }, {
          date: '2016-05-04',
          name: '系统管理员',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2016-05-01',
          name: '系统管理员',
          province: '下雨天气，路面湿滑，皮带损坏',
          city: '其他隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2016-05-08',
          name: '系统管理员',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2016-05-06',
          name: '系统管理员',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2020-11-20',
          name: '系统管理员',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2020-11-20',
          name: '系统管理员',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2020-11-20',
          name: '系统管理员',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2020-11-20',
          name: '系统管理员',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }],
        title:'',
        modal:false,
        total:10,
        showDetail:false,
        multipleSelection:[],
        searchForm:{},
        currentPage: 1,
        pageSize: 10,
      }
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection=val
      },
      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
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
    height: calc(100vh - 180px) !important;
    .content-table{
      background-color: #ffffff;
      padding:10px;
    }
  }
  .footer {
    border-top:1px solid #f3f3f3;
    text-align: center;
    height: 44px;
    background: #fff;
  }
  }
  .el-table--border, .el-table--group {
    border-left: 1px solid #EBEEF5;
  }
</style>
