const INTERFACE_ADDRESS = 'http://localhost:7071';
const SYSTEM_GATEWAY = '';
const INTERFACE_VERSION = '/api/v1';
export const SystemConstant = Object.freeze({
  LOCAL_STORAGE_PREFIX: 'xdht-disease-',
  SESSION_STORAGE_PREFIX: 'xdht-disease-',
  // 系统配置
  GET_TOKEN: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/login/createToken',
  EDIT_PASSWORD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/editPassword',
  // 用户配置
  USER_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUser/userPage',
  USER_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUser/add',
  USER_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUser/update',
  USER_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/sysUser/delete',
  USER_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/user/userDetail',
  // 角色配置
  ROLE_LIST: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/role/findRoleList',
  ROLE_ADD: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/role/addRole',
  ROLE_EDIT: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/role/editRole',
  ROLE_DEL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/role/deleteRole',
  ROLE_DETAIL: INTERFACE_ADDRESS + SYSTEM_GATEWAY + INTERFACE_VERSION + '/role/roleDetail'
});
