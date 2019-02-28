<template>
  <!--<div>-->
    <!--<el-form :inline="true" :model="selectForm">-->
      <!--<el-form-item label="渠道">-->
        <!--<el-select v-model="openForm.cid" clearable placeholder="请选择游戏渠道">-->
          <!--<el-option v-for="(item, index) in channelOptions" :key="index" :label="item.cname" :value="item.cid"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="包">-->
        <!--<el-select v-model="openForm.appid" clearable placeholder="请选择游戏包">-->
          <!--<el-option v-for="(item, index) in packageOptions" :key="index" :label="item.appid" :value="item.appid"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
    <!--</el-form>-->

    <!--<el-form ref="openForm" :model="openForm">-->

      <!--&lt;!&ndash;<el-form-item label="渠道">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-select v-model="openForm.cid" clearable placeholder="请选择游戏渠道">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option v-for="(item, index) in channelOptions" :key="index" :label="item.cname" :value="item.cid"></el-option>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-form-item label="包">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-select v-model="openForm.appid" clearable placeholder="请选择游戏包">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option v-for="(item, index) in packageOptions" :key="index" :label="item.appid" :value="item.appid"></el-option>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--<el-form-item-->
        <!--v-for="(plan, index) in openForm.plans"-->
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
        <!--v-for="(plan, index) in openForm.plans"-->
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
        <!--&lt;!&ndash;<el-button type="primary" @click="submitForm('openForm')">保存</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button @click="addPlan">新增计划</el-button>&ndash;&gt;-->
        <!--<el-button @click.prevent="removePlan(plan)">删除</el-button>-->
        <!--&lt;!&ndash;<el-button @click="resetForm('dynamicValidateForm')">重置</el-button>&ndash;&gt;-->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<el-button type="primary" @click="submitForm('openForm')">保存</el-button>-->
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

    <el-form :model="openForm" :inline="true">
      <div v-for="(plan, index) in openForm.plans" :key="plan.key">
        <el-form-item label="id" v-if="false">
          <el-input readonly v-model="plan.id"></el-input>
        </el-form-item>
        <el-form-item label="zoneidx" v-if="false">
          <el-input readonly v-model="plan.zoneidx"></el-input>
        </el-form-item>
        <el-form-item label="区服名">
          <el-input readonly v-model="plan.zonename"></el-input>
          <!--<el-select v-model="plan.zoneidx" clearable placeholder="请选择区服">-->
            <!--<el-option v-for="(item, index) in zoneOptions" :key="index" :label="item.zonename" :value="item.zoneidx"></el-option>-->
          <!--</el-select>-->
        </el-form-item>
        <el-form-item label="开区类型">
          <el-select v-model="plan.open_type" clearable placeholder="请选择开区类型" @change="handleChangeOpenType(plan)">
            <el-option v-for="(item, index) in openTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开区人数" v-show="plan.open_type === 1">
          <el-input v-model.number="plan.open_user" placeholder="请输入开区人数"></el-input>
        </el-form-item>
        <el-form-item label="开区时间" v-show="plan.open_type === 2">
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
          <el-button type="danger" @click.prevent="removePlan(plan)">删除</el-button>
        </el-form-item>
      </div>
      <!--<el-form-item label="同步到区">-->
      <!--<el-switch v-model="openForm.by_zone"></el-switch>-->
      <!--</el-form-item>-->
    <el-form-item>
      <el-button @click="addPlan">新增计划</el-button>
      <!--<el-button type="primary" @click="submitForm('openForm')">保存</el-button>-->
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import { getServerManagementList, getChannelList, getAppPackageList, updateAppServerChannel, setOpen } from '../../api/api';
  export default {
      name: "OpenZone",
      data() {
        return {
          // 渠道选项
          channelOptions: [],
          // 包选项
          packageOptions: [],
          unsettingzone: [],
          // 区服选项
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
          openForm: {
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
          this.openForm.plans.push({
            open_type: '',
            open_user: '',
            open_time: '',
            key: Date.now()
          });
        },
        // 移除计划
        removePlan(plan) {
          let index = this.openForm.plans.indexOf(plan);
          if (index !== -1) {
            this.openForm.plans.splice(index, 1)
          }
        },
        // 改变开区类型
        handleChangeOpenType(plan) {
          console.log(plan)
          // if (value === 1) {
          //
          // }
        },
        onQuery() {
          getServerManagementList(this.queryForm).then(res => {
            let data = res.data;
            this.zoneOptions = data;
            // 清空当前表单，并插入查询数据
            this.openForm.plans = [];
            data.map(item => {
              if (item.open_type === 1) {
                // Object.assign(item, {'open_user': item.open_type_value, 'open_time': ''});
                this.openForm.plans.push({'id': item.id, 'zoneidx': item.zoneidx, 'zonename':item.zonename, 'open_type': item.open_type, 'open_user': item.open_type_value, 'open_time': ''});
              } else if (item.open_type === 2) {
                // Object.assign(item, {'open_user': '', 'open_time': item.open_type_value});
                this.openForm.plans.push({'id': item.id, 'zoneidx': item.zoneidx, 'zonename':item.zonename, 'open_type': item.open_type, 'open_user': '', 'open_time': item.open_type_value});
              }
              // this.openForm.plans.push(result)
            });
            console.log(this.openForm.plans)
          }).catch(error => {
            console.log(error)
          });
          // console.log(this.openForm.plans)
        },
        submitForm() {
          this.openForm.appid = this.queryForm.appid;
          this.openForm.cid = this.queryForm.cid;
          this.openForm.plans.map(item => item.open_time /= 1000);
          console.log(this.openForm)
        }
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
