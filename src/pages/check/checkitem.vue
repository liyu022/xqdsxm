<template>
  <div class="content">
    <div class="content-main">
      <div class="right-content">
        <div class="header">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px;margin-left:10px;" label="" prop="" class="">
              <el-form-item class="" label="考核项" prop="item">
                <el-input v-model="searchForm.item" size="mini" placeholder="请输入考核项"></el-input>
              </el-form-item>
              <el-form-item class="" label="指标类型" prop="level">
                <el-select v-model="searchForm.level" size="mini" placeholder="请输入指标类型">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="一级指标" value="一级指标"></el-option>
                  <el-option label="二级指标" value="二级指标"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="" label="考核方式" prop="level">
                <el-select v-model="searchForm.stanard" size="mini" placeholder="请选择考核方式">
                  <el-option label="全部" value=""></el-option>
                    <el-option label="加分" value="加分"></el-option>
                    <el-option label="扣分" value="扣分"></el-option>
                    <el-option label="加分或扣分" value="加分或扣分"></el-option>
                  </el-select>
              </el-form-item>
              <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
              <el-button @click="deleteData()" type="primary"><i class="el-icon-delete"> 删除</i></el-button>
              <el-button @click="showAdd()" type="primary"><i class="el-icon-circle-plus-outline"> 添加</i></el-button>
              <el-button @click="updateFormDia()" type="primary"><i class="el-icon-edit-outline"> 修改</i></el-button>
              <el-button @click="showBhFormDia()" type="primary"><i class="el-icon-info"> 详情</i></el-button>
           <!--   <el-button @click="importData()" type="primary"><i class="el-icon-upload2"> 导入</i></el-button>
              <el-button @click="exportData()" type="primary"><i class="el-icon-download"> 导入</i></el-button>-->
              <div class="clear"></div>
            </el-form-item>
          </el-form>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                  style="width: 100%;height: 100%!important;overflow:auto;"
                  row-class-name="row_class"
                  border
                  :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column align="center" prop="item" label="考核项" width="120"></el-table-column>
          <el-table-column align="center" prop="level" label="指标类型" width="100"></el-table-column>
          <el-table-column align="center" prop="content" label="一级指标" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="resolve" label="二级指标分解" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="quantizate" label="指标量化"  show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="accord" label="判定依据"  show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="stanard" label="考核方式" width="90"></el-table-column>
          <el-table-column align="center" prop="means" label="考核标准" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="type" label="类型" width="120"></el-table-column>
        </el-table>
       <el-dialog :title="title"
        custom-class="dialog"
        :modal="modal"
        :before-close="resetForm" :visible.sync="showDetail" width="800px"
        :close-on-click-modal="modal" @close="resetForm">
         <div class="dialog_warp" v-if="!issh">
           <el-form ref="form" :model="form" label-width="80px">
               <el-form-item label="考核项">
                 <el-input v-model="form.item" placeholder="请输入考核项"></el-input>
               </el-form-item>
               <el-form-item label="指标类型">
                 <el-select v-if="!showxq" v-model="form.level" placeholder="请选择指标类型">
                   <el-option label="一级指标" value="一级指标"></el-option>
                   <el-option label="二级指标" value="二级指标"></el-option>
                 </el-select>
                 <el-input v-if="showxq" v-model="form.level"></el-input>
               </el-form-item>
               <el-form-item label="一级指标">
                   <el-input v-model="form.content" placeholder="请输入一级指标"></el-input>
               </el-form-item>
               <el-form-item label="二级指标分解">
                   <el-input v-model="form.resolve" placeholder="请输入二级指标分解"></el-input>
               </el-form-item>
               <el-form-item label="指标量化">
                   <el-input v-model="form.quantizate" placeholder="请输入指标量化"></el-input>
               </el-form-item>
               <el-form-item label="判定依据">
                   <el-input v-model="form.accord" placeholder="请输入判定依据"></el-input>
               </el-form-item>
               <el-form-item label="考核方式">
                 <el-select v-if="!showxq" v-model="form.stanard" placeholder="请选择考核方式">
                   <el-option label="加分" value="加分"></el-option>
                   <el-option label="扣分" value="扣分"></el-option>
                   <el-option label="加分或扣分" value="加分或扣分"></el-option>
                 </el-select>
                 <el-input v-if="showxq" v-model="form.stanard"></el-input>
               </el-form-item>
               <el-form-item label="考核标准">
                 <el-input v-model="form.means" placeholder="请输入考核标准"></el-input>
               </el-form-item>
               <el-form-item label="类型">
                 <el-input v-model="form.type" placeholder="请输入类型"></el-input>
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
  import * as api from '../../api/check'
  export default {
    data(){
      return{
        form:{},
        defaultProps: {
          label: 'NAME',
          children: 'children'
        },
        tableData:[],
        title:'',
        modal:false,
        total:10,
        showDetail:false,
        showxq:false,
        isadd:false,
        issh:false,
        multipleSelection:[],
        searchForm:{},
        currentPage: 1,
        pageSize: 10,
      }
    },
    mounted () {
      this.selectAllDate()
    },

    methods:{
      formatterType (val) {
        if (val === '0') {
          return '一级';
        } else if (val === '1') {
          return '二级';
        } else {
          return '三级';
        }
      },
      formatterStatus (val) {
        if (val === '0') {
          return '使用中';
        } else if (val === '1') {
          return '已禁用';
        } else {
          return '其他';
        }
      },
      formatterTime (val) {
        let va = val.createtime.replace('.000+0000', '').replace('T', ' ')
        return va;
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
          'item': this.searchForm.item,
          'type': this.searchForm.type,
          'content': this.searchForm.content,
          'resolve': this.searchForm.resolve,
          'level': this.searchForm.level
        };
        api.selectCheckitem(param).then(res => {
          if (res.data.code === 0) {
            this.tableData=res.data.data.list
            this.total = res.data.data.total
          }
        })
      },
      handleClickChange(zzjgdata){
        this.form.pid = zzjgdata.ID
        this.selectAllDate()
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
        if (this.multipleSelection.length > 0) {
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
            api.deleteCheckitem({'ids':djbharr}).then(res => {
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
          this.$message({type: 'error', message: '请选选择要删除的数据'})
        }
      },
      subimetForm(){
        api.addCheckitem(JSON.stringify(this.form)).then(res => {
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
        api.updateCheckitem(JSON.stringify(this.form)).then(res => {
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
