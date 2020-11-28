<template>
  <div class="pro_page">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
          style="width: 100%;height: 100%!important;overflow:auto;" row-class-name="row_class" border
          :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}" @expand-change="expandChange" >
          <el-table-column type="expand">
          <template slot-scope="props">
          <el-table border :data="props.row.children" v-loading="props.row.loading" style="width: 100%"
            >
            <el-table-column type="index" label="序号" width="60px" align="center">
      </el-table-column>
      <el-table-column prop="ROLANAME" label="角色名称">
      </el-table-column>
      <el-table-column   label="评价角色">
          <template slot-scope="scope">
              <span v-if="scope.row.TYPE=='A'">机关科级干部</span>
              <span v-if="scope.row.TYPE=='D'">站队科级干部</span>
          </template>
      </el-table-column>
      <el-table-column prop="CREATENAME" label="创建人">
      </el-table-column>
      <el-table-column prop="CREATETIME" label="更新时间">
      </el-table-column>
      <el-table-column prop="PROPORTION" label="权重">
      </el-table-column>
          </el-table>
        </template>
      </el-table-column>
          <el-table-column align="center" class-name="column-caoz" label="操作">

            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="getProportionByPlanid(scope.row)">分配权重</el-button>
              <!-- <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span> -->
            </template>
          </el-table-column>
          <el-table-column align="center" prop="NAME" label="考核计划名称" width="260"></el-table-column>
          <el-table-column align="center" prop="TYPE" label="考核类型" width="160"></el-table-column>
          <el-table-column align="center" prop="DATA" label="考核时间" width="150"></el-table-column>
          <el-table-column align="center" prop="STATE" label="考核计划状态"></el-table-column>
          <el-table-column align="center" prop="CREATETIME" label="创建时间"></el-table-column>
        </el-table>
  
    <div class="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="分配权重" custom-class="viewPage" :visible.sync="showView" :close-on-click-modal="false" width="37%">

      <el-form ref="form" class="elform" v-model="form" label-width="100px">
        <el-form-item label="角色名称：">
          <span>{{form.ROLANAME}}</span>
        </el-form-item>
        <el-form-item label="创建人：">
          <span>{{form.CREATENAME}}</span>
        </el-form-item>
        <el-form-item label="创建时间：">
          <span>{{form.CREATETIME}}</span>
        </el-form-item>
        <el-form-item label="权重值：">
          <el-input :min="0" :max="1" v-model="form.PROPORTION" type="number"> </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showView = false">取 消</el-button>
        <el-button type="primary" @click="handelSubmit">提 交</el-button>
      </span>
    </el-dialog>
     <el-dialog title="权重设置" :visible.sync="subDetail" width="90%" :close-on-click-modal="false">
            <div class="dialog_warp">
                 <el-table :data="subtableData" ref="multipleTable" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60px" align="center">
      </el-table-column>
      <el-table-column prop="ROLANAME" label="角色名称">
      </el-table-column>
      <el-table-column   label="评价角色">
          <template slot-scope="scope">
              <span v-if="scope.row.TYPE=='A'">机关科级干部</span>
              <span v-if="scope.row.TYPE=='D'">站队科级干部</span>
          </template>
      </el-table-column>
      <el-table-column prop="CREATENAME" label="创建人">
      </el-table-column>
      <el-table-column prop="CREATETIME" label="更新时间">
      </el-table-column>
      <el-table-column prop="PROPORTION" label="权重">
          <template slot-scope="scope">
              <el-input :min="0" :max="1" v-model="scope.row.PROPORTION" type="number"> </el-input>
          </template>
      </el-table-column>
    </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="subDetail = false">取 消</el-button>
        <el-button type="primary" @click="handelSubmitPRO">提 交</el-button>
      </span>
        </el-dialog>
  </div>
</template>

<script>
  import * as approveApi from '@/api/approve'
  import * as api from '@/api/leader'
  export default {
    data() {
      return {
        showView: false,
        tableData: [{

        }],
        subtableData:[],
        subDetail:false,
        form: {
          PROPORTION: 0
        },
        searchForm: {},
        currentId:'',
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    created() {
      this.getsysroleproportionList()
    },
    methods: {
      expandChange(row, expandedRows) {

   
          // 通过$set属性可设置loading实现实时加载loading效果(经过测试,通过$set直接给父层数据声明子层数据时会出现报错,所以才在获取父层表格数据时声明子层表格数据)
         let parmas={
          planid:row.ID
        }
          // this.$set(row, 'loading', true);
          approveApi.getProportionByPlanid(parmas).then((res) => {
            if (res.data.code === 0) {

              const taskData = JSON.parse(JSON.stringify(res.data.data));
              // 遍历父层表格数据
              this.$set(row, 'children', taskData);

              this.tableData.forEach((temp, index) => {
                // 找到当前展开的行，把获取到的数据赋值进去
                if (temp.ID === row.ID) {
                  this.tableData[index].children = taskData || [];
                }
              });
            }
            this.$set(row, 'loading', false);
          }, (err) => {
            this.$set(row, 'loading', false);
          });
        
      },
      getProportionByPlanid(row){
        let parmas={
          planid:row.ID
        }
         approveApi.getProportionByPlanid(parmas).then(res => {
           if(res.data.code === 0){
             this.subtableData = res.data.data
             this.currentId=row.ID
             this.subDetail=true
           }else{
             this.$message({
               type:'error',
               message:'获取失败'
             })
            this.subDetail=false
           }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getsysroleproportionList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getsysroleproportionList()
      },
      getsysroleproportionList() {
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
            this.tableData.forEach(item=>{
                item.loading=false
                item.children=[]
            })
            this.total = res.data.data.total
          }
        })
      },
      handelClick(r) {
        this.showView = true
        this.form = JSON.parse(JSON.stringify(r))
      },
      handelSubmit() {
        let params = {
          "createby": this.form.CREATEBY,
          "createtime": this.form.CREATETIME,
          "id": this.form.ID,
          "proportion": this.form.PROPORTION,
          "roldId": this.form.ROLD_ID,
          "type": this.form.TYPE
        }
        approveApi.sysroleproportionUpdate(params).then(res => {
      
          if (res.data.code == 0) {
            this.form = {}
            this.showView = false
            this.getsysroleproportionList()
          }
        })
      },
      handelSubmitPRO(){
        let userid = JSON.parse(localStorage.getItem('userid'))
          for (let i = 0; i < this.subtableData.length; i++) {
             this.subtableData[i].PLANID=this.currentId
             this.subtableData[i].CREATEBY=userid
          }
          // let params={
          //   result:JSON.parse(JSON.stringify(this.subtableData)) , 
          //   planid: this.currentId
          // }

           approveApi.sysroleproportion(this.subtableData).then(res => {
           if(res.data.code === 0){
              this.$message({
               type:'success',
               message:'分配成功'
             })
             this.subDetail=false
           }else{
             this.$message({
               type:'error',
               message:'获取失败'
             })
            this.subDetail=true
           }
        })
      }
    }
  }
</script>

<style lang="scss">
  .pro_page {
    .viewPage {
      top: 10%;

      .el-dialog__header {
        background: #97a8be;
      }

      .el-dialog__title,
      .el-dialog__headerbtn .el-dialog__close {
        font-weight: 800;
        color: #fff;
      }
    }

    .elform {
      padding-top: 20px;
      min-height: 10px;
    }
  }
</style>