export default {
  methods: {
    onSelectAll(selected) {
      if (selected) {
        const tabData = this.menusData
        const arr = []
        setVal(tabData, arr)
        this.rowSelection.selectedRowKeys = arr
      } else {
        this.rowSelection.selectedRowKeys = []
      }
      function setVal(list, arr) {
        list.forEach(v => {
          arr.push(v.pid)
          if (v.children) {
            setVal(v.children, arr)
          }
        })
      }
    },
    onSelect(record, selected) {
      const set = new Set(this.rowSelection.selectedRowKeys)
      const tabData = this.menusData
      const pid = record.pid
      if (selected) {
        set.add(pid)
        record.children && setChildCheck(record.children)
        setParentCheck(pid)
      } else {
        set.delete(pid)
        record.children && setChildUncheck(record.children)
        setParentUncheck(pid)
      }
      this.rowSelection.selectedRowKeys = Array.from(set)
      // 设置父级选择
      function setParentCheck(pid) {
        const parent = getParent(pid)
        if (parent) {
          set.add(parent.pid)
          setParentCheck(parent.pid)
        }
      }
      // 设置父级取消，如果父级的子集有选择，则不取消
      function setParentUncheck(pid) {
        let childHasCheck = false
        const parent = getParent(pid)
        if (parent) {
          const childlist = parent.children
          childlist.forEach(function(v) {
            if (set.has(v.pid)) childHasCheck = true
          })
          if (!childHasCheck) {
            set.delete(parent.pid)
            setParentUncheck(parent.pid)
          }
        }
      }
      // 获取当前对象的父级
      function getParent(pid) {
        for (let i = 0; i < tabData.length; i++) {
          if (tabData[i].pid === pid) {
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
                if (v.pid === pid) isExist = true
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
