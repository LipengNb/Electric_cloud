<template>
  <div class="room-config">
    <advance-table
      :columns="roomColumns"
      :data-source="roomData"
      title="宿舍电器"
      :loading="loading"
      row-key="id"
      :pagination="{
        current: page,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        showLessItems: true,
        showQuickJumper: true,
        showTotal: (total, range) => `总计 ${total} 条`,
        onChange: onPageChange,
        onShowSizeChange: onSizeChange,
      }"
      @search="onSearch"
      @refresh="onRefresh"
      @reset="onReset"
    />
  </div>
</template>
<script>
import AdvanceTable from '@/components/table/advance/AdvanceTable'
export default {
  i18n: require('./i18n'),
  components: {
    AdvanceTable
  },
  data() {
    return {
      page: 1,
      pageSize: 20,
      total: 200,
      roomColumns: [
        {
          id: 1,
          title: '宿舍名称',
          dataIndex: 'room_name'
        },
        {
          id: 2,
          title: '电器名称',
          dataIndex: 'ele_name'
        },
        {
          id: 3,
          title: '是否违规',
          dataIndex: 'is'
        },
        {
          id: 4,
          title: '启动时间',
          dataIndex: 'start_time'
        }
      ],
      roomData: [],
      loading: false
    }
  },
  mounted() {
    this.loading = true
    setTimeout(() => {
      this.roomData = [
        {
          id: 1,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 2,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 3,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 4,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 5,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 6,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 7,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 8,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 9,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 10,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 11,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 12,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 13,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        },
        {
          id: 14,
          room_name: '浙江工业大学 / 屏峰校区 / 家和东苑15号楼 / 612',
          ele_name: '定频空调',
          is: '违规',
          start_time: '2021-03-19 12:39:57'
        }
      ]
      this.loading = false
    }, 1000)
  },
  methods: {
    onSearch() {},
    onRefresh() {},
    onReset() {},
    onPageChange() {},
    onSizeChange() {}
  }
}
</script>

