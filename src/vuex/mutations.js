export const userStatus = (state, userInfo) => {
  if (userInfo) {
    state.currentUserId = userInfo.user_id;
    state.currentUser = userInfo.username;
    // state.isApplicant = userInfo.is_applicant;
    // state.isApprover = userInfo.is_approver;
    // state.isRoleManager = userInfo.is_role_manager;
    // state.isRecordChecker = userInfo.is_record_checker;
    state.isLogin = true;
  } else if (userInfo === null) {
    sessionStorage.setItem('userId', null);
    sessionStorage.setItem('userName', null);
    // sessionStorage.setItem('isApplicant', false);
    // sessionStorage.setItem('isApprover', false);
    // sessionStorage.setItem('isRoleManager', false);
    // sessionStorage.setItem('isRecordChecker', false);
    sessionStorage.setItem('userToken', '');
    state.currentUser = null;
    // state.isApplicant = false;
    // state.isApprover = false;
    // state.isRoleManager = false;
    // state.isRecordChecker = false;
    state.isLogin = false;
    state.token = '';
  }
};

export const userToken = (state, userToken) => {
  if (userToken) {
    state.token = userToken;
  } else {
    state.token = null;
  }
};

