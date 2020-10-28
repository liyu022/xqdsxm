<template>
  <div class="content">
    <div class="content-main">
      <div class="header">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
              <el-form-item style="margin-bottom: 0px;margin-left:10px;" label="" prop="" class="">
                  <el-form-item class="" label="考核类型" prop="name">
                      <el-input v-model="searchForm.type" size="mini" placeholder="请输入考核类型"></el-input>
                  </el-form-item>
                  <el-form-item class="" label="导入方式" prop="type">
                      <el-select v-model="searchForm.means" size="mini" placeholder="请输入导入方式">
                          <el-option label="全部" value=""></el-option>
                          <el-option label="手动添加" value="手动添加"></el-option>
                          <el-option label="自动导入" value="自动导入"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
                  <el-button @click="deleteData()" type="primary"><i class="el-icon-delete"> 删除</i></el-button>
                  <el-button @click="showAdd()" type="primary"><i class="el-icon-circle-plus-outline"> 添加</i></el-button>
                  <el-button @click="importData()" type="primary"><i class="el-icon-upload2"> 导入</i></el-button>
                  <el-button @click="exportData()" type="primary"><i class="el-icon-upload2"> 导出</i></el-button>
                  <el-button type="primary">
                      <el-link target="_blank" href="http://127.0.0.1:8080/static/file/隐患排查登记表.xls" :underline="false"
                                style="color:#ffffff;">下载模板
                      </el-link>
                  </el-button>

                  <div class="clear"></div>
              </el-form-item>
          </el-form>
      </div>
      <div class="content-table">
        <el-table
          :data="tableData"
          style="width: 100%;height: 95%!important;overflow:auto;">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
            <template slot-scope="scope">
              <span style="color:#00a2fd;cursor: pointer;text-align: center;" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
              <span style="color:#00a2fd;cursor: pointer;text-align: center;" @click="showBhFormDia(scope.row)">详情</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="CHECKTIME"
            label="上报日期"
            width="100">
          </el-table-column>
          <el-table-column
            prop="ADGUSTDATE"
            label="整改期限"
            width="80">
          </el-table-column>
          <el-table-column label="隐患信息">
            <el-table-column
              prop="LEADER"
              label="责任人"
              width="120">
            </el-table-column>
              <el-table-column
                prop="CONTENT"
                label="内容描述">
              </el-table-column>
              <el-table-column
                prop="NAME"
                label="名称"
                width="100">
              </el-table-column>
              <el-table-column
                prop="TYPE"
                label="类型"
                width="80">
              </el-table-column>
              <el-table-column
                prop="UNIT"
                label="责任单位"
                width="120">
              </el-table-column>
              <el-table-column
                prop="CHECKBY"
                label="检查人"
                width="80">
              </el-table-column>
              <el-table-column
                prop="LEAVEL"
                label="级别"
                width="80">
              </el-table-column>
          </el-table-column>
          <el-table-column
            prop="STATE"
            label="处理情况"
            width="90">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="excelDetail" width="800px">
            <div class="dialog_warp">
                <el-form ref="form" :model="form" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="导入文件" style="width:100%;">
                        <el-upload
                                class="upload-demo"
                                ref="uploadleaders"
                                action="http://127.0.0.1:8888/XQDS-WEB/excel/importDangerExcel"
                                :auto-upload="false"
                                :limit="1"
                                accept=".xlsx, .xls"
                                :http-request="uploadSectionFile">
                            <el-button slot="trigger" size="small" type="primary">选择上传文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
                            <el-progress :text-inside="true" :stroke-width="3" v-show="showProcess" :percentage="processLength"></el-progress>
                            <div slot="tip" class="el-upload__tip" style="color:#ff0402;">只能上传excel文件,一次只能上传一个文件</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
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
  import * as api from '../../api/analysis'
  export default {
    data(){
      return{
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '皮带运输机电机声音异常',
          city: '设备隐患',
          address: '管理员',
          status: '已处理',
          zip: '一级隐患'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '皮带运输机周围温度过高',
          city: '设备隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '一级隐患'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '下雨天气，路面湿滑，皮带损坏',
          city: '其他隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '设备维修人员新上岗,目前在实习期',
          city: '人员隐患',
          address: '李佳奇',
          status: '已处理',
          zip: '二级隐患'
        }],
        title:'',
        modal:false,
        total:10,
        form: {},
        value:"",
        showProcess: false,
        excelDetail: false,
        processLength: 0,
        showDetail:false,
        multipleSelection:[],
        searchForm:{},
        currentPage: 1,
        pageSize: 10,
      }
    },
    mounted() {
        this.selectAllDate()
    },
    methods:{
      selectAllDate(){
        let param = {
              'currentPage': this.currentPage,
              'pageSize': this.pageSize,
              'means': this.searchForm.means,
              'type': this.searchForm.type
          };
          api.selectAnalyseList(param).then(res => {
              if (res.data.code === 0) {
                  this.tableData = res.data.data.list
                  this.total = res.data.data.total
              }
          })
      },
      exportData(){
        let param = {
          "myid":123212,
          "fileName":"隐患排查列表", 
          "excelFormat":"xls"
        }
        api.exportExcel(param).then(res => {
                if (res.data.code === 0) {
                   console.log(res)
                }
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection=val
      },
      importData() {
        this.title = '导入excel数据'
        this.excelDetail = true
      },
      submitUpload() {
            this.$refs.uploadleaders.submit();
        },
        uploadSectionFile(param) {
            let fileObj = param.file
            let form = new FormData()
            form.append("file", fileObj)
            form.append("id", this.form.id)
            form.append("means", "自动导入")
            this.handleUploadChange(param.file)
            api.ImportAnalyseExcel(form).then(res => {
                if (res.data.code === 0) {
                    this.handleUploadChange()
                }
            })
        },
        updateFormDia(row,index){
        if(row.STATUS==="已完成"){
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
        }else{
          this.title='详情'
        }
      },
        handleUploadChange(){
            this.processLength=0
            this.showProcess = true
            const interval = setInterval(() => {
                if(this.processLength >= 100){
                    clearInterval(interval)
                    this.showProcess=false
                    this.excelDetail=false
                    this.processLength=0
                    this.$message({
                        type: 'success',
                        message: '导入成功!'
                    })
                    this.selectAllDate()
                    return
                }
                this.processLength += 1
            },100)
        },
      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
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
    border-top: 1px solid #f3f3f3;
    text-align: center;
    height: 44px;
    background: #fff;
  }
}

/deep/ .el-input--suffix .el-input__inner {
  padding-right: 12px !important;
}
</style>
