<template>
  <div class="chart-container_org">
    <!-- 科技机关考核 -->

    <div class="main">
      <div class="tabs">
        <span v-if="flag.indexOf('A')>-1" class="tabs__item" :class="activeName=='A'?'active':''"
          @click="handleClick('A')">机关考核</span>
        <span v-if="flag.indexOf('D')>-1" class="tabs__item" :class="activeName=='D'?'active':''"
          @click="handleClick('D')">站队考核</span>
          &nbsp;&nbsp;&nbsp;&nbsp;<span class="el-icon-star-on"></span><span class="el-icon-star-on"></span><span class="el-icon-star-on"></span><span style="color:red;font-weight:600;">{{name}}</span>
      </div>
      <div class="hd">

      </div>
      <div class="card">
        <ul class="tab_c" v-loading="loading">
          <li v-for="(item,index) in tableData" :key="index">
            <vxe-table border :show-header="index>1?false:true" :span-method="mergeRowMethod" resizable
              :data="item.temp" :edit-config="{trigger: 'click', mode: 'cell'}">
              <vxe-table-column field="USERNAME" title="姓名" width="120" align="center"></vxe-table-column>
              <vxe-table-column field="NAME" title="考核项" width="120" align="center"></vxe-table-column>
              <vxe-table-column field="VALUE" title="分值">
                <template v-slot="{ row }">
                  <el-rate :texts="texts" :disabled="nosubmit" v-model="row.VALUE" :max="10" show-text>
                  </el-rate>
                </template>
              </vxe-table-column>
            </vxe-table>
          </li>
        </ul>
        <div class="btn-group">
          <el-button v-if="!nosubmit" type="primary"   @click='handelSubmit'>提交</el-button>
        </div>

      </div>

    </div>





  </div>
</template>

