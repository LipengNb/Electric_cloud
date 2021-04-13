import Mock from 'mockjs'

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/routes`, 'get', () => {
  const result = {}
  result.code = 0
  result.data = [{
    router: 'root',
    children: [
      {
        router: 'dashboard',
        name: '首页',
        icon: 'dashboard',
        authority: 'queryForm'
      },
      {
        router: 'room',
        children: ['config']
      },
      {
        router: 'systeam',
        children: [{
          router: 'role',
          authority: {
            permission: 'queryForm'
          }
        }, 'account']
      },
      {
        router: 'form',
        children: ['advanceForm']
      },
      {
        router: 'list',
        children: ['queryList', 'primaryList', 'cardList']
      }
    ]
  }]
  return result
})
