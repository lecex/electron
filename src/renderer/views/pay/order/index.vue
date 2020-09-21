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
              :default-time="['00:00:00', '23:59:59']"
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
    <div class="order-container">
      <span>总金额: {{(orderTotal/100).toFixed(2)}} 元</span>
      <span>手续费: {{(orderFee/100).toFixed(2)}} 元</span>
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
            <span v-if="scope.row.method=='wechat'"><el-tag size="mini" :class="scope.row.method"><svg-icon :icon-class="scope.row.method" :class="scope.row.method"/> 微信</el-tag></span>
            <span v-if="scope.row.method=='alipay'"><el-tag size="mini" :class="scope.row.method"><svg-icon :icon-class="scope.row.method" :class="scope.row.method"/> 支付宝</el-tag></span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="订单名称" prop="title" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" prop="total_amount" sortable="custom" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ (scope.row.totalAmount/100).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手续费" prop="fee" sortable="custom" align="center" min-width="120">
        <template slot-scope="{row}">
          <span>{{ (row.fee?row.fee/100:0).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="stauts" sortable="custom" align="center" width="120">
        <template slot-scope="{row}">
          <span v-if="row.totalAmount>0">
            <el-tag v-if="Number(row.stauts)===-1" size="mini" type="danger"><svg-icon icon-class="error" class="danger"/> 订单关闭</el-tag>
            <el-tag v-if="Number(row.stauts)===0||!row.stauts" size="mini" type="warning"><svg-icon icon-class="warning" class="warning"/> 待付款</el-tag>
            <el-tag v-if="Number(row.stauts)===1" size="mini" type="success"><svg-icon icon-class="success" class="success"/> 支付成功</el-tag>
          </span>
          <span v-else>
            <el-tag v-if="Number(row.stauts)===-1" size="mini" type="danger"><svg-icon icon-class="error" class="danger"/> 退款关闭</el-tag>
            <el-tag v-if="Number(row.stauts?row.stauts:0)===0" size="mini" type="warning"><svg-icon icon-class="warning" class="warning"/> 待退款</el-tag>
            <el-tag v-if="Number(row.stauts)===1" size="mini" type="info"><svg-icon icon-class="error" class="info"/> 退款成功</el-tag>
          </span>
          <span v-if="row.refundFee">
            <el-tag v-if="Number(row.stauts)===1" size="mini" type="info"><svg-icon icon-class="error" class="info"/> 已退款 {{ (row.refundFee?row.refundFee/100:0).toFixed(2) }}</el-tag>
          </span>
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
      <el-table-column label="创建时间" prop="created_at" sortable="custom" align="center" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="260" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.totalAmount>0" size="mini" type="primary" @click="handerQuery(row)">
            查询
          </el-button>
          <el-button v-if="row.totalAmount>0 && Number(row.stauts)===1 &&  !row.refundFee" size="mini" type="danger" @click="handerCancel(row)">
            撤销
          </el-button>
          <el-button v-if="row.totalAmount>0 && Number(row.stauts)===1 && !row.refundFee" size="mini" type="warning" @click="handerRefund(row)">
            退款
          </el-button>
          <el-button v-if="row.totalAmount<0 && Number(row.stauts)!==1" size="mini" type="danger" @click="handerAffirmRefund(row)">
            确认退款
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
import { SelfList, SelfAmount, SelfFee } from '@/api/pay-order'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { Query, Cancel, OpenRefund, AffirmRefund } from '@/api/pay'
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
      orderTotal: 0,
      orderFee: 0,
      listQuery: {
        page: 1,
        limit: 10,
        where: '',
        sort: 'created_at desc'
      },
      query: {
        date: [
          new Date(new Date(new Date().toLocaleDateString()).getTime()),
          new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1000)
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
          value: '',
          label: '请选择'
        },
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
        const start = parseTime(this.query.date[0])
        const end = parseTime(new Date(this.query.date[1].getTime() + 1000))
        where = where + " And created_at >= '" + start + "' And created_at < '" + end + "'"
      }
      if (this.query.method) {
        where = where + " And method = '" + this.query.method + "'"
      }
      if (this.query.total_amount) {
        where = where + ' And total_amount =' + Number(this.query.total_amount * 100)
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
      SelfAmount({
        where: where
      }).then(response => {
        this.orderTotal = Number(response.data.total) || 0
      })
      SelfFee({
        where: where
      }).then(response => {
        this.orderFee = Number(response.data.total) || 0
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handerQuery(order) {
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
              title: '未支付状态',
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
    },
    handerCancel(order) {
      this.$confirm('此操作将关闭订单,如付款成功原路退回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        Cancel({
          orderNo: order.orderNo,
          storeId: order.storeId
        }).then(response => { // 远程支付开始
          const valid = response.data.valid
          if (valid) {
            this.$message({
              type: 'success',
              title: '撤销支付成功',
              message: '撤销支付成功'
            })
            this.getList()
          } else {
            this.$notify({
              type: 'error',
              title: '撤销支付失败',
              message: response.data.error.detail
            })
          }
          console.log(response.data.error)
        }).catch(error => {
          const detail = error.response.data.detail
          this.$notify({
            type: 'error',
            title: '撤销订单失败',
            message: detail
          })
        })
      }).catch(() => {
        self.$message({
          type: 'info',
          message: '已取消撤销订单'
        })
      })
    },
    handerRefund(order) {
      OpenRefund({
        originalOrderNo: order.orderNo,
        storeId: order.storeId
      }).then(response => { // 远程支付开始
        const valid = response.data.valid
        if (valid) {
          this.$message({
            type: 'success',
            title: '退款申请成功,等待确认。',
            message: '退款申请成功,等待确认。'
          })
          this.getList()
        } else {
          this.$notify({
            type: 'error',
            title: '退款申请成功失败。',
            message: response.data.error.detail
          })
        }
      }).catch(error => {
        const detail = error.response.data.detail
        this.$notify({
          type: 'error',
          title: '退款订单失败',
          message: detail
        })
      })
    },
    handerAffirmRefund(order) {
      this.$confirm('此操作将关闭订单,如付款成功原路退回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        AffirmRefund({
          orderNo: order.orderNo,
          storeId: order.storeId
        }).then(response => { // 远程支付开始
          const valid = response.data.valid
          if (valid) {
            this.$message({
              type: 'success',
              title: '确认退款申请成功。',
              message: '确认退款申请成功。'
            })
            this.getList()
          } else {
            this.$notify({
              type: 'error',
              title: '确认退款申请失败。',
              message: response.data.error.detail
            })
          }
        }).catch(error => {
          const detail = error.response.data.detail
          this.$notify({
            type: 'error',
            title: '确认退款申请失败',
            message: detail
          })
        })
      }).catch(() => {
        self.$message({
          type: 'info',
          message: '已取消退款申请'
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
.order-container{
  color: #F56C6C;
  padding: 1vh;
  font-weight:700;
  span{
    margin-left: 2vw;
  }
}
</style>
