<template>
  <div class="chart-container">
    <div class="hd">
      <div class="elrow">
        <span>最多选择{{limit}}位，进行投票，可以不选。</span>
        <span></span>
      </div>
      <div class="table-res">
        <el-table :data="tableData" ref="multipleTable" border style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column label-class-name="DisabledSelection" type="selection" width="55">
          </el-table-column>
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
        <div class="btn-group">
          <el-button size="mini" type="primary" @click="handelSubmit">提 交</el-button>
        </div>
      </div>
    </div>
    <el-dialog
  title="提交预览"
  custom-class="viewPage"
  :visible.sync="showView"
  width="70%">
   <ul v-if="multipleSelection.length==0">
     <li class="empty">你未选择任何人，确认请点击提交</li>
   </ul>
   <ul v-else>
     <li>
       <div class="item">
          <div><span class="label">姓 名 :</span><span>郝星</span></div>
          <div><span class="label">机 构 :</span><span>靖边作业区</span></div>
       </div>
     </li>
   </ul>
  <span slot="footer" class="dialog-footer">
    <el-button @click="showView = false">取 消</el-button>
    <el-button type="primary" @click="showView = false">提 交</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'MixChart',
    data() {
      return {
        showView:false,
        limit:3,
        multipleSelection:[],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
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
      }
    }
  }
</script>

<style   lang="scss">
  .chart-container {
    position: relative;
    width: 95%;
    margin: 0 auto;
    height: calc(100vh - 50px);
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