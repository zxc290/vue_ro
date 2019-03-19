<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col><h3>Ro运营后台管理</h3></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="300px">
        <el-col>
          <h3>导航菜单</h3>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            router
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i><span>游戏服务器管理</span>
              </template>
              <el-menu-item index="1-1" :route="{name: 'zone_list'}" v-if="userPermissions.is_open_zone_viewer">开区列表</el-menu-item>
              <el-menu-item index="1-2" :route="{name: 'open_zone'}" v-if="userPermissions.is_open_zone_manager">开区设置</el-menu-item>
              <el-menu-item index="1-3" :route="{name: 'recommend'}" v-if="userPermissions.is_recommend_zone_manager">推荐设置</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i><span>福利发放管理</span>
              </template>
              <el-menu-item index="2-1" :route="{name: 'apply'}" v-if="userPermissions.is_applicant">申请</el-menu-item>
              <el-menu-item index="2-2" :route="{name: 'examine'}" v-if="userPermissions.is_approver">审批</el-menu-item>
              <el-menu-item index="2-3" :route="{name: 'record'}" v-if="userPermissions.is_record_checker">福利记录</el-menu-item>
              <el-menu-item index="2-4" :route="{name: 'role_management'}" v-if="userPermissions.is_role_manager">角色管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {getUserPermissions} from "../api/api";

  export default {
    name: "Home",
    data() {
      return {
        userPermissions: {
          'is_applicant': false,
          'is_approver': false,
          'is_record_checker': false,
          'is_role_manager': false,
          'is_open_zone_viewer': false,
          'is_open_zone_manager': false,
          'is_recommend_zone_manager': false,
        },
      }
    },
    methods: {
      // 消息提示
      alertMessage(message, type) {
        this.$message({
          showClose: true,
          message: message,
          type: type,
        });
      },
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      }
    },
    created() {
      let userId = sessionStorage.getItem('userId');
      getUserPermissions(userId).then(res => {
        if (res.status === 202) {
          this.userPermissions = res.data;
          // this.alertMessage('登录成功', 'success');
        } else if (res.status === 204) {
          this.alertMessage(res.data, 'error');
          this.$router.push({path:'login/'})
        }
      }).catch(error => {
        this.alertMessage('登录失败', 'warning');
      });
      // this.isApplicant = sessionStorage.getItem('isApplicant');
      // this.isApprover = sessionStorage.getItem('isApprover');
      // this.isRoleManager = sessionStorage.getItem('isRoleManager');
      // this.isRecordChecker = sessionStorage.getItem('isRecordChecker');
    }
  }
</script>

<style scoped>

</style>
