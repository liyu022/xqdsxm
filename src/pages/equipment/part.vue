<template>
    <div id="yjxt">
   <div class="content">
    <div class="header">
      <div class="header_option">
        <ul>
          <li><i class="el-icon-download"> 导出</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
          <li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>   
          <li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>
          <div class="clear"></div>
        </ul>
      </div>
      <div class="cha_xun" style="" v-if="showSearch">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="单据编号" prop="lxbh">
              <el-input v-model="searchForm.djbh" size="mini" placeholder="请输入单据编号"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="日期选择" prop="" class="">
            <el-date-picker
              v-model="searchForm.jcrq"
              type="daterange"
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="small" @click="search(1, 10)" type="text" style="width: 64px;height: 28px;background-color: #DF4D4A;border-radius: 4px;color: #fff">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
     <div class="content_tables">
       <div class="tips">共<span>100</span>条数据，已审核<span style="color:#3bc568">90</span>条，未审核<span style="color:#f25555">10</span>条</div>
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
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template slot-scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="状态" width="120">
          <template slot-scope="scope">
            <span style="color:#D34C42;text-align: center;cursor: pointer;" v-if="scope.row.zt==='未审核'" @click="shenhe(scope.row)">{{scope.row.zt}}</span>
            <span style="color:#81D741;text-align: center" v-if="scope.row.zt==='已审核'">已审核</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="hwmc" label="货物名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="cgpe" label="采购配额"></el-table-column>
        <el-table-column align="center" prop="ghs" label="供货商"></el-table-column>
        <el-table-column align="center" prop="cgry" label="采购人员"></el-table-column>
      </el-table>
   
     <el-dialog :title="title" 
     custom-class="dialog"
     :modal="modal"
     :before-close="resetForm" :visible.sync="showDetail" width="580px" 
     :close-on-click-modal="modal" @close="resetForm">
      <div class="dialog_warp" v-if="!issh">
          <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="货物名称">
    <el-select v-if="!showxq" v-model="form.hwmc" placeholder="">
      <el-option label="货物1" value="shanghai"></el-option>
      <el-option label="货物2" value="beijing"></el-option>
    </el-select>
    <el-input v-if="showxq" v-model="form.hwmc"></el-input>
  </el-form-item>
  <el-form-item label="采购配额">
   <el-select v-if="!showxq" v-model="form.cgpe" placeholder="">
      <el-option label="货物1" value="shanghai"></el-option>
      <el-option label="货物2" value="beijing"></el-option>
    </el-select>
    <el-input v-if="showxq" v-model="form.cgpe"></el-input>
  </el-form-item>
  <el-form-item label="状态">
    <el-radio-group v-model="form.zt">
      <el-radio label="未审核"></el-radio>
      <el-radio label="已审核"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="供货商">
    <el-select v-if="!showxq" v-model="form.ghs" placeholder="">
      <el-option label="货物1" value="shanghai"></el-option>
      <el-option label="货物2" value="beijing"></el-option>
    </el-select>
    <el-input v-if="showxq" v-model="form.ghs"></el-input>
  </el-form-item>
  <el-form-item label="采购人员">
   <el-select v-if="!showxq" v-model="form.cgry" placeholder="">
      <el-option label="货物1" value="shanghai"></el-option>
      <el-option label="货物2" value="beijing"></el-option>
    </el-select>
    <el-input v-if="showxq" v-model="form.cgry"></el-input>
  </el-form-item>
</el-form>
      </div>
     <div class="dialog_warp" v-if="issh">
       <el-form>
        <el-form-item label="状态">
        <el-radio-group v-model="form.zt">
          <el-radio label="未审核"></el-radio>
          <el-radio label="已审核"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
    <el-input type="textarea" v-model="form.desc" placeholder="里面还存在一些相关的数量不对问题，请注意核对信息"></el-input>
    </el-form-item>
    <div>
      <span>审批人：</span><span>张天翼</span> <span style="float:right">2019-03-14</span>
      <div class="clear"></div>
    </div>
       </el-form>
       </div> 
    <span slot="footer" class="dialog-footer" v-if="isadd">
    <el-button @click="resetForm">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">添 加</el-button>
  </span>
  <span slot="footer" class="dialog-footer" v-if="showDetail&&!isadd&&!showxq&&!issh">
    <el-button @click="resetForm">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">编 辑</el-button>
  </span>
  <span slot="footer" class="dialog-footer" v-if="showxq&&!isadd">
    <el-button @click="resetForm">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">详 情</el-button>
  </span>
  <span slot="footer" class="dialog-footer" v-if="issh&&!isadd&&!showxq">
    <el-button @click="resetForm">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">审 核</el-button>
  </span>
</el-dialog>
     </div>
      <footer class="footer">
      <div style="float: right;padding: 6px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{

            },
            tableData:[{
              zt:'未审核',
              hwmc:'胜多负少',
              cgpe: 100,
              ghs: 'asd',
              cgry: '阿斯顿'
            },{
              zt:'未审核',
              hwmc:'傻大姐',
              cgpe: 1002,
              ghs: 'asd',
              cgry: '阿斯顿'
            },{
              zt:'未审核',
              hwmc:'水电费',
              cgpe: 1003,
              ghs: 'asd',
              cgry: '阿斯顿'
            }],
            title:'',
            modal:false,
            total:10,
            showSearch:false,
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
    methods:{
        handleSelectionChange(val){
          this.multipleSelection=val
          console.log(this.multipleSelection)
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
       },
       showAdd(){
         this.title='添加'
         this.showDetail=true
         this.showxq=false
         this.isadd=true
       },
       shenhe(){
         this.title='审核信息'
        this.showDetail=true
         this.issh=true
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
            djbharr = djbharr + item.djbh + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
          this.$api.jdwhxjwxdelGzbxByDjbhs('?djbhs=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.search(this.currentPage, this.pageSize)
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
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
      
      search (currentPage, pageSize) {
      },
      handleSizeChange (val) {
      this.pageSize = val
      this.search(this.currentPage, this.pageSize)
    },
     handleCurrentChange (val) {
      this.currentPage = val
      this.search(this.currentPage, this.pageSize)
    },
    resetForm(done){
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
#yjxt{
    width: calc(100%-32px);
    height: 100%;
    min-height: 625px;
 
    .content{
    width: 100%;
     background-color: #ffffff;
     .content_tables{
      position: relative;
      height: calc(100% - 85px);
      min-height: 300px;
      padding: 0 15px;
      .dialog{
    margin: 0px!important;
    position: absolute!important;
    width: 350px!important;
    height: calc(100% - 85px);
    top: 76px;
    right: 0px;
  }
  .el-dialog__footer{
      text-align: center!important;
      position: absolute!important;
      bottom: -15px!important;
      width: 100%!important;
  }
  .el-dialog__header{
    border-bottom: 1px solid #aaaaaa;
  }
      .dialog_warp{
        width: 100%;
      }
      .tips{
        font-size: 12px;
        span{
          margin: 0px 5px;
        }
      }

    }    
     .header{
      padding: 10px 0px;   
    ul{
    .clear{
            clear: both;
        }
    li{
          list-style: none;
          color: #ffffff;
          float:right;
          padding: 5px 15px;
          background-color: #1c8ffa;
          border-radius: 5px;
          margin: 0px 5px;
          cursor: pointer;
      }  
    }
     }

    }
    .footer{
      height: 45px;
      background: #fff;
      position: relative;
      z-index: 100;
    }
}
</style>

