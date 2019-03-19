<template>
  <el-col :offset="9" :span="6">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">ro运营管理工具登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
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
  import { login } from "../api/api";

  export default {
    name: "Login",
    data() {
      return {
        logining: false,
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入账号' },
            //{ validator: validaePass }
          ],
          password: [
            { required: true, message: '请输入密码' },
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
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            login(this.loginForm).then(res => {
              let data = res.data;
              if (data.code === 1) {
                this.$message.success({
                  message: data.message,
                  showClose: true,
                });
                let userInfo = data.user_info;
                sessionStorage.setItem('userId', userInfo.user_id);
                sessionStorage.setItem('userName', userInfo.username);
                // sessionStorage.setItem('isApplicant', userInfo.is_applicant);
                // sessionStorage.setItem('isApprover', userInfo.is_approver);
                // sessionStorage.setItem('isRoleManager', userInfo.is_role_manager);
                // sessionStorage.setItem('isRecordChecker', userInfo.is_record_checker);
                sessionStorage.setItem('userToken', data.token);
                this.$store.dispatch('setUser', userInfo);
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
            }).catch(error => {

            });
          } else {
            return false;
          }
        });
      }
    },
  }
</script>

<style scoped>

</style>
