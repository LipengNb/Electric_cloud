import { BASE } from '@/services/api'
import { request, METHOD } from '@/utils/request'

export const routes = () => {
  return request(`${BASE}/routes`, METHOD.GET)
}

// export const accounts = () => {
//   return request(`${SYSTEAM}/account`, METHOD.GET)
// }
