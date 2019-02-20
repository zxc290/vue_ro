<template>
  <div>
    <!--弹出新增人员角色表单-->
    <el-button type="primary" style="float:left;margin-bottom: 20px" @click="clickAdd">新增人员角色</el-button>
  <!--人员角色列表-->
  <el-table
    :data="rolePlayerTableData.filter(data => !search || data.role_name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%" size="small" border>
    <el-table-column
      label="id"
      prop="id"
      align="center"
      v-if="false">
    </el-table-column>
    <el-table-column
      label="平台id"
      prop="pid"
      align="center"
      v-if="false">
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
      align="center"
      v-if="false">
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
      show-overflow-tooltip
      sortable>
    </el-table-column>
    <el-table-column
      label="使用人"
      prop="user_name"
      align="center"
      sortable>
    </el-table-column>
    <el-table-column
      label="是否激活"
      prop="is_active"
      align="center"
      :formatter="boolFormatter"
      sortable>
    </el-table-column>
    <el-table-column
      label="修改人id"
      prop="creator_id"
      align="center"
      v-if="false">
    </el-table-column>
    <el-table-column
      label="修改人"
      prop="creator_name"
      align="center"
      min-width="100"
      sortable>
    </el-table-column>
    <el-table-column
      label="修改日期"
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
    <el-dialog :title="rolePlayerFormTitle" :visible.sync="rolePlayerFormVisible" width="30%" center>
      <!--提交申请表单-->
      <el-form ref="rolePlayerForm" :model="rolePlayerForm" :rules="rolePlayerFormRules" label-width="140px" :label-position="rolePlayerFormLabelPosition" style="width: 100%; margin-top: 30px">
        <el-form-item label="游戏平台" prop="pid">
          <el-select v-model="rolePlayerForm.pid" filterable placeholder="请选择游戏平台" @change="handleChangePlatform">
            <el-option v-for="(item, index) in platformOptions" :key="index" :label="item.pname" :value="item.pid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏区服" prop="zid">
          <el-select v-model="rolePlayerForm.zid" filterable placeholder="请选择游戏区服">
            <el-option v-for="(item, index) in zoneOptions" :key="index" :label="item.sname" :value="item.sid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色名" prop="role_name">
          <el-input v-model="rolePlayerForm.role_name" placeholder="请输入角色名"></el-input>
        </el-form-item>
        <el-form-item label="使用人" prop="user_name">
          <el-input v-model="rolePlayerForm.user_name" placeholder="请输入使用人"></el-input>
        </el-form-item>
        <!--<el-form-item label="申请人id" prop="applicant_id" v-show="false">-->
          <!--<el-input v-model="rolePlayerForm.applicant_id" placeholder="请输入申请人名"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="申请数量" prop="amount">-->
          <!--<el-input v-model.number="rolePlayerForm.amount" placeholder="请输入0-999间的整数"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="是否激活">
          <el-switch v-model="rolePlayerForm.is_active"></el-switch>
        </el-form-item>
        <!--<el-form-item label="固定发放周期(天)" prop="regular_period" v-show="rolePlayerForm.is_regular">-->
          <!--<el-input v-model.number="rolePlayerForm.regular_period" placeholder="请输入0-999间的整数"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('rolePlayerForm')">保存</el-button>
          <el-button type="danger" @click="resetForm('rolePlayerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { getRolePlayerList, addRolePlayer, editRolePlayer, deleteRolePlayer, getPlatformOptions, getZoneOptions } from '../../api/api';

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
          // 人员角色表单标题
          rolePlayerFormTitle: '',
          // 人员角色表单可见
          rolePlayerFormVisible: false,
          // 申请表单标签对齐位置
          rolePlayerFormLabelPosition: 'left',
          // 人员角色表单
          rolePlayerForm: {
            id: '',
            pid: '',
            zid: '',
            role_name: '',
            user_name: '',
            is_active: true,
            creator_id: 0,
          },
          // 人员角色表单验证规则
          rolePlayerFormRules: {
            pid: [
              { required: true, message: '请选择游戏平台', trigger: 'change' }
            ],
            zid: [
              { required: true, message: '请选择游戏区服', trigger: 'change' }
            ],
            role_name: [
              { required: true, message: '请输入游戏角色名'},
            ],
            user_name: [
              { required: true, message: '请输入使用人'},
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
        // 消息提示
        alertMessage(message, type) {
          this.$message({
            showClose: true,
            message: message,
            type: type,
          });
        },
        // 点击新增人员角色按钮
        clickAdd() {
          this.rolePlayerFormTitle = '新增人员角色';
          this.rolePlayerForm.id = '';
          // this.rolePlayerForm.pid = '';
          // this.rolePlayerForm.zid = '';
          this.rolePlayerFormVisible = true;
        },
        // 编辑人员角色
        handleEdit(index, row) {
          this.rolePlayerFormTitle = '编辑人员角色';
          this.rolePlayerFormVisible = true;
          this.rolePlayerForm.id = row.id;
          this.rolePlayerForm.pid = row.pid;
          this.rolePlayerForm.zid = row.zid;
          this.rolePlayerForm.role_name = row.role_name;
          this.rolePlayerForm.user_name = row.user_name;
          this.rolePlayerForm.is_active = row.is_active;
        },
        handleDelete(index, row) {
          this.$confirm('删除人员角色后将无法恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteRolePlayer(row.id).then(res => {
              if (res.status === 204) {
                this.rolePlayerTableData = this.rolePlayerTableData.filter(item => item.id !== row.id);
                this.alertMessage('删除成功', 'success');
              }
            }).catch(error => {

            });
          }).catch(() => {

          });
        },
        // 提交表单
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // console.log(sessionStorage.getItem('userId'));
              this.rolePlayerForm.creator_id = Number(sessionStorage.getItem('userId'));
              // 有id是编辑，无id是新增
              if (this.rolePlayerForm.id) {
                editRolePlayer(this.rolePlayerForm).then(res => {
                  // 此角色已分配玩家，不更新
                  if (res.status === 202) {
                    this.alertMessage(res.data, 'warning');
                  } else {
                    Object.assign(this.rolePlayerTableData.find(item => item.id === this.rolePlayerForm.id), res.data);
                    this.alertMessage('修改人员角色成功', 'success');
                    this.rolePlayerFormVisible = false;
                  }
                })
              } else {
                addRolePlayer(this.rolePlayerForm).then(res => {
                  if (res.status === 201) {
                    this.rolePlayerTableData.push(res.data);
                    this.alertMessage('添加人员角色成功', 'success');
                    this.rolePlayerFormVisible = false;
                  } else if(res.status === 202) {
                    this.alertMessage(res.data, 'warning');
                  }
                }).catch(error => {
                  this.alertMessage(error.message, 'error');
                });
              }
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
          this.rolePlayerTableData = res.data;
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
