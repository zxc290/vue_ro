<template>
    <div>
      <el-form ref="queryForm" :inline="true" :rules="queryFormRules" :model="queryForm" style="float: left;">
        <el-form-item label="渠道" prop="cid">
          <el-select v-model="queryForm.cid" clearable placeholder="请选择游戏渠道" @change="handleChangeChannel" @visible-change="handleClickSelectChannel">
            <el-option v-for="(item, index) in channelOptions" :key="index" :label="item.cname" :value="item.cid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包">
          <el-select v-model="queryForm.appid" clearable placeholder="请选择游戏包" @change="handleChangePackage" @visible-change="handleClickSelectPackage">
            <el-option v-for="(item, index) in packageOptions" :key="index" :label="item.appid" :value="item.appid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('queryForm')">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="serverManagementTableData.filter(data => !search || data.zonename.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        ref="serverManagementTableData"
        size="small"
        border
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange">
        <el-table-column
          label="id"
          prop="id"
          align="center"
          v-if="false">
        </el-table-column>
        <el-table-column
          label="游戏id"
          prop="GID"
          align="center"
          v-if="false">
        </el-table-column>
        <el-table-column
          label="渠道id"
          prop="CID"
          align="center"
          v-if="false">
        </el-table-column>
        <el-table-column
          label="平台id"
          prop="PID"
          align="center"
          v-if="false">
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
          sortable
          v-if="false">
        </el-table-column>
        <el-table-column
          label="服务器状态"
          prop="server_statu"
          align="center"
          :formatter="serverStatuFormatter"
          sortable>
        </el-table-column>
        <el-table-column
          label="是否推荐"
          prop="server_suggest"
          align="center"
          :formatter="serverSuggestFormatter"
          sortable>
        </el-table-column>
        <el-table-column
          label="是否删除"
          prop="is_delete"
          align="center"
          sortable
          v-if="false">
        </el-table-column>
        <el-table-column
          label="区服idx"
          prop="zoneidx"
          align="center"
          sortable
          v-if="false">
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
          label="appid"
          prop="appid"
          align="center"
          min-width="100"
          sortable>
        </el-table-column>
        <el-table-column
          label="开区类型"
          prop="open_type"
          align="center"
          min-width="100"
          :formatter="openTypeFormatter"
          sortable>
        </el-table-column>
        <el-table-column
          label="开区类型对应值"
          prop="open_type_value"
          align="center"
          min-width="100"
          :formatter="openTypeValueFormatter"
          sortable>
        </el-table-column>
        <el-table-column
          min-width="200"
          align="center">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入区服名搜索"/>
          </template>

        </el-table-column>
      </el-table>


    </div>
</template>

