<template>
  <div class="content">
    <div class="content-main">
      <div class="right-content">
        <div class="header">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px;margin-left:10px;" label="" prop="" class="">
              
              <el-form-item class="" label="考核计划类型" prop="type">
                <el-select v-model="searchForm.type" size="mini" placeholder="请选择考核计划类型">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="科级干部考核" value="科级干部考核"></el-option>
                  <el-option label="后备干部推荐" value="后备干部推荐"></el-option>
                </el-select>
              </el-form-item>
              <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
              <el-button @click="deleteData()" type="primary"><i class="el-icon-delete"> 删除</i></el-button>
              <el-button @click="showAdd()" type="primary"><i class="el-icon-circle-plus-outline"> 添加</i></el-button>
              <!-- <el-button @click="setting()" type="primary"><i class="el-icon-setting"> 手动配置</i></el-button> -->
              <div class="clear"></div>
            </el-form-item>
          </el-form>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
          style="width: 100%;height: 100%!important;overflow:auto;" row-class-name="row_class" border
          :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column align="left" class-name="column-caoz" label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="updateFormDia(scope.row, scope.$index)">编辑</el-button>
              <el-button type="primary" size="mini" @click="showdetail(scope.row, scope.$index)">详情</el-button>
              <el-button type="info" v-if="scope.row.TYPE!='后备干部推荐' && scope.row.STATE=='已创建'" size="mini" @click="handelS(scope.row)">选择人员</el-button>
              <el-button type="success" size="mini" v-if="scope.row.STATE=='已创建'" @click="startUp(scope.row)">启动考核
              </el-button>
              <el-button type="danger" size="mini" v-if="scope.row.STATE=='已启动'" @click="shurDown(scope.row)">停止考核
              </el-button>
              <!-- <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span> -->
            </template>
          </el-table-column>
          <el-table-column align="center" prop="NAME" label="考核计划名称" width="260"></el-table-column>
          <el-table-column align="center" label="考核类型" width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.TYPE=='后备干部推荐'" style="color:#F56C6C">{{scope.row.TYPE}}</span>
              <span v-else style="color:#67C23A">{{scope.row.TYPE}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="DATA" label="考核时间" width="150"></el-table-column>
          <el-table-column align="center" prop="STATE" label="考核计划状态"></el-table-column>
          <el-table-column align="center" prop="CREATETIME" label="创建时间"></el-table-column>
        </el-table>

        <el-dialog :title="title" custom-class="dialog" :modal="modal" :before-close="resetForm"
          :visible.sync="showDetail" width="700px" :close-on-click-modal="modal" @close="resetForm">
          <div class="dialog_warp" v-if="!issh">
            <el-form ref="form" :model="form" label-width="120px" class="demo-ruleForm">
              <el-row>
                <el-form-item label="考核计划名称">
                  <el-input v-model="form.NAME" placeholder="请输入考核计划名称" style="width:400px;"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="isadd">
                <el-form-item label="计划类型">
                  <el-select v-model="form.TYPE" placeholder="请选择" value-key>
                    <el-option label="科级干部考核" value="科级干部考核">
                    </el-option>
                    <el-option label="后备干部推荐" value="后备干部推荐">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog custom-class="dialog" title="选择被考核人" :visible.sync="showUser" width="70%" :close-on-click-modal="modal"
      @close="showUser=false">
      <div class="dialog_warps">
        <div class="header">
          <el-form :inline="true" :model="uForm" ref="uForm" class="uForm">
            <el-form-item style="margin-bottom: 0px" prop="" label="组织单位">
              <div class="tbdw">
                <el-tree :accordion="true" :data="tbdwList" node-key="id" :default-expanded-keys="[zkx]"
                  :props="defaultTreeProps" @node-click="handleNodeClick"></el-tree>
              </div>
              <el-input class="selectDw" v-model="selectDw" size="mini" placeholder="请选择单位" @focus="selectDwTree">
                <i class="el-icon-error" slot="suffix" @click="handleIconClick">
                </i>
              </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" prop="" label="人员名称">
              <el-input   v-model="uForm.name" size="mini" placeholder="请输入人员姓名"  >
              </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px" prop="" label="级别">
              <el-select v-model="uForm.rolename" placeholder="请选择" value-key>
                 <el-option label="全部" value="">
                    </el-option>
                    <el-option label="站队一般员工" value="站队一般员工">
                    </el-option>
                    <el-option label="机关一般员工" value="机关一般员工">
                    </el-option>
                    <el-option label="站队长" value="站队长">
                    </el-option>
                    <el-option label="机关科室长" value="机关科室长">
                    </el-option>
                    <el-option label="处领导" value="处领导">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="selectUserDate">查 询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="mini" @click="submitUser">提 交</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tableC">
          <el-table ref="multipleTableUser" v-loading="loadings" element-loading-text="正在加载，请稍后..."
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" :data="userData"
            tooltip-effect="dark" row-class-name="row_class" border style="width: 100%;overflow:auto;"
            :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}"
            @selection-change="handleSelectionChangeUser">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column align="center" prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column align="center" prop="rolename" label="授权角色" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" prop="username" label="用户名"></el-table-column>
            <el-table-column align="center" prop="email" label="员工编号"></el-table-column>
            <el-table-column align="center" prop="hint" label="身份证号"></el-table-column>
          </el-table>
        </div>
         <div class="footer">
      <el-pagination @size-change="handleSizeChangeU" @current-change="handleCurrentChangeU" :current-page="currentPageU"
        layout="total, sizes, prev, pager, next, jumper" :total="totalU">
      </el-pagination>
    </div>
      </div>
      <span slot="footer" class="dialog-footer" v-if="isadd">
        <el-button @click="showUser=false">取 消</el-button>
        <el-button type="primary">添 加</el-button>
      </span>

    </el-dialog>

    <el-dialog custom-class="dialog" title="详情" :visible.sync="showDetailPage" width="70%" :close-on-click-modal="modal"
      @close="showDetailPage=false">
      <div class="dialog_warps">
        <h1>权限分配情况</h1>
        <div class="tableC">
          <el-table ref="multipleTableProportation" :data="propList" tooltip-effect="dark" row-class-name="row_class" border
            style="width: 100%;overflow:auto;" :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}">
          <el-table-column type="index" label="序号" width="60px" align="center">
          </el-table-column>
          <el-table-column prop="ROLANAME" label="角色名称">
          </el-table-column>
          <el-table-column label="评价角色">
            <template slot-scope="scope">
              <span v-if="scope.row.TYPE=='A'">机关科级干部</span>
              <span v-if="scope.row.TYPE=='D'">站队科级干部</span>
            </template>
          </el-table-column>
          <el-table-column prop="CREATENAME" label="创建人">
          </el-table-column>
          <el-table-column prop="CREATETIME" label="更新时间">
          </el-table-column>
          <el-table-column prop="PROPORTION" label="权重"></el-table-column>
          </el-table>
        </div>
        <h1>被考核人</h1>
        <div class="tableC">
          <el-table ref="multipleTableUser" :data="alluserList" tooltip-effect="dark" row-class-name="row_class" border
            style="width: 100%;overflow:auto;" :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}">

            <el-table-column align="center" prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column align="center" prop="rolename" label="授权角色" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" prop="username" label="用户名"></el-table-column>
            <el-table-column align="center" prop="email" label="员工编号"></el-table-column>
            <el-table-column align="center" prop="hint" label="身份证号"></el-table-column>
          </el-table>
        </div>
       
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDetailPage=false">取 消</el-button>

      </span>

    </el-dialog>
  </div>
