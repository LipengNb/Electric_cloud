export default {
  data() {
    return {}
  },
  methods: {
    onSelectAll(selected) {
      if (selected) {
        const tabData = this.menusData
        const arr = []
        setVal(tabData, arr)
        console.log(arr)
        this.rowSelection.selectedRowKeys = arr
      } else {
        this.rowSelection.selectedRowKeys = []
      }
      function setVal(list, arr) {
        list.forEach(v => {
          arr.push(v.path)
          if (v.children) {
            setVal(v.children, arr)
          }
        })
      }
    },
    onSelect(record, selected) {
      const set = new Set(this.rowSelection.selectedRowKeys)
      const tabData = this.menusData
      const key = record.path
      if (selected) {
        set.add(key)
        record.children && setChildCheck(record.children)
        setParentCheck(key)
      } else {
        set.delete(key)
        record.children && setChildUncheck(record.children)
        setParentUncheck(key)
      }
      this.rowSelection.selectedRowKeys = Array.from(set)
      // 设置父级选择
      function setParentCheck(key) {
        const parent = getParent(key)
        if (parent) {
          set.add(parent.key)
          setParentCheck(parent.key)
        }
      }
      // 设置父级取消，如果父级的子集有选择，则不取消
      function setParentUncheck(key) {
        let childHasCheck = false
        const parent = getParent(key)
        if (parent) {
          const childlist = parent.children
          childlist.forEach(function(v) {
            if (set.has(v.key)) childHasCheck = true
          })
          if (!childHasCheck) {
            set.delete(parent.key)
            setParentUncheck(parent.key)
          }
        }
      }
      // 获取当前对象的父级
      function getParent(key) {
        for (let i = 0; i < tabData.length; i++) {
          if (tabData[i].path === key) {
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
                if (v.path === key) isExist = true
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
          set.add(v.key)
          v.children && setChildCheck(v.children)
        })
      }
      // 设置child取消
      function setChildUncheck(list) {
        list.forEach(function(v) {
          set.delete(v.key)
          v.children && setChildUncheck(v.children)
        })
      }
    }
  }
}
