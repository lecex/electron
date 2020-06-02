<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="order" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总金额
          </div>
          <count-to :start-val="0" :end-val="order/100" :duration="500" :decimals='2' separator=',' prefix='¥ ' class="card-panel-num" />
        </div>
        <div class="card-panel-description-fee">
          <div class="card-panel-text">
            手续费
          </div>
          <count-to :start-val="0" :end-val="orderFee/100" :duration="500" :decimals='2' separator=',' prefix='¥ ' class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-wechat">
          <svg-icon icon-class="wechat" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            微信
          </div>
          <count-to :start-val="0" :end-val="wechat/100" :duration="500" :decimals='2' separator=',' prefix='¥ ' class="card-panel-num" />
        </div>
        <div class="card-panel-description-fee">
          <div class="card-panel-text">
            手续费
          </div>
          <count-to :start-val="0" :end-val="wechatFee/100" :duration="500" :decimals='2' separator=',' prefix='¥ ' class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-alipay">
          <svg-icon icon-class="alipay" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            支付宝
          </div>
          <count-to :start-val="0" :end-val="alipay/100" :duration="500" :decimals='2' separator=',' prefix='¥ ' class="card-panel-num" />
        </div>
        <div class="card-panel-description-fee">
          <div class="card-panel-text">
            手续费
          </div>
          <count-to :start-val="0" :end-val="alipayFee/100" :duration="500" :decimals='2' separator=',' prefix='¥ ' class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    order: {
      type: Number,
      default: 0
    },
    wechat: {
      type: Number,
      default: 0
    },
    alipay: {
      type: Number,
      default: 0
    },
    orderFee: {
      type: Number,
      default: 0
    },
    wechatFee: {
      type: Number,
      default: 0
    },
    alipayFee: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-wechat {
        background: #67C23A;
      }
      .icon-alipay{
        background: #409EFF;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-wechat {
      color: #67C23A;
    }
    .icon-alipay{
      color: #409EFF;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
    .card-panel-description-fee {
      float: left;
      font-weight: bold;
      margin: 26px;
      margin-right: 0px;
      .card-panel-text {
        line-height: 14px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 16px;
      }
    }
  }
}
</style>
