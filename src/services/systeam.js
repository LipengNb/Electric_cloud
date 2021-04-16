import { SYSTEAM } from '@/services/api'
import { request, METHOD } from '@/utils/request'

export const menus = () => {
  return request(`${SYSTEAM}/menus`, METHOD.GET)
}

export const accounts = () => {
  return request(`${SYSTEAM}/account`, METHOD.GET)
}
