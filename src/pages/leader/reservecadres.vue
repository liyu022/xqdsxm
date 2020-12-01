<template>
  <div class="chart-container">
    <div class="hd"  v-if="isStart">
      <div class="elrow">
        <span>最多选择{{limit}}位，进行投票，可以不选。</span>
        <span>
           <el-button type="primary">
                      <el-link target="_blank" href="http://47.108.145.125/xqdsxm/static/file/后备干部基本资料.xls" :underline="false"
                                style="color:#ffffff;">下载模板
                      </el-link>
            </el-button>
          <el-button @click="importData()" type="primary"><i class="el-icon-upload2"> 导入</i></el-button>
        </span>
      </div>
      <div class="table-res">
        <el-table :data="tableData" ref="multipleTable" border style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="bumen" label="部门" width="100">
          </el-table-column>
          <el-table-column prop="zhiwei" label="职务">
          </el-table-column>
          <el-table-column prop="ygbh" label="员工编号">
          </el-table-column>
          <el-table-column prop="username" label="姓名">
          </el-table-column>
          <el-table-column prop="brithday" label="出生年月">
          </el-table-column>
          <el-table-column prop="whcd" label="文化程度">
          </el-table-column>
          <el-table-column prop="ygxs" label="用工形式">
          </el-table-column>
          <el-table-column prop="xrzwsj" label="现任职务时间">
          </el-table-column>
          <el-table-column prop="xrzjsj" label="现任职级时间">
          </el-table-column>
          <el-table-column label-class-name="DisabledSelection" type="selection" width="80" align="center">
          </el-table-column>
        </el-table>
        <div class="btn-group" v-show="isActiveShow">
          <el-button   type="primary" @click="handelSubmit">提 交</el-button>
        </div>
      </div>
    </div>
    <div class="hd"  v-else>
      暂未启动机关考核计划
    </div>
    <el-dialog
  title="提交预览"
  custom-class="viewPage"
  :visible.sync="showView"
  width="800px">
   <ul v-if="multipleSelection.length==0">
     <li class="empty">你未选择任何人，确认请点击提交</li>
   </ul>
   <ul v-else>
     <li >
       <div class="item" v-for="(item,index) in multipleSelection" :key="index">
          <div><span class="label">姓 名 :</span><span>{{item.username}}{{item.USERNAME}}</span></div>
          <div><span class="label">机 构 :</span><span>{{item.bumen}}{{item.BUMEN}}</span></div>
       </div>
     </li>
   </ul>
  <span slot="footer" class="dialog-footer">
    <el-button v-if="isshowView">取 消</el-button>
    <el-button type="primary" v-if="isshowView" @click="summit">提 交</el-button>
  </span>
</el-dialog>
 <el-dialog title="上传数据" :visible.sync="excelDetail" width="800px">
            <div class="dialog_warp">
                <el-form ref="form"  label-width="120px" class="demo-ruleForm">
                    <el-form-item label="导入文件" style="width:100%;">
                        <el-upload
                                action=""
                                class="upload-demo"
                                ref="uploadleaders"
                                :auto-upload="false"
                                :limit="1"
                                accept=".xlsx, .xls"
                                :http-request="uploadSectionFile">
                            <el-button slot="trigger" size="small" type="primary">选择上传文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
                            <div slot="tip" class="el-upload__tip" style="color:#ff0402;">只能上传excel文件,一次只能上传一个文件</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import * as approveApi from '@/api/approve'
  export default {
    name: 'MixChart',
    data() {
      return {
        excelDetail:false,
        showView:false,
        isshowView:false,
        limit:3,
        isActiveShow:true,
        multipleSelection:[],
        tableData: [],
        infoz: JSON.parse(localStorage.getItem('role')),
        isStart:false
      }
    },
    created(){
      let plan = JSON.parse(localStorage.getItem('plan'))
      if(this.infoz[0].name == "系统管理员"){
        this.isActiveShow = false;
        alert("您是系统管理员,不能参加考核!");
      }else{

      for (let i = 0; i < plan.length; i++) {
         if (plan[i].TYPE=='后备干部推荐') {
           this.isStart = true
         }
        
      }
      if (!this.isStart) {
        
        return

      }else{
        this.getUserCheck();
        this.gethbcadreitemList()
      }


        
      }
    },
    methods:{
      importData(){
        this.title = '导入excel数据'
        this.excelDetail = true
      },
       submitUpload() {
            this.$refs.uploadleaders.submit();
        },
        uploadSectionFile(param) {
            let userid = JSON.parse(localStorage.getItem('userid'))
            let fileObj = param.file
            let form = new FormData()
            form.append("file", fileObj)
            form.append("userid", userid)
            approveApi.importhbcadreExcel(form).then(res => {
                if (res.data.code === 0) {
                  this.excelDetail=false
                  this.gethbcadreitemList()
                    this.$message({
                      type:'success',
                      message:'上传成功'
                    })
                }else{
                  this.$message({
                      type:'error',
                      message:'上传失败'
                    })
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
        this.isshowView=true
      },
      summit(){
        let checkuserid =JSON.parse(localStorage.getItem('userid'))
        let arr = this.multipleSelection.map(item =>{
            return {
              checkuserid:checkuserid,
              hbcardreirtemid:item.id
            }
        })
        if (arr.length==0) {
          let ob= {
            checkuserid,
            hbcardreirtemid:null
          }
         arr.push(ob)
        }
     
   
        approveApi.hbcadResultAdds(arr).then(res => {
           if (res.data.code == 0) {
             this.showView=false
             this.isActiveShow = false
             this.$message({
               type:'success',
               message:'推荐成功'
             })
          }
        })
      },
      getUserCheck(){
        let params = {
          userid: JSON.parse(localStorage.getItem('userid'))
        }
        approveApi.hbcadResultByUserId(params).then(res => {
          if (res.data.code === 0) {
            if(res.data.data.length > 0){
              alert("你已经进行推荐过了！不用在推荐了");
              if (res.data.data) {
                this.multipleSelection = res.data.data;
                this.showView = true;
                this.isshowView = false;
                this.isActiveShow = false;
              }
            }
          }
        })
      },
      gethbcadreitemList() {
        let params = {
          currentPage: 1,
          pageSize: 10000,
        }
        approveApi.hbcadreitemList(params).then(res => {
          if (res.data.code == 0) {
            let data = res.data.data
            this.total = data.total
            this.tableData = data.list
          }
        })
      },
    }
  }
</script>
<style  >
.el-table /deep/.DisabledSelection .cell .el-checkbox__inner{
  display:none;
  position:relative;
}
.el-table /deep/.DisabledSelection .cell:before{
  content:"推荐情况";
  position:absolute;
  right :11px;
}
</style>
<style   lang="scss">
.el-checkbox__inner{
  width: 25px;
  height: 25px;
}
.el-checkbox__inner::after{
  width: 15px;
  height: 15px;
  left: 3px;
  top: -3px;
}
 .el-table thead th{
  background: gray;
  color: #000;
}
.app-main {
    overflow: auto !important;
  }

  .el-card {
    overflow: auto !important;
  }
  .chart-container {
    position: relative;
    width: 95%;
    margin: 0 auto;
    height: calc(100vh - 50px);
  }


  
  .elrow {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .btn-group{
    margin-bottom: 20px;
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
          display: inline-block;
            margin: 10px;
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