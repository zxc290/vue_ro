<template>
  <!--福利审批列表-->
  <el-table
    :data="examineTableData.filter(data => !search || data.role_name.toLowerCase().includes(search.toLowerCase()))"
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
  import { getWelfareList, modifyWelfare } from '../../api/api';

    export default {
      name: "Examine",      data() {
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
            Object.assign(row, {'status': status, 'approver_id': Number(sessionStorage.getItem('userId'))});
            modifyWelfare(row).then(res => {
              // Object.assign(this.examineTableData.find(item => item.id === row.id), res.data);
              this.examineTableData = this.examineTableData.filter(item => item.id !== res.data.id);
            }).catch(error => {

            });
            // 消息提示
            if (status === 1) {
              this.alertMessage('已批准', 'success');
            } else if (status === 2) {
              this.alertMessage('已否决', 'success');
            }
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
          this.examineTableData = res.data.filter(item => item.status === 0);
        }).catch(error => {

        });
      }
    }
</script>

<style scoped>

</style>
