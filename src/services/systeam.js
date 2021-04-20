import { SYSTEAM } from './api'
import { request, METHOD } from '@/utils/request'

// 菜单管理
export const Menus = () => {
  return request(`${SYSTEAM}/menus/find`, METHOD.GET)
}
export const operationMenus = (type, params) => {
  return request(`${SYSTEAM}/menus/${type}`, METHOD.POST, params)
}
export const deleteMenus = (params) => {
  return request(`${SYSTEAM}/menus/delete`, METHOD.POST, params)
}
// 角色管理
export const createRoles = (params) => {
  return request(`${SYSTEAM}/roles/create`, METHOD.POST, params)
}
export const getRoles = () => {
  return request(`${SYSTEAM}/roles/find`, METHOD.GET)
}
