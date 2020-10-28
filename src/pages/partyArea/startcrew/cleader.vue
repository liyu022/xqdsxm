<template>
  <div class="content">
    <div class="content-main">
      <div class="left-content">
        <div class="sbTree" style="border:none;padding-top:10px;width:25%;">
          <el-tree :data="treedata" :props="defaultProps" :highlight-current="true" @node-click="handleClickChange" :render-content="renderContent"></el-tree>
        </div>
      </div>
      <div class="right-content">
        <div class="header">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-form-item class="" label="考核领导" prop="nusernameame">
                <el-input v-model="searchForm.username" size="mini" placeholder="请输入考核领导"></el-input>
              </el-form-item>
              <el-form-item label="公司职位" prop="position">
                  <el-select v-model="searchForm.position" placeholder="请选择职位" size="mini">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="处长" value="1"></el-option>
                      <el-option label="副处长" value="2"></el-option>
                      <el-option label="科长" value="3"></el-option>
                      <el-option label="副科长" value="4"></el-option>
                      <el-option label="科员" value="5"></el-option>
                  </el-select>
              </el-form-item>
              <el-button @click="deleteData()" type="primary"><i class="el-icon-delete"> 删除</i></el-button>
              <el-button @click="showAdd()" type="primary"><i class="el-icon-edit-outline"> 添加</i></el-button>
              <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
             <!-- <el-button @click="message()" type="primary"><i class="el-icon-position"> 消息推送</i></el-button>-->
              <div class="clear"></div>
            </el-form-item>
          </el-form>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                  row-class-name="row_class"
                  border
                  style="width: 100%;overflow:auto;border-left:2px solid #EBEEF5;"
                  :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column align="center" class-name="column-caoz" label="操作" width="140">
            <template slot-scope="scope">
              <span style="color:#00a2fd;cursor: pointer;text-align: center;" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
              <span style="color:#00a2fd;cursor: pointer;text-align: center;" @click="showBhFormDia(scope.row)">详情</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="username" label="考核领导" width="100"></el-table-column>
          <el-table-column align="center" prop="position" label="职位" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                  <span>{{ {'1': '处长', '2': '副处长', '3': '科长', '4': '副科长', '5': '科员'}[scope.row.position] }}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" prop="proportion" label="权重" width="100"></el-table-column>
          <el-table-column align="center" prop="planname" label="干部考核计划" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="createtime" label="创建时间" width="200" :formatter="formatterTime"></el-table-column>
        </el-table>

        <el-dialog :title="title"
                   custom-class="dialog"
                   :modal="modal"
                   :before-close="resetForm" :visible.sync="showDetail" width="600px"
                   :close-on-click-modal="modal" @close="resetForm">
          <div class="dialog_warp" v-if="!issh">
            <el-form ref="form" :model="form" label-width="80px":rules="rules" class="demo-ruleForm">
              <el-form-item label="考核领导" style="width:90%;">
                <el-input v-model="form.name" placeholder="请输入考核领导" @click.native="setUserTree"></el-input>
                <div class="tree-container" v-if="usertree">
                  <el-tree
                    :data="userData"
                    class="tree"
                    ref="tree"
                    id="tree"
                    :indent="0"
                    @node-click="handleCheckUser"
                    node-key="id"
                    :props="TProps">
                  </el-tree>
                </div>
              </el-form-item>
              <el-form-item label="公司职位" style="width:90%;">
                  <el-select v-model="form.position" placeholder="请选择职位">
                      <el-option label="处长" value="1"></el-option>
                      <el-option label="副处长" value="2"></el-option>
                      <el-option label="科长" value="3"></el-option>
                      <el-option label="副科长" value="4"></el-option>
                      <el-option label="科员" value="5"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="考核权重" style="width:90%;line-height:80px;" >
                <span style="color:red;">考核权重：根据考核人员的职位对后备人员考核所占比例比如</span><br/>
                <span style="color:red;">例如：权重4指该领导本次考核相对于4个权重是1的人员</span>
                <el-input v-model="form.proportion" placeholder="请输入考核权重"></el-input>
              </el-form-item>
              <el-form-item label="备注信息" style="width:90%;">
                <el-input type="textarea" v-model="form.content"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer" v-if="isadd">
              <el-button @click="resetForm">取 消</el-button>
              <el-button type="primary" @click="subimetForm">添 加</el-button>
          </span>
          <span slot="footer" class="dialog-footer" v-if="showxq&&!isadd">
           <el-button @click="resetForm">取 消</el-button>
           <el-button type="primary" @click="editForm">编 辑</el-button>
         </span>
          <span slot="footer" class="dialog-footer" v-if="!showxq&&!isadd">
              <el-button @click="resetForm">取 消</el-button>
            </span>
        </el-dialog>
      </div>
    </div>
    <el-dialog title="推送消息管理"
               custom-class="dialog"
               :modal="modal"
               :before-close="resetForm" :visible.sync="showMessage" width="500px" height="400px"
               :close-on-click-modal="modal" @close="resetForm">
      <el-form ref="form" :model="form" label-width="80px":rules="rules" class="demo-ruleForm">
        <el-form-item label="考核名称" style="width:90%;">
          <el-input v-model="form.name" placeholder="请输入考核名称"></el-input>
        </el-form-item>
        <el-form-item label="考核班组" style="width:90%;">
          <el-input v-model="form.orgname" placeholder="请输入考核班组"></el-input>
        </el-form-item>
        <el-form-item label="考核类型" style="width:90%;">
          <el-input v-model="form.checktype" placeholder="请输入考核类型"></el-input>
        </el-form-item>
        <el-form-item label="考核结果" style="width:90%;">
          <el-input v-model="form.result" placeholder="请输入考核结果"></el-input>
        </el-form-item>
        <el-form-item label="推送内容" style="width:90%;">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="messageForm">添 加</el-button>
      </span>
    </el-dialog>
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
  import * as api from '../../../api/system'
  import * as check from '../../../api/check'
  import * as leader from '../../../api/leader'
  import * as message from '../../../api/message'
  import * as common from '../../../helper/common'
  export default {
    data(){
      return{
        form:{},
        rules: {
          name: [{ required: true, message: '请输入用户名', trigger: 'change' }]
        },
        defaultProps: {
          label: 'name',
          children: 'children'
        },
        TProps: {
          children: 'childern',
          label: 'name'
        },
        checkindexs:[],
        tableData:[],
        treedata: [],
        usertree: false,
        kaoheshow: false,
        kaohedetailshow: false,
        title:'',
        total:10,
        modal:false,
        showDetail:false,
        showMessage: false,
        showxq:false,
        isadd:false,
        issh:false,
        checkdate: '', //存储选择考核时间的字段
        value: '',//存储选择制度名称
        multipleSelection:[],
        obj: {},//计算存储制度的其他属性
        searchForm:{},
        currentPage: 1,
        pageSize: 10,
        vtableData: [],
        vstableData: [],
        checkindexid: '',
        userData: []
      }
    },
    mounted () {
      this.selectAllDate()
      this.selectTreeDate()
      this.selectCheckIndex()
      this.selectTreeUserDate()
    },

    methods:{
      formatterTime (val) {
        let va = val.createtime.replace('.000+0000', '').replace('T', ' ')
        return va;
      },
      handleSelectionChange(val) {
        this.multipleSelection=val
      },
      selectTreeDate(){
        leader.selectLeaderPlanTree().then(res => {
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
          'userid': this.form.userid,
          'planid': this.form.planid,
          'username': this.searchForm.username,
          'position': this.searchForm.position
        };
        leader.selectLeaderCheckList(param).then(res => {
          if(res.data.data!=null){
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          }
        })
      },
      selectCheckIndexId(param){
        this.obj = this.checkindexs.find((item)=>{//model就是上面的数据源
          return item.name === param;//筛选出匹配数据
        })
      },
      handleCheckType(){
        this.value=''
        this.selectCheckIndex()
      },
      selectCheckIndex(){
        let param={
          'type':'一级指标',
          'pageSize':this.pageSize,
          'cycle':this.form.checktype,
          'currentPage':this.currentPage
        }
        check.selectCheckindex(param).then(res => {
          if(res.data.code === 0){
            this.checkindexs = res.data.data.list
          }else{
            this.$message({
              type: 'error',
              message: '数据加载失败'
            })
          }
        })
      },
      handleClickChange(treedata){
        this.form.planid = treedata.id
        this.form.pid = treedata.pid
        this.selectAllDate()
      },
      handleCheckUser(userData){
        if(userData.type!='0'){
          this.form.userid = userData.id
          this.form.name = userData.name
          this.form.position = userData.position
          
          this.usertree=false
        }else{
          this.$message({
            type: 'error',
            message: '请选择对应的考核干部！'
          })
        }
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.selectAllDate()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.selectAllDate()
      },
      checkFormDia(row,index){
        this.checkindexid = row.id
        if(row.status==="已完成"){
          this.$message('该班组已经考核完成了！')
          return false
        }
        let param={
          'indexid':row.checkindexid
        }
        check.getListByIndexId(param).then(res => {
          if(res.data.data!=null){
            this.vtableData = res.data.data
            this.showDetail=false
            this.kaoheshow=true
            this.form = JSON.parse(JSON.stringify(row))
          }
        })
      },
      updateFormDia(row,index){
        if(row.status==="已完成"){
          this.$message('该班组已经考核完成，不能在修改了')
          return false
        }
        this.title='编辑'
        this.showDetail=true
        this.isadd=false
        this.showxq=true
        this.form = JSON.parse(JSON.stringify(row))
        this.value = this.form.checkindexname
      },
      updateForm(){
        if (this.multipleSelection.length ===1) {
          this.title='编辑'
          this.showDetail=true
          this.isadd=false
          this.showxq=true
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
        if(row.status==="已完成"){
          let param={
            'id':row.id,
            'indexid':row.checkindexid
          }
          check.getLisIndexResultqdById(param).then(res => {
            if(res.data.data!=null){
              this.vstableData = res.data.data
              this.showDetail=false
              this.kaohedetailshow=true
            }
          })
        }else{
          this.title='详情'
          this.showDetail=true
          this.showxq=false
          this.isadd=false
          this.form = JSON.parse(JSON.stringify(row))
          this.value = this.form.checkindexname
        }
      },
      showAdd(){
        if(this.form.planid != null && this.form.planid !='' && this.form.pid != '-1'){
          this.title='添加'
          this.showDetail=true
          this.isadd=true
          this.value=''
          this.form.checktype=''
        }else{
          this.$message('请选选择后备干部考核计划')
          return
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
            leader.deleteLeaderCheck({'ids':djbharr}).then(res => {
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
          let param={
            'planid':this.form.planid,
            'userid':this.form.userid,
            'position':this.form.position,
            'proportion':this.form.proportion,
            'content':this.form.content
          }
          leader.addLeaderCheck(param).then(res => {
            if(res.data.code===0){
              this.resetForm()
              this.selectTreeDate()
              this.selectAllDate()
            }
          })
        this.resetForm()
      },
      editForm(){
        leader.updateLeaderCheck(JSON.stringify(this.form)).then(res => {
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
        this.messageData=[]
        this.kaoheshow=false
        this.kaohedetailshow=false
        this.showMessage=false
        this.value=''
        this.vtableData=[],
          this.vstableData=[],
          this.checkindexid='',
          this.form={}
      },
      message(){
        if (this.multipleSelection.length === 1) {
          this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
          if(this.form.status==='已完成'){
            this.form.checktime = this.form.checktime.replace('.000+0000', '').replace('T', ' ')
            this.showMessage=true
          }else{
            this.form={}
            this.$message({type: 'error', message: '选择的项目包含未完成的消息'})
            this.resetForm()
          }
        } else {
          this.$message({type: 'error', message: '请选选择要推送的消息'})
        }
        this.selectTreeUserDate()
      },
      selectTreeUserDate(){
        api.selectOrganizationTreeUser().then(res => {
          if (res.data.code === 0) {
            this.userData = res.data.data
          }
        })
      },
      renderContent(h, { node, data, store }){
        if(node.data.pid !=='-1'){
          return (<span><i class="el-icon-document"></i>{node.label}</span>)
        }
        return(<span>{node.label}</span>)
      },
      setUserTree(){
        this.usertree=true
      },
      messageForm(){
        let arry =this.$refs.tree.getCheckedNodes()
        let userids=''
        for(let i=0;i<arry.length;i++){
          if(arry[i].type==='1'){
            userids = userids + arry[i].id + ','
          }
        }
        userids = userids.slice(0, userids.length - 1)
        let param = {
          'receiver':userids,
          'pushby': JSON.parse(localStorage.getItem('userid')),
          'content':this.form.content,
          'item':'综合考核',
          'result': '推送成功'
        }
        message.addMessage(param).then(res => {
          if(res.data.code === 0){
            this.$message({type: 'success', message: '消息推送成功！'})
            this.showMessage=false
          }else{
            this.$message({type: 'error', message: '消息推送失败！'})
            this.showMessage=false
          }
        })
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
    width: 25%;
    height: calc(100vh - 150px) !important;
    background-color: #ffffff;
    float: left;
    overflow: auto;
  }
  .right-content {
    width: 75%;
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
  .el-input__inner {
    padding: 0px 30px !important;
  }
  .tree /deep/ .el-tree-node__children {
    padding-left: 16px;
  }

  .tree /deep/ .el-tree-node :last-child:before {
    height: 38px;
  }

  .tree /deep/ .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .tree-container /deep/ .el-tree > .el-tree-node:after {
    border-top: none;
  }

  .tree /deep/ .el-tree-node:before {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .tree /deep/ .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }
  .tree /deep/ .el-tree-node {
    position: relative;
    padding-left: 10px;
  }

  .tree /deep/ .el-tree-node:before {
    border-left: 1px dashed #606266;
    bottom: 0px;
    height: 100%;
    top: -26px;
    width: 1px;
  }

  .tree /deep/ .el-tree-node:after {
    border-top: 1px dashed #606266;
    height: 20px;
    top: 12px;
    width: 24px;
  }

  .tree-container {
    height: 200px;
    overflow-y: auto;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    margin: 6px 0px 20px 0px;
  }
</style>
