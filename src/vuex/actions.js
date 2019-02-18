export const setUser = ({commit}, userInfo) => {
  commit('userStatus', userInfo)
};

export const setToken = ({commit}, userToken) => {
  commit("userToken", userToken)
};
