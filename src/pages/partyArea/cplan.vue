<template>
  <div class="content">
    <div class="content-main">
      <div class="right-content">
        <div class="header">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px;margin-left:10px;" label="" prop="" class="">
              <!-- <el-form-item class="" label="考核周期" prop="cycle">
                <el-select v-model="searchForm.cycle" size="mini" placeholder="请输入考核周期">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="年" value="年"></el-option>
                  <el-option label="季度" value="季度"></el-option>
                  <el-option label="月" value="月"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item class="" label="考核计划类型" prop="type">
                <el-select v-model="searchForm.type" size="mini" placeholder="请选择考核计划类型">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="年度考核" value="年度考核"></el-option>
                  <el-option label="季度考核" value="季度考核"></el-option>
                  <el-option label="月度考核" value="月度考核"></el-option>
                </el-select>
              </el-form-item>
              <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
              <el-button @click="deleteData()" type="primary"><i class="el-icon-delete"> 删除</i></el-button>
              <el-button @click="showAdd()" type="primary"><i class="el-icon-circle-plus-outline"> 添加</i></el-button>
              <el-button @click="setting()" type="primary"><i class="el-icon-setting"> 手动配置</i></el-button>
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
          <el-table-column align="center" class-name="column-caoz" label="操作" width="160">
            <template slot-scope="scope">
              <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
              <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="考核计划名称" width="260"></el-table-column>
          <el-table-column align="center" prop="type" label="考核计划类型" width="160"></el-table-column>
          <el-table-column align="center" prop="status" label="考核时间" width="150"></el-table-column>
          <el-table-column align="center" prop="begintime" label="考核开始时间" :formatter="formatterBeginTime"></el-table-column>
          <el-table-column align="center" prop="endtime" label="考核结束时间"  :formatter="formatterEndTime"></el-table-column>
        </el-table>
        <el-dialog :title="title"
                   custom-class="dialog"
                   :modal="modal"
                   :before-close="resetForm" :visible.sync="showDetail" width="700px"
                   :close-on-click-modal="modal" @close="resetForm">
          <div class="dialog_warp" v-if="!issh">
            <el-form ref="form" :model="form" label-width="120px" class="demo-ruleForm">
              <el-row>
                <el-form-item label="考核计划名称">
                  <el-input v-model="form.name" placeholder="请输入考核计划名称" style="width:400px;"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="考核计划类型">
                  <el-select v-model="form.type" placeholder="请选择考核计划类型" style="width:400px;">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="年度考核" value="年度考核"></el-option>
                  <el-option label="季度考核" value="季度考核"></el-option>
                  <el-option label="月度考核" value="月度考核"></el-option>
                </el-select>
                </el-form-item>
              </el-row>
                <el-form-item label="考核时间">
                  <el-input v-model="form.status" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item label="考核开始时间">
                  <el-date-picker
                    v-model="form.begintime"
                    align="left"
                    type="date"
                    placeholder="选择日期" style="width:400px !important;">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="考核结束时间">
                  <el-date-picker
                    v-model="form.endtime"
                    align="left"
                    type="date"
                    placeholder="选择日期"
                    style="width:400px !important;">
                  </el-date-picker>
                </el-form-item>
                <el-row v-if="showxq&&!isadd">
                  <el-table ref="multipleTable" :data="detaildate" tooltip-effect="dark"
                            style="width: 100%;height: 200px !important;overflow:auto;margin-left: 0px !important;border-left:2px solid #EBEEF5 !important;"
                            row-class-name="row_class"
                            border
                            :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}">
                    <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
                    <el-table-column align="left" prop="type" label="考核类型"  width="140" show-overflow-tooltip></el-table-column>
                    <el-table-column align="left" prop="content" label="考核内容" show-overflow-tooltip></el-table-column>
                  <!--<el-table-column align="center" prop="stanard" label="考核标准" show-overflow-tooltip></el-table-column>-->
                    <!--<el-table-column align="center" prop="stanard" label="考核依据"  show-overflow-tooltip></el-table-column>-->
                  </el-table>
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

        <el-dialog :title="title"
                   custom-class="dialog"
                   :modal="modal"
                   :before-close="resetForm" :visible.sync="settingDetail" width="800px"
                   :close-on-click-modal="modal" @close="resetForm">
          <div class="dialog_warp">
            <el-form ref="form" :model="form" label-width="120px">
              <el-row>
                <el-form-item label="考核计划名称">
                  <el-input v-model="form.name" placeholder="请输入考核计划名称" style="width:540px;"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="考核计划类型">
                  <el-input v-model="form.type" placeholder="请输入考核计划类型" style="width:540px;"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="考核时间">
                  <el-input v-model="form.status" placeholder="请输入考核时间" style="width:540px;"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="分配考核项">
                  <!--<el-transfer :data="notassgined"-->
                               <!--:props="{key: 'id',label: 'content'}"-->
                               <!--:titles="['未配置考核项', '已配置考核项']"-->
                               <!--:right-default-checked="assgined"-->
                               <!--v-model="value"-->
                               <!--@right-check-change="handleChange"-->
                               <!--:button-texts="['到左边', '到右边']">-->
                  <!--</el-transfer>-->
                  <el-transfer :data="notassgined"
                               :props="{key: 'id',label: 'content'}"
                               :titles="['未配置考核项', '已配置考核项']"
                               :right-default-checked="assgined"
                               v-model="assgined"
                               @change="handleChange"
                               :button-texts="['到左边', '到右边']">
                  </el-transfer>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
           <el-button @click="resetForm">取 消</el-button>
           <el-button type="primary" @click="saveForm">保 存</el-button>
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
  import * as api from '@/api/leader'
  import * as apie from '@/api/common'
  export default {
    data(){
      return{
        form:{},
        defaultProps: {
          label: 'name',
          children: 'children'
        },
        tempassgined: [],
        assgined: [],
        notassgined: [],
        detaildate: [],
        value: [],
        tableData:[],
        title:'',
        modal:false,
        total:10,
        showDetail:false,
        excelDetail: false,
        fileList: [],
        showxq:false,
        isadd:false,
        issh:false,
        messageData: [],
        multipleSelection:[],
        settingDetail: false,
        processLength: 0,
        searchForm:{},
        idlist: '',
        id: '',
        currentPage: 1,
        pageSize: 10
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
      formatterBeginTime (val) {
        let va = val.begintime.replace('.000+0000', '').replace('T', ' ')
        return va;
      },
      formatterEndTime (val) {
        let va = val.endtime.replace('.000+0000', '').replace('T', ' ')
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
          'name': this.searchForm.name,
          'type': this.searchForm.type,
          'status': this.searchForm.status,
          'id': this.searchForm.id
        };
        api.selectLeaderPlanList(param).then(res => {
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
      updateFormDia(row,index){
        this.title='编辑'
        this.showDetail=true
        this.isadd=false
        this.showxq=false
        this.form = JSON.parse(JSON.stringify(row))
      },
      showBhFormDia(row){
        this.title='详情'
        this.showDetail=true
        this.showxq=true
        this.isadd=false
        this.form = JSON.parse(JSON.stringify(row))
        let param={
          'type': this.form.type,
          'id': this.form.id
        }
        api.selectLeaderPlanByAssgined(param).then(res => {
          if (res.data.code === 0) {
            this.detaildate =res.data.data
          }
        })
      },
      exportData(){

      },

      setting(){
        if (this.multipleSelection.length ===1) {
          this.title='设置考核项'
          this.settingDetail=true,
            this.processLength=0
          this.showProcess = false
          this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
          this.id = this.form.id
          let param={
            'type': this.form.type,
            'id': this.form.id
          }
          let tempnotassgined = [];
          api.selectLeaderPlanByAllAssgined(param).then(res => {
            if (res.data.code === 0) {
              tempnotassgined = res.data.data
            }
          }).then(_ => {
            api.selectLeaderPlanByAssgined(param).then(ress => {
              if (ress.data.code === 0) {
                for(let ii = 0; ii<ress.data.data.length;ii++){
                  this.tempassgined.add(ress.data.data[ii].id);
                }
                  this.notassgined = tempnotassgined;
                  this.assgined =  this.tempassgined
              }
            })
          })
        }else{
          this.$message({
            showClose: true,
            message: '不行！必须选择一条数据',
            type: 'error'
          })
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
            api.deleteLeaderPlan({'ids':djbharr}).then(res => {
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
       if(this.form.begintime.getTime()<this.form.endtime){
        api.addLeaderPlan(JSON.stringify(this.form)).then(res => {
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
        }else{
          alert("时间范围设置错误，请重新设置！")
        }
      },
      editForm(){
        api.updateLeaderPlan(JSON.stringify(this.form)).then(res => {
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
        this.settingDetail=false
        this.excelDetail=false
        this.processLength=0
        this.showProcess = false
        this.assgined=[],
          this.notassgined=[],
          this.tempassgined = [],
          this.value=[],
          this.idlist='',
          this.form={}
      },
      saveForm(){
        if(this.id!==''){
          let param={
            'planid':this.id,
            'items':this.idlist
          }
          api.insertLeaderPlanItem(param).then(res => {
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
        let that = this;
        // if(that.tempassgined.length>0){
        //   let str = key.concat(that.tempassgined).filter(v => key.includes(v) && !that.tempassgined.includes(v));
        //   that.idlist = str.toString();
        // }else{
          that.idlist = key.toString();
        // }
        console.log(key);
        console.log(that.idlist);
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
  /deep/ .el-checkbox,.el-checkbox__input {
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
