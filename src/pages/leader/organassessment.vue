<template>
  <div class="chart-container">
    <!-- 科技机关考核 -->
    
    <div class="main">
      <div class="tabs">
        <span class="tabs__item" :class="activeName=='机关考核'?'active':''" @click="handleClick('机关考核')">机关考核</span>
        <span class="tabs__item" :class="activeName=='战队考核'?'active':''"      @click="handleClick('战队考核')">战队考核</span>
    </div>
      <div class="total">
        考核人数共计<span class="all">45</span>人，已完成考核<span class="ok">10</span>人，待考核<span class="no">35</span>人。
      </div>
      <div class="current">
        <span>当前考核人：</span><span style="color:#409EFF">郝星</span>
        <span>所属机构：</span><span style="color:#409EFF">靖边作业区</span>
      </div>
      <div class="card">
        <vxe-table border resizable :data="tableData" :edit-config="{trigger: 'click', mode: 'cell'}">

          <vxe-table-column field="name" title="考核项" width="120" align="center"></vxe-table-column>
          <vxe-table-column field="nickname" title="分值">
            <template v-slot="{ row }">
              <el-rate :texts="texts" v-model="row.score" :max="10" show-text>
              </el-rate>
            </template>


          </vxe-table-column>

        </vxe-table>
      <div class="btn-group">
              <el-button type="primary">上一位</el-button>
              <el-button type="primary">下一位</el-button>
              <el-button type="success">提交</el-button>
      </div>


      <div class="infoList">
        <h1 class="model">考核完成情况</h1>
        <p class="tips">提示:红色背景是当前选中人员，绿色背景为已完成考核，灰色背景为未完成考核</p>
          <ul>
              <li class="current">郝星</li>
              <li class="success">张一</li>
              <li class="success">张二</li>
              <li class="success">张三</li>
              <li class="no">张四</li>
              <li class="no">张五</li>
              <li class="no">张六</li>
              <li class="no">张七</li>
              <li class="no">张八</li>
              <li class="no">张九</li>
              <li class="no">张四</li>
              <li class="no">张五</li>
              <li class="no">张六</li>
              <li class="no">张七</li>
              <li class="no">张八</li>
              <li class="no">张九</li>
              <li class="no">张四</li>
              <li class="no">张五</li>
              <li class="no">张六</li>
              <li class="no">张七</li>
              <li class="no">张八</li>
              <li class="no">张九</li>
          </ul>
      </div>
      </div>

    </div>
 
     
 

   
  </div>
</template>

<script>
  export default {
    name: 'MixChart',
    data() {
      return {
        activeName:'机关考核',
        texts:['1分','2分','3分','4分','5分','6分','7分','8分','9分','10分'],
        tableData: [{
            name: '政治素质',
            score: 1
          },
          {
            name: '职业素质',
            score: 5
          },
          {
            name: '廉洁从业',
            score: 6
          },
          {
            name: '决策能力',
            score: 4
          },
          {
            name: '执行能力',
            score: 8
          },
          {
            name: '创新能力',
            score: 4
          },
          {
            name: '履职表现',
            score: 3
          },
        ]
      }
    },
    methods:{
      handleClick(e){
        this.activeName=e
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 50px);
  }
  .tabs{
    height: 40px;
    position: relative;
    &::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #e4e7ed;
    z-index: 1;
    }
    .tabs__item{
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
    .active{
      position: relative;
      z-index: 10;
      color: #409eff;
      border-bottom: 2px solid #409EFF;
    }
  }
  .main {
    margin: 0 auto;
    width: 95%;
  }

  .total {
    line-height: 60px;
    font-size: 18px;

  }

  .total>.ok {
    color: green;
  }

  .total>.all {
    color: red;
  }

  .total>.no {
    color: #E6A23C;
  }

  .card {

    height: 300px;

    border: 1px solid #EBEEF5;
    
  }
  .btn-group{
    line-height: 70px;
    text-align: center;
  }
  .infoList{
    .model{
      line-height: 80px;
      border-bottom: 1px solid black;
    }
    .tips{
      font-size: 14px;
      color: #303133;
    }
      ul{
        li{
          margin: 5px;
          cursor: pointer;
          list-style: none;
          min-width: 80px;
          display: inline-block;
          border: 1px solid #EBEEF5;
          height: 30px;
          padding: 0px 5px;
          line-height: 30px;
          border-radius: 5px;
          text-align: center;
          white-space: 1px;
          letter-spacing: 5px;
          color: #fff;
        }
        .current{
          background: #F56C6C;
        }
        .success{
          background: #67C23A;
        } 
        .no{
          background: #909399;
        }
      }

  }
</style>