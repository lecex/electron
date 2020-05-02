<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="query" :inline="true" ref="query" label-width="100px">
          <el-form-item label="时间" prop="date">
            <el-date-picker
              v-model="query.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="支付方式" prop="method">
            <el-select v-model="query.method" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单编号" prop="order_no">
            <el-input v-model="query.order_no"></el-input>
          </el-form-item>
          <el-form-item label="金额" prop="total_amount">
            <el-input v-model="query.total_amount"></el-input>
          </el-form-item>
          <el-form-item label="操作员" prop="operator_id">
            <el-input v-model="query.operator_id"></el-input>
          </el-form-item>
          <el-form-item label="终端" prop="terminal_id">
            <el-input v-model="query.terminal_id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList()">查询</el-button>
            <el-button @click="resetForm('query')">重置</el-button>
          </el-form-item>
      </el-form>
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
      <el-table-column label="订单编号" prop="id" sortable="custom" align="center" width="220">
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
      <el-table-column label="订单金额" prop="title" sortable="custom" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ (scope.row.totalAmount/100).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手续费" prop="title" sortable="custom" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ (scope.row.fee?scope.row.fee/100:0).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="stauts" sortable="custom" align="center" width="120">
        <template slot-scope="scope">
          <el-tag v-if="Number(scope.row.stauts)===-1" type="warning"><svg-icon icon-class="warning" class="warning"/> 订单关闭</el-tag>
          <el-tag v-if="Number(scope.row.stauts)===0||!scope.row.stauts" type="warning"><svg-icon icon-class="warning" class="warning"/> 待付款</el-tag>
          <el-tag v-if="Number(scope.row.stauts)===1" type="success"><svg-icon icon-class="success" class="success"/> 支付成功</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作员" prop="operator_id" sortable="custom" align="center" min-width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.operatorId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="终端" prop="terminal_id" sortable="custom" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.terminalId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" sortable="custom" align="center" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="handerPayQuery(row)">
            支付查询
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import { SelfList } from '@/api/pay-order'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { Query } from '@/api/pay'
import utilsPay from '@/utils/pay'
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
      query: {
        date: [
          new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000),
          new Date(new Date(new Date().toLocaleDateString()).getTime())
        ],
        query: '',
        total_amount: '',
        order_no: '',
        operator_id: '',
        terminal_id: ''
      },
      listLoading: true,
      dialogFormVisible: false, // 窗口关闭
      dialogDisabled: false, // 窗口按钮引用
      options: [
        {
          value: 'wechat',
          label: '微信'
        }, {
          value: 'alipay',
          label: '支付宝'
        }
      ]
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
      let where = ' true'
      if (this.query.date) {
        where = where + " And created_at >= '" + parseTime(this.query.date[0]) + "' And created_at < '" + parseTime(this.query.date[1]) + "'"
      }
      if (this.query.method) {
        where = where + " And method = '" + this.query.method + "'"
      }
      if (this.query.total_amount) {
        where = where + ' And total_amount =' + this.query.total_amount * 100
      }
      if (this.query.order_no) {
        where = where + " And order_no like '%" + this.query.order_no + "%'"
      }
      if (this.query.operator_id) {
        where = where + " And operator_id = '" + this.query.operator_id + "'"
      }
      if (this.query.terminal_id) {
        where = where + " And terminal_id = '" + this.query.terminal_id + "'"
      }
      this.listQuery.where = where
      this.listLoading = true
      SelfList(this.listQuery).then(response => {
        this.list = response.data.orders
        this.total = Number(response.data.total)
        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handerPayQuery(order) {
      Query({
        orderNo: order.orderNo,
        storeId: order.storeId
      }).then(response => { // 远程支付开始
        utilsPay.hander(response.data, order.method)
        if (utilsPay.valid) {
          this.$message({
            type: 'success',
            title: '支付成功',
            message: '付款成功'
          })
          this.getList()
        } else {
          if (utilsPay.error.code === 'USERPAYING') {
            this.$notify({
              type: 'warning',
              title: '等待用户付款中',
              message: utilsPay.error.detail
            })
          } else {
            this.$notify({
              type: 'error',
              title: '未支付',
              message: utilsPay.error.detail
            })
          }
        }
      }).catch(error => {
        const detail = error.response.data.detail
        this.$notify({
          type: 'error',
          title: '支付失败',
          message: detail
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
