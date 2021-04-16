<template>
  <div>
    <advance-table
      :columns="table.columns"
      :data-source="table.data"
      title="角色列表"
      :loading="table.loading"
      header-operation="operation"
      row-key="id"
      :pagination="{
        current: table.page,
        pageSize: table.pageSize,
        total: table.total,
        showSizeChanger: true,
        showLessItems: true,
        showQuickJumper: true,
        showTotal: (total, range) => `总计 ${table.total} 条`,
        onChange: onPageChange,
        onShowSizeChange: onSizeChange,
      }"
      @refresh="getAccounts"
    >
      <template slot="operation">
        <a-button v-auth="`add`" icon="plus" @click="handleCreate">创建</a-button>
      </template>
      <template slot="gender" slot-scope="{ record }">
        {{ record.gender === 'woman' ? '女' : '男' }}
      </template>
      <span slot="enable" slot-scope="{ record }">
        <a-switch checked-children="显" un-checked-children="隐" :checked="!record.enable" />
      </span>
      <span slot="time">
        2021-04-14
      </span>
      <span slot="action" slot-scope="{record}">
        <a-button v-auth="`edit`" type="link" @click="handleEdit(record)">
          编辑
        </a-button>
      </span>
    </advance-table>
    <!-- 创建/编辑 -->
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form-model ref="form" :model="form" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-model-item label="账号" prop="account">
          <a-input v-model="form.account" placeholder="输入账号" />
        </a-form-model-item>
        <a-form-model-item label="角色名称" prop="role_name">
          <a-select v-model="form.role_name" placeholder="选择角色">
            <a-select-option v-for="item in roles" :key="item" :value="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="昵称" prop="nickname">
          <a-input v-model="form.nickname" placeholder="输入昵称" />
        </a-form-model-item>
        <a-form-model-item label="性别" prop="gender">
          <a-radio-group v-model="form.gender">
            <a-radio value="man">男</a-radio>
            <a-radio value="woman">女</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="电话" prop="phone">
          <a-input v-model="form.phone" placeholder="输入电话号码" />
        </a-form-model-item>
        <a-form-model-item label="邮箱" prop="email">
          <a-input v-model="form.email" placeholder="输入电话号码" />
        </a-form-model-item>
        <a-form-model-item label="禁启用" prop="enable">
          <a-switch v-model="form.enable" checked-children="启用" un-checked-children="禁用" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { accounts } from '@/services/systeam'
import AdvanceTable from '@/components/table/advance/AdvanceTable'
export default {
  components: {
    AdvanceTable
  },
  data() {
    const table = {
      columns: [
        {
          title: '账号',
          dataIndex: 'account'
        },
        {
          title: '角色名称',
          dataIndex: 'role_name'
        },
        {
          title: '昵称',
          dataIndex: 'nickname'
        },
        {
          title: '性别',
          scopedSlots: { customRender: 'gender' }
        },
        {
          title: '电话',
          dataIndex: 'phone'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
        },
        {
          title: '创建日期',
          dataIndex: 'create_time'
        },
        {
          title: '禁启用',
          scopedSlots: { customRender: 'enable' }
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: [],
      loading: false,
      page: 1,
      pageSize: 10,
      total: 10
    }
    return {
      table: table,
      title: '',
      visible: false,
      confirmLoading: false,
      form: {
        account: '',
        role_name: undefined,
        nickname: '',
        gender: 'woman',
        phone: '',
        email: '',
        create_time: '',
        enable: true
      },
      rules: {},
      roles: ['admin', 'service', 'user']

    }
  },
  mounted() {
    this.getAccounts()
  },
  methods: {
    async getAccounts() {
      const table = this.table
      table.loading = true
      const res = await accounts()
      table.loading = false
      console.log(res)
      const { code, data, message } = res.data
      if (code !== 0) {
        this.$message.error(message)
        return
      }
      table.data = data.list
    },
    handleSubmit() {
      this.$refs.menuForm.validate(valid => {
        if (!valid) return
        this.confirmLoading = true
        setTimeout(() => {
          this.confirmLoading = false
          this.visible = false
          this.$message.success('提交成功')
        }, 2000)
        // console.log(this.form)
      })
    },
    handleCancel() {
      this.visible = false
    },
    handleEdit(data) {
      this.visible = true
      this.title = '账号编辑'
      this.$nextTick(() => {
        this.form = { ...data }
      })
    },
    handleCreate() {
      this.reset()
      this.visible = true
      this.title = '创建账号'
    },
    // table组件事件
    onRefresh() {},
    onPageChange() {},
    onSizeChange() {},
    reset() {
      this.$refs.form && this.$refs.form.resetFields()
    }
  }
}
</script>

