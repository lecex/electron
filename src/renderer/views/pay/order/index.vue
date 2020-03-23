<template>
  <div class="app-container">
    <div class="filter-container">
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <!-- <el-table-column label="ID" prop="id" align="center" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="订单编号" prop="id" align="center" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" prop="method" align="center" width="120">
        <template slot-scope="scope">
          <span slot="label">
            <span v-if="scope.row.method=='wechat'"><el-tag :class="scope.row.method"><svg-icon :icon-class="scope.row.method" :class="scope.row.method"/> 微信</el-tag></span>
            <span v-if="scope.row.method=='alipay'"><el-tag :class="scope.row.method"><svg-icon :icon-class="scope.row.method" :class="scope.row.method"/> 支付宝</el-tag></span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="订单名称" prop="title" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" prop="title" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ (scope.row.totalAmount/100).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="stauts" align="center" width="120">
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.stauts" type="warning"><svg-icon icon-class="warning" class="warning"/> 代付款</el-tag>
          <el-tag v-if="scope.row.stauts" type="success"><svg-icon icon-class="success" class="success"/> 支付成功</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作员" prop="operatorId" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.operatorId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="终端" prop="terminalId" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.terminalId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" sortable="custom" align="center" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt  }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SelfList } from '@/api/pay-order'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'ORderList',
  components: {
    Pagination
  },
  directives: { waves },
  props: {},
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        where: '',
        sort: 'created_at desc'
      },
      listLoading: true,
      dialogFormVisible: false, // 窗口关闭
      dialogDisabled: false // 窗口按钮引用
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'roles'
    ])
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    sortChange(data) {
      if (data.prop) {
        this.listQuery.sort = (data.prop + ' ' + data.order).replace('ending', '')
        this.getList()
      }
    },
    getList() {
      if (this.roles.indexOf('root') === -1) {
        this.listQuery.where = "store_id='" + this.userId + "'"
      }
      this.listLoading = true
      SelfList(this.listQuery).then(response => {
        this.list = response.data.orders
        this.total = Number(response.data.total)
        console.log(this.list, this.total)
        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    handleUpdate() {

    }
  }
}
</script>

<style lang="scss" scoped>
.el-form{
  width: 460px;
}
.wechat{
  color: #67C23A;
}
.alipay{
  color: #409EFF;
}
.error{
  color: #F56C6C;
}
.success{
  color: #67C23A;
}
.warning{
  color: #E6A23C;
}
</style>
