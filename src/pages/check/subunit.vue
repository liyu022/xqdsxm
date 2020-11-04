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
              <el-form-item class="" label="考核名称" prop="name">
                <el-input v-model="searchForm.name" size="mini" placeholder="请输入考核名称"></el-input>
              </el-form-item>
              <el-form-item class="" label="考核人" prop="checkname">
                <el-input v-model="searchForm.checkname" size="mini" placeholder="请输入考核人"></el-input>
              </el-form-item>
              <!-- <li><i class="el-icon-download"> 导出</i></li>-->
              <el-button @click="deleteData()" type="primary"><i class="el-icon-delete"> 删除</i></el-button>
              <el-button @click="showAdd()" type="primary"><i class="el-icon-edit-outline"> 添加</i></el-button>
              <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
              <el-button @click="message()" type="primary"><i class="el-icon-position"> 消息推送</i></el-button>
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
          <el-table-column align="center" class-name="column-caoz" label="操作" width="140">
            <template slot-scope="scope">
              <span style="color:#00a2fd;cursor: pointer;text-align: center;" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
              <span style="color:#00a2fd;cursor: pointer;text-align: center;" @click="checkFormDia(scope.row, scope.$index)">考核</span>
              <span style="color:#00a2fd;cursor: pointer;text-align: center;" @click="showBhFormDia(scope.row)">详情</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="考核名称" width="170"></el-table-column>
          <el-table-column align="center" prop="checktype" label="考核类型" width="110"></el-table-column>
          <el-table-column align="center" prop="checkdate" label="考核时段" width="150"></el-table-column>
          <el-table-column align="center" prop="status" label="考核状态" width="100"></el-table-column>
          <el-table-column align="center" prop="checkname" label="考核人" width="130"></el-table-column>
          <el-table-column align="center" prop="orgname" label="考核班组" width="110"></el-table-column>
          <el-table-column align="center" prop="result" label="考核成绩" width="100"></el-table-column>
          <el-table-column align="center" prop="checktime" label="考核时间" width="200" :formatter="formatterTime"></el-table-column>
        </el-table>

        <el-dialog :title="title"
                   custom-class="dialog"
                   :modal="modal"
                   :before-close="resetForm" :visible.sync="showDetail" width="500px"
                   :close-on-click-modal="modal" @close="resetForm">
          <div class="dialog_warp" v-if="!issh">
            <el-form ref="form" :model="form" label-width="80px":rules="rules" class="demo-ruleForm">
              <el-form-item label="考核名称" style="width:90%;">
                <el-input v-model="form.name" placeholder="请输入考核名称"></el-input>
              </el-form-item>
              <el-form-item label="考核状态" style="width:90%;">
                <el-select v-if="!showxq" v-model="form.status" placeholder="请选择考核状态">
                  <el-option label="已创建" value="已创建"></el-option>
                  <el-option label="未完成" value="未完成"></el-option>
                  <el-option label="已完成" value="已完成"></el-option>
                </el-select>
                <el-input v-if="showxq" v-model="form.status"></el-input>
              </el-form-item>
              <el-form-item label="考核类型" style="width:90%;">
                <el-select v-if="!showxq" v-model="form.checktype" placeholder="请选择考核类型" @change="handleCheckType">
                  <el-option label="年" value="年"></el-option>
                  <el-option label="季度" value="季度"></el-option>
                  <el-option label="月" value="月"></el-option>
                  <el-option label="旬" value="旬"></el-option>
                </el-select>
                <el-input v-if="showxq" v-model="form.checktype"></el-input>
              </el-form-item>
              <el-form-item label="考核制度" style="width:90%;">
                <el-select v-if="!showxq" v-model="value" filterable placeholder="请选择考核制度" @change="selectCheckIndexId(value)">
                  <el-option
                    v-for="item in checkindexs"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <el-input v-if="showxq" v-model="value"></el-input>
              </el-form-item>
              <el-form-item label="考核时段" v-if="this.form.checktype==='年'" style="width:90%;">
                    <el-date-picker
                      v-model="form.checkdate"
                      type="year"
                      format="yyyy年"
                      value-format="yyyy年"
                      placeholder="选择年" style="width:100% !important;">
                    </el-date-picker>
              </el-form-item>
              <el-form-item label="考核时段" v-if="this.form.checktype==='季度'" style="width:90%;">
                <!--<el-input v-model="form.name" placeholder="请输入姓名"></el-input>-->
                <el-date-picker
                  v-model="form.checkdate"
                  type="month"
                  format="yyyy年MM月"
                  value-format="yyyy年MM月"
                  placeholder="选择季度" style="width:100% !important;">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="考核时段" v-if="this.form.checktype==='月'" style="width:90%;">
                <!--<el-input v-model="form.name" placeholder="请输入姓名"></el-input>-->
                <el-date-picker
                  v-model="form.checkdate"
                  type="month"
                  format="yyyy年MM月"
                  value-format="yyyy年MM月"
                  placeholder="选择月" style="width:100% !important;">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="考核时段" v-if="this.form.checktype==='旬'" style="width:90%;">
                <el-date-picker
                  v-model="form.checkdate"
                  type="date"
                  format="yyyy年MM月dd日"
                  value-format="yyyy年MM月dd日"
                  placeholder="选择旬" style="width:100% !important;">
                </el-date-picker>
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

        <vxe-modal v-model="kaoheshow" :showHeader="false" id="kaohe" width="900" height="590" min-width="460" style="top:30px !important;left: 1px;overflow: hidden;" min-height="320" resize remember storage transfer>
          <el-row style="width:100%;height:60px;">
            <h3 style="text-align: center;line-height: 60px;font-family: '宋体', 'Avenir', Helvetica, Arial, sans-serif;">运行一班班组考核表</h3>
          </el-row>
          <el-row style="width:100%;height:50px;">
            <el-col :span="12" style="color: #c9183b;height:100%;line-height: 50px;padding-left: 50px;">考核班组:运行一班</el-col>
            <el-col :span="12" style="color: #c9183b;height:100%;line-height: 50px;padding-left: 270px;">考核时间:2020年3月</el-col>
          </el-row>
          <template>
           <vxe-grid
              border
              resizable
              auto-resize
              show-footer
              show-overflow="tooltip"
              height="400"
              sync-resize="false"
              ref="xGrid"
              :span-method="rowspanMethod"
              :edit-config="{trigger: 'click', mode: 'cell'}"
              :footer-method="footerMethod"
              :data.sync="vtableData">
              <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
              <vxe-table-column field="item" title="项目" width="150"></vxe-table-column>
              <vxe-table-column field="content" title="考核内容" width="200"></vxe-table-column>
              <vxe-table-column field="detail" title="详情" width="70">
                <template v-slot="{ row }">
                  <el-tooltip placement="top">
                    <div slot="content" v-if="row.stanard==='扣分'">我是扣分项</div>
                    <div slot="content" v-if="row.stanard==='加分'">我是加分项</div>
                    <div slot="content" v-if="row.stanard==='加分或扣分'">我是加分项或者扣分项</div>
                    <span style="color: rgba(131,0,0,1);font-size:20px;" v-if="row.stanard==='扣分'"><i class="el-icon-remove-outline"></i></span>
                    <span style="color: rgba(131,0,0,1);font-size:20px;" v-if="row.stanard==='加分'"><i class="el-icon-circle-plus-outline"></i></span>
                    <span style="color: rgba(131,0,0,1);font-size:20px;" v-if="row.stanard==='加分或扣分'"><i class="el-icon-circle-check"></i></span>
                  </el-tooltip>
                  <el-tooltip placement="top">
                    <div slot="content">
                      考核依据：{{row.accord}}
                      <br>
                      考核办法：{{row.means}}
                    </div>
                    <span style="color: rgba(131,0,0,1);font-size:20px;"><i class="el-icon-warning-outline"></i></span>
                  </el-tooltip>
                </template>
              </vxe-table-column>
              <vxe-table-column field="content1" title="考核情况" :edit-render="{name: 'input', props: {placeholder: '请输入考核情况'}}"></vxe-table-column>
              <vxe-table-column field="score" title="考核得分" width="100" :edit-render="{name: 'input', props: {placeholder: '请输入考核得分'}}"></vxe-table-column>
           </vxe-grid>
          </template>
          <vxe-form title-align="right" title-width="100">
            <vxe-form-item align="center" span="24">
              <vxe-button status="primary" @click="jolinClick()">提交</vxe-button>&nbsp;&nbsp;&nbsp;&nbsp;
              <vxe-button type="reset" @click="resetVxe()">重置</vxe-button>
            </vxe-form-item>
          </vxe-form>
        </vxe-modal>

        <vxe-modal v-model="kaohedetailshow" :showHeader="false" id="kaohedetail" width="900" height="590" min-width="460" style="top:30px !important;left: 1px;overflow: hidden;" min-height="320" resize remember storage transfer>
          <el-row style="width:100%;height:60px;">
            <h3 style="text-align: center;line-height: 60px;font-family: '宋体', 'Avenir', Helvetica, Arial, sans-serif;">运行一班班组考核表</h3>
          </el-row>
          <el-row style="width:100%;height:50px;">
            <el-col :span="12" style="color: #c9183b;height:100%;line-height: 50px;padding-left: 50px;">考核班组:运行一班</el-col>
            <el-col :span="12" style="color: #c9183b;height:100%;line-height: 50px;padding-left: 270px;">考核时间:2020年3月</el-col>
          </el-row>
          <template>
            <vxe-grid
              border
              resizable
              auto-resize
              show-footer
              show-overflow="tooltip"
              height="400"
              sync-resize="false"
              ref="xGridS"
              :span-method="rowspanMethod"
              :footer-method="footerMethod"
              :data.sync="vstableData">
              <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
              <vxe-table-column field="item" title="项目" width="150"></vxe-table-column>
              <vxe-table-column field="content" title="考核内容" width="200"></vxe-table-column>
              <vxe-table-column field="detail" title="详情" width="70">
                <template v-slot="{ row }">
                  <el-tooltip placement="top">
                    <div slot="content" v-if="row.stanard==='扣分'">我是扣分项</div>
                    <div slot="content" v-if="row.stanard==='加分'">我是加分项</div>
                    <div slot="content" v-if="row.stanard==='加分或扣分'">我是加分项或者扣分项</div>
                    <span style="color: rgba(131,0,0,1);font-size:20px;" v-if="row.stanard==='扣分'"><i class="el-icon-remove-outline"></i></span>
                    <span style="color: rgba(131,0,0,1);font-size:20px;" v-if="row.stanard==='加分'"><i class="el-icon-circle-plus-outline"></i></span>
                    <span style="color: rgba(131,0,0,1);font-size:20px;" v-if="row.stanard==='加分或扣分'"><i class="el-icon-circle-check"></i></span>
                  </el-tooltip>
                  <el-tooltip placement="top">
                    <div slot="content">
                      考核依据：{{row.accord}}
                      <br>
                      考核办法：{{row.means}}
                    </div>
                    <span style="color: rgba(131,0,0,1);font-size:20px;"><i class="el-icon-warning-outline"></i></span>
                  </el-tooltip>
                </template>
              </vxe-table-column>
              <vxe-table-column field="content1" title="考核情况"></vxe-table-column>
              <vxe-table-column field="score" title="考核得分" width="100"></vxe-table-column>
            </vxe-grid>
          </template>
          <vxe-form title-align="right" title-width="100">
            <vxe-form-item align="center" span="24">
              <vxe-button type="reset" @click="resetVxe()">取消</vxe-button>
            </vxe-form-item>
          </vxe-form>
        </vxe-modal>
      </div>
    </div>
    <el-dialog title="推送消息管理"
               custom-class="dialog"
               :modal="modal"
               :before-close="resetForm" :visible.sync="showMessage" width="500px" height="400px"
               :close-on-click-modal="modal" @close="resetForm">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="demo-ruleForm">
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
        <el-form-item label="接收人员" style="width:90%;">
          <div class="tree-container">
            <el-tree
              :data="messageData"
               class="tree"
               ref="tree"
               id="tree"
              :indent="0"
               show-checkbox
              :render-content="renderContent"
               node-key="id"
              :props="TProps">
            </el-tree>
          </div>
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
  import * as api from '../../api/system'
  import * as check from '../../api/check'
  import * as message from '../../api/message'
  import * as common from '../../helper/common'
  export default {
    data(){
      return{
        form:{},
        rules: {
          name: [{ required: true, message: '请输入用户名', trigger: 'change' }]
        },
        defaultProps: {
          label: 'NAME',
          children: 'childern'
        },
        TProps: {
          children: 'childern',
          label: 'name'
        },
        checkindexs:[],
        tableData:[],
        treedata: [],
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
        messageData: []
      }
    },
    mounted () {
      this.selectAllDate()
      this.selectTreeDate()
      this.selectCheckIndex()
      this.selectTreeUserDate()
    },

    methods:{
      jolinClick () {
        debugger
        let arry = this.$refs.xGrid.getTableData().footerData[0]
        let arrydetail = this.$refs.xGrid.getTableData().tableData
        let objtr = []
        for(let i=0;i<arrydetail.length;i++){
          let objmap={}
          objmap.id=common.dataid()
          objmap.checkdetailid=arrydetail[i]['id']
          objmap.checkresultqdid=this.checkindexid
          objmap.content=arrydetail[i]['content1']
          objmap.score=arrydetail[i]['score']
          objtr.push(objmap)
        }
        let param={
          'qddetails':JSON.stringify(objtr),
          'id':this.checkindexid,
          'result':arry[arry.length-1]
        }
        check.updateqdDetail(param).then(res => {
          if(res.data.code === 0){
            this.$message({
              type: 'success',
              message: '考核保存成功！'
            })
          }else{
            this.$message({
              type: 'error',
              message: '考核保存失败！'
            })
          }
          this.kaoheshow=false
          this.selectAllDate()
        })
      },
      resetVxe(){
        this.$refs.xGrid.clearAll()
        this.resetForm()
      },
      formatterTime (val) {
        let va = val.checktime.replace('.000+0000', '').replace('T', ' ')
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
          'checkname': this.searchForm.checkname
        };
        check.selectResultqd(param).then(res => {
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
        this.form.orgid = treedata.ID
        this.form.type = treedata.TYPE
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
      // 通用行合并函数（将相同多列数据合并为一行）
      rowspanMethod ({ row, $rowIndex, column, data }) {
        let fields = ['item']
        let cellValue = row[column.property]
        if (cellValue && fields.includes(column.property)) {
          let prevRow = data[$rowIndex - 1]
          let nextRow = data[$rowIndex + 1]
          if (prevRow && prevRow[column.property] === cellValue) {
            return { rowspan: 0, colspan: 0 }
          } else {
            let countRowspan = 1
            while (nextRow && nextRow[column.property] === cellValue) {
              nextRow = data[++countRowspan + $rowIndex]
            }
            if (countRowspan > 1) {
              return { rowspan: countRowspan, colspan: 1 }
            }
          }
        }
      },
      footerMethod ({ columns, data }) {
        return [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return '合计'
            }
            if (['score'].includes(column.property)) {
              return this.handleSum(data, column.property)
            }
            return '-'
          })
        ]
      },
      handleSum(list, field){
        let total = 0
        for(let index=0;index<list.length;index++){
          total += Number(list[index][field] || 0)
        }
        return total
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
              //this.form = JSON.parse(JSON.stringify(row))
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
        if(this.form.type != '1'){
          this.$message('请选选择部门或者选择考核班组')
          return
        }else{
          this.title='添加'
          this.showDetail=true
          this.isadd=true
          this.value=''
          this.form.checktype=''
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
        if(this.value===undefined||this.value===''||this.value===null){
          this.$message({type: 'error', message: '请选选择考核制度'})
          if(this.value===undefined||this.value===''||this.value===null){

          }
        }else{
          let param={
            'name':this.form.name,
            'orgid':this.form.orgid,
            'checktype':this.form.checktype,
            'checkdate':this.form.checkdate,
            'checkindexid':this.obj.id
          }
          check.addResultqd(param).then(res => {
            if(res.data.code===0){
              this.resetForm()
              this.selectTreeDate()
              this.selectAllDate()
            }
          })
        }
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
          /*this.form.ids = ''
          this.form.names = ''
          this.form.orgnames = ''
          this.form.content = ''
          this.multipleSelection.map((item, index) => {
            this.form.content = '考核标题: ' + item.checkdate + item.checktype + '考核,' + '     考核时间：' + item.checktime.replace('.000+0000', '').replace('T', ' ') + ',     考核成绩：' + item.result + ',  本次考核成绩相对上月上升2名，本次第3名！继续保持'
            if(item.status==='已完成'){
              this.form.ids = item.id
              this.form.names =item.name
              this.form.orgnames = item.orgname
            }else{
              this.form.ids=''
              this.form.names=''
              this.form.orgnames=''
              this.$message({type: 'error', message: '选择的项目包含未完成的消息'})
              return
              this.resetForm()
            }
          })
          if(this.form.ids!==''){
            this.form.ids = this.form.ids.slice(0, this.form.ids.length - 1)
            this.form.names = this.form.names.slice(0, this.form.names.length - 1)
            this.form.orgnames = this.form.orgnames.slice(0, this.form.orgnames.length - 1)
            this.showMessage=true
          }*/
        } else {
          this.$message({type: 'error', message: '请选选择要推送的消息'})
        }
        this.selectTreeUserDate()
      },
      selectTreeUserDate(){
        api.selectOrganizationTreeUser().then(res => {
          if (res.data.code === 0) {
               this.messageData = res.data.data
          }
        })
      },
      renderContent(h, { node, data, store }){
        if(data.type==='0'){
          if(node.isLeaf){
            return (<span><i class="el-icon-folder"></i>{node.label}</span>)
          }else{
            return (<span><i class="el-icon-folder-opened"></i>{node.label}</span>)
          }
        }else{
          return (<span><i class="el-icon-user"></i>{node.label}</span>)
        }
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
    display: flex;
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
  .el-input__inner {
    padding: 0px 30px !important;
  }
  .vxe-modal--wrapper.type--modal .vxe-modal--body, .vxe-modal--wrapper.type--modal .vxe-modal--body .vxe-modal--content {
    overflow: hidden !important;
  }
  .vxe-toolbar {
    z-index:999;
    position: absolute !important;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #606266;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
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

