<template>
  <div class="pro_page">
    <el-table :data="tableData" ref="multipleTable" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60px" align="center">
      </el-table-column>
      <el-table-column prop="ROLANAME" label="角色名称">
      </el-table-column>
      <el-table-column   label="机关科室">
          <template slot-scope="scope">
              <span v-if="scope.row.TYPE=='A'">机关科级干部</span>
              <span v-if="scope.row.TYPE=='D'">战队科级干部</span>
          </template>
      </el-table-column>
      <el-table-column prop="CREATENAME" label="创建人">
      </el-table-column>
      <el-table-column prop="CREATETIME" label="更新时间">
      </el-table-column>
      <el-table-column prop="PROPORTION" label="权重">
      </el-table-column>
      <el-table-column label="分配权重">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handelClick(scope.row)">分配权重</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="分配权重" custom-class="viewPage" :visible.sync="showView" :close-on-click-modal="false" width="70%">

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
  </div>
</template>

<script>
  import * as approveApi from '@/api/approve'
  export default {
    data() {
      return {
        showView: false,
        tableData: [{

        }],
        form: {
          PROPORTION: 0
        },
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }
    },
    created() {
      this.getsysroleproportionList()
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val
        this.getsysroleproportionList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getsysroleproportionList()
      },
      getsysroleproportionList() {
        let uid = JSON.parse(localStorage.getItem('userid')) 
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          uid,
        }
        approveApi.sysroleproportionList(params).then(res => {
          if (res.data.code == 0) {
            let data = res.data.data
            this.total = data.total
            this.tableData = data.list
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
          console.log(res, 555)

          if (res.data.code == 0) {
            this.form = {}
            this.showView = false
            this.getsysroleproportionList()
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