<script>
  import { getServerManagementList, getChannelList, getAppPackageList, updateAppServerChannel, setOpen } from '../../api/api';

    export default {
      name: "ZoneList",
      data() {
        return {
          // 渠道选项
          channelOptions: [],
          // 包选项
          packageOptions: [],
          // 推荐选项
          recommendOptions: [
            {value: 0, label: '否'},
            {value: 1, label: '是'},
          ],
          openTypeOptions: [
            {value: 0, label: '立即开区'},
            {value: 1, label: '按人数开区'},
            {value: 2, label: '按时间开区'}
          ],
          // 查询表单
          queryForm: {
            gid: 50,
            cid: '',
            appid: '',
          },
          // 查询表单验证规则
          queryFormRules: {
            cid: [
              { required: true, message: '请选择游戏渠道', trigger: 'change' }
            ],
          },
          // 开区表单标签对齐位置
          openFormLabelPosition: 'left',
          // 开区表单可见
          openFormVisible: false,
          // 编辑表单
          openForm: {
            // id: 0,
            // zoneidx: '',
            open_type: 0,
            max_users: 0,
            autoOpenTime: 0,
            // server_suggest: 0,
            // max_users: '',
            // server_weight: '',
            // autoOpenTime: '',
            by_zone: false,
          },
          // 编辑表单验证规则
          openFormRules: {
            max_users: [
              // { required: true, message: '请输入最大用户数' },
              { type: 'number', message: '必须为数字值' },
              { pattern:/^\d{1,4}$/, message: '输入范围1-9999'}
            ],
            // // server_weight: [
            // //   { required: true, message: '请输入服务器权重' },
            // //   { type: 'number', message: '必须为数字值' },
            // //   { pattern:/^\d$/, message: '输入范围1-9'}
            // // ],
            autoOpenTime: [
              // { type: 'date', required: true, message: '请选择日期'}
              { type: 'date', message: '请选择日期'}
            ],
          },

          // 申请表单标签对齐位置
          editFormLabelPosition: 'left',
          // 编辑表单可见
          editFormVisible: false,
          // 编辑表单
          editForm: {
            id: 0,
            zoneidx: '',
            server_suggest: 0,
            max_users: '',
            server_weight: '',
            autoOpenTime: '',
            by_zone: false,
          },
          // 编辑表单验证规则
          editFormRules: {
            max_users: [
              { required: true, message: '请输入最大用户数' },
              { type: 'number', message: '必须为数字值' },
              { pattern:/^\d{1,4}$/, message: '输入范围1-9999'}
            ],
            server_weight: [
              { required: true, message: '请输入服务器权重' },
              { type: 'number', message: '必须为数字值' },
              { pattern:/^\d$/, message: '输入范围1-9'}
            ],
            autoOpenTime: [
              { type: 'date', required: true, message: '请选择日期'}
            ],
          },
          // 服务器列表数据
          serverManagementTableData: [],
          search: '',
          // 多选选项
          multipleSelection: [],
          // 显示人数选项
          byUser: false,
          // 显示时间选项
          byTime: false,
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
        // 开区类型格式化
        openTypeFormatter(row, column, cellValue, index) {
          let text = '';
          switch (cellValue) {
            case 0:
              text = '立即开启';
              break;
            case 1:
              text = '按人数开区';
              break;
            case 2:
              text = '按时间开区';
              break;
            default:
              text = '/';
              break;
          }
          return text
        },
        // 开区类型对应值转化
        openTypeValueFormatter(row, column, cellValue, index) {
          let text = '';
          switch (row.open_type) {
            case 0:
              text = '/';
              break;
            case 1:
              text = cellValue;
              break;
            case 2:
              text = this.timeStampFormatter('', '', cellValue, '');
              break;
            default:
              text = '/';
              break;
          }
          return text
        },
        // 时间戳转日期时间
        timeStampFormatter(row, column, cellValue, index) {
          let date = new Date(cellValue * 1000);
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          let D = date.getDate() + ' ';
          let h = date.getHours() + ':';
          let m = date.getMinutes() + ':';
          let s = date.getSeconds();
          return Y + M + D + h + m + s;
        },
        // 是否推荐格式化
        serverSuggestFormatter(row, column, cellValue, index) {
          let text = '';
          switch (cellValue) {
            case 0:
              text = '否';
              break;
            case 1:
              text = '是';
              break;
            default:
              text = '未知';
              break;
          }
          return text
        },
        // 服务器状态格式化
        serverStatuFormatter(row, column, cellValue, index) {
          let text = '';
          switch (cellValue) {
            case 101:
              text = '新区';
              break;
            case 102:
              text = '畅通';
              break;
            case 103:
              text = '拥挤';
              break;
            case 104:
              text = '繁忙';
              break;
            case 105:
              text = '未开';
              break;
            case 111:
              text = '例行维护';
              break;
            case 112:
              text = '临时维护';
              break;
            case 113:
              text = '数据互通';
              break;
            case 201:
              text = '内部测试服';
              break;
            case 202:
              text = '待开放新区';
              break;
            default:
              text = '未知';
              break;
          }
          return text
        },
        // selectChange() {
        //
        // },
        // selectAll() {
        //
        // },
        getRowKeys(row) {
          return row.id
        },
        // 选中多选
        handleSelectionChange(value) {
          this.multipleSelection = value;
        },
        // 清空选项
        clearSelect() {
          this.multipleSelection = [];
        },
        // 点击设置开区
        handleOpen() {
          if (this.multipleSelection.length < 1) {
            this.alertMessage('请先查询区服并勾选', 'warning');
            return false
          } else {
            this.openFormVisible = true;
          }
          // this.openForm.id = row.id;
          // this.openForm.zoneidx = row.zoneidx;
          // this.openForm.type = row.type;
          // this.editForm.server_suggest = row.server_suggest;
          // this.openForm.max_users = row.max_users;
          // this.editForm.server_weight = row.server_weight;
          // this.openForm.autoOpenTime = new Date(this.timeStampFormatter('', '', row.autoOpenTime, ''));
        },
        // 改变开区方式选项
        changeOpenType(value) {
          this.openForm.max_users = 0;
          this.openForm.autoOpenTime = 0;
          switch (value) {
            case 0:
              this.byUser = this.byTime =false;
              break;
            case 1:
              this.byUser = true;
              this.byTime = !this.byUser;
              break;
            case 2:
              this.byUser = false;
              this.byTime = !this.byUser;
              break;
          }
        },
        handleEdit(index, row) {
          this.editFormVisible = true;
          this.editForm.id = row.id;
          this.editForm.zoneidx = row.zoneidx;
          this.editForm.server_suggest = row.server_suggest;
          this.editForm.max_users = row.max_users;
          this.editForm.server_weight = row.server_weight;
          this.editForm.autoOpenTime = new Date(this.timeStampFormatter('', '', row.autoOpenTime, ''));
        },
        handleDelete(index, row) {

        },
        // 点击选择渠道下拉框
        handleClickSelectChannel(val) {
          if (val) {
            getChannelList().then(res => {
              // let data = res.data;
              this.channelOptions = res.data;
            }).catch(error => {

            });
          }
        },
        // 选择渠道
        handleChangeChannel(val) {
          console.log('111112222')
          if (!val) {
            // 清空
            this.packageOptions = [];
            this.queryForm.appid = '';
            // this.serverManagementTableData =[];
            return false
          }
          getAppPackageList().then(res => {
            let data = res.data;
            // this.packageOptions = data.reduce((all, next) => all.some(item => item.appid === next.appid) ? all : [...all, next], [])
            this.packageOptions = data;
          }).catch(error => {

          });
        },
        // 选择包
        handleChangePackage(value) {
          console.log(value)
        },
        // 查询服务器列表
        onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              getServerManagementList(this[formName]).then(res => {
                let data = res.data;
                console.log(data)
                this.serverManagementTableData = data;
                // this.serverManagementTableData = data.map(item => Object.assign(
                //   item, {
                //     'autoOpenTime': this.timeStampToDateTime(item.autoOpenTime),
                //     // 'server_suggest': this.serverSuggestToStr(item.server_suggest),
                //     'server_statu': this.serverStatuToStr(item.server_statu),
                //   }
                // ));
              }).catch(error => {
                console.log(error)
              });
            }
            else {
              console.log('shibai2')
            }
          });
        },
        // // 编辑表单，是否按包f
        // isByPackage() {
        //
        // }
        // 提交设置开区表单
        setOpen() {
          this.openForm.autoOpenTime /= 1000;
          let params = Object.assign(this.openForm, {'selected_zone': this.multipleSelection})
          setOpen(params).then(res => {
            let data = res.data;
            this.serverManagementTableData.map(item => {
              let findOne = data.find(each => each.id === item.id);
              if (findOne) {
                Object.assign(item, findOne)
              }
            });
            this.alertMessage('设置开区服务器成功', 'success');
            // Object.assign(this.serverManagementTableData.find(item => item.id === this[formName].id), res.data.find(item => item.id === this[formName].id));
            // console.log(res.data)
          }).catch(error => {
            this.alertMessage('设置开区服务器失败', 'error');
            console.log('gengxin shibai')
          });
          // console.log(this.multipleSelection)
          // console.log(this.openForm)
        },



        // 提交编辑表单
        submitForm(formName) {
          this.$refs.serverManagementTableData.clearSelection();
          this.$refs[formName].validate((valid) => {
            this[formName].autoOpenTime = this[formName].autoOpenTime / 1000;
            if (valid) {
              updateAppServerChannel(this[formName]).then(res => {
                let data = res.data;
                console.log(data);
                // this.serverManagementTableData
                if (this[formName].by_zone) {
                  // Object.assign(this.serverManagementTableData.find(item => item.id === this[formName].id), res.data);
                  Object.assign(this.serverManagementTableData.find(item => item.id === this[formName].id), res.data.find(item => item.id === this[formName].id));
                  this.alertMessage('修改多条服务器成功', 'success');
                } else {
                  Object.assign(this.serverManagementTableData.find(item => item.id === this[formName].id), res.data);
                  this.alertMessage('修改单条服务器成功', 'success');
                }
              }).catch(error => {
                this.alertMessage('修改服务器失败', 'error');
              });
              this.editFormVisible = false;
            } else {
              console.log('shibai')
            }
          });
        },

        // 点击包下拉菜单
        handleClickSelectPackage(value) {
          if (!value) {
            // 清空
            this.packageOptions = [];
            this.queryForm.appid = '';
            // this.serverManagementTableData =[];
            return false
          }

          getAppPackageList().then(res => {
            console.log('pac')
            let data = res.data;
            // this.packageOptions = data.reduce((all, next) => all.some(item => item.appid === next.appid) ? all : [...all, next], [])
            this.packageOptions = data;
          }).catch(error => {
            console.log(error)
          });
        }
      },
      created() {
        getChannelList().then(res => {
          // let data = res.data;
          this.channelOptions = res.data;
          this.queryForm.cid = this.channelOptions[0].cid;
          getServerManagementList(this.queryForm).then(res => {
            let data = res.data;
            console.log(data)
            this.serverManagementTableData = data;
          }).catch(error => {
            console.log(error)
          });
        }).catch(error => {
          console.log(error)
        });
      }
    }
</script>

<style scoped>

</style>
