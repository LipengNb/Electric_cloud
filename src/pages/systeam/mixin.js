export default {
  methods: {
    onSelectAll(selected) {
      const selection = this.rowSelection
      if (selected) {
        const menusData = this.menusData
        const arr = []
        setVal(menusData, arr)
        console.log(arr)
        selection.selectedRowKeys = arr
      } else {
        selection.selectedRowKeys = []
      }
      function setVal(list, arr) {
        list.forEach(v => {
          arr.push(v.id)
          if (v.children) {
            setVal(v.children, arr)
          }
        })
      }
    },
    onSelect(record, selected) {
      const selection = this.rowSelection
      const set = new Set(selection.selectedRowKeys)
      const tabData = this.menusData
      const id = record.id
      if (selected) {
        set.add(id)
        record.children && setChildCheck(record.children)
        setParentCheck(id)
      } else {
        set.delete(id)
        record.children && setChildUncheck(record.children)
        setParentUncheck(id)
      }
      selection.selectedRowKeys = Array.from(set)
      // 设置父级选择
      function setParentCheck(id) {
        const parent = getParent(id)
        if (parent) {
          set.add(parent.id)
          setParentCheck(parent.id)
        }
      }
      // 设置父级取消，如果父级的子集有选择，则不取消
      function setParentUncheck(id) {
        let childHasCheck = false
        const parent = getParent(id)
        if (parent) {
          const childlist = parent.children
          childlist.forEach(function(v) {
            if (set.has(v.id)) childHasCheck = true
          })
          if (!childHasCheck) {
            set.delete(parent.id)
            setParentUncheck(parent.id)
          }
        }
      }
      // 获取当前对象的父级
      function getParent(id) {
        for (let i = 0; i < tabData.length; i++) {
          if (tabData[i].id === id) {
            return null
          }
        }
        return _getParent(tabData)
        function _getParent(list) {
          let childlist
          let isExist = false
          for (let i = 0; i < list.length; i++) {
            if ((childlist = list[i].children)) {
              childlist.forEach(function(v) {
                if (v.id === id) isExist = true
              })
              if (isExist) {
                return list[i]
              }
              if (_getParent(childlist)) {
                return _getParent(childlist)
              }
            }
          }
        }
      }
      // 设置child全选
      function setChildCheck(list) {
        list.forEach(function(v) {
          set.add(v.pid)
          v.children && setChildCheck(v.children)
        })
      }
      // 设置child取消
      function setChildUncheck(list) {
        list.forEach(function(v) {
          set.delete(v.pid)
          v.children && setChildUncheck(v.children)
        })
      }
    }
  }
}
