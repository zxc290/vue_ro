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
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
              <el-menu-item index="1">
                <span slot="title">衮服开服管理</span>
              </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">推荐服设置管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">福利发放管理</span>
            </el-menu-item>
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
        name: "Home"
    }
</script>

<style scoped>

</style>
