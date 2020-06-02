<template>
  <div class="app-container">
    <div class="filter-container">
         <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getList"
          :default-time="['00:00:00', '23:59:59']"
        />
        <panel-group
          :order="order"
          :wechat="wechat"
          :alipay="alipay"
          :orderFee="orderFee"
          :wechatFee="wechatFee"
          :alipayFee="alipayFee"
        />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SelfAmount, SelfFee } from '@/api/pay-order'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import PanelGroup from './components/PanelGroup'
export default {
  name: 'ORderList',
  components: {
    PanelGroup
  },
  directives: { waves },
  props: {},
  data() {
    return {
      order: 0,
      wechat: 0,
      alipay: 0,
      orderFee: 0,
      wechatFee: 0,
      alipayFee: 0,
      date: [
        new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000),
        new Date(new Date(new Date().toLocaleDateString()).getTime() - 1000)
      ],
      listQuery: {
        where: ''
      }
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
    getList() {
      const start = parseTime(this.date[0])
      const end = parseTime(new Date(this.date[1].getTime() + 1000))
      SelfAmount({
        where: "created_at >= '" + start + "' And created_at < '" + end + "'"
      }).then(response => {
        this.order = Number(response.data.total) || 0
      })
      SelfAmount({
        where: "method = 'wechat' And created_at >= '" + start + "' And created_at < '" + end + "'"
      }).then(response => {
        this.wechat = Number(response.data.total) || 0
      })
      SelfAmount({
        where: "method = 'alipay' And created_at >= '" + start + "' And created_at < '" + end + "'"
      }).then(response => {
        this.alipay = Number(response.data.total) || 0
      })
      // 手续费
      SelfFee({
        where: "created_at >= '" + start + "' And created_at < '" + end + "'"
      }).then(response => {
        this.orderFee = Number(response.data.total) || 0
      })
      SelfFee({
        where: "method = 'wechat' And created_at >= '" + start + "' And created_at < '" + end + "'"
      }).then(response => {
        this.wechatFee = Number(response.data.total) || 0
      })
      SelfFee({
        where: "method = 'alipay' And created_at >= '" + start + "' And created_at < '" + end + "'"
      }).then(response => {
        this.alipayFee = Number(response.data.total) || 0
      })
    },
    handleUpdate() {
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  background-color:#f0f2f5
}
</style>
