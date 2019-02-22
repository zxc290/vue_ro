<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col><h3>Ro运营后台管理</h3></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="300px">
        <!--<el-row>页面切换路由</el-row>-->
        <el-col>
          <h3>导航菜单</h3>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            router
            @open="handleOpen"
            @close="handleClose">
              <!--<el-menu-item index="1" :route="{name: 'test'}">-->
                <!--<span slot="title">游戏服设置管理</span>-->
              <!--</el-menu-item>-->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i><span>游戏服务器管理</span>
              </template>
              <el-menu-item index="1-1" :route="{name: 'setting'}" v-if="isApplicant">基本设置</el-menu-item>
              <!--<el-menu-item index="2-2" :route="{name: 'examine'}" v-if="isApprover">审批</el-menu-item>-->
              <!--<el-menu-item index="2-3" :route="{name: 'record'}" v-if="isRecordChecker">福利记录</el-menu-item>-->
              <!--<el-menu-item index="2-4" :route="{name: 'role_management'}" v-if="isRoleManager">角色管理</el-menu-item>-->
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i><span>福利发放管理</span>
              </template>
              <el-menu-item index="2-1" :route="{name: 'apply'}" v-if="isApplicant">申请</el-menu-item>
              <el-menu-item index="2-2" :route="{name: 'examine'}" v-if="isApprover">审批</el-menu-item>
              <el-menu-item index="2-3" :route="{name: 'record'}" v-if="isRecordChecker">福利记录</el-menu-item>
              <el-menu-item index="2-4" :route="{name: 'role_management'}" v-if="isRoleManager">角色管理</el-menu-item>
            </el-submenu>
            <!--<el-menu-item index="2" :route="{name: 'welfare_payment_management'}">-->
              <!--<span slot="title">福利发放管理</span>-->
            <!--</el-menu-item>-->
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!--<el-container>-->
    <!--<el-aside width="200px">-->
      <!--<el-row style="border-bottom: 1px red solid"><h3>Ro运营后台管理</h3></el-row>-->
      <!--<el-row>页面切换路由</el-row>-->
    <!--</el-aside>-->
    <!--<el-container>-->
      <!--<el-header>-->
        <!--<el-row>头像，状态切换按钮</el-row>-->
      <!--</el-header>-->
      <!--<el-main>路由组件显示区域</el-main>-->
    <!--</el-container>-->
  <!--</el-container>-->
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        // 可申请
        isApplicant: false,
        // 可审批
        isApprover: false,
        // 可编辑玩家角色
        isRoleManager: false,
        // 可查看福利记录
        isRecordChecker: false,
      }
    },
    methods: {
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    },
    created() {
      this.isApplicant = sessionStorage.getItem('isApplicant');
      this.isApprover = sessionStorage.getItem('isApprover');
      this.isRoleManager = sessionStorage.getItem('isRoleManager');
      this.isRecordChecker = sessionStorage.getItem('isRecordChecker');
    }
  }
</script>

<style scoped>

</style>
