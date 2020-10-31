<template>
    <div class="login" v-loading="loading" element-loading-text="正在登陆，请稍后..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="main-body">
            <div class="qr-code">
                <div class="title">欢迎进入</div>
                <div class="title">甘陕管理处智能考核系统</div>
            </div>
            <div class="new-login">
                <div class="name">帐号密码登录</div>
                <div class="inputItem">
                    <svg t="1602830379865" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2502"
                         width="20" height="20">
                        <path d="M672 320a160 160 0 1 0-160 160 160 160 0 0 0 160-160z m64 0A224 224 0 1 1 512 96a224 224 0 0 1 224 224z" p-id="2503"
                              fill="#e5e5e5"></path>
                        <path d="M224 832a32 32 0 0 1-64 0 352 352 0 0 1 704 0 32 32 0 0 1-64 0 288 288 0 0 0-576 0z" p-id="2504"
                              fill="#e5e5e5"></path>
                    </svg>
                    <input class="input" v-model="username" placeholder="请输入用户名" type="text">
                </div>
                <div class="inputItem">
                    <svg t="1602830446439" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3425"
                         width="20" height="20">
                        <path d="M779.821998 367.986566l-5.15869 0c-2.579345 0-2.579345 0-5.15869 0L769.504618 272.550798C770.3644 116.930311 657.732997 0 508.990764 0c-146.162888 0-257.934509 116.930311-257.934509 272.550798l0 95.435768-7.738035 0c-78.240134 0-141.004198 66.203191-141.004198 143.583543l0 367.986566c0 80.819479 63.623846 143.583543 141.004198 143.583543l536.503778 0c78.240134 0 141.004198-66.203191 141.004198-143.583543L920.826196 511.570109C919.106633 431.610411 855.482788 367.986566 779.821998 367.986566zM294.905122 270.831234c0-134.125945 90.277078-228.701931 214.085642-228.701931 126.387909 0 216.664987 97.155332 216.664987 228.701931l0 95.435768L292.325777 366.267003 292.325777 270.831234 294.905122 270.831234zM877.837112 879.556675c0 55.88581-43.848866 102.314022-97.155332 102.314022L243.31822 981.870697c-53.306465 0-97.155332-46.428212-97.155332-102.314022L146.162888 511.570109c0-55.88581 43.848866-102.314022 97.155332-102.314022L257.934509 409.256087l36.970613 0 434.189757 0 51.586902 0 0 0c53.306465 0 97.155332 46.428212 97.155332 102.314022L877.837112 879.556675 877.837112 879.556675z"
                              p-id="3426" fill="#e5e5e5"></path>
                        <path d="M507.271201 567.455919c-34.391268 0-61.0445 29.232578-61.0445 63.623846 0 24.073887 12.036944 43.848866 31.811923 55.88581l0 104.893367c0 17.195634 14.616289 31.811923 31.811923 31.811923s31.811923-14.616289 31.811923-31.811923L541.662469 686.965575c19.774979-12.036944 31.811923-31.811923 31.811923-55.88581C567.455919 597.548279 540.802687 567.455919 507.271201 567.455919z"
                              p-id="3427" fill="#e5e5e5"></path>
                    </svg>
                    <input class="input" :type="type" v-model="password" placeholder="请输入密码">
                    <svg v-if="type == 'text'" @click="type = 'password'" t="1602830800009" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="2533"
                         width="20" height="20">
                        <path d="M511.4 778.7c-136.5 0-269.2-80.6-394.6-239.8l-13.1-16.7 11.4-17.9c1.6-2.6 40.5-63.4 107.1-125.5 39.4-36.8 80.5-66.4 122.1-88.1 53.1-27.7 107.1-42.4 160.6-43.9 140.4-3.8 274.3 82.4 398 256.2l11.8 16.6-11.1 17.1c-1.5 2.4-38.3 58.5-102.3 116.3-37.8 34.2-77.5 61.9-117.8 82.4-51.3 26.1-103.9 40.5-156.2 42.9-5.3 0.3-10.6 0.4-15.9 0.4zM177.8 519.1C291 656.6 407.4 723.6 524.3 718.4c99.5-4.4 183.1-61.6 235.6-108.8 38.6-34.7 66.8-69.3 81.6-89-107.6-144.9-220.2-216.8-334.8-213.8-101 2.6-187.6 63.9-242.5 114.9-40.9 37.9-70.8 76-86.4 97.4z"
                              p-id="2534" fill="#e5e5e5"></path>
                        <path d="M509.5 641.6c-70.6 0-128.1-57.5-128.1-128.1s57.5-128.1 128.1-128.1 128.1 57.5 128.1 128.1-57.5 128.1-128.1 128.1z m0-196.2c-37.6 0-68.1 30.5-68.1 68.1 0 37.6 30.5 68.1 68.1 68.1s68.1-30.5 68.1-68.1c0-37.6-30.5-68.1-68.1-68.1z"
                              p-id="2535" fill="#e5e5e5"></path>
                    </svg>
                    <svg v-if="type == 'password'" @click="type = 'text'" t="1602830920442" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg"
                         p-id="3985"
                         width="20" height="20">
                        <path d="M1014.443 333.597c10.923-16.384 7.282-38.229-7.282-50.973-16.384-12.743-38.229-9.102-50.973 7.282-1.821 1.821-203.89 240.299-444.189 240.299-233.017 0-444.189-240.299-446.009-242.119-12.743-14.563-36.409-16.384-50.973-3.641-14.563 12.743-16.384 36.409-3.641 50.973 3.641 5.461 47.331 54.613 116.509 109.227l-92.843 96.483c-14.563 14.563-12.743 38.229 1.821 50.973 3.641 7.282 12.743 10.923 21.845 10.923 9.102 0 18.205-3.641 25.486-10.923l100.125-103.765c47.331 32.768 103.765 63.715 165.661 85.561l-38.229 129.251c-5.461 20.025 5.461 40.050 25.486 45.511 3.641 0 7.282 0 10.923 0 16.384 0 30.947-10.923 34.589-27.307l38.229-129.251c29.127 5.461 60.075 9.102 91.022 9.102s61.895-3.641 91.022-9.102l38.229 127.431c3.641 16.384 20.025 27.307 34.589 27.307 3.641 0 7.282 0 9.102-1.821 20.025-5.461 30.947-25.486 25.486-45.511l-38.229-127.431c61.895-21.845 118.329-52.793 165.661-85.561l98.304 101.945c7.282 7.282 16.384 10.923 25.486 10.923s18.205-3.641 25.486-10.923c14.563-14.563 14.563-36.409 1.821-50.973l-92.843-96.483c74.638-54.613 118.329-107.406 118.329-107.406z"
                              p-id="3986" fill="#e5e5e5"></path>
                    </svg>
                </div>
                <div class="btn" @click="submit">登陆</div>
            </div>
        </div>
    </div>
