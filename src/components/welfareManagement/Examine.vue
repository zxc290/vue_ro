<template>
  <!--福利审批列表-->
  <el-table
    :data="examineTableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
      prop="approve_date"
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
          type="primary"
          @click="handleExamine(scope.$index, scope.row, 1)">批准</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleExamine(scope.$index, scope.row, 2)">否决</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {getWelfareList, modifyWelfare} from '../../api/api';

    export default {
      name: "Examine",
      data() {
        return {
          examineTableData: [],
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
        // 审批
        handleExamine(index, row, status) {
          if (row.status !== 0) {
            this.alertMessage('只能对审核中的申请做修改', 'warning');
            return false
          }
          this.$confirm('修改申请状态后将无法修改, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 修改json参数
            row.status = status;
            modifyWelfare(row).then(res => {
              Object.assign(this.examineTableData.find(item => item.id === row.id), res.data);
            });
            // 消息提示
            if (status === 1) {
              this.alertMessage('已批准', 'success');
            } else if (status === 2) {
              this.alertMessage('已否决', 'success');
            }
          }).catch(() => {
            this.alertMessage('已取消修改', 'info');
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
          console.log(data)
          this.examineTableData = data;
        });
        // getPlatformOptions().then(res => {
        //   let data = res.data;
        //   this.platformOptions = data.filter(item => item.gid === 50 && item.pid > 0);
        // })
      }
    }
</script>

<style scoped>

</style>
