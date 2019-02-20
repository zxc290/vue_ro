<template>
  <div>
    <!--弹出新增申请表单-->
    <el-button type="primary" style="float:left;margin-bottom: 20px" @click="clickAdd">新增申请</el-button>
    <!--福利申请列表-->
    <el-table
      :data="applyTableData.filter(data => !search || data.role_name.toLowerCase().includes(search.toLowerCase()))"
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
        label="是否固定发放"
        prop="is_regular"
        align="center"
        :formatter="boolFormatter"
        min-width="100"
        sortable>
      </el-table-column>
      <el-table-column
        label="固定发放周期(天)"
        prop="regular_period"
        align="center"
        :formatter="nullFormatter"
        min-width="120"
        sortable>
      </el-table-column>
      <el-table-column
        label="申请数量"
        prop="amount"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        label="申请人id"
        prop="applicant_id"
        align="center"
        v-if="false">
      </el-table-column>
      <el-table-column
        label="申请人"
        prop="applicant_name"
        align="center"
        min-width="100"
        sortable>
      </el-table-column>
      <el-table-column
        label="申请日期"
        prop="created_date"
        align="center"
        :formatter="dateFormatter"
        min-width="150"
        show-overflow-tooltip
        sortable>
      </el-table-column>
      <el-table-column
        label="审核状态"
        prop="status"
        align="center"
        :formatter="applyStatusFormatter"
        sortable>
      </el-table-column>
      <el-table-column
        label="审核人id"
        prop="approver_id"
        align="center"
        :formatter="nullFormatter"
        v-if="false">
      </el-table-column>
      <el-table-column
        label="审核人"
        prop="approver_name"
        align="center"
        :formatter="nullFormatter"
        min-width="100"
        sortable>
      </el-table-column>
      <el-table-column
        label="审核日期"
        prop="approve_date"
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
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增申请" :visible.sync="newApplyFormVisible" width="30%" center>
    <!--提交申请表单-->
    <el-form ref="newApplyForm" :model="newApplyForm" :rules="newApplyFormRules" label-width="140px" :label-position="newApplyFormLabelPosition" style="width: 100%; margin-top: 30px">
      <el-form-item label="游戏平台" prop="pid">
        <el-select v-model="newApplyForm.pid" filterable placeholder="请选择游戏平台" @change="handleChangePlatform">
          <el-option v-for="(item, index) in platformOptions" :key="index" :label="item.pname" :value="item.pid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="游戏区服" prop="zid">
        <el-select v-model="newApplyForm.zid" filterable placeholder="请选择游戏区服" @change="handleChangeZone">
          <el-option v-for="(item, index) in zoneOptions" :key="index" :label="item.sname" :value="item.sid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色名" prop="role_name">
        <el-select v-model="newApplyForm.role_name" filterable placeholder="请选择游戏角色名">
          <el-option v-for="(item, index) in roleNameOptions" :key="index" :label="item.role_name" :value="item.role_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请人id" prop="applicant_id" v-show="false">
        <el-input v-model="newApplyForm.applicant_id" placeholder="请输入申请人名"></el-input>
      </el-form-item>
      <el-form-item label="申请数量" prop="amount">
        <el-input v-model.number="newApplyForm.amount" placeholder="请输入0-999间的整数"></el-input>
      </el-form-item>
      <el-form-item label="是否固定发放">
        <el-switch v-model="newApplyForm.is_regular" @change="isRegularChange"></el-switch>
      </el-form-item>
      <el-form-item label="固定发放周期(天)" prop="regular_period" v-show="newApplyForm.is_regular">
        <el-input v-model.number="newApplyForm.regular_period" placeholder="请输入0-999间的整数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('newApplyForm')">提交申请</el-button>
        <el-button type="danger" @click="resetForm('newApplyForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { getPlatformOptions, getZoneOptions, getRolePlayerList, getWelfareList, addWelfare, deleteWelfare } from '../../api/api';

  export default {
    name: "Apply",
    data() {
      return {
        // 平台选项
        platformOptions: [],
        // 区服选项
        zoneOptions: [],
        // 角色名选项
        roleNameOptions: [],
        // 申请表单
        newApplyForm: {
          pid: '',
          zid: '',
          role_name: '',
          applicant_id: 0,
          amount: '',
          is_regular: false,
          regular_period: 0,
        },
        // 申请表单验证规则
        newApplyFormRules: {
          pid: [
            { required: true, message: '请选择游戏平台', trigger: 'change' }
          ],
          zid: [
            { required: true, message: '请选择游戏区服', trigger: 'change' }
          ],
          role_name: [
            { required: true, message: '请输入游戏角色名', trigger: 'blur' },
          ],
          amount: [
            { required: true, message: '请输入申请数量' },
            { type: 'number', message: '必须为数字值' },
            { pattern:/^\d{1,3}$/, message: '输入范围1-999'}
          ],
          regular_period: [
            { required: true, message: '请输入固定周期' },
            { type: 'number', message: '必须为数字值' },
            { pattern:/^\d{1,3}$/, message: '输入范围1-999'}
          ]
        },
        // 申请表单标签对齐位置
        newApplyFormLabelPosition: 'left',
        // 申请表单可见
        newApplyFormVisible: false,
        applyTableData: [],
        search: '',
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
      // 点击新增按钮
      clickAdd() {
        this.newApplyFormVisible = true;
      },
      isRegularChange(value) {
        this.newApplyForm.regularPeriod = 0;
      },
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(sessionStorage.getItem('userId'));
            this.newApplyForm.applicant_id = Number(sessionStorage.getItem('userId'));
            addWelfare(this.newApplyForm).then(res => {
              if (res.status === 201) {
                this.applyTableData.push(res.data);
                this.alertMessage('添加申请成功', 'success');
              }
            }).catch(error => {
              this.alertMessage(error.message, 'error');
            });
            this.newApplyFormVisible = false;
          }
        });
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 改变平台选项
      handleChangePlatform(value) {
        // 获取当前平台下的区服选项
        getZoneOptions().then(res => {
          let data = res.data;
          this.zoneOptions = data.filter(item => item.gid === 50 && item.pid === this.newApplyForm.pid);
        })
      },
      handleChangeZone(value) {
        // 获取区服，平台下的角色名选项
        getRolePlayerList().then(res => {
          let data = res.data;
          // console.log(data)
          this.roleNameOptions = data.filter(item => item.pid === this.newApplyForm.pid && item.zid === this.newApplyForm.zid)
        });
      },
      handleDelete(index, row) {
        if (row.status !== 0) {
          this.alertMessage('只能撤销审核中的申请', 'warning');
          return false
        }
        this.$confirm('撤销申请后将无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWelfare(row.id).then(res => {
            if (res.status === 204) {
              this.applyTableData = this.applyTableData.filter(item => item.id !== row.id);
              this.alertMessage('撤销成功', 'success');
            } else if (res.status === 202) {
              this.alertMessage(res.data, 'warning')
            }
          }).catch(error => {
            this.alertMessage(error.message, 'error');
          })
        }).catch(() => {

        });
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
      getWelfareList().then(res => {
        let data = res.data;
        this.applyTableData = data.filter(item => item.applicant_id === Number(sessionStorage.getItem('userId')) && item.status === 0);
      }).catch(error => {

      });
      getPlatformOptions().then(res => {
        let data = res.data;
        this.platformOptions = data.filter(item => item.gid === 50 && item.pid > 0);
      }).catch(error => {

      });
    }
  }

</script>

<style scoped>

</style>
