<template>
  <div class="room-config">
    <vTable :table-option="roomTable" />
  </div>
</template>
<script>
import vTable from '@/components/vTable'
export default {
  components: {
    vTable
  },
  data() {
    return {
      roomTable: {
        columns: [
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
        ]
      }
    }
  }
}
</script>

