<template>
  <!--福利记录列表-->
  <el-table
    :data="welfareRecordTableData.filter(data => !search || data.role_name.toLowerCase().includes(search.toLowerCase()))"
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
      label="申请人姓名"
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
      label="审核人姓名"
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
</template>

<script>
  import { getWelfareList } from '../../api/api';

    export default {
      name: "Record",
      data() {
        return {
          welfareRecordTableData: [],
          search: '',
        }
      },
      methods: {
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
          if (sessionStorage.getItem('isApplicant')) {
            this.welfareRecordTableData = res.data.filter(item => item.status !== 0 && item.applicant_id === Number(sessionStorage.getItem('userId')));
          }
          if (sessionStorage.getItem('isApprover')) {
            this.welfareRecordTableData = res.data.filter(item => item.status !== 0);
          }
          // this.welfareRecordTableData = res.data.filter(item => item.status !== 0);
        }).catch(error => {

        });
      }
    }
</script>

<style scoped>

</style>
