import { BASE, ROUTES } from './api'
import { request, METHOD } from '@/utils/request'

export const routes = () => {
  return request(`${BASE}/routes`, METHOD.GET)
}

export const insertRoutes = (params) => {
  return request(`${ROUTES}/insert`, METHOD.POST, params)
}

export const accounts = (params) => {
  return request(`${BASE}/routes/insert`, METHOD.POST, params)
}
export const menus = (params) => {
  return request(`${BASE}/routes/insert`, METHOD.POST, params)
}
