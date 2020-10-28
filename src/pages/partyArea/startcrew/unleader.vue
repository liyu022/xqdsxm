<template>
    <div class="content">
        <div class="content-main">
            <div class="left-content">
                <div class="sbTree" style="border:none;padding-top:10px;width:25%;">
                    <el-tree :data="treedata" :props="defaultProps" :highlight-current="true" @node-click="handleClickChange"
                             :render-content="renderContent"></el-tree>
                </div>
            </div>
            <div class="right-content">
                <div class="header">
                    <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                        <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
                            <el-form-item class="" label="后备干部" prop="nusernameame">
                                <el-input v-model="searchForm.username" size="mini" placeholder="请输入后备干部"></el-input>
                            </el-form-item>
                            <el-form-item class="" label="职位" prop="position">
                                <el-input v-model="searchForm.position" size="mini" placeholder="请输入职位"></el-input>
                            </el-form-item>
                            <el-button @click="deleteData()" type="primary"><i class="el-icon-delete"> 删除</i></el-button>
                            <el-button @click="showAdd()" type="primary"><i class="el-icon-edit-outline"> 添加</i></el-button>
                            <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
                            <el-button @click="message()" type="primary"><i class="el-icon-position"> 消息推送</i></el-button>
                            <div class="clear"></div>
                        </el-form-item>
                    </el-form>
                </div>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                          border :row-class-name="tableRowClassName"
                          style="width: 100%;overflow:auto;border-left:2px solid #EBEEF5;"
                          :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}"
                          @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column align="center" class-name="column-caoz" label="操作" width="140">
                        <template slot-scope="scope">
                            <div v-if="position == 5 && scope.row.orgid != orgid">
                                <!--职位使员工，并且组织id不一致-->
                                <span>无操作权限</span>
                            </div>
                            <div v-else>
                                <span style="color:#00a2fd;cursor: pointer;text-align: center;" @click="updateFormDia(scope.row,scope.$index)"></span>
                                <span style="color:#00a2fd;cursor: pointer;text-align: center;"
                                      @click="checkFormDia(scope.row, scope.$index)">考核</span>
                                <span style="color:#00a2fd;cursor: pointer;text-align: center;" @click="showResultss(scope.row)">考核结果</span>
                                <span style="color:#00a2fd;cursor: pointer;text-align: center;" @click="showBhFormDia(scope.row)">详情</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="username" label="后备干部" width="100"></el-table-column>
                    <el-table-column align="center" prop="position" label="职位" width="100" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{ {'1': '处长', '2': '副处长', '3': '科长', '4': '副科长', '5': '科员'}[scope.row.position] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="status" label="状态" width="100"></el-table-column>
                    <!-- <el-table-column align="center" prop="valid" label="已被考核次数" width="110"></el-table-column>-->
                    <el-table-column align="center" prop="planname" label="干部考核计划" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="createtime" label="创建时间" width="150" :formatter="formatterTime"></el-table-column>
                </el-table>

                <el-dialog :title="title"
                           custom-class="dialog"
                           :modal="modal"
                           :before-close="resetForm" :visible.sync="showDetail" width="600px"
                           :close-on-click-modal="modal" @close="resetForm">
                    <div class="dialog_warp" v-if="!issh">
                        <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="demo-ruleForm">
                            <el-form-item label="后备干部" style="width:90%;">
                                <el-input v-model="form.username" placeholder="请输入后备干部" @click.native="setUserTree"></el-input>
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
                                <el-input v-model="form.position" placeholder="请输入公司职位"></el-input>
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
            <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="demo-ruleForm">
                <el-form-item label="计划名称" style="width:90%;">
                    <el-input v-model="form.planname" placeholder="请输入计划名称" disabled></el-input>
                </el-form-item>
                <el-form-item label="后备干部" style="width:90%;">
                    <el-input v-model="form.username" placeholder="请输入后备干部" disabled></el-input>
                </el-form-item>
                <el-form-item label="开始时间" style="width:90%;">
                    <el-input v-model="form.begintime" placeholder="请输入开始时间" disabled></el-input>
                </el-form-item>
                <el-form-item label="结束时间" style="width:90%;">
                    <el-input v-model="form.endtime" placeholder="请输入结束时间" disabled></el-input>
                </el-form-item>
                <el-form-item label="考核领导" style="width:90%;">
                    <el-checkbox-group v-model="defaultMessageData">
                        <el-checkbox v-for="city in messageData" :label="city.name" :key="city.id" disabled>{{ city.name }}</el-checkbox>
                    </el-checkbox-group>
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

        <!--详情查看-->
        <el-dialog title="详情查看" :visible.sync="showResults" width="800px">
            <el-table :data="listResults">
                <el-table-column prop="content" label="内容"></el-table-column>
                <!-- <el-table-column prop="score" align="center" label="评分"></el-table-column> -->
                <el-table-column prop="score" align="center" label="评分" width="310">
                    <template slot-scope="scope">
                        <el-rate v-model="scope.row.score" :max="10" disabled show-score text-color="#ff9900"
                                 score-template="{value}" texts=[1,2,3,4,5,6,7,8,9,10]></el-rate>
                    </template>
                </el-table-column>
                <el-table-column prop="addins" align="center" label="加分" idth="100"></el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="后备干部考核表"
                   custom-class="dialog"
                   :modal="modal"
                   :before-close="resetForm" :visible.sync="kaoheshow" width="1200px" height="400px"
                   :close-on-click-modal="modal" @close="resetForm">
            <el-table ref="multipleTable" :data="rateData" tooltip-effect="dark"
                      row-class-name="row_class" border
                      style="width: 100%;overflow:auto;border-left:2px solid #EBEEF5;"
                      :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}"
                      @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column align="center" prop="content" label="考核内容" width="300"></el-table-column>
                <el-table-column prop="evaValue" label="评分" width="300">
                    <template slot-scope="scope">
                        <el-rate v-model="scope.row.evaValue" ref="ratemoude" :max="10" :min="1" :allow-half="false" text-color="#ff9900"
                                 @change="handleRateChange(scope)"></el-rate>
                    </template>
                </el-table-column>
                <el-table-column prop="stanard" label="加分项标准"></el-table-column>
                <el-table-column prop="stanard" label="其他说明"></el-table-column>
                <el-table-column prop="note" label="加分">
                    <template slot-scope="scope">
                        <el-input type="number" placeholder="请输入加分" v-model="scope.row.addins"/>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="rateForm">确  定</el-button>
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
    data() {
        return {
            form: {},
            rules: {
                name: [{required: true, message: '请输入用户名', trigger: 'change'}]
            },
            defaultProps: {
                label: 'name',
                children: 'children'
            },
            TProps: {
                children: 'childern',
                label: 'name'
            },
            checkindexs: [],
            tableData: [],
            treedata: [],
            rateData: [],
            usertree: false,
            kaoheshow: false,
            kaohedetailshow: false,
            title: '',
            total: 10,
            rowdata: {},
            modal: false,
            showDetail: false,
            showMessage: false,
            messageData: [],
            defaultMessageData: [],
            showxq: false,
            isadd: false,
            issh: false,
            checkdate: '', //存储选择考核时间的字段
            value: '',//存储选择制度名称
            multipleSelection: [],
            // obj: {},//计算存储制度的其他属性
            searchForm: {},
            currentPage: 1,
            pageSize: 10,
            vtableData: [],
            vstableData: [],
            checkindexid: '',
            userData: [],
            flag: false,
            orgid: localStorage.getItem('orgid'),
            position:localStorage.getItem('userDetail').position,
            showResults: false,
            listResults:[]
        }
    },
    mounted() {
        this.getUserPerssion()
        this.selectAllDate()
        this.selectTreeDate()
        this.selectTreeUserDate()
    },

    methods: {
        tableRowClassName({row, rowIndex}) {
            if (this.position == 5 && row.orgid != this.orgid) {
                return 'warning-row';
            }
            return 'success-row';
        },
        getUserPerssion(){
            let param = {
                'currentPage': this.currentPage,
                'pageSize': this.pageSize,
                'userid': localStorage.getItem("userid").replace(/\"/g, ""),
            };
            leader.selectLeaderCheckList(param).then(res => {
                if (res.data.data && res.data.data.list.length>0) {
                    this.flag = true
                }
            })
        },
        selectTreeUserDate() {
            api.selectOrganizationTreeUser().then(res => {
                if (res.data.code === 0) {
                    this.userData = res.data.data
                }
            })
        },
        formatterTime(val) {
            let va = val.createtime.replace('.000+0000', '').replace('T', ' ')
            return va;
        },
        begintime(val) {
            let va = val.replace('.000+0000', '').replace('T', ' ')
            return va;
        },
        endtime(val) {
            let va = val.replace('.000+0000', '').replace('T', ' ')
            return va;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        selectTreeDate() {
            leader.selectLeaderPlanTree().then(res => {
                if (res.data.code === 0) {
                    this.treedata = res.data.data
                }
            })
        },
        /**
         * 考核详情
         * @param scope
         */
        showResultss(row) {
            let param = {
                id: localStorage.getItem("userid").replace(/\"/g, "") ,
                uuserid:row.userid,
                planid: row.planid
            }
            api.SelectleaderResult(param).then(res=>{
                const list = res.data.data.list.map(val=>{
                    return{
                        addins:val.addins || 0,
                        score:val.score || 0,
                        content:val.content
                    }
                })
                this.listResults = list
                this.showResults = true
            })
        },
        handleRateChange(scope) {
            console.dir(scope)
        },
        showSearch() {
            this.selectAllDate()
        },
        selectAllDate() {
            let param = {
                'currentPage': this.currentPage,
                'pageSize': this.pageSize,
                'id': this.form.id,
                'userid': this.form.userid,
                'planid': this.form.planid,
                'username': this.searchForm.username,
                'position': this.searchForm.position
            };
            leader.selectLeaderUncheckList(param).then(res => {
                if (res.data.data != null) {
                    this.tableData = res.data.data.list
                    this.total = res.data.data.total
                }
            })
        },
        handleCheckType() {
            this.value = ''
            this.selectCheckIndex()
        },
        handleClickChange(treedata) {
            this.form.planid = treedata.id
            this.form.pid = treedata.pid
            this.selectAllDate()
        },
        handleCheckUser(userData) {
            if (userData.type != '0') {
                this.form.userid = userData.id
                this.form.username = userData.name
                this.usertree = false
            } else {
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
        checkFormDia(row, index) {
            this.rowdata = row
            if(!this.flag){
                alert("您不是对应考核任务考核干部，请先在考核人员评价中添加您！");
                return 
            }
            let param = {
                'position':row.position,
                'orgid':localStorage.getItem('orgid').replace(/\"/g, ""),
                'userid': localStorage.getItem("userid").replace(/\"/g, "") ,
                'uuserid':row.userid,
                'planid': row.planid
            }
            leader.selectLeaderItemByPlanid(param).then(res => {
                console.log(res.data.data);
                
                if (res.data.data != null) {
                    if(res.data.data === 1111){
                        alert("您已经考核过了，不用在考核了！");
                    }else if(res.data.data === 2222){
                        alert("您未被列入改考核计划的考核干部！请先进行考核评价人操作！");
                    }else{
                        this.rateData = res.data.data
                        this.showDetail = false
                        this.kaoheshow = true
                        this.form = JSON.parse(JSON.stringify(row))
                    }
                }
            })
            // }else{
            //   this.$message('该状态不能考核！')
            //   return false
            // }
        },
        updateFormDia(row, index) {
            if (row.status === "已完成") {
                this.$message('该班组已经考核完成，不能在修改了')
                return false
            }
            this.title = '编辑'
            this.showDetail = true
            this.isadd = false
            this.showxq = true
            this.form = JSON.parse(JSON.stringify(row))
            this.value = this.form.checkindexname
        },
        updateForm() {
            if (this.multipleSelection.length === 1) {
                this.title = '编辑'
                this.showDetail = true
                this.isadd = false
                this.showxq = true
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
            if (row.status === "已完成") {
                let param = {
                    'id': row.id,
                    'indexid': row.checkindexid
                }
                check.getLisIndexResultqdById(param).then(res => {
                    if (res.data.data != null) {
                        this.vstableData = res.data.data
                        this.showDetail = false
                        this.kaohedetailshow = true
                    }
                })
            } else {
                this.title = '详情'
                this.showDetail = true
                this.showxq = false
                this.isadd = false
                this.form = JSON.parse(JSON.stringify(row))
                this.value = this.form.checkindexname
            }
        },
        showAdd() {
            if (this.form.planid != null && this.form.planid != '' && this.form.pid != '-1') {
                this.title = '添加'
                this.showDetail = true
                this.isadd = true
                this.value = ''
                this.form.checktype = ''
            } else {
                this.$message('请选选择后备干部考核计划')
                return
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
                    leader.deleteLeaderUncheck({'ids': djbharr}).then(res => {
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
        subimetForm() {
            let param = {
                'planid': this.form.planid,
                'userid': this.form.userid,
                'position': this.form.position,
                'content': this.form.content
            }
            leader.addLeaderUncheck(param).then(res => {
                if (res.data.code === 0) {
                    this.resetForm()
                    this.selectTreeDate()
                    this.selectAllDate()
                }
            })
            this.resetForm()
        },
        editForm() {
            leader.updateLeaderUncheck(JSON.stringify(this.form)).then(res => {
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
            this.messageData = []
            this.kaoheshow = false
            this.kaohedetailshow = false
            this.showMessage = false
            this.value = ''
            this.vtableData = [],
                this.vstableData = [],
                this.checkindexid = '',
                this.form = {}
        },
        message() {
            if (this.multipleSelection.length === 1) {
                this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
                this.form.content = ''
                this.form.begintime = this.begintime(this.form.begintime)
                this.form.endtime = this.endtime(this.form.endtime)
                if (this.form.status != '') {
                    this.selectTreeLeaderCheck()
                    this.showMessage = true
                } else {
                    this.form = {}
                    this.$message({type: 'error', message: '任务分配未完成不能推送'})
                    this.resetForm()
                }
            } else {
                this.$message({type: 'error', message: '请选选择要推送的消息'})
            }
        },
        selectTreeLeaderCheck() {
            let param = {
                'planid': this.form.planid
            }
            leader.selectTreeLeaderCheck(param).then(res => {
                if (res.data.code === 0) {
                    this.messageData = res.data.data[0].children
                    for (let i = 0; i < this.messageData.length; i++) {
                        this.defaultMessageData.push(this.messageData[i].name);
                    }
                }
            })
        },
        renderContent(h, { node, data, store }){
            if(node.data.pid !=='-1'){
                return (<span><i class="el-icon-document"></i>{node.label}</span>)
            }
            return(<span>{node.label}</span>)
        },
        setUserTree() {
            this.usertree = true
        },
        rateForm() {
            for (let item of this.rateData) {
                if (item.evaValue == 0) {
                    this.$message.error(item.content + '\u3000\u3000\u3000' + '还未评分');
                    return
                }
            }
            this.$confirm('确认不可修改，请确认准确无误', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                let result = []
                for (let i = 0; i < this.rateData.length; i++) {
                    let obj = {}
                    obj.id = common.dataid()
                    obj.itemid = this.rateData[i].id
                    if (this.rateData[i].addins) {
                        obj.addins = String(this.rateData[i].addins)
                    } else {
                        obj.addins = "0"
                    }
                    obj.score = String(this.rateData[i].evaValue)
                    result.push(obj)
                }
                let param = {
                    'info': JSON.stringify(this.rowdata),
                    'detail': JSON.stringify(result),
                }
                leader.leaderResult(param).then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '后备干部考核保存成功！'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '后备干部考核保存失败！'
                        })
                    }
                    this.kaoheshow = false
                    this.selectAllDate()
                })
            })
        },
        messageForm() {
            let arry = this.messageData
            let userids = ''
            for (let i = 0; i < arry.length; i++) {
                userids = userids + arry[i].id + ','
            }
            userids = userids.slice(0, userids.length - 1)
            let param = {
                'receiver': userids,
                'pushby': JSON.parse(localStorage.getItem('userid')),
                'content': this.form.content,
                'item': '干部考核',
                'result': '推送成功'
            }
            message.addMessage(param).then(res => {
                if (res.data.code === 0) {
                    this.$message({type: 'success', message: '消息推送成功！'})
                    let param = {
                        'id': this.form.id,
                        'status': '已推送'
                    }
                    leader.updateLeaderUncheck(param).then(res => {
                    })
                    this.showMessage = false
                } else {
                    this.$message({type: 'error', message: '消息推送失败！'})
                    this.showMessage = false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.content {
  margin: 0px;
  padding: 0px;

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
    border-top: 1px solid #f3f3f3;
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

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
