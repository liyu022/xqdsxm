<template>
    <div class="content">
        <div class="content-main">
            <div class="right-content">
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
                            <el-button @click="updateFormDia()" type="primary"><i class="el-icon-edit-outline"> 修改</i></el-button>
                            <el-button @click="showBhFormDia()" type="primary"><i class="el-icon-info"> 详情</i></el-button>
                            <el-button @click="importData()" type="primary"><i class="el-icon-upload2"> 导入</i></el-button>
                            <el-button type="primary">
                                <el-link target="_blank" href="http://127.0.0.1:8080/static/file/后备干部考核表.xlsx" :underline="false"
                                         style="color:#ffffff;">下载模板
                                </el-link>
                            </el-button>

                            <div class="clear"></div>
                        </el-form-item>
                    </el-form>
                </div>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                          style="width: 100%;overflow:auto;"
                          row-class-name="row_class"
                          border
                          :row-style="{fontFamily: '宋体', fontSize: '12px',height:'40px'}"
                          @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column align="center" prop="type" label="考核类型" width="160" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="content" label="考核内容" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="code" label="加分项代码" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="stanard" label="加分标准" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="means" label="导入方式" width="110" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="createtime" label="创建时间" width="150" :formatter="formatterTime"></el-table-column>
                    <el-table-column align="center" prop="createname" label="创建人" width="90" show-overflow-tooltip></el-table-column>
                    <el-table-column align="center" prop="note" label="备注" show-overflow-tooltip></el-table-column>
                </el-table>
                <el-dialog :title="title"
                           custom-class="dialog"
                           :modal="modal"
                           :before-close="resetForm" :visible.sync="showDetail" width="800px"
                           :close-on-click-modal="modal" @close="resetForm">
                    <div class="dialog_warp" v-if="!issh">
                        <el-form ref="form" :model="form" label-width="90px">
                            <el-form-item label="考核类型">
                                <el-input v-model="form.type" placeholder="请输入考核类型"></el-input>
                            </el-form-item>
                            <el-form-item label="加分项代码">
                                <el-input v-model="form.code" placeholder="请输入加分项代码"></el-input>
                            </el-form-item>
                            <el-form-item label="加分标准">
                                <el-input v-model="form.stanard" placeholder="请输入加分标准"></el-input>
                            </el-form-item>
                            <el-form-item label="导入方式">
                                <el-input v-model="form.means" placeholder="手动添加" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="考核内容" style="width:100%;">
                                <el-input type="textarea" v-model="form.content" placeholder="请输入考核内容"></el-input>
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

        <el-dialog :title="title" :visible.sync="excelDetail" width="800px">
            <div class="dialog_warp">
                <el-form ref="form" :model="form" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="导入文件" style="width:100%;">
                        <el-upload
                                class="upload-demo"
                                ref="uploadleaders"
                                action="http://127.0.0.1:8888/XQDS-WEB/excel/importLeanExcel"
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
import * as api from '../../../api/leader'
import * as apie from "../../../api/common";

export default {
    data() {
        return {
            form: {},
            defaultProps: {
                label: 'NAME',
                children: 'children'
            },
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
            showProcess: false,
            excelDetail: false,
            processLength: 0,
        }
    },
    mounted() {
        this.selectAllDate()
    },

    methods: {
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
            apie.importLeanExcel(form).then(res => {
                if (res.data.code === 0) {
                    this.handleUploadChange()
                }
            })
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
        formatterTime(val) {
            let va = val.createtime.replace('.000+0000', '').replace('T', ' ')
            return va;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        showSearch() {
            this.selectAllDate()
        },
        selectAllDate() {
            let param = {
                'currentPage': this.currentPage,
                'pageSize': this.pageSize,
                'means': this.searchForm.means,
                'type': this.searchForm.type
            };
            api.selectLeaderItemList(param).then(res => {
                if (res.data.code === 0) {
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
        updateFormDia() {
            if (this.multipleSelection.length === 1) {
                this.title = '编辑'
                this.showDetail = true
                this.isadd = false
                this.showxq = false
                this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
            } else {
                this.$message({
                    showClose: true,
                    message: '不行！必须选择一条数据',
                    type: 'error'
                });
            }
        },
        handlePreview(file) {
            console.log(file);
        },
        showBhFormDia() {
            if (this.multipleSelection.length === 1) {
                this.title = '详情'
                this.showDetail = true
                this.showxq = true
                this.isadd = false
                this.form = JSON.parse(JSON.stringify(this.multipleSelection[0]))
            } else {
                this.$message({
                    showClose: true,
                    message: '不行！必须选择一条数据',
                    type: 'error'
                });
            }
        },
        showAdd() {
            this.title = '添加'
            this.showDetail = true
            this.showxq = false
            this.isadd = true
        },
        deleteData() {
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
                    api.deleteLeaderItem({'ids': djbharr}).then(res => {
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
        subimetForm() {
            this.form.means = "手动添加";
            api.addLeaderItem(JSON.stringify(this.form)).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    this.selectAllDate()
                } else {
                    this.$message({
                        type: 'error',
                        message: '添加失败!'
                    })
                }
                this.resetForm()
            })
        },
        editForm() {
            api.updateLeaderItem(JSON.stringify(this.form)).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                    this.selectAllDate()
                } else {
                    this.$message({
                        type: 'error',
                        message: '修改失败!'
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
        },
        importData() {
            this.title = '导入excel数据'
            this.excelDetail = true
        },
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
