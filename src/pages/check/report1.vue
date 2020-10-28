<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="content">
    <div class="content-main">
      <div class="left-content">
        <div class="sbTree" style="border:none;padding-top:10px;">
          <el-tree :data="treedata"
                   :props="defaultProps"
                   :highlight-current="true"
                   :render-content="renderContent"
                   @node-click="handleClickChange"></el-tree>
        </div>
      </div>
      <div class="right-content">
          <div class="right-content-left" style="float:left;width:48%;border:2px solid red;">
            <vxe-table
              border
              resizable
              height="400"
              :span-method="rowspanMethod"
              :toolbar="tableToolbar"
              :data="tableqdData">
              <vxe-table-column field="id" width="60"></vxe-table-column>
              <vxe-table-column field="num" width="60" title="排名">
                <template slot-scope="scope">
                  <span style="background-color: rgb(201,41,39);border-radius: 14px;padding: 0px 8px 2px 8px;color: #ffffff;font-weight: 600;">{{ scope.row.num }}</span>
                </template>
              </vxe-table-column>
              <vxe-table-column field="name" title="班组"></vxe-table-column>
              <vxe-table-column field="name" title="状态"></vxe-table-column>
              <vxe-table-column field="city" title="city"></vxe-table-column>
              <template v-slot:toolbar_buttons>
                <vxe-form :data="formData" @submit="searchEvent" @reset="searchEvent">
                  <vxe-form-item field="name" :item-render="{name: 'input', attrs: {placeholder: '请输入名称'}}"></vxe-form-item>
                  <vxe-form-item :item-render="{ name: '$buttons', children: [{ props: { type: 'submit', content: 'app.body.label.search', status: 'primary' } }, { props: { type: 'reset', content: 'app.body.label.reset' } }] }"></vxe-form-item>
                </vxe-form>
              </template>
            </vxe-table>
          </div>
          <div class="right-content-right" style="float:left;width:48%;border:2px solid red;"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from '../../api/system'
  import * as check from '../../api/check'
  export default {
    data(){
      return{
        form:{},
        defaultProps: {
          label: 'name',
          children: 'childern'
        },
        tablebzData:[],
        tableqdData:[{
          id: '班组考核',
          num:1,
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          id: '班组考核',
          num:2,
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333,
          tag: '公司'
        }, {
          id: '班组考核',
          num:3,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333,
          tag: '家'
        }, {
          id: '班组考核',
          num:4,
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333,
          tag: '公司'
        }],
        treedata: [],
        multipleSelection:[],
      }
    },
    mounted () {
      this.selectAllDate()
      this.selectTreeDate()
    },

    methods:{
      formatterTime (val) {
        let va = val.updatetime.replace('.000+0000', '').replace('T', ' ')
        return va;
      },
      handleSelectionChange(val) {
        this.multipleSelection=val
      },
      selectTreeDate(){
        api.selectOrganizationTreeUser().then(res => {
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
        check.selectResultqd(param).then(res => {
          console.dir(res)
          if(res.data.data!=null){
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          }
        })
      },
      handleClickChange(treedata){
        this.form.orgid = treedata.ID
        this.selectAllDate()
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
      rowspanMethod ({ row, $rowIndex, column, data }) {
        console.dir(this)
        const fields = ['id']
        const cellValue = this.$utils.get(row, column.property)
        if (cellValue && fields.includes(column.property)) {
          const prevRow = data[$rowIndex - 1]
          let nextRow = data[$rowIndex + 1]
          if (prevRow && this.$utils.get(prevRow, column.property) === cellValue) {
            return { rowspan: 0, colspan: 0 }
          } else {
            let countRowspan = 1
            while (nextRow && this.$utils.get(nextRow, column.property) === cellValue) {
              nextRow = data[++countRowspan + $rowIndex]
            }
            if (countRowspan > 1) {
              return { rowspan: countRowspan, colspan: 1 }
            }
          }
        }
      },
      resetForm(){
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
  .left-content {
    width: 20%;
    height: calc(100vh - 150px) !important;
    background-color: #ffffff;
    float: left;
    overflow: auto;
  }
  .right-content {
    width: 80%;
    height: calc(100vh - 150px) !important;
    margin: 0px;
    float: left;
    overflow: auto;
    background-color: #ffffff;
  }
  }
  }
</style>

