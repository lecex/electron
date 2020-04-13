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
        />
        <panel-group
          :order="order"
          :wechat="wechat"
          :alipay="alipay"
        />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SelfAmount } from '@/api/pay-order'
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
      date: [
        new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000),
        new Date(new Date(new Date().toLocaleDateString()).getTime())
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
      SelfAmount({
        where: "created_at >= '" + parseTime(this.date[0]) + "' And created_at < '" + parseTime(this.date[1]) + "'"
      }).then(response => {
        this.order = Number(response.data.total) || 0
      })
      SelfAmount({
        where: "method = 'wechat' And created_at >= '" + parseTime(this.date[0]) + "' And created_at < '" + parseTime(this.date[1]) + "'"
      }).then(response => {
        this.wechat = Number(response.data.total) || 0
      })
      SelfAmount({
        where: "method = 'alipay' And created_at >= '" + parseTime(this.date[0]) + "' And created_at < '" + parseTime(this.date[1]) + "'"
      }).then(response => {
        this.alipay = Number(response.data.total) || 0
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
