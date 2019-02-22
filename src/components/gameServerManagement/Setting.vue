<template>
    <div>
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <!--<el-form-item label="游戏" v-if="false">-->
          <!--<el-select v-model="queryForm.gid" placeholder="活动区域">-->
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <!--<el-option label="区域二" value="beijing"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="渠道">
          <el-select v-model="queryForm.cid" placeholder="请选择游戏渠道" @change="handleChangeChannel">
            <el-option v-for="(item, index) in channelOptions" :key="index" :label="item.cname" :value="item.cid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包">
          <el-select v-model="queryForm.appid" placeholder="请选择游戏包" @change="handleChangePackage">
            <el-option v-for="(item, index) in packageOptions" :key="index" :label="item.appid" :value="item.appid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="serverManagementTableData"
        style="width: 100%" size="small" border>
        <el-table-column
          label="id"
          prop="id"
          align="center">
        </el-table-column>
        <el-table-column
          label="游戏id"
          prop="GID"
          align="center">
        </el-table-column>
        <el-table-column
          label="渠道id"
          prop="CID"
          align="center">
        </el-table-column>
        <el-table-column
          label="平台id"
          prop="PID"
          align="center">
        </el-table-column>
        <el-table-column
          label="平台名"
          prop="pname"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="区服名"
          prop="zonename"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="statu"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="服务器状态"
          prop="server_statu"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="是否推荐"
          prop="server_suggest"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="是否删除"
          prop="is_delete"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="区服idx"
          prop="zoneidx"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="服务器id"
          prop="SID"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="服务器名称"
          prop="SName"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="设备id"
          prop="DevID"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="VID"
          prop="VID"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="开区时间"
          prop="OpenDate"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="合区时间"
          prop="MergeDate"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="合区id"
          prop="MergeID"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="合区idx"
          prop="MergeIdx"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="ServerID"
          prop="ServerID"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="CT_ip地址"
          prop="CT_ipadd"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="域名"
          prop="domain"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="appid"
          prop="appid"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="登录端口"
          prop="LoginPort"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="最大用户数"
          prop="max_users"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="服务器权重"
          prop="server_weight"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          label="自动开区时间"
          prop="autoOpenTime"
          align="center"
          sortable>
        </el-table-column>



        <el-table-column
          min-width="200"
          align="center">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import { getServerManagementList } from '../../api/api';

    export default {
      name: "Setting",
      data() {
        return {
          // 渠道选项
          channelOptions: [],
          // 包选项
          packageOptions: [],
          // 查询表单
          queryForm: {
            gid: 50,
            cid: '',
            appid: '',
          },
          // 服务器列表数据
          serverManagementTableData: [],
          search: ''
        }
      },
      methods: {
        handleEdit(index, row) {

        },
        handleDelete(index, row) {

        },
        // 选择渠道
        handleChangeChannel() {

        },
        // 选择包
        handleChangePackage() {

        },
        // 查询服务器列表
        onSubmit() {

        }
      },
      created() {
        getServerManagementList().then(res => {
          let data = res.data;
          this.serverManagementTableData = data;
        }).catch(error => {
        })
      }
    }
</script>

<style scoped>

</style>
