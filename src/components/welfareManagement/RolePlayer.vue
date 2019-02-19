<template>
  <div>
    <!--弹出新增人员角色表单-->
    <el-button type="primary" style="float:left;margin-bottom: 20px" @click="clickAdd">新增申请</el-button>
  <!--人员角色列表-->
  <el-table
    :data="rolePlayerTableData"
    style="width: 100%" size="small" border>
    <el-table-column
      label="id"
      prop="id"
      align="center">
    </el-table-column>
    <el-table-column
      label="平台id"
      prop="pid"
      align="center">
    </el-table-column>
    <el-table-column
      label="平台名"
      prop="pname"
      align="center"
      sortable>
    </el-table-column>
    <el-table-column
      label="区服id"
      prop="zid"
      align="center">
    </el-table-column>
    <el-table-column
      label="区服名"
      prop="zname"
      align="center"
      sortable>
    </el-table-column>
    <el-table-column
      label="角色名"
      prop="role_name"
      align="center"
      sortable>
    </el-table-column>
    <el-table-column
      label="是否激活"
      prop="is_active"
      align="center"
      sortable>
    </el-table-column>
    <el-table-column
      label="创建人id"
      prop="creator_id"
      align="center">
    </el-table-column>
    <el-table-column
      label="创建人姓名"
      prop="creator_name"
      align="center"
      min-width="100"
      sortable>
    </el-table-column>
    <el-table-column
      label="创建日期"
      prop="created_date"
      align="center"
      :formatter="dateFormatter"
      min-width="150"
      show-overflow-tooltip
      sortable>
    </el-table-column>
    <el-table-column
      label="最后修改日期"
      prop="modify_date"
      align="center"
      :formatter="dateFormatter"
      min-width="150"
      show-overflow-tooltip
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
      <!--<template slot-scope="scope">-->
      <!--<el-button-->
      <!--size="mini"-->
      <!--type="primary"-->
      <!--@click="handleExamine(scope.$index, scope.row, 1)">批准</el-button>-->
      <!--<el-button-->
      <!--size="mini"-->
      <!--type="danger"-->
      <!--@click="handleExamine(scope.$index, scope.row, 2)">否决</el-button>-->
      <!--</template>-->
    </el-table-column>
  </el-table>
    <el-dialog title="新增申请" :visible.sync="newRolePlayerFormVisible">
      <!--提交申请表单-->
      <el-form ref="newRolePlayerForm" :model="newRolePlayerForm" :rules="newRolePlayerFormRules" label-width="140px" :label-position="newRolePlayerFormLabelPosition" style="width: 100%; margin-top: 30px">
        <el-form-item label="游戏平台" prop="pid">
          <el-select v-model="newRolePlayerForm.pid" filterable placeholder="请选择游戏平台" @change="handleChangePlatform">
            <el-option v-for="(item, index) in platformOptions" :key="index" :label="item.pname" :value="item.pid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏区服" prop="zid">
          <el-select v-model="newRolePlayerForm.zid" filterable placeholder="请选择游戏区服">
            <el-option v-for="(item, index) in zoneOptions" :key="index" :label="item.sname" :value="item.sid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色名" prop="role_name">
          <el-input v-model="newRolePlayerForm.role_name" placeholder="请输入角色名"></el-input>
        </el-form-item>
        <!--<el-form-item label="申请人id" prop="applicant_id" v-show="false">-->
          <!--<el-input v-model="newRolePlayerForm.applicant_id" placeholder="请输入申请人名"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="申请数量" prop="amount">-->
          <!--<el-input v-model.number="newRolePlayerForm.amount" placeholder="请输入0-999间的整数"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="是否激活">
          <el-switch v-model="newRolePlayerForm.is_active"></el-switch>
        </el-form-item>
        <!--<el-form-item label="固定发放周期(天)" prop="regular_period" v-show="newRolePlayerForm.is_regular">-->
          <!--<el-input v-model.number="newRolePlayerForm.regular_period" placeholder="请输入0-999间的整数"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('newRolePlayerForm')">提交申请</el-button>
          <el-button type="danger" @click="resetForm('newRolePlayerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { getRolePlayerList, getPlatformOptions, getZoneOptions } from '../../api/api';

    export default {
      name: "RolePlayer",
      data() {
        return {
          rolePlayerTableData: [],
          search: '',
          // 平台选项
          platformOptions: [],
          // 区服选项
          zoneOptions: [],
          // 人员角色表单可见
          newRolePlayerFormVisible: false,
          // 申请表单标签对齐位置
          newRolePlayerFormLabelPosition: 'left',
          // 人员角色表单
          newRolePlayerForm: {
            pid: '',
            zid: '',
            role_name: '',
            is_active: true,
            creator_id: 0,
          },
          // 人员角色表单验证规则
          newRolePlayerFormRules: {
            pid: [
              { required: true, message: '请选择游戏平台', trigger: 'change' }
            ],
            zid: [
              { required: true, message: '请选择游戏区服', trigger: 'change' }
            ],
            role_name: [
              { required: true, message: '请输入游戏角色名', trigger: 'blur' },
            ],
            // amount: [
            //   { required: true, message: '请输入申请数量' },
            //   { type: 'number', message: '必须为数字值' },
            //   { pattern:/^\d{1,3}$/, message: '输入范围1-999'}
            // ],
            // regular_period: [
            //   { required: true, message: '请输入固定周期' },
            //   { type: 'number', message: '必须为数字值' },
            //   { pattern:/^\d{1,3}$/, message: '输入范围1-999'}
            // ]
          },
        }
      },
      methods: {
        clickAdd() {
          this.newRolePlayerFormVisible = true;
        },
        // 提交表单
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(sessionStorage.getItem('userId'));
              this.newRolePlayerForm.creator_id = Number(sessionStorage.getItem('userId'));
              console.log(this.newRolePlayerForm)
              // addWelfare(this.newRolePlayerForm).then(res => {
              //   if (res.status === 201) {
              //     this.applyTableData.push(res.data);
              //     this.alertMessage('添加申请成功', 'success');
              //   }
              // }).catch(error => {
              //   this.alertMessage(error.message, 'error');
              // });
              // this.newRolePlayerFormVisible = false;
            }
          });
        },
        // 重置表单
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        // 改变平台选项
        handleChangePlatform(value) {
          let platformId = value;
          // 获取当前平台下的区服选项
          getZoneOptions().then(res => {
            let data = res.data;
            this.zoneOptions = data.filter(item => item.gid ===50 && item.pid === platformId);
          })
        },
        // 日期格式化
        dateFormatter(row, column, cellValue, index) {
          return cellValue ? cellValue.replace('T', ' ') : '/';
        },
        // 布尔格式化
        boolFormatter(row, column, cellValue, index) {
          return cellValue ? '是' : '否';
        },
        // 空值格式化
        nullFormatter(row, column, cellValue, index) {
          return cellValue ? cellValue : '/';
        },
        // 审核状态格式化
        applyStatusFormatter(row, column, cellValue, index) {
          if (cellValue === 0) {
            return '审核中';
          } else if (cellValue === 1) {
            return '已通过';
          } else if (cellValue === 2) {
            return '未通过';
          }
        }
      },
      created() {
        getRolePlayerList().then(res => {

        }).catch(error => {

        });
        getPlatformOptions().then(res => {
          let data = res.data;
          this.platformOptions = data.filter(item => item.gid === 50 && item.pid > 0);
        }).catch(error => {

        });
      },
    }
</script>

<style scoped>

</style>
