<template>
  <div>
    <el-button type="primary" style="float: left;" @click="clickMultiRecommend">多区推荐</el-button>
    <el-form ref="queryForm" :inline="true" :model="queryForm" :rules="queryFormRules">
      <el-form-item label="渠道" prop="cid">
        <el-select v-model="queryForm.cid" clearable placeholder="请选择游戏渠道" @change="handleChangeChannel">
          <el-option v-for="(item, index) in channelOptions" :key="index" :label="item.cname" :value="item.cid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="包" prop="appid">
        <el-select v-model="queryForm.appid" clearable placeholder="请选择游戏包">
          <el-option v-for="(item, index) in packageOptions" :key="index" :label="item.appid" :value="item.appid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery('queryForm')">查询</el-button>
        <!--<el-button type="primary" @click="onQuery">查询</el-button>-->
      </el-form-item>
    </el-form>

    <el-table
      :data="recommendServerManagementTableData.filter(data => !search || data.zonename.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      ref="serverManagementTableData"
      size="small"
      @selection-change="handleSelectionChange"
      border>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="id"
        prop="id"
        align="center"
        v-if="false">
      </el-table-column>
      <el-table-column
        label="区服名"
        prop="zonename"
        align="center">
      </el-table-column>
      <el-table-column
        label="包id"
        prop="appid"
        align="center">
      </el-table-column>
      <el-table-column
        label="开区时间"
        prop="OpenDate"
        align="center"
        sortable>
      </el-table-column>
      <el-table-column
        label="推荐方式"
        prop="server_suggest"
        :formatter="serverSuggestFormatter"
        align="center">
      </el-table-column>
      <el-table-column
        label="推荐权重"
        prop="server_weight"
        align="center">
      </el-table-column>
      <el-table-column
        label="权重过期时间"
        prop="weight_deadline"
        align="center">
      </el-table-column>
      <!--<el-table-column-->
        <!--label="推荐类型"-->
        <!--prop="server_suggest"-->
        <!--:formatter="serverSuggestFormatter"-->
        <!--align="center">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="推荐权重"-->
        <!--prop="server_suggest"-->
        <!--:formatter="serverSuggestFormatter"-->
        <!--align="center">-->
      <!--</el-table-column>-->
      <el-table-column
        min-width="200"
        align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入区服名搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="setRecommend(scope.$index, scope.row, 1)">设为默认推荐</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="setRecommend(scope.$index, scope.row, 0)">设为默认不推荐</el-button>
        </template>
        <!--<el-button type="primary" @click="changeRecommend(scope.$index, scope.row, 1)">设为推荐</el-button>-->
        <!--<el-button type="warning" @click="changeRecommend(scope.$index, scope.row, 0)">设为不推荐</el-button>-->
      </el-table-column>
    </el-table>
    <el-dialog title="多区权重推荐设置" :visible.sync="multiRecommendFormVisible" width="30%" center>
      <el-form ref="multiRecommendForm" :model="multiRecommendForm" :label-position="multiRecommendFormLabelPosition" label-width="120px">
        <div v-for="(zone, index) in multiRecommendForm.zones" :key="zone.id">
          <!--<el-form-item label="id">-->
          <!--<el-input readonly v-model="plan.id"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="zoneidx">-->
          <!--<el-input readonly v-model="plan.zoneidx"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="区服id" :prop="'zones.' + index + '.id'" v-if="false">
            <el-input readonly v-model="zone.id"></el-input>
          </el-form-item>
          <el-form-item label="区服名" :prop="'zones.' + index + '.zonename'">
            <el-input readonly v-model="zone.zonename"></el-input>
          </el-form-item>
          <el-form-item label="推荐权重" :prop="'zones.' + index + '.server_weight'" :rules="[
            { required: true, message: '推荐权重不能为空' },
            { type: 'number', message: '必须为数字值' },
            { pattern:/^\d$/, message: '输入范围1-9'},
        ]">
            <el-input v-model.number="zone.server_weight" placeholder="服务器权重数1~9"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="权重过期时间"  :rules="[
            { required: true, message: '权重过期时间不能为空' }
          ]">
          <el-date-picker
            v-model="multiRecommendForm.weight_deadline"
            type="datetime"
            placeholder="选择权重过期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click.prevent="setWeight('multiRecommendForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { getRecommendServerManagementList, getChannelList, getAppPackageList, changeRecommend, weightRecommend } from '../../api/api';
  export default {
    name: "Recommend",
    data() {
      return {
        // 渠道选项
        channelOptions: [],
        // 包选项
        packageOptions: [],
        // 区选项
        zoneOptions: [],
        // 选择表单
        queryForm: {
          gid: 50,
          cid: '',
          appid: '',
        },
        // 查询表单验证规则
        queryFormRules: {
          cid: [
            { required: true, message: '请选择渠道', trigger: 'change' },
          ],
          appid: [
            { required: true, message: '请选择包', trigger: 'change' },
          ],
        },
        // // 开区表单
        // recommendForm: {
        //   id: '',
        //   zonename: '',
        //   appid: '',
        //   server_suggest: '',
        // },
        // 推荐区服列表
        recommendServerManagementTableData: [],
        // 搜索
        search: '',
        // 权重推荐表单可见
        multiRecommendFormVisible: false,
        //
        multiRecommendFormLabelPosition: 'right',
        // 权重推荐选择项
        multiSelectedZone: [],
        // 权重推荐表单
        multiRecommendForm: {
          gid: 50,
          cid: '',
          appid: '',
          zones: [

          ],
          weight_deadline:'',
        },
        // 权重过期时间选择范围
        pickerOptions: {
          disabledDate(time) {
            let nowDate = new Date();
            return time.getTime() < new Date(nowDate.setDate(nowDate.getDate()));
          }
        }
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
      // 查询已开区服务器
      onQuery(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            getRecommendServerManagementList(this.queryForm).then(res => {
              // console.log(res.data)
              this.recommendServerManagementTableData = res.data;
              this.multiRecommendForm.cid = this.queryForm.cid;
              this.multiRecommendForm.appid = this.queryForm.appid;
              // this.zoneOptions = res.data;
              // this.zoneOptions = data.map(item => {
              //   return item;
              // });
              // // 已计划区
              // this.plannedZone = data.filter(item => item.open_type !== null);
              // // 未计划区
              // this.unplannedZone = data.filter(item => item.open_type === null);
              // 清空当前表单，并插入查询数据
              // this.planForm.plans = [];
              // this.zoneOptions.map(item => {
              //   if (item.open_type === 1) {
              //     // Object.assign(item, {'open_user': item.open_type_value, 'open_time': ''});
              //     this.planForm.plans.push({'id': item.id, 'zoneidx': item.zoneidx, 'zonename':item.zonename, 'open_type': item.open_type, 'open_user': item.open_type_value, 'open_time': 0});
              //   } else if (item.open_type === 2) {
              //     // Object.assign(item, {'open_user': '', 'open_time': item.open_type_value});
              //     this.planForm.plans.push({'id': item.id, 'zoneidx': item.zoneidx, 'zonename':item.zonename, 'open_type': item.open_type, 'open_user': 0, 'open_time': item.open_type_value * 1000});
              //   }
              //
              //   // this.planForm.plans.push(result)
              // });
            }).catch(error => {
              // console.log(error)
            });
            // console.log(this.planForm.plans)
          } else {
            return false;
          }
        });
      },
      // 改变渠道
      handleChangeChannel (value) {
        if (!value) {
          // 清空
          this.packageOptions = [];
          this.queryForm.appid = '';
          return false
        }
        // 获取包选项
        getAppPackageList().then(res => {
          let data = res.data;
          // this.packageOptions = data.reduce((all, next) => all.some(item => item.appid === next.appid) ? all : [...all, next], [])
          this.packageOptions = data;
        }).catch(error => {

        });
      },
      setRecommend(index, row, value) {
        let params = {'id': row.id, 'server_suggest': value};
        changeRecommend(params).then(res => {
          let data = res.data;
          this.recommendServerManagementTableData = data;
          // row.server_suggest = value;
          this.alertMessage('修改推荐状态成功', 'success');
        }).catch(error => {
          this.alertMessage('修改推荐状态失败', 'error');
          // console.log(error)
        })
        // Object.assign(row, {'server_suggest': value})
        // console.log(row)
      },
      // 多区推荐选中项
      handleSelectionChange(selection) {
        this.multiSelectedZone = selection;
        // console.log(this.multiSelectedZone)
      },
      // 点击多区推荐按钮
      clickMultiRecommend() {
        if (this.multiSelectedZone.length < 2) {
          this.alertMessage('多区推荐至少需要勾选2个区', 'error')
        } else {
          this.multiRecommendForm.zones = [];
          this.multiSelectedZone.map(item => this.multiRecommendForm.zones.push({'id': item.id, 'zonename': item.zonename, 'server_weight': item.server_weight, 'weight_deadline': item.weight_deadline}));
          // this.multiRecommendForm.zones = this.multiSelectedZone;
          this.multiRecommendFormVisible = true;
          // console.log(this.multiRecommendForm)
        }
      },
      // 设置多区
      setWeight(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('设置权重推荐将立刻生效, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              weightRecommend(this.multiRecommendForm).then(res => {
                let data = res.data;
                this.recommendServerManagementTableData = data;
                this.alertMessage('设置多区权重推荐成功', 'success');
              }).catch(error => {
                this.alertMessage('设置多区权重推荐失败', 'error');
              });
              this.multiRecommendFormVisible = false;
              // console.log(this.multiRecommendForm)
              // // 去除毫秒
              // // plan.open_time /= 1000;
              // if (plan.open_time || plan.max_user) {
              //   // if (plan.open_time !== null && plan.open_time < Date.now() + 60 * 60 * 1000) {
              //   //   this.alertMessage('开区时间必须至少是当前时间1小时之后', 'error');
              //   //   return false
              //   // }
              //   setOpenPlan(plan).then(res => {
              //     if (res.status === 204) {
              //       this.alertMessage('该区已开服，请重新查询区服列表,', 'error');
              //       return false
              //     }
              //     let data = res.data;
              //     plan.planned = true;
              //     // 填充表单
              //     // plan.open_time = data.find(item => item.id === plan.id).open_time * 1000;
              //     console.log(data)
              //     this.alertMessage('设置开区计划成功', 'success');
              //   }).catch(error => {
              //     this.alertMessage('设置开区计划失败', 'error');
              //   });
              // } else {
              //   this.alertMessage('开区时间和人数上限不能都为空', 'error');
              //   return false
              // }
            }).catch(() => {

            });
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      // 是否推荐格式化
      serverSuggestFormatter(row, column, cellValue, index) {
        let text = '';
        switch (cellValue) {
          case 0:
            text = '不推荐';
            break;
          case 1:
            if (row.server_weight !== null && row.server_weight !== '') {
              text = '权重推荐';
            } else {
              text = '手动推荐';
            }
            break;
          default:
            text = '未知';
            break;
        }
        return text
      },
    },
    created() {
      getChannelList().then(res => {
        this.channelOptions = res.data;
      }).catch(error => {
        // console.log(error)
      });
    }
  }
</script>

<style scoped>

</style>
