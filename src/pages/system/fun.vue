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
                            <el-form-item class="" label="模块名称" prop="funName">
                                <el-input v-model="searchForm.funName" size="mini" placeholder="请输入模块名称"></el-input>
                            </el-form-item>
                            <el-form-item class="" label="模块类型" prop="funType">
                                <el-input v-model="searchForm.funType" size="mini" placeholder="请输入模块类型"></el-input>
                            </el-form-item>
                            <el-button @click="deleteData()" type="primary"><i class="el-icon-delete"> 删除</i></el-button>
                            <el-button @click="showAdd()" type="primary"><i class="el-icon-edit-outline"> 添加</i></el-button>
                            <el-button @click="showSearch()" type="primary"><i class="el-icon-search"> 查询</i></el-button>
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
                    <el-table-column align="center" class-name="column-caoz" label="操作" width="100">
                        <template slot-scope="scope">
                            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
                            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="funName" label="模块名称" width="150"></el-table-column>
                    <el-table-column align="center" prop="funType" label="模块类型" width="120"></el-table-column>
                    <el-table-column align="center" prop="funUrl" label="模块路径" width="150"></el-table-column>
                    <el-table-column align="center" prop="funIndex" label="模块索引"></el-table-column>
                    <el-table-column align="center" prop="funIcon" label="模块图标"></el-table-column>
                </el-table>

                <el-dialog :title="title"
                           custom-class="dialog"
                           :modal="modal"
                           :before-close="resetForm" :visible.sync="showDetail" width="400px"
                           :close-on-click-modal="modal" @close="resetForm">
                    <div class="dialog_warp" v-if="!issh">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="模块名称">
                                <el-input v-model="form.funName" placeholder="请输入模块名称"></el-input>
                            </el-form-item>
                            <el-form-item label="模块别名">
                                <el-input v-model="form.funDesc" placeholder="请输入模块别名"></el-input>
                            </el-form-item>
                            <el-form-item label="模块类型">
                                <el-input v-model="form.funType" placeholder="请输入模块类型"></el-input>
                            </el-form-item>
                            <el-form-item label="模块路径">
                                <el-input v-model="form.funUrl" placeholder="请输入模块路径"></el-input>
                            </el-form-item>
                            <el-form-item label="模块索引">
                                <el-input v-model="form.funIndex" placeholder="请输入模块索引"></el-input>
                            </el-form-item>
                            <el-form-item label="模块图标">
                                <el-input v-model="form.funIcon" placeholder="请输入模块图标"></el-input>
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
import * as api from '../../api/system'

export default {
    data() {
        return {
            form: {},
            defaultProps: {
                label: 'FUN_NAME',
                children: 'children'
            },
            tableData: [],
            treedata: [],
            title: '',
            modal: false,
            total: 10,
            showDetail: false,
            showxq: false,
            isadd: false,
            issh: false,
            showAppDetail: false,
            multipleSelection: [],
            searchForm: {},
            currentPage: 1,
            pageSize: 10,
            //角色授权
            warrantList:[],
            showWarrant:false,
            warrantValue:'',
            id:''
        }
    },
    mounted() {
        this.selectAllDate()
        this.selectTreeDate()
    },

    methods: {
        formatterTime(val) {
            let va = val.updatetime.replace('.000+0000', '').replace('T', ' ')
            return va;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        selectTreeDate() {
            let arr = localStorage.getItem("role");
            let param = {
                id: "0",
                roleid:"1"
            }
            api.selectFunctionTree(param).then(res => {
                if (res.data.code === 0) {
                    this.treedata = res.data.data
                }
            })
        },
        showSearch() {
            this.selectAllDate()
        },
        selectAllDate() {
            let param = {
                'currentPage': this.currentPage,
                'pageSize': this.pageSize,
                'id': this.form.id,
                'pid': this.form.pid,
                'funname': this.searchForm.funName,
                'funtype': this.searchForm.funType
            };
            api.selectFunction(param).then(res => {
                if (res.data.data != null) {
                    this.tableData = res.data.data.list
                    this.total = res.data.data.total
                }
            })
        },
        handleClickChange(treedata) {
            this.form.pid = treedata.ID
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
        updateFormDia(row, index) {
            this.title = '编辑'
            this.showDetail = true
            this.isadd = false
            this.showxq = false
            this.form = JSON.parse(JSON.stringify(row))
        },
        updateForm() {
            if (this.multipleSelection.length === 1) {
                this.title = '编辑'
                this.showDetail = true
                this.isadd = false
                this.showxq = false
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
            this.title = '详情'
            this.showDetail = true
            this.showxq = true
            this.isadd = false
            this.form = JSON.parse(JSON.stringify(row))
        },
        showAdd() {
            if (this.form.pid === null || this.form.pid === '' || this.form.pid === undefined) {
                this.$message('请选选择所属部门')
                return
            } else {
                this.title = '添加'
                this.showDetail = true
                this.showxq = false
                this.isadd = true
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
                    api.deleteFunctionAll({'ids': djbharr}).then(res => {
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
        showAppAdd() {
            if (this.multipleSelection.length === 1) {
                this.title = 'App授权'
                this.showDetail = false
                this.isadd = false
                this.showxq = false
                this.showAppDetail = true
                this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
                this.id = this.form.id
            } else {
                this.$message({
                    showClose: true,
                    message: '不行！只能选择一条数据',
                    type: 'error'
                })
            }
        },
        subimetForm() {
            this.form.funDesc = this.form.funName;
            api.addFunction(JSON.stringify(this.form)).then(res => {
                if (res.data.code === 0) {
                    this.resetForm()
                    this.selectTreeDate()
                    this.selectAllDate()
                }
            })
            this.resetForm()
        },
        editForm() {
            api.updateFunction(JSON.stringify(this.form)).then(res => {
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
            this.showAppDetail = false
            this.form = {}
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
    display: flex;
    flex-wrap: nowrap;
    .left-content {
      width: 15%;
      height: calc(100vh - 150px) !important;
      background-color: #ffffff;
      overflow: auto;
      .sbTree{
          width: 100%;
      }
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
    border-top: 1px solid #f3f3f3;
    text-align: center;
    height: 44px;
    background: #fff;
  }
}
</style>

