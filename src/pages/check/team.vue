<template>
  <div class="content">
    <div class="content-main">
      <div class="left-content">
        <div class="sbTree" style="border:none;padding-top:10px;">
          <el-tree :data="treedata" :props="defaultProps" :highlight-current="true" @node-click="handleClickChange"></el-tree>
        </div>
      </div>
      <div class="right-content">
        <div class="header">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-form-item class="" label="姓名" prop="username">
                <el-input v-model="searchForm.name" size="mini" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item class="" label="联系电话" prop="phone">
                <el-input v-model="searchForm.phone" size="mini" placeholder="请输入联系电话"></el-input>
              </el-form-item>
              <!-- <li><i class="el-icon-download"> 导出</i></li>-->
              <el-button @click="deleteData()" type="primary"><i class="el-icon-delete"> 删除</i></el-button>
              <el-button @click="showAdd()" type="primary"><i class="el-icon-edit-outline"> 添加</i></el-button>
              <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
              <el-button @click="updateForm()" type="primary"><i class="el-icon-setting"> app授权</i></el-button>
              <div class="clear"></div>
            </el-form-item>
          </el-form>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                  row-class-name="row_class"
                  border
                  style="width: 100%;overflow:auto;"
                  :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
            <template slot-scope="scope">
              <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
              <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名"  width="100"></el-table-column>
          <el-table-column align="center" prop="username" label="用户名" width="90"></el-table-column>
          <el-table-column align="center" prop="phone" label="联系电话" width="120"></el-table-column>
          <el-table-column align="center" prop="isenabled" label="状态" width="80"></el-table-column>
          <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
          <el-table-column align="center" prop="authorize" label="app授权" width="90"></el-table-column>
          <el-table-column align="center" prop="updatetime" label="创建时间" width="160" :formatter="formatterTime"></el-table-column>
        </el-table>

        <el-dialog :title="title"
                   custom-class="dialog"
                   :modal="modal"
                   :before-close="resetForm" :visible.sync="showDetail" width="400px"
                   :close-on-click-modal="modal" @close="resetForm">
          <div class="dialog_warp" v-if="!issh">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="姓名">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-if="!showxq" v-model="form.isenabled" placeholder="请选择状态">
                  <el-option label="启用" value="启用"></el-option>
                  <el-option label="禁用" value="禁用"></el-option>
                </el-select>
                <el-input v-if="showxq" v-model="form.isenabled"></el-input>
              </el-form-item>
              <el-form-item label="app授权">
                <el-select v-if="!showxq" v-model="form.authorize" placeholder="请选择app授权">
                  <el-option label="已授权" value="已授权"></el-option>
                  <el-option label="未授权" value="未授权"></el-option>
                </el-select>
                <el-input v-if="showxq" v-model="form.authorize"></el-input>
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
  import * as api from '../../api/system'
  import * as check from '../../api/check'
  export default {
    data(){
      return{
        form:{},
        defaultProps: {
          label: 'NAME',
          children: 'childern'
        },
        tableData:[],
        treedata: [],
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
      this.selectTreeDate()
    },

    methods:{
      formatterTime (val) {
        let va = val.updatetime.replace('.000+0000', '').replace('T', ' ')
        return va;
      },
      handleSelectionChange(val) {
        this.multipleSelection=val
      },
      selectTreeDate(){
        api.selectOrganizationTree().then(res => {
          if (res.data.code === 0) {
            this.treedata = res.data.data
          }
        })
      },
      showSearch () {
        this.selectAllDate()
      },
      selectAllDate(){
        let param={
          'currentPage':this.currentPage,
          'pageSize':this.pageSize,
          'id': this.form.id,
          'orgid': this.form.orgid,
          'name': this.searchForm.name,
          'phone': this.searchForm.phone
        };
        check.selectResultqd(param).then(res => {
          console.dir(res)
          if(res.data.data!=null){
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          }
        })
      },
      handleClickChange(treedata){
        this.form.orgid = treedata.ID
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
      updateFormDia(row,index){
        this.title='编辑'
        this.showDetail=true
        this.isadd=false
        this.showxq=false
        this.form = JSON.parse(JSON.stringify(row))
      },
      updateForm(){
        if (this.multipleSelection.length ===1) {
          this.title='编辑'
          this.showDetail=true
          this.isadd=false
          this.showxq=false
          this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
          this.id = this.form.id
        }else{
          this.$message({
            showClose: true,
            message: '不行！必须选择一条数据',
            type: 'error'
          })
        }
      },
      showBhFormDia(row){
        this.title='详情'
        this.showDetail=true
        this.showxq=true
        this.isadd=false
        this.form = JSON.parse(JSON.stringify(row))
      },
      showAdd(){
        if(this.form.orgid===null||this.form.orgid===''||this.form.orgid===undefined){
          this.$message('请选选择部门')
          return
        }else{
          this.title='添加'
          this.showDetail=true
          this.showxq=false
          this.isadd=true
        }
      },
      deleteData(){
        if (this.multipleSelection.length > 0) {
          this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            let djbharr = ''
            this.multipleSelection.map((item, index) => {
              if(item.dwbm !== '54'){
                djbharr = djbharr + item.id + ','
              }
            })
            djbharr = djbharr.slice(0, djbharr.length - 1)
            check.deleteResultqd({'ids':djbharr}).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.resetForm()
                this.selectTreeDate()
                this.selectAllDate()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.message
                })
                this.selectTreeDate()
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
        check.addResultqd(JSON.stringify(this.form)).then(res => {
          if(res.data.code===0){
            this.resetForm()
            this.selectTreeDate()
            this.selectAllDate()
          }
        })
        this.resetForm()
      },
      editForm(){
        check.updateResultqd(JSON.stringify(this.form)).then(res => {
          if(res.data.code===0){
            this.resetForm()
            this.selectTreeDate()
            this.selectAllDate()
            this.$message({
              type: 'success',
              message: '修改成功!'
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
    display: flex;
    height: calc(100vh - 150px) !important;
  .left-content {
    width: 15%;
    height: calc(100vh - 150px) !important;
    background-color: #ffffff;
    overflow: auto;
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

