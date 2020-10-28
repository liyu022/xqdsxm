<template>
  <div class="content">
    <div class="content-main">
      <div class="right-content">
        <div class="header">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px;margin-left:10px;" label="" prop="" class="">
              <el-form-item class="" label="消息推送名称" prop="name">
                <el-input v-model="searchForm.name" size="mini" placeholder="请输入消息推送名称"></el-input>
              </el-form-item>
              <el-form-item class="" label="消息推送模块" prop="code">
                <el-input v-model="searchForm.code" size="mini" placeholder="请输入消息推送模块"></el-input>
              </el-form-item>
              <el-button @click="deleteData()" type="primary"><i class="el-icon-download"> 新增</i></el-button>
              <el-button @click="deleteData()" type="primary"><i class="el-icon-download"> 修改</i></el-button>
              <el-button @click="deleteData()" type="primary"><i class="el-icon-delete"> 删除</i></el-button>
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
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column align="center" prop="hwmc" label="消息推送名称"></el-table-column>
          <el-table-column align="center" prop="cgpe" label="所属模块"></el-table-column>
          <el-table-column align="center" prop="level" label="推送方式"></el-table-column>
          <el-table-column align="center" prop="ghs" label="推送类型"></el-table-column>
          <el-table-column align="center" prop="bz" label="创建人"></el-table-column>
          <el-table-column align="center" prop="begin" label="创建时间"></el-table-column>
        </el-table>
        <!--<el-dialog :title="title"
        custom-class="dialog"
        :modal="modal"
        :before-close="resetForm" :visible.sync="showDetail" width="400px"
        :close-on-click-modal="modal" @close="resetForm">
         <div class="dialog_warp" v-if="!issh">
           <el-form ref="form" :model="form" label-width="80px">
               <el-form-item label="消息推送编码">
                 <el-input v-model="form.code" placeholder="请输入消息推送编码"></el-input>
               </el-form-item>
               <el-form-item label="消息推送名称">
                   <el-input v-model="form.name" placeholder="请输入消息推送名称"></el-input>
               </el-form-item>
               <el-form-item label="类型">
                   <el-input v-model="form.type" placeholder="请输入类型"></el-input>
               </el-form-item>
               <el-form-item label="传真">
                   <el-input v-model="form.fax" placeholder="请输传真"></el-input>
               </el-form-item>
               <el-form-item label="联系电话">
                   <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
               </el-form-item>
               <el-form-item label="状态">
                   <el-input v-model="form.status" placeholder="请输入状态"></el-input>
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
     </el-dialog>-->
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
  export default {
    data(){
      return{
        form:{},
        defaultProps: {
          label: 'NAME',
          children: 'children'
        },
        tableData:[{
          hwmc:'班组考核结果推送',
          cgpe: '考核体系-班组考核',
          ghs: '自动推送',
          level: '立即推送',
          bz: '管理员',
          begin: '2020-03-20 00:02:51'
        },{
          hwmc:'班组违章作业推送',
          cgpe: '智能监管-智能监督子系统',
          ghs: '手动推送',
          level: '---',
          bz: '管理员',
          begin: '2020-03-20 00:02:51'
        },{
          hwmc:'班组专项巡检计划',
          cgpe: '智能监管-智能管理子系统',
          ghs: '自动推送',
          level: '立即推送',
          bz: '管理员',
          begin: '2020-03-20 00:02:51'
        }],
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
      selectAllDate(){},
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
      updateFormDia(row,index){
        this.title='编辑'
        this.showDetail=true
        this.isadd=false
        this.showxq=false
        this.form = JSON.parse(JSON.stringify(row))
      },
      showBhFormDia(row){
        /* this.title='详情'
        this.showDetail=true
        this.showxq=true
        this.isadd=false
        this.form = JSON.parse(JSON.stringify(row)) */
        window.open(`/static/js/pdfjs/web/西气东输管道公司安全生产检查管理规范.pdf`);
      },
      showAdd(){
        this.title='添加'
        this.showDetail=true
        this.showxq=false
        this.isadd=true
      },
      deleteData(){
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      },
      subimetForm(){
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
        this.resetForm()
      },
      editForm(){
        this.$message({
          type: 'success',
          message: '修改成功!'
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
