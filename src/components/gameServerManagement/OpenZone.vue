<template>
  <div>
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

    <el-form ref="planForm" :model="planForm" :inline="true">
      <div v-for="(plan, index) in planForm.plans" :key="plan.key">
        <!--<el-form-item label="id">-->
          <!--<el-input readonly v-model="plan.id"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="zoneidx">-->
          <!--<el-input readonly v-model="plan.zoneidx"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-tag type="success" v-show="plan.planned">已生效</el-tag>
          <el-tag type="danger" v-show="!plan.planned">未生效</el-tag>
        </el-form-item>
        <el-form-item label="区服名" :prop="'plans.' + index + '.id'">
          <el-input readonly v-model="plan.zonename"></el-input>
          <!--<el-select v-model="plan.id" placeholder="请选择区服" @change="handleChangeZone(plan)">-->
            <!--<el-option v-for="(item, index) in zoneOptions" :key="index" :label="item.zonename" :value="item.id"></el-option>-->
          <!--</el-select>-->
        </el-form-item>
        <el-form-item label="开区时间" :prop="'plans.' + index + '.open_time'">
          <el-date-picker
            v-model="plan.open_time"
            type="datetime"
            value-format="timestamp"
            placeholder="请选择开区时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="人数上限" :prop="'plans.' + index + '.max_user'">
          <el-input v-model.number="plan.max_user" placeholder="请输入开区人数"></el-input>
        </el-form-item>
        <!--<el-form-item label="开区类型" :prop="'plans.' + index + '.open_type'" :rules="[-->
      <!--{ required: true, message: '请选择开区类型', trigger: 'change' },-->
    <!--]">-->
          <!--<el-select v-model="plan.open_type" clearable placeholder="请选择开区类型" @change="handleChangeOpenType(plan)">-->
            <!--<el-option v-for="(item, index) in openTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="开区时间" :prop="'plans.' + index + '.open_time'" :rules="[-->
          <!--{ required: true, message: '请输入开区时间', trigger: 'change' },-->
        <!--]">-->
          <!--<el-date-picker-->
            <!--v-model="plan.open_time"-->
            <!--type="datetime"-->
            <!--value-format="timestamp"-->
            <!--placeholder="请选择开区时间">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="人数上限" :prop="'plans.' + index + '.max_user'" :rules="[-->
              <!--{ required: true, message: '请输入开区人数', trigger: 'change' },-->
        <!--]">-->
          <!--<el-input v-model.number="plan.max_user" placeholder="请输入开区人数"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="同步到区">
          <el-switch v-model="plan.by_zone" @change="changeSwitch(plan)"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="savePlan('planForm', plan)">保存</el-button>
          <!--<el-button type="danger" @click.prevent="removePlan(plan)">删除</el-button>-->
        </el-form-item>

      </div>
      <!--<el-form-item label="同步到区">-->
      <!--<el-switch v-model="planForm.by_zone"></el-switch>-->
      <!--</el-form-item>-->
    <el-form-item>
      <el-button type="primary" @click="addPlan">新增计划</el-button>
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
          // 查询表单验证规则
          queryFormRules: {
            cid: [
              { required: true, message: '请选择渠道', trigger: 'change' },
            ],
            appid: [
              { required: true, message: '请选择包', trigger: 'change' },
            ],
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
              // max_user: '',
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
      // 切换是否同步到区
      changeSwitch(plan) {
        let zone = this.zoneOptions.find(item => item.id === plan.id);
        if (!zone.sync) {
          this.alertMessage('该区默认配置为不同步，无法修改为同步', 'error');
          plan.by_zone = false;
        }
      },
      // 新增计划
      addPlan() {
        // 没有可选配置区
        if (this.planForm.plans.length >= this.zoneOptions.length) {
          this.alertMessage('已无可设置计划的区服', 'warning')
        } else {
          // 获取上一个配置区
          let previousPlan = this.planForm.plans[this.planForm.plans.length - 1];
          if (!previousPlan.planned) {
            this.alertMessage('请先保存上一个区的配置', 'error')
            return false
          }


          let plan = this.zoneOptions.filter(item => !(item.open_time || item.max_user))[0]
          console.log(this.planForm)
          // let selectedArray = this.planForm.plans.map(item => item.id);
          // console.log(selectedArray)
          this.planForm.plans.push({
            'id': plan.id,
            'zoneidx': plan.zoneidx,
            'zonename': plan.zonename,
            'open_type': plan.open_type,
            'max_user': plan.max_user,
            'open_time': plan.open_time,
            'by_zone': plan.sync,
            'planned': false,
            key: Date.now()
            // 'id': '',
            // 'zoneidx': '',
            // 'zonename':'',
            // 'open_type': '',
            // 'max_user': '',
            // 'open_time': '',
            // 'planned': false,
            // key: Date.now()
          });
        }
      },
      // 保存计划
      savePlan(formName, plan) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('保存计划后立刻生效, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 去除毫秒
              // plan.open_time /= 1000;
              if (plan.open_time || plan.max_user) {
                setOpenPlan(plan).then(res => {
                  let data = res.data;
                  // 填充表单
                  // plan.open_time = data.find(item => item.id === plan.id).open_time * 1000;
                  console.log(data)
                  this.alertMessage('设置开区计划成功', 'success');
                }).catch(error => {
                  this.alertMessage('设置开区计划失败', 'error');
                });
              } else {
                this.alertMessage('开区时间和人数上限不能都为空', 'error');
                return false
              }
            }).catch(() => {

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 移除计划
      removePlan(plan) {
        console.log(plan)
        this.$confirm('删除计划后无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOpenPlan(plan).then(res => {
            this.planForm.plans.pop(this.planForm.plans.find(item => item.id === plan.id));
            this.alertMessage('删除开区计划成功', 'success');
          }).catch(error => {
            this.alertMessage('删除开区计划失败', 'error');
          });
        }).catch(() => {

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
          plan.open_time = plan.open_time ? plan.open_time : 0;
          console.log(plan.open_time)
          // this.planForm.plans.find(item => item.id === plan.id).open_time = 0;
        } else if (plan.open_type === 2) {
          plan.max_user = plan.max_user ? plan.max_user : 0;
          // this.planForm.plans.find(item => item.id === plan.id).max_user = 0;
        }
        // if (value === 1) {
        //
        // }
      },
      // 查询未开区服务器
      onQuery(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            getServerManagementList(this.queryForm).then(res => {
              this.zoneOptions = res.data;
              console.log(this.zoneOptions)
              // this.zoneOptions = data.map(item => {
              //   return item;
              // });
              // // 已计划区
              // this.plannedZone = data.filter(item => item.open_type !== null);
              // // 未计划区
              // this.unplannedZone = data.filter(item => item.open_type === null);
              // 清空当前表单，并插入查询数据
              this.planForm.plans = [];
              // this.planForm.plans = this.zoneOptions.filter(item => item.open_time || item.max_user);
              // this.planForm.plans.map(item => item.planned = true);
              this.zoneOptions.map(item => {
                if (item.open_time || item.max_user) {
                  this.planForm.plans.push(
                    {
                      'id': item.id,
                      'zoneidx': item.zoneidx,
                      'zonename': item.zonename,
                      'open_type': item.open_type,
                      'open_time': item.open_time * 1000,
                      'max_user': item.max_user,
                      'by_zone': item.sync,
                      'planned': true
                    }
                  )
                }
              });
              console.log(this.planForm.plans)
            }).catch(error => {
              console.log(error)
            });
            // console.log(this.planForm.plans)
          } else {
            return false;
          }
        });
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
