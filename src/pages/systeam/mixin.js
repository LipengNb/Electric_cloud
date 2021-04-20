export default {
  methods: {
    // 全选
    onSelectAll(selected) {
      const selection = this.rowSelection
      if (selected) {
        const menusData = this.menusData
        const arr = []
        setVal(menusData, arr)
        selection.selectedRowKeys = arr
      } else {
        selection.selectedRowKeys = []
      }
      function setVal(list, arr) {
        list.forEach(v => {
          arr.push(v._id)
          if (v.children) {
            setVal(v.children, arr)
          }
        })
      }
    },
    // 单选
    onSelect(record, selected) {
      const selection = this.rowSelection
      const set = new Set(selection.selectedRowKeys)
      const tabData = this.menusData
      const _id = record._id
      const _this = this
      if (selected) {
        set.add(_id)
        this.$set(record, 'selected', record.btn_perms)
        record.children && setChildCheck(record.children)
        setParentCheck(_id)
      } else {
        set.delete(_id)
        this.$set(record, 'selected', [])
        record.children && setChildUncheck(record.children)
        setParentUncheck(_id)
      }
      selection.selectedRowKeys = Array.from(set)
      // 设置父级选择
      function setParentCheck(_id) {
        const parent = getParent(_id)
        if (parent) {
          set.add(parent._id)
          setParentCheck(parent._id)
        }
      }
      // 设置父级取消，如果父级的子集有选择，则不取消
      function setParentUncheck(_id) {
        let childHasCheck = false
        const parent = getParent(_id)
        if (parent) {
          const childlist = parent.children
          childlist.forEach(function(v) {
            if (set.has(v._id)) childHasCheck = true
          })
          if (!childHasCheck) {
            set.delete(parent._id)
            setParentUncheck(parent._id)
          }
        }
      }
      // 获取当前对象的父级
      function getParent(_id) {
        for (let i = 0; i < tabData.length; i++) {
          if (tabData[i]._id === _id) {
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
                if (v._id === _id) isExist = true
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
        list.forEach((v) => {
          set.add(v._id)
          _this.$set(v, 'selected', v.btn_perms)
          v.children && setChildCheck(v.children)
        })
      }
      // 设置child取消
      function setChildUncheck(list) {
        list.forEach((v) => {
          set.delete(v._id)
          _this.$set(v, 'selected', [])
          v.children && setChildUncheck(v.children)
        })
      }
    }
  }
}
