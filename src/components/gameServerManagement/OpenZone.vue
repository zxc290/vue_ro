<template>
  <!--<div>-->
    <!--<el-form :inline="true" :model="selectForm">-->
      <!--<el-form-item label="渠道">-->
        <!--<el-select v-model="planForm.cid" clearable placeholder="请选择游戏渠道">-->
          <!--<el-option v-for="(item, index) in channelOptions" :key="index" :label="item.cname" :value="item.cid"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="包">-->
        <!--<el-select v-model="planForm.appid" clearable placeholder="请选择游戏包">-->
          <!--<el-option v-for="(item, index) in packageOptions" :key="index" :label="item.appid" :value="item.appid"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
    <!--</el-form>-->

    <!--<el-form ref="planForm" :model="planForm">-->

      <!--&lt;!&ndash;<el-form-item label="渠道">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-select v-model="planForm.cid" clearable placeholder="请选择游戏渠道">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option v-for="(item, index) in channelOptions" :key="index" :label="item.cname" :value="item.cid"></el-option>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-form-item label="包">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-select v-model="planForm.appid" clearable placeholder="请选择游戏包">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option v-for="(item, index) in packageOptions" :key="index" :label="item.appid" :value="item.appid"></el-option>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--<el-form-item-->
        <!--v-for="(plan, index) in planForm.plans"-->
        <!--:label="'开区方式' + index"-->
        <!--:key="plan.key"-->
        <!--:prop="plan.open_type"-->
        <!--:rules="{-->
      <!--required: true, message: '计划类型', trigger: 'blur'-->
    <!--}"-->
      <!--&gt;-->
        <!--&lt;!&ndash;<el-input v-model="plan.open_type"></el-input>&ndash;&gt;-->
        <!--<el-select v-model="plan.open_type" clearable placeholder="请选择开区类型">-->
          <!--<el-option v-for="(item, index) in openTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item-->
        <!--v-for="(plan, index) in planForm.plans"-->
        <!--:label="'开区值' + index"-->
        <!--:key="plan.key"-->
        <!--:prop="plan.open_type_value"-->
        <!--:rules="{-->
      <!--required: true, message: '计划类型数值', trigger: 'blur'-->
    <!--}"-->
      <!--&gt;-->
        <!--<el-input v-model="plan.open_type_value"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
        <!--&lt;!&ndash;<el-button type="primary" @click="submitForm('planForm')">保存</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button @click="addPlan">新增计划</el-button>&ndash;&gt;-->
        <!--<el-button @click.prevent="removePlan(plan)">删除</el-button>-->
        <!--&lt;!&ndash;<el-button @click="resetForm('dynamicValidateForm')">重置</el-button>&ndash;&gt;-->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<el-button type="primary" @click="submitForm('planForm')">保存</el-button>-->
    <!--<el-button @click="addPlan">新增计划</el-button>-->
  <!--</div>-->
  <div>
    <el-form ref="queryForm" :inline="true" :model="queryForm">
      <el-form-item label="渠道" prop="cid">
        <el-select v-model="queryForm.cid" clearable placeholder="请选择游戏渠道" @change="handleChangeChannel">
          <el-option v-for="(item, index) in channelOptions" :key="index" :label="item.cname" :value="item.cid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="包">
        <el-select v-model="queryForm.appid" clearable placeholder="请选择游戏包">
          <el-option v-for="(item, index) in packageOptions" :key="index" :label="item.appid" :value="item.appid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form ref="planForm" :model="planForm" :inline="true">
      <div v-for="(plan, index) in planForm.plans" :key="plan.key">
        <!--<el-form-item label="id">-->
          <!--<el-input readonly v-model="plan.id"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="zoneidx">-->
          <!--<el-input readonly v-model="plan.zoneidx"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="区服名" :prop="'plans.' + index + '.id'" :rules="[
      { required: true, message: '请选择区服', trigger: 'change' },
    ]">
          <!--<el-input readonly v-model="plan.zonename"></el-input>-->
          <el-select v-model="plan.id" placeholder="请选择区服" @change="handleChangeZone(plan)">
            <el-option v-for="(item, index) in zoneOptions" :key="index" :label="item.zonename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开区类型" :prop="'plans.' + index + '.open_type'" :rules="[
      { required: true, message: '请选择开区类型', trigger: 'change' },
    ]">
          <el-select v-model="plan.open_type" clearable placeholder="请选择开区类型" @change="handleChangeOpenType(plan)">
            <el-option v-for="(item, index) in openTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开区人数" v-show="plan.open_type === 1" :prop="'plans.' + index + '.open_user'" :rules="[
              { required: true, message: '请输入开区人数', trigger: 'change' },
        ]">
          <el-input v-model.number="plan.open_user" placeholder="请输入开区人数"></el-input>
        </el-form-item>
        <el-form-item label="开区时间" v-show="plan.open_type === 2" :prop="'plans.' + index + '.open_time'" :rules="[
          { required: true, message: '请输入开区时间', trigger: 'change' },
        ]">
          <el-date-picker
            v-model="plan.open_time"
            type="datetime"
            value-format="timestamp"
            placeholder="请选择开区时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="同步到区">
          <el-switch v-model="plan.by_zone"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="savePlan(plan)">保存</el-button>
          <el-button type="danger" @click.prevent="removePlan(plan)">删除</el-button>
        </el-form-item>
      </div>
      <!--<el-form-item label="同步到区">-->
      <!--<el-switch v-model="planForm.by_zone"></el-switch>-->
      <!--</el-form-item>-->
    <el-form-item>
      <el-button @click="addPlan">新增计划</el-button>
      <!--<el-button type="primary" @click="submitForm('planForm')">保存</el-button>-->
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import { getServerManagementList, getChannelList, getAppPackageList, setOpenPlan, deleteOpenPlan } from '../../api/api';
  export default {
      name: "OpenZone",
      data() {
        return {
          // 渠道选项
          channelOptions: [],
          // 包选项
          packageOptions: [],
          // // 未计划区
          // unplannedZone: [],
          // // 已计划区
          // plannedZone: [],
          // 区选项
          zoneOptions: [],
          // 推荐选项
          recommendOptions: [
            {value: 0, label: '否'},
            {value: 1, label: '是'},
          ],
          openTypeOptions: [
            // {value: 0, label: '立即开区'},
            {value: 1, label: '按人数开区'},
            {value: 2, label: '按时间开区'}
          ],
          // 选择表单
          queryForm: {
            gid: 50,
            cid: '',
            appid: '',
          },
          // 开区表单
          planForm: {
            gid: 50,
            cid: '',
            appid: '',
            plans: [
              // {
              // id: '',
              // zoneidx: '',
              // zonename: '',
              // open_type: '',
              // open_user: '',
              // open_time: '',
              // by_zone: false,
              // }
            ],
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
      // 新增计划
      addPlan() {
        if (this.planForm.plans.length >= this.zoneOptions.length) {
          this.alertMessage('已无可设置计划的区服', 'warning')
        } else {
          console.log(this.planForm)
          let selectedArray = this.planForm.plans.map(item => item.id);
          console.log(selectedArray)
          this.planForm.plans.push({
            'id': '',
            'zoneidx': '',
            'zonename':'',
            'open_type': '',
            'open_user': '',
            'open_time': '',
            'planned': false,
            key: Date.now()
          });
        }
      },
      // 保存计划
      savePlan(plan) {
        this.$confirm('保存计划后将立刻生效, 是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 去除毫秒
          plan.open_time /= 1000;
          setOpenPlan(plan).then(res => {
            let data = res.data;
            this.alertMessage('设置开区计划成功', 'success');
          }).catch(error => {
            this.alertMessage('设置开区计划失败', 'error');
          });
          // deleteWelfare(row.id).then(res => {
          //   if (res.status === 204) {
          //     this.applyTableData = this.applyTableData.filter(item => item.id !== row.id);
          //     this.alertMessage('撤销成功', 'success');
          //   } else if (res.status === 202) {
          //     this.alertMessage(res.data, 'warning')
          //   }
          // }).catch(error => {
          //   this.alertMessage(error.message, 'error');
          // })
        }).catch(() => {

        });
      },
      // 移除计划
      removePlan(plan) {
        setOpenPlan(plan).then(res => {
          console.log(res)
        }).catch(error => {

        });
        // let index = this.planForm.plans.indexOf(plan);
        // if (index !== -1) {
        //   this.planForm.plans.splice(index, 1);
        // }
      },
      handleChangeZone(plan) {
        console.log(plan)
        if (this.planForm.plans.filter(item => item.id === plan.id).length > 1) {
          this.alertMessage('当前区服已存在计划任务，无法重复创建', 'error')
          plan.id = '';
        } else {
          plan.zoneidx = this.zoneOptions.find(item => item.id === plan.id).zoneidx;
          plan.zonename = this.zoneOptions.find(item => item.id === plan.id).zonename;

        }
        // console.log(plan)
      },
      // 改变开区类型
      handleChangeOpenType(plan) {
        if (plan.open_type === 1) {
          this.planForm.plans.find(item => item.id === plan.id).open_time = 0;
        } else if (plan.open_type === 2) {
          this.planForm.plans.find(item => item.id === plan.id).open_user = 0;
        }
        // if (value === 1) {
        //
        // }
      },
      onQuery() {
        getServerManagementList(this.queryForm).then(res => {
          let data = res.data;
          this.zoneOptions = data.map(item => {
            return item;
          });
          console.log(this.zoneOptions)
          console.log('34414')
          // // 已计划区
          // this.plannedZone = data.filter(item => item.open_type !== null);
          // // 未计划区
          // this.unplannedZone = data.filter(item => item.open_type === null);
          // 清空当前表单，并插入查询数据
          this.planForm.plans = [];
          this.zoneOptions.map(item => {
            if (item.open_type === 1) {
              // Object.assign(item, {'open_user': item.open_type_value, 'open_time': ''});
              this.planForm.plans.push({'id': item.id, 'zoneidx': item.zoneidx, 'zonename':item.zonename, 'open_type': item.open_type, 'open_user': item.open_type_value, 'open_time': 0});
            } else if (item.open_type === 2) {
              // Object.assign(item, {'open_user': '', 'open_time': item.open_type_value});
              this.planForm.plans.push({'id': item.id, 'zoneidx': item.zoneidx, 'zonename':item.zonename, 'open_type': item.open_type, 'open_user': 0, 'open_time': item.open_type_value});
            }

            // this.planForm.plans.push(result)
          });
        }).catch(error => {
          console.log(error)
        });
        // console.log(this.planForm.plans)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log(this[formName])
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // submitForm() {
      //   this.planForm.appid = this.queryForm.appid;
      //   this.planForm.cid = this.queryForm.cid;
      //   this.planForm.plans.map(item => item.open_time /= 1000);
      //   console.log(this.planForm)
      // }
  },
  created() {
    getChannelList().then(res => {
      // let data = res.data;
      this.channelOptions = res.data;
      // this.queryForm.cid = this.channelOptions[0].cid;
      // getServerManagementList(this.queryForm).then(res => {
      //   let data = res.data;
      //   console.log(data)
      //   this.serverManagementTableData = data;
      // }).catch(error => {
      //   console.log(error)
      // });
    }).catch(error => {
      console.log(error)
    });
  }
  }
</script>

<style scoped>

</style>
