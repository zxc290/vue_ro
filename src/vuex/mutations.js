export const userStatus = (state, userId, userName) => {
  if (userId) {
    state.currentUserId = userId
    state.currentUser = userName;
    state.isLogin = true;
  } else if (user === null) {
    sessionStorage.setItem('userId', null);
    sessionStorage.setItem('userName', null);
    sessionStorage.setItem('userToken', '');
    state.currentUser = null;
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

