<template>
  <div>
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
        :formatter="boolFormatter">
      </el-table-column>
      <el-table-column
        label="固定发放周期(天)"
        prop="regular_period"
        align="center"
        :formatter="nullFormatter"
        min-width="100">
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
        align="center">
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
    <!--提交申请表单-->
    <el-form ref="newApplyForm" :model="newApplyForm" :rules="newApplyFormRules" label-width="120px" :label-position="newApplyFormLabelPosition" style="width: 100%; margin-top: 30px">
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
      <el-form-item label="固定发放周期(天)" v-show="newApplyForm.is_regular">
        <el-input-number v-model="newApplyForm.regularPeriod" @change="handleChangeRegularPeriod" :min="1" :max="1000" label="描述文字"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('newApplyForm')">提交申请</el-button>
        <el-button type="danger" @click="resetForm('newApplyForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getPlatformOptions, getZoneOptions, getWelfareList, addWelfare} from '../../api/api';

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
        },
        // 申请表单标签对齐位置
        newApplyFormLabelPosition: 'left',

        applyTableData: [],
        search: '',

      }
    },
    methods: {
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addWelfare(this.newApplyForm).then(res => {
              console.log('xinzengchenggong')
            });
          } else {
            console.log('error submit!!');
            return false;
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
      handleChangeRegularPeriod(value) {
        console.log(value);
      },


      handleDelete(index, row) {
        console.log(index, row);
      },
      // // 平台id格式化
      // platformFormatter(row, column, cellValue, index) {
      //   return this.platformOptions.find(item => item.pid === cellValue).pname
      // },
      // // 区服id格式化
      // zoneFormatter(row, column, cellValue, index) {
      //   return this.zoneOptions.find(item => item.zid === cellValue)
      // },
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
