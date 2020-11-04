<template>
  <div class="content">
    <div class="content-main">
      <div class="left-content">
        <div class="sbTree" style="border:none;padding-top:10px;">
          <el-tree :data="treedata"
                   :props="defaultProps"
                   :highlight-current="true"
                   @node-click="handleClickChange"></el-tree>
        </div>
      </div>
      <div class="right-content">
        <div class="chart-container">
          <chart height="100%" width="100%" :obj="obj"/>
        </div>
      </div>
    </div>
    <el-dialog :title="title"
               custom-class="dialog"
               :before-close="resetForm" :visible.sync="showDetail" width="1000px" @close="resetForm" style="margin-top:20px !important;">
      <div class="dialog_warp">
        <el-form ref="form" :model="form" label-width="80px" class="demo-ruleForm">
          <el-form-item label="考核名称" style="width:45%;">
            <el-input v-model="form.name" placeholder="请输入考核名称"></el-input>
          </el-form-item>
          <el-form-item label="考核成绩" style="width:45%;">
            <el-input v-model="form.result"></el-input>
          </el-form-item>
          <el-row style="text-align: center;">
            <el-col :span="12">
                <Radar :height="radarheight" width="100%" :radate="radate" :id="radar"/>
            </el-col>
            <el-col :span="12">
                <Pie :height="pieheight" width="100%" :piedate="piedate" :id="pie"/>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
              <el-button @click="resetForm">取 消</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
  import * as api from '../../api/system'
  import * as check from '../../api/check'
  import Chart from '@/components/common/Charts/Treemap'
  import Radar from '@/components/common/Charts/RadirChar'
  import Pie from '@/components/common/Charts/PieChar'
  export default {
    name: 'MixChart',
    components: { Chart,Radar,Pie},
    data(){
      return{
        form:{},
        defaultProps: {
          label: 'name',
          children: 'children'
        },
        obj: {},
        radar: 'radar',
        pie: 'pie',
        radarheight: '400px',
        pieheight: '400px',
        radate: [],
        piedate: [],
        treedata: [],
        title:'',
        showDetail: false,
        multipleSelection:[],
      }
    },
    mounted () {
      this.selectAllDate()
      this.selectTreeDate()
    },

    methods:{
      handleSelectionChange(val) {
        this.multipleSelection=val
      },
      selectTreeDate(){
        check.selectCheckTree().then(res => {
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
          'id': this.form.id,
          'orgid': this.form.orgid,
        };
        api.selectOrganizationCheckTree(param).then(res => {
          if(res.data.data!=null){
            this.obj = res.data.data
          }
        })
      },
      handleClickChange(treedata){
        let param={
          'id':treedata.id
        }
        if(treedata.type==='1'){
          check.getLisIndexResultqdAnalysisById(param).then(res => {
            if(res.data.code === 0){
              console.dir(res)
              this.form=res.data.data.result
              this.radate=res.data.data.ayaly
              this.piedate=res.data.data.plus
              this.showDetail=true
              this.title = '考核评估报告'
            }
          })
        }else{
          check.getLisIndexResultbzAnalysisById(param).then(res => {
            console.dir(res)
          })
        }
      },
      renderContent(h, { node, data, store }){
        if(data.pid==='0'){
          if(node.isLeaf){
            return (<span><i class="el-icon-folder"></i>{node.label}</span>)
          }else{
            return (<span><i class="el-icon-folder-opened"></i>{node.label}</span>)
          }
        }else{
          return (<span><i class="el-icon-user"></i>{node.label}</span>)
        }
      },
      resetForm(){
        this.form={}
        this.showDetail=false
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
    flex-wrap: nowrap;
    .left-content {
      width: 20%;
      height: calc(100vh - 150px) !important;
      background-color: #ffffff;
      float: left;
      overflow: auto;
      .sbTree{
          width: 100%;
      }
    }
  .right-content {
    width: 80%;
    height: calc(100vh - 150px) !important;
    margin: 0px;
    float: left;
    overflow: auto;
    background-color: #ffffff;
    .chart-container{
      position: relative;
      width: 100%;
      height: calc(100vh - 100px);
    }
  }
  }
  }
</style>

