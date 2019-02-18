<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col style="border: 1px solid red;"><h3>Ro运营后台管理</h3></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="300px" style="border: 1px solid red">
        <!--<el-row>页面切换路由</el-row>-->
        <el-col>
          <h5>自定义颜色</h5>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            router
            @open="handleOpen"
            @close="handleClose">
              <el-menu-item index="1" :route="{name: 'test'}">
                <span slot="title">游戏服设置管理</span>
              </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i><span>福利发放管理</span>
              </template>
              <el-menu-item index="2-1" :route="{name: 'apply'}">申请</el-menu-item>
              <el-menu-item index="2-2" :route="{name: 'examine'}">审批</el-menu-item>
              <el-menu-item index="2-3">福利记录</el-menu-item>
              <el-menu-item index="2-4">固定福利</el-menu-item>
            </el-submenu>
            <!--<el-menu-item index="2" :route="{name: 'welfare_payment_management'}">-->
              <!--<span slot="title">福利发放管理</span>-->
            <!--</el-menu-item>-->
          </el-menu>
        </el-col>
      </el-aside>
      <el-main style="border: 1px solid red">
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
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created() {
      let test = sessionStorage.getItem('userName')
      let isApplicant = sessionStorage.getItem('isApplicant')
      console.log(isApplicant)
      console.log(test);
    }
  }
</script>

<style scoped>

</style>
