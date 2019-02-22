import axios from 'axios'


let base = 'http://127.0.0.1:8000';
// let base = 'http://data.7cool.xgd666.com:10050';

// 请求登录
export const login = params => {
  return axios.post(`${base}/login`, params)
};

// 获取平台选项
export const getPlatformOptions = () => {
  return axios.get(`${base}/app_platforms`)
};

// 获取区服选项
export const getZoneOptions = () => {
  return axios.get(`${base}/app_servers`)
};

// 获取福利申请列表
export const getWelfareList = () => {
  return axios.get(`${base}/welfares/`)
};

// 新增福利申请
export const addWelfare = params => {
  return axios.post(`${base}/welfares/`, params)
};

// 撤销福利申请
export const deleteWelfare = id => {
  return axios.delete(`${base}/welfares/${id}/`)
};

// 修改福利申请
export const modifyWelfare = params => {
  return axios.put(`${base}/welfares/${params.id}/`, params)
};

// 获取人员角色列表
export const getRolePlayerList = () => {
  return axios.get(`${base}/role_players/`)
};

// 新增人员角色
export const addRolePlayer = params => {
  return axios.post(`${base}/role_players/`, params)
};

// 编辑人员角色
export const editRolePlayer = params => {
  return axios.put(`${base}/role_players/${params.id}/`, params)
};

// 删除人员角色
export const deleteRolePlayer = id => {
  return axios.delete(`${base}/role_players/${id}/`)
};

// 获取服务器管理列表
export const getServerManagementList = () => {
  return axios.get(`${base}/server_managements/`)
};