</template>
<script>
  import * as api from '@/api/leader'
  import * as systemapi from '../../api/system'
  import * as apie from '@/api/common'
  import * as approveApi from '@/api/approve'
  import moment from 'moment'
  export default {
    data() {
      return {
        uForm:{
          name:'',
          rolename:''
        },
        loadings: false,
        refresh: true,
        showUser: false,
        userData: [],
        tbdwList: [],
        zkx: '',
        form: {},
        defaultTreeProps: {
          label: 'NAME',
          children: 'childern'
        },
        defaultProps: {
          label: 'name',
          children: 'children'
        },
        tempassgined: [],
        assgined: [],
        notassgined: [],
        detaildate: [],
        value: [],
        tableData: [],
        title: '',
        modal: false,
        total: 10,
        showDetail: false,
        excelDetail: false,
        fileList: [],
        showxq: false,
        isadd: false,
        issh: false,
        messageData: [],
        multipleSelection: [],
        settingDetail: false,
        processLength: 0,
        searchForm: {},
        idlist: '',
        id: '',
        currentPage: 1,
        pageSize: 10,
        selectDw: '',
        selectDwID: '',
        userList: [],
        areadyList: [],
        planid: '',
        showDetailPage: false,
        xpinfo: {},
        alluserList: [],
        propList: [],
        currentPageU: 1,
        pageSizeU: 10,
        totalU:0,

      }
    },
    mounted() {
      this.selectAllDate()
      this.selectTreeDate()
    },

    methods: {
      handleSizeChangeU(val) {
        this.pageSizeU = val
        this.selectUserDate()
      },
      handleCurrentChangeU(val) {
        this.currentPageU = val
        this.selectUserDate()
      },
      handelS(row) {
        if (!row.ID) {
          return
        }
        this.planid = row.ID
        systemapi.selectOrganizationTree().then(res => {
          if (res.data.code === 0) {
            this.tbdwList = res.data.data
            // this.selectDwID = this.tbdwList[0].ID
            // this.selectDw = this.tbdwList[0].NAME
            this.selectUserDate()
            this.showUser = true
          }
        })
      },
      submitUser() {
        console.log(this.userList)
        let userid = JSON.parse(localStorage.getItem('userid'))
        let params = JSON.parse(JSON.stringify(this.userList))
        params.forEach(item => {
          item.planid = this.planid
          item.createby = userid
        })
        systemapi.cadreitemInserts(params).then(res => {

          if (res.data.code == 0) {
            this.showUser = false
            this.selectAllDate()
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '添加失败'
            })
          }
        })
      },
      handleNodeClick(data) {
        this.selectDw = data.NAME
        this.selectDwID = data.ID
        $('.tbdw').hide()
      },
      selectDwTree() {

        $('.tbdw').show()
      },
      handleIconClick() {
        this.selectDwID=''
        this.selectDw = ''
      },
      handleSelectionChangeUser(val) {
        this.userList = val
      },
      selectUserDate() {
        let param = {
          'orgid': this.selectDwID,
          'planid': this.planid,
          'currentPage': this.currentPageU,
          'pageSize': this.pageSizeU,
          'name':this.uForm.name,
          'rolename': this.uForm.rolename
        };
        systemapi.selectPageUserByOrgid(param).then(res => {

          if (res.data.data != null) {
            this.userData = res.data.data.all.list
            this.totalU = res.data.data.all.total
            this.areadyList = JSON.parse(JSON.stringify(res.data.data.check))
            let temp = []
            for (let index = 0; index < this.areadyList.length; index++) {
              temp.push(this.areadyList[index].id)
            }
            if (temp.length > 0) {
              this.checkS(temp)
              // this.loadings = true
            }

          }
        })
      },
      checkS(arr) {
        let that = this

        that.$nextTick(function () {
          that.userData.forEach(row => {

            if (arr.includes(row.id)) {
              that.$refs.multipleTableUser.toggleRowSelection(row, true);

            }
          });
          // that.loadings = false
        });



      },
      selectTreeDate() {
        systemapi.selectOrganizationTree().then(res => {
          if (res.data.code === 0) {
            this.tbdwList = res.data.data
            // this.selectDwID = this.tbdwList[0].ID
            // this.selectDw = this.tbdwList[0].NAME
            this.selectUserDate()
          }
        })
      },
      formatterType(val) {
        if (val === '0') {
          return '一级';
        } else if (val === '1') {
          return '二级';
        } else {
          return '三级';
        }
      },
      formatterStatus(val) {
        if (val === '0') {
          return '使用中';
        } else if (val === '1') {
          return '已禁用';
        } else {
          return '其他';
        }
      },
      formatterBeginTime(val) {
        let va = val.begintime.replace('.000+0000', '').replace('T', ' ')
        return va;
      },
      formatterEndTime(val) {
        let va = val.endtime.replace('.000+0000', '').replace('T', ' ')
        return va;
      },
      handleSelectionChange(rows) {
        if (rows.length > this.limit) { //单选时为1，需要选择n项改数值为n就可以     
          this.$refs.multipleTable.toggleRowSelection(rows[0], false); //超出指定选择个数后，把第一个选中的selection设为false
          rows.splice(0, 1); //同时要把选中第一项移除
        }
        this.multipleSelection = rows;
      },
      showSearch() {
        this.selectAllDate()
      },
      selectAllDate() {
        let param = {
          'currentPage': this.currentPage,
          'pageSize': this.pageSize,
          'name': this.searchForm.name,
          'type': this.searchForm.type,
          'status': this.searchForm.status,
          'id': this.searchForm.id
        };
        api.cadreplanList(param).then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data.list
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
      updateFormDia(row, index) {
        this.title = '编辑'
        this.showDetail = true
        this.isadd = false
        this.showxq = false
        this.form = JSON.parse(JSON.stringify(row))
      },
      showdetail(row) {
        // this.showDetailPage = true

        this.xpinfo = JSON.parse(JSON.stringify(row))
        approveApi.selectStateByPlanid({
          planid: row.ID
        }).then(res => {
          if (res.data.code === 0) {
            this.showDetailPage = true
            this.alluserList = res.data.data.uncheckuserid
            this.propList = res.data.data.proportation
          }
        })

      },
      showBhFormDia(row) {
        this.title = '详情'
        this.showDetail = true
        this.showxq = true
        this.isadd = false
        this.form = JSON.parse(JSON.stringify(row))

      },
      exportData() {

      },

      showAdd() {
        this.title = '添加'
        this.$set(this.form, "TYPE", "科级干部考核")
        this.showDetail = true
        this.showxq = false
        this.isadd = true
      },
      deleteData() {
        if (this.multipleSelection.length > 0) {
          this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '删除提示框', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            let djbharr = ''
            this.multipleSelection.map((item, index) => {
              djbharr = djbharr + item.ID + ','
            })
            djbharr = djbharr.slice(0, djbharr.length - 1)
            api.cadreplanDelete({
              'ids': djbharr
            }).then(res => {
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
          this.$message({
            type: 'error',
            message: '请选选择要删除的数据'
          })
        }
      },
      subimetForm() {
        let uid = JSON.parse(localStorage.getItem('userid'))
        let pas = {
          "createby": uid,
          "name": this.form.NAME,
          "data": moment(new Date()).format('YYYY-MM'),
          "type": this.form.TYPE
        }
        api.cadreplanAdd(pas).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.selectAllDate()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败!'
            })
          }
          this.resetForm()
        })

      },
      editForm() {
        this.form.id = this.form.ID
        this.form.name = this.form.NAME
        api.cadreplanUpdate(JSON.stringify(this.form)).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.selectAllDate()
          } else {
            this.$message({
              type: 'error',
              message: '修改失败!'
            })
          }
          this.resetForm()
        })
      },
      startUp(row) {
        if (row.TYPE=='后备干部推荐') {
            let pams = {
                "data": row.DATA,
                "state": '已启动',
                "username": row.USERNAME,
                "id": row.ID,
                "createtime": row.CREATETIME,
                "type": row.TYPE,
                "name": row.NAME
              }
              api.cadreplanUpdate(JSON.stringify(pams)).then(res => {
                if (res.data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '启动成功!'
                  })
                  this.selectAllDate()
                } else {
                  this.$message({
                    type: 'error',
                    message: '启动失败!'
                  })
                }
                this.resetForm()
              })
        }else{
            approveApi.selectStateByPlanid({
          planid: row.ID
        }).then(res => {
          if (res.data.code === 0) {
            this.alluserList = res.data.data.uncheckuserid
            this.propList = res.data.data.proportation
            if (this.alluserList.length == 0) {
              this.$message({
                type: 'error',
                message: '未选择被考核人员!'
              })
              return
            } else if (this.propList.length == 0) {
              this.$message({
                type: 'error',
                message: '未分配权重!'
              })
              return
            } else {

              let pams = {
                "data": row.DATA,
                "state": '已启动',
                "username": row.USERNAME,
                "id": row.ID,
                "createtime": row.CREATETIME,
                "type": row.TYPE,
                "name": row.NAME
              }
              api.cadreplanUpdate(JSON.stringify(pams)).then(res => {
                if (res.data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '启动成功!'
                  })
                  this.selectAllDate()
                } else {
                  this.$message({
                    type: 'error',
                    message: '启动失败!'
                  })
                }
                this.resetForm()
              })



            }

          }
        })
        }
        

      },
      shurDown(row) {
        let pams = {
          "data": row.DATA,
          "state": '停止',
          "username": row.USERNAME,
          "id": row.ID,
          "createtime": row.CREATETIME,
          "type": row.TYPE,
          "name": row.NAME
        }
        api.cadreplanUpdate(JSON.stringify(pams)).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '已停止!'
            })
            this.selectAllDate()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
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
        this.settingDetail = false
        this.excelDetail = false
        this.processLength = 0
        this.showProcess = false
        this.assgined = [],
          this.notassgined = [],
          this.tempassgined = [],
          this.value = [],
          this.idlist = '',
          this.form = {}
      },

    }
  }
</script>
<style lang="scss">
  .dialog_warps {
    min-height: 600px;

    .tbdw {
      display: none;
      width: 200px;
      max-height: 500px;
      overflow-y: scroll;
      border: 1px solid #D5D6D7;
      position: absolute;
      top: 40px;
      z-index: 999;
    }

    .selectDw {
      display: inline-block;
      width: 200px;
      height: 30px;
      vertical-align: top;
    }

    .el-tree {
      min-width: 120px;
      position: relative;

    }

    .el-tree__empty-text,
    .el-tree__empty-block {
      position: relative;
      width: 120px;
      height: 26px;
      min-height: 26px;
      line-height: 26px;
      top: 0px;
    }
  }
</style>
<style lang="scss" scoped>
  .content {
    margin: 0px;
    padding: 0px;

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
      border-top: 1px solid #f3f3f3;
      text-align: center;
      height: 44px;
      background: #fff;
    }
  }

  /deep/ .el-checkbox,
  .el-checkbox__input {
    display: block !important;
    position: relative;
    white-space: nowrap
  }

  /deep/ .el-transfer__buttons {
    display: inline-block;
    vertical-align: middle;
    padding: 0 30px;
    text-align: center !important;
  }
</style>