</template>
<script>
import * as api from "../api/common";
import {mkTree} from "./../mk";
import layout from '@/components/layout'

export default {
    data() {
        return {
            loading:false,
            username: "",
            password: "",
            type:'password',
            form: {
                name: "admin"
            }
        };
    },
    methods: {
        submit() {
            if (this.username === "") {
                this.$message({
                    message: "请输入用户名",
                    type: "error"
                });
                return;
            }
            if (this.password === "") {
                this.isnull = true;
                this.$message({
                    message: "请输入密码",
                    type: "error"
                });
                return;
            } else {
                let paramt = {
                    username: this.username,
                    password: this.password
                };
                this.loading=true
                api.signIn(paramt).then(res => {
                    this.loading=false
                    if (res.data.code === 1) {
                        this.$message({
                            message: "系统异常，请求错误",
                            type: "error"
                        });
                    } else if (res.data.code === 2) {
                        this.$message({
                            message: "token失效，当前会话已过期，需要重新登录",
                            type: "error"
                        });
                    } else if (res.data.code === 3) {
                        this.$message({
                            message: "用户不存在",
                            type: "error"
                        });
                    } else if (res.data.code === 4) {
                        this.$message({
                            message: "密码不正确",
                            type: "error"
                        });
                    } else {
                        // let pa = {
                        //     name: res.data.data.user.username,
                        //     note: '登陆系统'
                        // }
                        // 访问日志
                        if(res.data){
                            this.$store.dispatch("userSignin", res.data.data.user);
                            // this.$store.dispatch("orgid", res.data.data.user.orgid);
                            localStorage.setItem("token", JSON.stringify(res.headers.token));
                            localStorage.setItem("fun", JSON.stringify(res.data.data.fun));
                            localStorage.setItem("role", JSON.stringify(res.data.data.role));
                            localStorage.setItem('userid', JSON.stringify(res.data.data.user.id))
                            localStorage.setItem("orgid", res.data.data.organization[0].id);
                            var da = mkTree(res.data.data.fun);
                            localStorage.setItem('menu', JSON.stringify(da))
                            let addRoutes = [
                                {
                                    path: "",
                                    component: layout,
                                    name: "",
                                    children: da
                                }
                            ];
                            this.$router.addRoutes(addRoutes);
                            //保存token
                            this.isnull = false;
                            this.$router.push('/system/user')
                        }

                    }
                })
            }
        }
    }
};
</script>
<style scoped>
* {
    margin: 0px;
    padding: 0px;
}

.login {
    width: 100%;
    height: 100%;
    background-image: url("../assets/image/bg.png");
    background-size: 100% 100%;
}

.main-body {
    width: 920px;
    height: 600px!important;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 138, 233, .15);
    display: flex;
}

.qr-code {
    width: 380px;
    height: 600px;
    border-radius: 10px 0 0 10px;
    background: url('../assets/image/login-bg.png') center center no-repeat;
    position: relative;
    padding-left: 30px;
    padding-top: 100px;
    box-sizing: border-box;
}

.new-login {
    width: 540px;
    height: 600px;
    padding: 50px 60px;
    background-color: #fff;
    position: relative;
    border-radius: 0 10px 10px 0;
    box-sizing: border-box;
}

.title {
    font-size: 28px;
    color: #fff;
    margin-top: 40px;
}

.name {
    font-size: 20px;
    padding: 20px 16px;
    color: #1890ff;
    font-weight: bold;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
}

.name:after {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    height: 2px;
    content: '';
    width: 160px;
    background: #1890ff;
}

.inputItem {
    width: 420px;
    height: 40px;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    padding: 0;
    color: #999;
    font-size: 14px;
    margin-top: 40px;
    border-radius: 6px;
    display: flex;
    align-items: center;
}

.input::placeholder {
    color: #999;
}

.icon {
    margin: 0 10px;
    cursor: pointer;
}

.input {
    border: none;
    outline: none;
    color: #999;
    width: 335px;
}
.btn{
    width: 100%;
    height: 50px;
    background-color: #34acff;
    color: #fff;
    font-size: 20px;
    margin-top: 50px;
    border-radius: 8px;
    text-align: center;
    line-height: 50px;
}
.btn:hover{
    cursor: pointer;
    background-color: #34a1ee;
}
</style>
