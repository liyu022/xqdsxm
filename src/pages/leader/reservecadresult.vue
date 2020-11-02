<template>
  <div class="chart-container">
    <div class="hd">
      <div class="table-res">
        <el-table :data="tableData" ref="multipleTable" border style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="index" label="排名" width="60">
          </el-table-column>
          <el-table-column prop="USERNAME" label="姓名" width="80" align="center">
          </el-table-column>
          <el-table-column prop="entotal" label="已推荐人数" width="100" align="center">
          </el-table-column>
          <el-table-column prop="total" label="需要推荐人数" width="110" align="center">
          </el-table-column>
          <el-table-column prop="BUMEN" label="部门" align="center">
          </el-table-column>
          <el-table-column prop="ZHIWEI" label="职务" align="center">
          </el-table-column>
          <el-table-column prop="YGBH" label="员工编号" width="100" align="center">
          </el-table-column>
          <el-table-column prop="BRITHDAY" label="出生年月" width="100" align="center">
          </el-table-column>
          <el-table-column prop="WHCD" label="文化程度" width="100" align="center">
          </el-table-column>
          <el-table-column prop="YGXS" label="用工形式" width="100" align="center">
          </el-table-column>
          <el-table-column prop="XRZJSJ" label="现任职务时间" align="center">
          </el-table-column>
          <el-table-column prop="XRZWSJ" label="现任职级时间" align="center">
          </el-table-column>
         
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import * as approveApi from '@/api/approve'
  export default {
    name: 'MixChart',
    data() {
      return {
        showView:false,
        limit:3,
        multipleSelection:[],
        tableData: []
      }
    },
    created(){
      this.gethbcadreitemList()
    },
    methods:{
      handleSelectionChange(rows){
        if(rows.length > this.limit){  //单选时为1，需要选择n项改数值为n就可以     
        this.$refs.multipleTable.toggleRowSelection(rows[0],false);//超出指定选择个数后，把第一个选中的selection设为false
        rows.splice(0,1);//同时要把选中第一项移除
      }
      this.multipleSelection= rows;
      },
      handelSubmit(){
        this.showView=true
        console.log(this.multipleSelection,555)
      },
      gethbcadreitemList() {
        approveApi.selectHbcadreResultList().then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data
          }
        })
      },
    }
  }
</script>

<style   lang="scss">
  .chart-container {
    position: relative;
    margin: 10px;
  }

.el-table >>> .DisabledSelection .cell .el-checkbox__inner {
  display: none;
  position: relative;
}
  
  .elrow {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .btn-group{
    text-align: center;
    line-height: 50px;
  }
  .viewPage{
    top: 10%;
    .el-dialog__header{
      background: #97a8be;
    }
    .el-dialog__title,.el-dialog__headerbtn .el-dialog__close{
      font-weight: 800;
      color: #fff;
    }
    
    ul{
      li{
        list-style: none;
        min-height: 200px;
        .item{
          >div{
            line-height: 30px;
            .label{
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
      .empty{
        height: 200px;
        line-height: 200px;
        text-align: center;
        font-size: 20px;
      }
    }
  }
</style>