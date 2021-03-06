import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
    // isApplicant: false,
    // isApprover: false,
    // isRoleManager: false,
    // isRecordChecker: false,
    isLogin: false,
    token: '',
  },
  getters,
  mutations,
  actions
});


export default store
