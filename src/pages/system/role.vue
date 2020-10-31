<template>
  <div class="content">
    <div class="content-main">
      <div class="right-content">
        <div class="header">
          <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
            <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
              <el-form-item class="" label="编码" prop="code">
                <el-input v-model="searchForm.code" size="mini" placeholder="请输入编码"></el-input>
              </el-form-item>
              <el-form-item class="" label="名称" prop="name">
                <el-input v-model="searchForm.name" size="mini" placeholder="请输入名称"></el-input>
              </el-form-item>
              <!-- <li><i class="el-icon-download"> 导出</i></li>-->
              <el-button @click="deleteData()" type="primary"><i class="el-icon-delete"> 删除</i></el-button>
              <el-button @click="showAdd()" type="primary"><i class="el-icon-edit-outline"> 添加</i></el-button>
              <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
              <el-button @click="updateForm()" type="primary"><i class="el-icon-setting"> 角色授权</i></el-button>
              <div class="clear"></div>
            </el-form-item>
          </el-form>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" row-class-name="row_class" border
          style="width: 100%;overflow:auto;" :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
            <template slot-scope="scope">
              <span style="color:#00a2fd;cursor: pointer;text-align: center"
                @click="updateFormDia(scope.row, scope.$index)">编辑</span>
              <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="code" label="编码" width="180"></el-table-column>
          <el-table-column align="center" prop="name" label="名称" width="180"></el-table-column>
          <el-table-column align="center" prop="description" label="描述"></el-table-column>
          <el-table-column align="center" prop="createby" label="创建人" width="180"></el-table-column>
          <el-table-column align="center" prop="updatetime" label="创建时间" width="200" :formatter="formatterTime">
          </el-table-column>
        </el-table>

        <el-dialog :title="title" custom-class="dialog" :modal="modal" :before-close="resetForm"
          :visible.sync="showDetail" width="400px" :close-on-click-modal="modal" @close="resetForm">
          <div class="dialog_warp" v-if="!issh">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model="form.name" placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item label="编码">
                <el-input v-model="form.code" placeholder="请输入编码"></el-input>
              </el-form-item>
              <el-form-item label="描述" style="width:100%;">
                <el-input type="textarea" v-model="form.description"></el-input>
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


        <!--角色授权-->
        <el-dialog title="角色授权" custom-class="dialog" :visible.sync="showWarrant" width="500px">
          <!-- <el-cascader style="width: 400px" :options="warrantList" :props="warrantProps" collapse-tags v-model="warrantValue"
                                 clearable></el-cascader> -->
          <div class="tree_box">
            <el-tree ref="tree" default-expand-all :data="treeData" show-checkbox node-key="id" :props="defaultProps"
              :default-checked-keys="checkedKeys">
            </el-tree>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="showWarrant = false">取 消</el-button>
            <el-button type="primary" @click="subimetWarrant">添 加</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import * as api from '../../api/system'
  import {
    treeData
  } from '../../utils/index'

  export default {
    data() {
      return {
        form: {},
        tableData: [],
        title: '',
        modal: false,
        total: 10,
        showDetail: false,
        showxq: false,
        isadd: false,
        issh: false,
        multipleSelection: [],
        searchForm: {},
        currentPage: 1,
        pageSize: 10,
        showWarrant: false,
        //角色授权
        warrantList: [],
        warrantProps: {
          id: 'ID',
          label: 'FUN_NAME',
          children: 'children',
          multiple: true,
          expandTrigger: 'click'
        },
        warrantValue: [],
        roleid: '',
        defaultProps: {
          children: 'children',
          label: 'FUN_NAME'
        },
        treeData: [],
        checkedKeys: []
      }
    },
    mounted() {
      this.selectAllDate()
    },

    methods: {
      formatterTime(val) {
        let va = val.createtime.replace('.000+0000', '').replace('T', ' ')
        return va;
      },
      handleSelectionChange(rows) {
        if (rows.length > 1) {
          this.$refs.multipleTable.toggleRowSelection(rows[0], false);
          rows.splice(0, 1);
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
          'id': this.form.id,
          'name': this.searchForm.name,
          'code': this.searchForm.code
        };
        api.selecRoleList(param).then(res => {
          console.dir(res)
          if (res.data.data != null) {
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
      /**
       * 分配权限
       */
      updateForm() {
        if (this.multipleSelection.length === 1) {
          this.roleid = this.multipleSelection[0].id
          api.selectFunctionTree({
            id: '',
            roleid: this.roleid
          }).then(({
            data
          }) => {
              var yx = data.data;
              console.log(yx,52 )
              this.checkedKeys=[]
              this.deepSet(yx)
              this.treeData = yx
           
            const nav = data.data;
        
            this.warrantList = nav
            const warrantValue = []
            for (const item of nav) {

              for (const val of item.children) {
                if (val.FLAG == '0') {
                  warrantValue.push([val.ID, val.FUN_NAME])
                }
              }
            }
            this.warrantValue = warrantValue
            
            this.showWarrant = true
            console.log(this.warrantValue);
          })
        } else {
          this.$message({
            showClose: true,
            message: '不行！必须选择一条数据',
            type: 'error'
          })
        }
      },
      deepSet(datas) {

        for (var i in datas) {
          if(datas[i].FLAG=='0'){
              this.checkedKeys.push(datas[i].ID)
          }
          if (datas[i].children.length==0) {
             delete datas[i].children
          } 
          datas[i].id = datas[i].ID
          if (datas[i].children) {
            this.deepSet(datas[i].children);
          }
        }

      },
      /**
       * 提交分配权限
       */
      subimetWarrant() {
          let currentData=this.$refs.tree.getHalfCheckedNodes().concat(this.$refs.tree.getCheckedNodes());
        
          let str=''
          for (let i = 0; i < currentData.length; i++) {
               if (i<currentData.length-1) {
                   str+=currentData[i].ID+','
               }else{
                   str+=currentData[i].ID
               }
              
          }
           
    
        api.permission({
          id: this.roleid,
          funs:str
        }).then(res => {
          if (res.data.code == 0) {
            this.showWarrant = false
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
      showAdd() {
        this.title = '添加'
        this.showDetail = true
        this.showxq = false
        this.isadd = true
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
            api.deleteRoleAll({
              'ids': djbharr
            }).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.resetForm()
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
        api.addRole(JSON.stringify(this.form)).then(res => {
          if (res.data.code === 0) {
            this.resetForm()
            this.selectAllDate()
          }
        })
        this.resetForm()
      },
      editForm() {
        api.updateRole(JSON.stringify(this.form)).then(res => {
          if (res.data.code === 0) {
            this.resetForm()
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
        this.form = {}
      }
    }
  }
</script>
<style lang="scss">
  .content {
    margin: 0px;
    padding: 0px;

    .content-main {
      width: 100%;
      padding-top: 5px;
      height: calc(100vh - 150px) !important;

      .el-dialog {
        top: 40px;
        .el-tree-node__expand-icon.is-leaf{
            color: #ffffff!important;
        }
      }

      .right-content {
        width: 100%;
        height: calc(100vh - 150px) !important;
        margin: 0px;
        padding: 0px 10px;
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

    .tree_box {
      min-height: 250px;
    }
  }
</style>