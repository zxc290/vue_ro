<template>
  <el-col :offset="9" :span="6">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">ro运营管理工具登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%; margin-top: 20px">
        <el-button type="primary" @click.native.prevent="handleSubmit" :loading="logining">登录
        </el-button>
        <el-button type="danger" @click.native.prevent="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
  import {login} from "../api/api";

  export default {
    name: "Login",
    data() {
      return {
        logining: false,
        loginForm: {
          account: '',
          checkPass: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    beforeRouteEnter:(to,from,next) => {
      //组件内守卫
      //已登录状态回到登录界面，即 登出
      next(vm => {
        vm.$store.dispatch("setUser", null);
      });

    },
    methods: {
      handleReset() {
        this.$refs.loginForm.resetFields();
      },
      handleSubmit() {
        let that = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // that.$router.replace('/table');
            this.logining = true;
            // NProgress.start();
            let loginParams = { username: this.loginForm.account, password: this.loginForm.checkPass };
            login(loginParams).then(res => {
              let data = res.data;
              if (data.code === 1) {
                this.$message.success({
                  message: data.message,
                  showClose: true,
                });
                sessionStorage.setItem('userId', data.user_id);
                sessionStorage.setItem('userName', data.username);
                sessionStorage.setItem('userToken', data.token);
                this.$store.dispatch('setUser', data.username);
                this.$store.dispatch('setToken', data.token);
                // console.log(this.$store.state.isLogin);
                this.$router.push({path:'/'})
              } else if (data.code === 0 ) {
                this.$message({
                  message: data.message,
                  showClose: true,
                  type: 'error'
                });
              }
              this.logining = false;
            });
          } else {
            // console.log('提交失败，请按照规则填写');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
