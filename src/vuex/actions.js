export const setUser = ({commit}, userId, userName) => {
  commit('userStatus', userId, userName)
};

export const setToken = ({commit}, userToken) => {
  commit("userToken", userToken)
};
