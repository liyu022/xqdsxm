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
                            <el-button @click="deleteData()" type="danger"><i class="el-icon-delete"> 删除</i></el-button>
                            <el-button @click="showAdd()" type="primary"><i class="el-icon-edit-outline"> 添加</i></el-button>
                            <el-button @click="showSearch()" type="success"><i class="el-icon-search"> 查询</i></el-button>
                            <!-- <el-button @click="showAppAdd()" type="primary"><i class="el-icon-setting"> app授权</i></el-button> -->
                            <el-button @click="importData()" type="primary"><i class="el-icon-upload2"> 导入人员</i></el-button>
                            <el-button  v-if="nobtn" @click="distribution()" type="primary"><i class="el-icon-setting"> 分配角色</i></el-button>
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
                            :selectable='checkboxT'
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
                        <template slot-scope="scope">
                            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
                            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="name" label="姓名" width="100"></el-table-column>
                    <el-table-column align="center" prop="position" label="职位" show-overflow-tooltip>
                        <!-- <template slot-scope="scope">
                            <span>{{ {'1':'处长','2':'副处长','3':'科长','4':'副科长','5':'科员'}[scope.row.position] }}</span>rolename
                        </template> -->
                    </el-table-column>
                    <el-table-column align="center"  label="授权角色名称" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span :class="scope.row.rolename==null?'red':'green'">{{scope.row.rolename==null?'未授权': scope.row.rolename}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="username" label="用户名"  ></el-table-column>
                    <el-table-column align="center" prop="email" label="员工编号"  ></el-table-column>
                    <el-table-column align="center" prop="hint" label="身份证号"    ></el-table-column>
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
                            <el-form-item label="密码" v-if="isadd">
                                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号">
                                <el-input v-model="form.hint" placeholder="请输入身份证号"></el-input>
                            </el-form-item>
                            <el-form-item label="员工编号">
                                <el-input v-model="form.email" placeholder="员工编号"></el-input>
                            </el-form-item>
                             <el-form-item label="app授权" v-if="showxq">
                                <el-input v-model="form.authorize"></el-input>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-select v-if="!showxq" v-model="form.isenabled" placeholder="请选择状态">
                                    <el-option label="启用" value="启用"></el-option>
                                    <el-option label="禁用" value="禁用"></el-option>
                                </el-select>
                                <el-input v-if="showxq" v-model="form.isenabled"></el-input>
                            </el-form-item>
                            <el-form-item label="职位">
                                 <el-input v-model="form.position" placeholder="请输入职位"></el-input>
                                <!-- <el-select v-model="form.position" placeholder="请选择职位">
                                    <el-option label="处长" value="1"></el-option>
                                    <el-option label="副处长" value="2"></el-option>
                                    <el-option label="科长" value="3"></el-option>
                                    <el-option label="副科长" value="4"></el-option>
                                    <el-option label="科员" value="5"></el-option>
                                </el-select> -->
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

                <el-dialog :title="title"
                           custom-class="dialog"
                           :modal="modal"
                           :before-close="resetForm" :visible.sync="showAppDetail" width="400px"
                           :close-on-click-modal="modal" @close="resetForm">
                    <div class="dialog_warp">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="姓名">
                                <el-input v-model="form.name" placeholder="请输入姓名" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="用户名">
                                <el-input v-model="form.username" placeholder="请输入用户名" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="App授权">
                                <el-select placeholder="请选择授权" v-model="form.authorize">
                                    <el-option label="已授权" value="已授权"></el-option>
                                    <el-option label="未授权" value="未授权"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm">取 消</el-button>
            <el-button type="primary" @click="AppForm">确 定</el-button>
          </span>
                    <span slot="footer" class="dialog-footer" v-if="showxq&&!isadd">
            <el-button @click="resetForm">取 消</el-button>
          </span>
                </el-dialog>
            </div>
        </div>
        <!--角色授权-->
        <el-dialog title="角色授权" custom-class="dialog" :visible.sync="showWarrant" width="400px">
            <el-select v-model="warrantValue" placeholder="请选择">
                <el-option v-for="item in warrantList" :key="item.value" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showWarrant = false">取 消</el-button>
                <el-button type="primary" @click="subWarrant">确 定</el-button>
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
import * as api from '../../api/system'
import * as approveApi from '@/api/approve'
export default {
    data() {
        return {
            excelDetail:false,
            form: {},
            defaultProps: {
                label: 'NAME',
                children: 'childern'
            },
            tableData: [],
            treedata: [],
            title: '',
            modal: false,
            total: 10,
            showDetail: false,
            showxq: false,
            isadd: false,
            issh: false,
            showAppDetail: false,
            multipleSelection: [],
            searchForm: {},
            currentPage: 1,
            pageSize: 10,
            //角色授权
            warrantList:[],
            showWarrant:false,
            warrantValue:'',
            id:'',
            nobtn:false
        }
    },
    mounted() {
        this.selectAllDate()
        this.selectTreeDate()
    },
    created(){
        let role = JSON.parse(localStorage.getItem('role'))
      if (role[0].name=='系统管理员') {
        this.nobtn=true
      }else{
        this.nobtn=false
      }
    //   console.log(this.nobtn,role )
    },
    methods: {
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
            approveApi.importUserExcel(form).then(res => {
                if (res.data.code === 0) {
                  this.excelDetail=false
                  this.selectAllDate()
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
        checkboxT(row, rowIndex){
        if(row.rolename=='系统管理员'){
//      if(row.lie =='1'){
          return false;//禁用
        }else{
          return true;//不禁用
        }
      },
        /**
         * 角色授权
         */
        distribution() {
            if (this.multipleSelection.length > 0) {
                // this.id = this.multipleSelection[0].id
                // api.getRoleByUserId(this.id).then(res=>{
                //     if(res.data.data && res.data.data.length >0  && res.data.data[0].id){
                //         this.warrantValue = res.data.data[0].id
                //     }else{
                //         this.warrantValue = undefined
                //     }
                // })
                api.selecRoleList({
                    currentPage: 1,
                    pageSize: 99999999,
                }).then(res => {
                    const list = res.data.data.list
                    this.warrantList = list
                    this.showWarrant = true
                })
               
            } else {
                this.$message({
                    showClose: true,
                    message: '不行！最少选择一条数据',
                    type: 'error'
                })
            }
        },
        /**
         * 提交角色授权
         */
        subWarrant(){
            let idstr=""
            for (let i = 0; i < this.multipleSelection.length; i++) {
                if(i < this.multipleSelection.length-1){
                    idstr += this.multipleSelection[i].id+',';
                }else{
                    idstr += this.multipleSelection[i].id;
                }
                
                
            }
 
            api.userRole({
                loginid:JSON.parse(localStorage.getItem('userid')),
                id:idstr,
                roleid:this.warrantValue
            }).then(res=>{
                if(res.data.code == 0){
                    this.selectAllDate()
                    this.showWarrant = false
                }
            })
        },
        formatterTime(val) {
            let va = val.updatetime.replace('.000+0000', '').replace('T', ' ')
            return va;
        },
        handleSelectionChange(rows) {
        // if (rows.length > 1) {
        //   this.$refs.multipleTable.toggleRowSelection(rows[0], false);
        //   rows.splice(0, 1);
        // }
        this.multipleSelection = rows;
      },
        selectTreeDate() {
            api.selectOrganizationTree().then(res => {
                if (res.data.code === 0) {
                    this.treedata = res.data.data
                }
            })
        },
        showSearch() {
            this.selectAllDate()
        },
        selectAllDate() {
            let param = {
                'currentPage': this.currentPage,
                'pageSize': this.pageSize,
                'id': this.form.id,
                'orgid': this.form.orgid,
                'name': this.searchForm.name,
                'phone': this.searchForm.phone
            };
            api.selecUserList(param).then(res => {
                console.dir(res)
                if (res.data.data != null) {
                    this.tableData = res.data.data.list
                    this.total = res.data.data.total
                }
            })
        },
        handleClickChange(treedata) {
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
        updateFormDia(row, index) {
            this.title = '编辑'
            this.showDetail = true
            this.isadd = false
            this.showxq = false
            this.form = JSON.parse(JSON.stringify(row))
        },
        updateForm() {
            if (this.multipleSelection.length === 1) {
                this.title = '编辑'
                this.showDetail = true
                this.isadd = false
                this.showxq = false
                this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
                this.id = this.form.id
            } else {
                this.$message({
                    showClose: true,
                    message: '不行！必须选择一条数据',
                    type: 'error'
                })
            }
        },
        showBhFormDia(row) {
            this.title = '详情'
            this.showDetail = true
            this.showxq = true
            this.isadd = false
            this.form = JSON.parse(JSON.stringify(row))
        },
        showAdd() {
            if (this.form.orgid === null || this.form.orgid === '' || this.form.orgid === undefined) {
                this.$message('请选选择部门')
                return
            } else {
                this.title = '添加'
                this.showDetail = true
                this.showxq = false
                this.isadd = true
            }
        },
        deleteData() {
            if (this.multipleSelection.length > 0) {
                this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    let djbharr = ''
                    this.multipleSelection.map((item, index) => {
                        if (item.dwbm !== '54') {
                            djbharr = djbharr + item.id + ','
                        }
                    })
                    djbharr = djbharr.slice(0, djbharr.length - 1)
                    api.deleteUserAll({'ids': djbharr}).then(res => {
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
        showAppAdd() {
            if (this.multipleSelection.length === 1) {
                this.title = 'App授权'
                this.showDetail = false
                this.isadd = false
                this.showxq = false
                this.showAppDetail = true
                this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
                this.id = this.form.id
            } else {
                this.$message({
                    showClose: true,
                    message: '不行！只能选择一条数据',
                    type: 'error'
                })
            }
        },
        AppForm() {
            let param = {
                'id': this.form.id,
                'authorize': this.form.authorize
            }
      
            api.appPower(param).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '授权成功!'
                    })
                    this.resetForm()
                    this.selectTreeDate()
                    this.selectAllDate()
                } else {
                    this.$message({
                        type: 'error',
                        message: '授权失败!'
                    })
                    this.resetForm()
                    this.selectTreeDate()
                    this.selectAllDate()
                }
            })
        },
        subimetForm() {
            api.addUser(JSON.stringify(this.form)).then(res => {
                if (res.data.code === 0) {
                    this.resetForm()
                    this.selectTreeDate()
                    this.selectAllDate()
                }
            })
            this.resetForm()
        },
        editForm() {
            api.updateUser(JSON.stringify(this.form)).then(res => {
                if (res.data.code === 0) {
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
        resetForm() {
            this.showDetail = false
            this.isadd = false
            this.showxq = false
            this.issh = false
            this.showAppDetail = false
            this.form = {}
        }
    }
}
</script>
<style lang="scss" scoped>
.red{
    color: red;
}
.green{
    color: green;
}
.content {
  margin: 0px;
  padding: 0px;

  .content-main {
    width: 100%;
    padding-top: 5px;
    height: calc(100vh - 150px) !important;
    display: flex;
    flex-wrap: nowrap;
    .left-content {
      width: 15%;
      height: calc(100vh - 150px) !important;
      background-color: #ffffff;
      overflow: auto;
      .sbTree{
          width: 100%;
      }
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
    border-top: 1px solid #f3f3f3;
    text-align: center;
    height: 44px;
    background: #fff;
  }
}
</style>

