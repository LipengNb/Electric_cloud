import { SYSTEAM } from './api'
import { request, METHOD } from '@/utils/request'

export const routes = () => {
  return request(`${SYSTEAM}/menus/find`, METHOD.GET)
}

export const operationRoutes = (type, params) => {
  return request(`${SYSTEAM}/menus/${type}`, METHOD.POST, params)
}

export const deleteRoutes = (params) => {
  return request(`${SYSTEAM}/menus/delete`, METHOD.POST, params)
}

// export const updateRoutes = (params) => {
//   return request(`${ROUTES}/update`, METHOD.POST, params)
// }
