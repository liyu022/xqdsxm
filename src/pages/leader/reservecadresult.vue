<template>
  <div class="hbrs">
    <div class="hd" v-if="isStart">
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
         <el-table-column align="left" class-name="column-caoz" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="showdetail(scope.row, scope.$index)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="hd" v-else>
       <img class="emptybox" src="./../../../static/img/nohb.png" alt="">
    </div>
   
    <el-dialog title="详情" custom-class="dialog"    style="min-height:600px"
          :visible.sync="showDetailPage" width="700px" :close-on-click-modal="modal"  >
           <h1>未推荐人列表</h1>
           <el-table ref="multipleTable" :data="form" tooltip-effect="dark" row-class-name="row_class" border
          style="width: 100%;overflow:auto;" :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}">

 
          <el-table-column align="center" prop="name" label="姓名" width="100"></el-table-column>
          <el-table-column align="center" prop="position" label="职位" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" prop="username" label="用户名"></el-table-column>
          <el-table-column align="center" prop="email" label="员工编号"></el-table-column>
          <el-table-column align="center" prop="hint" label="身份证号"></el-table-column>
        </el-table>


          <span slot="footer" class="dialog-footer" >
            <el-button @click="showDetailPage=false">取 消</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
  import * as approveApi from '@/api/approve'
  export default {
    name: 'MixChart',
    data() {
      return {
        modal: false,
        showDetailPage:false,
        showView:false,
        limit:3,
        multipleSelection:[],
        tableData: [],
        isStart:false,
        planId:'',
        form:{}
      }
    },
    created(){
      let params = {
        uid: JSON.parse(localStorage.getItem('userid'))
      }
      approveApi.selectPlanAndProportion(params).then(res => {
        if (res.data.code == 0) {
          let plan = res.data.data.plan
            for (let i = 0; i < plan.length; i++) {
              if (plan[i].TYPE == '后备干部推荐') {
                this.planId=plan[i].ID
                this.isStart = true
              }
            }
            if (!this.isStart) {
              return
            } else {
               this.gethbcadreitemList()
            }
          

        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
     
    },
    methods:{
      showdetail(row){
        approveApi.selectNoHbcadre({
          planid:row.PLANID,
          hbcardreirtemid:row.ID
        }).then(res=>{
          if (res.data.code==0) {
            this.form=res.data.data
             this.showDetailPage=true
          }
        })
       
      },
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
        let params={
          planid:this.planId
        }
        approveApi.selectHbcadreResultList(params).then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data
          }
        })
      },
    }
  }
</script>

<style   lang="scss">
.emptybox{
     width: 100%;
     height:800px
   }
 
  .hbrs {
    position: relative;
    margin: 10px;
  }

 
  .hbrs .dialog{
    min-height: 600px;
  }
 
 
</style>