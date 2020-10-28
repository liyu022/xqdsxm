<template>
  <div class="content">
    <div class="content-main">
      <div class="right-content">
        <div class="header">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px;margin-left:10px;" label="" prop="" class="">
              <el-form-item class="" label="后备干部" prop="name">
                <el-input v-model="searchForm.uncheckname" size="mini" placeholder="请输入后备干部"></el-input>
              </el-form-item>
              <el-form-item class="" label="考核计划" prop="type">
                <el-input v-model="searchForm.planname" size="mini" placeholder="请输入考核计划"></el-input>
              </el-form-item>
              <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
              <el-button @click="deleteData()" type="primary"><i class="el-icon-search"> 删除</i></el-button>
              <el-button @click="showBhFormDia()" type="primary"><i class="el-icon-info"> 详情</i></el-button>
              <div class="clear"></div>
            </el-form-item>
          </el-form>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                  style="width: 100%;height: 100%!important;overflow:auto;"
                  row-class-name="row_class" row-key="id"
                  border
                  :row-style="getRowClass"
                  @selection-change="handleSelectionChange"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column align="center" prop="" label="操作" width="50"></el-table-column>
          <el-table-column align="center" prop="rowno" label="排名" width="50"></el-table-column>
          <el-table-column align="center" prop="" label="考核结果" width="100" :formatter="formatterResult"></el-table-column>
          <el-table-column align="center" prop="total" label="综合得分" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="score" label="考核得分" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="addins" label="加分项" width="75" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="valid" label="有效人数" width="80" :formatter="formatterValid"></el-table-column>
          <el-table-column align="center" prop="uncheckname" label="后备干部" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="name" label="所属单位" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="planname" label="考核计划" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="checkname" label="考核干部" width="80" :formatter="formatterCheckname"></el-table-column>
          <el-table-column align="center" prop="proportion" label="考核权重" width="80" :formatter="formatterProportion"></el-table-column>
          <el-table-column align="center" prop="status" label="考核日期"  width="120"></el-table-column>
        </el-table>
        <el-dialog :title="title"
                   custom-class="dialog"
                   :modal="modal"
                   :before-close="resetForm" :visible.sync="showDetail" width="800px"
                   :close-on-click-modal="modal" @close="resetForm">
          <div class="dialog_warp" v-if="!issh">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="后备干部">
                <el-input v-model="form.uncheckname" placeholder="请输入后备干部"></el-input>
              </el-form-item>
              <el-form-item label="考核计划">
                <el-input v-model="form.planname" placeholder="请输入考核计划"></el-input>
              </el-form-item>
              <el-form-item label="最终考核得分">
                <el-input v-model="form.score" placeholder="请输入最终考核得分"></el-input>
              </el-form-item>
              <el-form-item label="有效考核人数">
                <el-input v-model="form.valid" placeholder="请输入有效考核人数"></el-input>
              </el-form-item>
                <el-form-item label="所属单位">
                <el-input v-model="form.name" placeholder="请输入所属单位"></el-input>
              </el-form-item>
                <el-form-item label="考核日期">
                <el-input v-model="form.status" placeholder="请输入考核日期"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer" v-if="isadd">
           <el-button @click="resetForm">取 消</el-button>
           <el-button type="primary" @click="subimetForm">添 加</el-button>
         </span>
          <span slot="footer" class="dialog-footer" v-if="showDetail&&!isadd&&!showxq&&!issh">
           <el-button @click="resetForm">取 消</el-button>
           <el-button type="primary" @click="editForm">编 辑</el-button>
         </span>
          <span slot="footer" class="dialog-footer" v-if="showxq&&!isadd">
           <el-button @click="resetForm">取 消</el-button>
         </span>
        </el-dialog>
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
  import * as leader from '../../../api/leader'
  export default {
    data(){
      return{
        form:{},
        defaultProps: {
          label: 'NAME',
          children: 'children'
        },
        title:'',
        modal:false,
        total:10,
        showDetail:false,
        showxq:false,
        isadd:false,
        issh:false,
        inum: 0,
        noteid: '',
        multipleSelection:[],
        searchForm:{},
        currentPage: 1,
        pageSize: 10,
        tableData: []
      }
    },
    mounted () {
      this.selectAllDate()
    },

    methods:{
      getRowClass({ row, column, rowIndex, columnIndex }) {
        return "background:#3f5c6d2c !important;";
      },
      formatterTime (val) {
        let va = val.crearetime.replace('.000+0000', '').replace('T', ' ')
        return va;
      },
      formatterValid(val){
        if(val.valid!=undefined){
          return val.valid;
        }else{
          return "-";
        }
      },
      formatterResult(val){
          if(val.valid>=3){
            return <span style='color:green;padding:13px 10px;'>考核有效</span>
          }else if(val.valid==1){
            if(val.checkname == "-"){
              return  <span style='color:red;padding:13px 10px;'>考核无效</span>;
            }else{
              return <span style='color:green;padding:13px 10px;'>考核有效</span>
            }
          }else{
            return <span style='color:red;padding:13px 10px;'>考核无效</span>;
        }
      },
      formatterIndex(val){
        if(val.children!=undefined){
          if(val.id!==this.noteid){
            this.inum=this.inum+1
          }
          this.noteid= val.id
          return this.inum/2;
        }else{
          return "";
        }
      },
      formatterCheckname (val){
       if(val.children!=undefined){
         return "-";
        }else{
          return val.checkname;
        }
      },
      formatterProportion (val){
        if(val.children!=undefined){
          return "-";
        }else{
          return val.proportion;
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection=val
      },
      showSearch () {
        this.selectAllDate()
      },
      selectAllDate(){
        let param={
          'currentPage':this.currentPage,
          'pageSize':this.pageSize,
          'unusername': this.searchForm.uncheckname,
          'planname': this.searchForm.planname
        };
        this.inum=1
        leader.selectLeaderResultList(param).then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.tableData=res.data.data.list
            this.total = res.data.data.total
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.selectAllDate()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.selectAllDate()
      },
      updateFormDia(){
        if (this.multipleSelection.length ===1) {
          this.title='编辑'
          this.showDetail=true
          this.isadd=false
          this.showxq=false
          this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
        }else{
          this.$message({
            showClose: true,
            message: '不行！必须选择一条数据',
            type: 'error'
          });
        }
      },
      showBhFormDia(){
        if (this.multipleSelection.length ===1) {
          this.title='详情'
          this.showDetail=true
          this.showxq=true
          this.isadd=false
          this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
        }else{
          this.$message({
            showClose: true,
            message: '不行！必须选择一条数据',
            type: 'error'
          });
        }
      },
      showAdd(){
        this.title='添加'
        this.showDetail=true
        this.showxq=false
        this.isadd=true
      },
      deleteData(){
        if (this.multipleSelection.length === 1) {
          this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '删除提示框', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            let djbharr = ''
            this.multipleSelection.map((item, index) => {
              djbharr = djbharr + item.id + ','
            })
            djbharr = djbharr.slice(0, djbharr.length - 1)
            leader.deleteLeaderResult({'id':djbharr}).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.selectAllDate()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.message
                })
                this.selectAllDate()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          this.$message({type: 'error', message: '一次只能删除一条数据'})
        }
      },
      subimetForm(){
        this.form.type='手动创建'
        leader.addLeaderResult(JSON.stringify(this.form)).then(res => {
          if(res.data.code===0){
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.selectAllDate()
          }else{
            this.$message({
              type: 'error',
              message: '添加失败!'
            })
          }
          this.resetForm()
        })
      },
      editForm(){
        leader.updateLeaderResult(JSON.stringify(this.form)).then(res => {
          if(res.data.code===0){
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.selectAllDate()
          }else{
            this.$message({
              type: 'error',
              message: '修改失败!'
            })
          }
          this.resetForm()
        })
      },
      resetForm(){
        this.showDetail=false
        this.isadd=false
        this.showxq=false
        this.issh=false
        this.form={}
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
  .right-content {
    width: 100%;
    height: calc(100vh - 150px) !important;
    margin: 0px;
    float: left;
    overflow: hidden;
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
  /deep/ .el-input--suffix .el-input__inner {
    padding-right: 12px !important;
  }
</style>
