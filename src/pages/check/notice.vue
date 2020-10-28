<template>
  <div class="content">
    <div class="content-main">
      <div class="right-content">
        <div class="header">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px;margin-left:10px;" label="" prop="" class="">
              <el-form-item class="" label="审批状态" prop="status">
                <el-select v-model="searchForm.status" size="mini" placeholder="请选择审批状态">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="已通过" value="已通过"></el-option>
                  <el-option label="未通过" value="未通过"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="" label="考核等级" prop="type">
                <el-select v-model="searchForm.type" size="mini" placeholder="请选择考核等级">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="一级指标" value="一级指标"></el-option>
                  <el-option label="二级指标" value="二级指标"></el-option>
                </el-select>
              </el-form-item>
              <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
              <el-button @click="notice()" type="primary"><i class="el-icon-s-check"> 下达</i></el-button>
              <el-button @click="showBhFormDia()" type="primary"><i class="el-icon-info"> 详情</i></el-button>
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
          <el-table-column align="center" prop="name" label="制度名称" width="200"></el-table-column>
          <el-table-column align="center" prop="status" label="审批状态" width="100"></el-table-column>
          <el-table-column align="center" prop="cycle" label="考核周期" width="100"></el-table-column>
          <el-table-column align="center" prop="type" label="考核等级" width="120"></el-table-column>
          <el-table-column align="center" prop="valid" label="有效人数"  width="100"></el-table-column>
          <el-table-column align="center" prop="createtime" label="创建时间" width="180" :formatter="formatterTime"></el-table-column>
          <el-table-column align="center" prop="content" label="考核制度内容" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-dialog :title="title"
                   custom-class="dialog"
                   :modal="modal"
                   :before-close="resetForm" :visible.sync="showDetail" width="700px"
                   :close-on-click-modal="modal" @close="resetForm">
          <div class="dialog_warp" v-if="!issh">
            <el-form ref="form" :model="form" label-width="80px">
              <el-row>
                <el-form-item label="制度名称">
                  <el-input v-model="form.name" style="width:210px;" disabled></el-input>
                </el-form-item>
                <el-form-item label="考核等级">
                  <el-input v-model="form.type" style="width:210px;" disabled></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="审批状态" style="width:100%;">
                  <el-select v-if="showxq" v-model="form.status" placeholder="请选择审批意见" style="width:210px;">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="通过" value="已通过"></el-option>
                    <el-option label="未通过" value="未通过"></el-option>
                  </el-select>
                  <el-input v-if="!showxq" v-model="form.status" style="width:210px;"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="审批意见" style="width:100%;">
                  <el-input type="textarea" v-model="form.approvesuggest"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer" v-if="isadd">
           <el-button @click="resetForm">取 消</el-button>
           <el-button type="primary" @click="subimetForm">添 加</el-button>
         </span>
          <span slot="footer" class="dialog-footer" v-if="!isadd">
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
  import * as approve from '../../api/approve'
  export default {
    data(){
      return{
        form:{},
        searchForm:{},
        value: [],
        tableData:[],
        title:'',
        modal:false,
        total:10,
        showDetail:false,
        showxq:false,
        isadd:false,
        issh:false,
        multipleSelection:[],
        currentPage: 1,
        pageSize: 10,
      }
    },
    mounted () {
      this.selectAllDate()
    },

    methods:{
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
          'status': this.searchForm.status,
          'name': this.searchForm.name,
          'type': this.searchForm.type,
          'id': this.searchForm.id
        };
        approve.selectApproveIndexList(param).then(res => {
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
      notice(){
        if (this.multipleSelection.length ===1) {
          this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
          if(this.form.status==='已通过'){
            this.$message({
              showClose: true,
              message: '制度已经审批！',
              type: 'error'
            });
            return
          }else{
            this.title='审批'
            this.showDetail=true
            this.showxq=true
            this.isadd=true
          }
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
          this.title='查询详情'
          this.showDetail=true
          this.showxq=false
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
      subimetForm(){
        this.form.checkindexid=this.form.id
        approve.addApproveIndex(JSON.stringify(this.form)).then(res => {
          if(res.data.code===0){
            this.$message({
              type: 'success',
              message: '审批成功!'
            })
            this.selectAllDate()
          }else{
            this.$message({
              type: 'error',
              message: '审批失败!'
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
      },
      saveForm(){
        if(this.id!==''){
          let param={
            'id':this.id,
            'ids':this.idlist
          }
          api.updateCheckdetail(param).then(res => {
            if(res.data.code===0){
              this.$message({
                type: 'success',
                message: '配置成功!'
              })
              this.selectAllDate()
            }else{
              this.$message({
                type: 'error',
                message: '配置失败!'
              })
            }
            this.resetForm()
          })
        }
      },
      handleChange(key) {
        this.idlist =key.toString()
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
</style>
