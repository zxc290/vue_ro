<template>
  <div>
    <!--弹出新增申请表单-->
    <el-button type="primary" style="float:left;margin-bottom: 20px" @click="clickAdd">新增申请</el-button>
    <!--福利申请列表-->
    <el-table
      :data="applyTableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
        align="center">
      </el-table-column>
      <el-table-column
        label="区服id"
        prop="zid"
        align="center">
      </el-table-column>
      <el-table-column
        label="区服名"
        prop="zname"
        align="center">
      </el-table-column>
      <el-table-column
        label="角色名"
        prop="role_name"
        align="center">
      </el-table-column>
      <el-table-column
        label="是否固定发放"
        prop="is_regular"
        align="center"
        :formatter="boolFormatter"
        min-width="100">
      </el-table-column>
      <el-table-column
        label="固定发放周期(天)"
        prop="regular_period"
        align="center"
        :formatter="nullFormatter"
        min-width="120">
      </el-table-column>
      <el-table-column
        label="申请数量"
        prop="amount"
        align="center">
      </el-table-column>
      <el-table-column
        label="申请人"
        prop="applicant"
        align="center">
      </el-table-column>
      <el-table-column
        label="申请时间"
        prop="created_date"
        align="center"
        :formatter="dateFormatter"
        min-width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="审核状态"
        prop="status"
        align="center"
      :formatter="applyStatusFormatter">
      </el-table-column>
      <el-table-column
        label="审核人"
        prop="approver"
        align="center"
        :formatter="nullFormatter">
      </el-table-column>
      <el-table-column
        label="审核日期"
        prop="approver_date"
        align="center"
        :formatter="dateFormatter"
        min-width="150"
        show-overflow-tooltip>
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
    <el-dialog title="新增申请" :visible.sync="newApplyFormVisible">
    <!--提交申请表单-->
    <el-form ref="newApplyForm" :model="newApplyForm" :rules="newApplyFormRules" label-width="140px" :label-position="newApplyFormLabelPosition" style="width: 100%; margin-top: 30px">
      <el-form-item label="游戏平台" prop="pid">
        <el-select v-model="newApplyForm.pid" filterable placeholder="请选择游戏平台" @change="handleChangePlatform">
          <el-option v-for="(item, index) in platformOptions" :key="index" :label="item.pname" :value="item.pid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="游戏区服" prop="zid">
        <el-select v-model="newApplyForm.zid" filterable placeholder="请选择游戏区服">
          <el-option v-for="(item, index) in zoneOptions" :key="index" :label="item.sname" :value="item.sid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色名" prop="role_name">
        <el-input v-model="newApplyForm.role_name" placeholder="请输入角色名"></el-input>
      </el-form-item>
      <el-form-item label="申请数量" prop="amount">
        <el-input-number v-model="newApplyForm.amount" :min="1" :max="1000" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="是否固定发放">
        <el-switch v-model="newApplyForm.is_regular"></el-switch>
      </el-form-item>
      <el-form-item label="固定发放周期(天)" prop="regularPeriod" v-show="newApplyForm.is_regular">
        <el-input-number v-model="newApplyForm.regularPeriod" @change="handleChangeRegularPeriod" :min="1" :max="1000" label="描述文字"></el-input-number>
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
  import {getPlatformOptions, getZoneOptions, getWelfareList, addWelfare, deleteWelfare} from '../../api/api';

  export default {
    name: "Apply",
    data() {
      return {
        // 平台选项
        platformOptions: [],
        // 区服选项
        zoneOptions: [],
        // 申请表单
        newApplyForm: {
          pid: '',
          pname: '',
          zid: '',
          zname: '',
          role_name: '',
          amount: '',
          is_regular: false,
          regularPeriod: 1,
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
            { required: true, message: '请输入申请数量', trigger: 'blur' },
          ],
          regularPeriod: [
            { required: true, message: '请输入固定周期', trigger: 'blur' },
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
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addWelfare(this.newApplyForm).then(res => {
              if (res.status === 201) {
                this.applyTableData.push(res.data);
                this.alertMessage('添加申请成功', 'success');
              }
            }).catch(error => {
              this.alertMessage(error.message, 'error');
            });
          }
          this.newApplyFormVisible = false;
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
      handleChangeRegularPeriod(value) {
        console.log(value);
      },
      handleDelete(index, row) {
        deleteWelfare(row.id).then(res => {
          if (res.status === 204) {
            this.applyTableData.pop(this.applyTableData.find(item => item.id === row.id));
            this.alertMessage('撤销成功', 'success');
          } else if (res.status === 202) {
            this.alertMessage(res.data, 'warning')
          }
        }).catch(error => {
          this.alertMessage(error.message, 'error');
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
      getWelfareList().then(res => {
        let data = res.data;
        console.log(data)
        this.applyTableData = data;
      });
      getPlatformOptions().then(res => {
        let data = res.data;
        this.platformOptions = data.filter(item => item.gid === 50 && item.pid > 0);
      })
    }
  }

</script>

<style scoped>

</style>
