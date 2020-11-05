<template>
  <div class="contents">
    <div class="content-main">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="name">
          <el-input  :type="passw"  v-model="ruleForm.pass"  >
            <i slot="suffix" :class="icon" @click="showPass"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password"   v-model="ruleForm.newpass"  ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password"   v-model="ruleForm.checkPass"  ></el-input>
        </el-form-item>
        <el-form-item style="margin-top:50">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as approveApi from '@/api/approve'
  export default {

    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        passw:"password",
        icon:"el-input__icon el-icon-view",
        ruleForm: {
          pass:'',
          newpass:'',
          checkPass:''
        },
        rules: {
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      showPass(){
　　　　　　　　　　//点击图标是密码隐藏或显示
               if( this.passw=="text"){
                   this.passw="password";
                   //更换图标
                   this.icon="el-input__icon el-icon-view";
               }else {
                   this.passw="text";
                   this.icon="el-input__icon el-icon-loading";
               };
            },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let userid = JSON.parse(localStorage.getItem('userid'))
            let params={
              id:userid,
              password: this.ruleForm.pass,
              npassword:this.ruleForm.newpass
            }
            approveApi.changepassword(params).then(res=>{
            
              if (res.data.code==0) {
                    this.$message({
                      type:'success',
                      message:'修改成功'
                    })
                  this.$router.push('/')
              } else {
                  this.$message({
                      type:'error',
                      message:'修改成功'
                    })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss">
  .contents {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: calc(100vh - 180px) !important;
    .content-main {
      width: 500px;
      height: 400px;
      padding-top: 5px; 
      background-color: #ffffff;
      padding: 10px;

    }

  }
</style>