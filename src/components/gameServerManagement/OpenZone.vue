<template>
    <div>

      <div style="float: left;">
        <el-button
          type="danger"
          @click="handleOpen">设置开区</el-button>
      </div>

      <el-dialog title="开区设置" :visible.sync="openFormVisible" width="30%" center>
        <!--提交申请表单-->
        <el-form ref="openForm" :model="openForm" :rules="openFormRules" label-width="160px" :label-position="openFormLabelPosition" style="width: 100%; margin-top: 30px">
          <el-form-item label="开区类型">
            <el-select v-model="openForm.open_type" @change="changeOpenType">
              <el-option v-for="(item, index) in openTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最大用户数" prop="max_users" v-show="byUser">
            <el-input v-model.number="openForm.max_users" placeholder="请输入最大用户数"></el-input>
          </el-form-item>
          <el-form-item label="自动开区时间" prop="autoOpenTime" v-show="byTime">
            <el-date-picker
              v-model="openForm.autoOpenTime"
              type="datetime"
              placeholder="请设置自动开区时间"
              value-format="timestamp">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="对此服务器所有包生效">
            <el-switch v-model="openForm.by_zone"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setOpen">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "OpenZone"
    }
</script>

<style scoped>

</style>