<script>
  import XEUtils from 'xe-utils'
  import * as approveApi from '@/api/approve'
  export default {
    name: 'MixChart',
    data() {
      return {
        nosubmit:false,
        loading:false,
        activeName: '',
        texts: ['1分', '2分', '3分', '4分', '5分', '6分', '7分', '8分', '9分', '10分'],
        tableData: [],
        proportion: [],
        flag: [],
        flagValue: {},
        planId: '',
        name: '',
      }
    },
    created() {
      this.proportion = JSON.parse(localStorage.getItem('proportion'))
      this.flag = []
      let obj = {}
      let info = JSON.parse(localStorage.getItem('userDetail'))
      let infoz = JSON.parse(localStorage.getItem('role'))
      if(this.proportion.length>1){
        this.name = "  考核人角色："+infoz[0].name + ",   考核人姓名：" + info.name +"， 机关干部打分权重：" + this.proportion[0].proportion + ",  站队科级干部打分权重："+ this.proportion[1].proportion
      }else{
        if (infoz[0].name == "站队一般员工") {
          this.name = "  考核人角色："+infoz[0].name + ",   考核人姓名：" + info.name +"， 站队科级干部打分权重：" + this.proportion[0].proportion
        }else{
          this.name = "  考核人角色："+infoz[0].name + ",   考核人姓名：" + info.name +"， 机关干部打分权重：" + this.proportion[0].proportion
        }
      }
      for (let i = 0; i < this.proportion.length; i++) {
        obj[this.proportion[i].type] = this.proportion[i].proportion
        this.flag.push(this.proportion[i].type)
      }
      this.activeName = this.flag[0]
      this.flagValue = obj
      this.cadreplanGetMaxList()
    },
    methods: {
      handleClick(e) {
        this.activeName = e
        this.cadreplanGetMaxList()
      },
      cadreplanGetMaxList() {
        let uid = JSON.parse(localStorage.getItem('userid'))
        let params = {
          type: this.activeName,
          uid,
        }
        approveApi.cadreplanGetMaxList(params).then(res => {
          if (res.data.code == 0) {
            if (res.data.data.map.length === 0) {
              //未考核
              this.nosubmit = false;
              this.planId = res.data.data.plan.id
              this.getcadreitemList()
            } else {
              let org = res.data.data.map
              let Obj = org.reduce((pre, cur, index) => {
                 cur.VALUE = Number(cur.VALUE)
                if (!pre[cur.UNCHECKUSERID]) {
                  pre[cur["UNCHECKUSERID"]] = [cur]
                } else {
                  pre[cur.UNCHECKUSERID].push(cur)
                }
                return pre;
              }, {})
              let aff = Object.keys(Obj).map((item) => {
                if (item != 'null') {
                  return {
                    name: item,
                    temp: Obj[item]
                  }
                }
              })
              this.nosubmit=true
              this.tableData = JSON.parse(JSON.stringify(aff))
            }
          }
        })
      },
      getcadreitemList() {
        let uid = JSON.parse(localStorage.getItem('userid'))
        let role = JSON.parse(localStorage.getItem('role'))
        let orgid
        if (role[0].name == "站队一般员工") {
          orgid = localStorage.getItem('orgid')
        } else {
          orgid = ""
        }

        let params = {
          type: this.activeName,
          currentPage: 1,
          pageSize: 1000,
          uid,
          orgid
        }
        this.loading=true
        approveApi.cadreitemList(params).then(res => {
          if (res.data.code == 0) {
            this.loading=false
            let org = res.data.data.list
            let Obj = org.reduce((pre, cur, index) => {
              cur.VALUE = 0
              if (!pre[cur.UNCHECKUSERID]) {

                pre[cur["UNCHECKUSERID"]] = [cur]
              } else {
                pre[cur.UNCHECKUSERID].push(cur)
              }
              return pre;
            }, {})
            let aff = Object.keys(Obj).map((item) => {

              if (item != 'null') {

                return {
                  name: item,
                  temp: Obj[item]
                }
              }
            })
            this.tableData = JSON.parse(JSON.stringify(aff))
          }
        })
      },
      handelSubmit() {


        let uid = JSON.parse(localStorage.getItem('userid'))
        let sdata = JSON.parse(JSON.stringify(this.tableData))
        let aff = []
        for (let i = 0; i < sdata.length; i++) {
          sdata[i].CADRERESULTID = '2020103119293339441'
          sdata[i].CHECKRESULT = 0
          sdata[i].TYPE = this.activeName
          sdata[i].PROPORTION = this.flagValue[this.activeName]
          sdata[i].CHECKUSERID = uid
          for (let j = 0; j < sdata[i].temp.length; j++) {
            sdata[i].temp[j].CADREITEMID = sdata[i].temp[j].ID
            delete sdata[i].temp[j].ID
            sdata[i].temp[j].CHECKUSERID = uid
            delete sdata[i].temp[j].CREATEBY

            sdata[i].temp[j].CADRERESULTID = '2020103119293339441'
            // if (sdata[i].temp[j].VALUE==0) {
            //   this.$message({
            //       type:'error',
            //       message:sdata[i].temp[j].USERNAME + '的' +sdata[i].temp[j].NAME +'尚未评分或未0分无法提交。'
            //   })
            //   return
            // }
            sdata[i].CHECKRESULT += Number(sdata[i].temp[j].VALUE)



          }

        }
        for (let i = 0; i < sdata.length; i++) {
          sdata[i].temp = JSON.stringify(sdata[i].temp)
        }
        approveApi.cadreresultdetailCadreResult(sdata).then(res => {
           if(res.data.code === 0){
             alert("考核成功");
             this.nosubmit = true;
           }
        })
      },
      mergeRowMethod({
        row,
        _rowIndex,
        column,
        visibleData
      }) {
        const fields = ['USERNAME']
        const cellValue = XEUtils.get(row, column.property)
        if (cellValue && fields.includes(column.property)) {
          const prevRow = visibleData[_rowIndex - 1]
          let nextRow = visibleData[_rowIndex + 1]
          if (prevRow && XEUtils.get(prevRow, column.property) === cellValue) {
            return {
              rowspan: 0,
              colspan: 0
            }
          } else {
            let countRowspan = 1
            while (nextRow && XEUtils.get(nextRow, column.property) === cellValue) {
              nextRow = visibleData[++countRowspan + _rowIndex]
            }
            if (countRowspan > 1) {
              return {
                rowspan: countRowspan,
                colspan: 1
              }
            }
          }
        }
      }

    }
  }
</script>

<style lang="scss">
  .app-main {
    overflow: auto !important;
  }

  .chart-container_org {
    position: relative;
    width: 100%;
    display: inline-block;

    .main {
      display: inline-block;
      margin: 0 auto;
      width: 95%;
    }

    .vxe-table {
      width: 100%;
    }

    .tab_c {
      li {
        list-style: none;
        display: inline-block;
        width: 50%;
      }

    }

    .tabs {
      height: 40px;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: #e4e7ed;
        z-index: 1;
      }

      .tabs__item {
        padding: 0 20px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        position: relative;
      }

      .active {
        position: relative;
        z-index: 10;
        color: #409eff;
        border-bottom: 2px solid #409EFF;
      }
    }




    .card {

      height: 300px;

      border: 1px solid #EBEEF5;

    }

    .btn-group {
      margin-bottom: 20px;
      line-height: 70px;
      text-align: center;
    }
  }
</style>