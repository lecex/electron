<template>
  <el-dialog
    :visible.sync="dialogVisible"
    top="30vh"
    width="50%"
    class="pay-container"
  >
    <span v-show="begin" class="await"><i class="fa fa-spinner fa-pulse fa-fw"></i> 付款中</span>
    <span v-show="end" class="end">
      <svg-icon :icon-class="this.order.method" :class="this.order.method"/>
      <svg-icon :icon-class="info.type" :class="info.type"/><br>
      <span v-if="sleep">{{sleep}}</span> {{ info.message }} 
    </span>
  </el-dialog>
</template>

<script>
import { parseTime } from '@/utils/index'
import { AopF2F, Query } from '@/api/pay'
import utilsPay from '@/utils/pay'
// 前俯后仰 新
export default {
  name: 'Pay',
  props: {
  },
  data() {
    return {
      order: '',
      dialogVisible: false,
      begin: false,
      end: false,
      info: {
        type: 'success',
        message: ''
      },
      sleep: 0,
      wechatError: {
        SYSTEMERROR: '接口返回错误',
        PARAM_ERROR: '参数错误',
        ORDERPAID: '订单已支付',
        NOAUTH: '商户无权限	',
        AUTHCODEEXPIRE: '二维码已过期，请用户在微信上刷新后再试',
        NOTENOUGH: '余额不足',
        NOTSUPORTCARD: '不支持卡类型',
        ORDERCLOSED: '订单已关闭',
        ORDERREVERSED: '订单已撤销',
        BANKERROR: '银行系统异常',
        USERPAYING: '用户支付中，需要输入密码',
        AUTH_CODE_ERROR: '授权码参数错误',
        AUTH_CODE_INVALID: '授权码检验错误',
        XML_FORMAT_ERROR: 'XML格式错误',
        REQUIRE_POST_METHOD: '请使用post方法',
        SIGNERROR: '签名错误',
        LACK_PARAMS: '缺少参数',
        NOT_UTF8: '编码格式错误',
        BUYER_MISMATCH: '支付帐号错误',
        APPID_NOT_EXIST: 'APPID不存在',
        MCHID_NOT_EXIST: 'MCHID不存在',
        OUT_TRADE_NO_USED: '商户订单号重复	',
        APPID_MCHID_NOT_MATCH: 'appid和mch_id不匹配',
        INVALID_REQUEST: '无效请求',
        TRADE_ERROR: '交易错误'
      }
    }
  },
  computed: {
  },
  mounted() {
    setInterval(() => {
      if (this.sleep > 0) {
        this.sleep--
      }
    }, 1000)
  },
  methods: {
    hander(order) {
      this.dialogVisible = true
      order.orderNo = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}{n}')// 生成随机UUID
      this.order = order
      this.handerBegin()
      this.handerPay()
    },
    handerBegin() {
      this.begin = true
      this.end = false
      this.info.message = ''
    },
    handerEnd() {
      this.begin = false
      this.end = true
    },
    handerPay() {
      AopF2F(this.order).then(response => {
        this.handerEnd()
        utilsPay.hander(response.data, this.order.method)
        if (utilsPay.valid) {
          this.info = {
            type: 'success',
            message: '支付成功'
          }
        } else {
          if (utilsPay.error.code === 'USERPAYING') {
            this.info = {
              type: 'warning',
              message: '等待用户付款中'
            }
            this.sleep = 7
            setTimeout(() => {
              this.handerPayQuery()
            }, this.sleep * 1000)// 等待10秒
          } else {
            this.info = {
              type: 'error',
              message: utilsPay.error.detail
            }
          }
        }
      }).catch((error) => {
        this.handerEnd()
        if (error.message.indexOf('timeout of') !== -1) {
          this.info = {
            type: 'warning',
            message: '支付超时查询支付中'
          }
          this.handerPayQuery()
        } else {
          const detail = error.response.data.detail
          this.$notify({
            type: 'error',
            title: '支付失败',
            message: detail
          })
        }
      })
    },
    handerPayQuery() {
      this.info = {
        type: 'warning',
        message: '支付查询中'
      }
      Query(this.order).then(response => {
        this.handerEnd()
        utilsPay.hander(response.data, this.order.method)
        if (utilsPay.valid) {
          this.info = {
            type: 'success',
            message: '支付成功'
          }
        } else {
          if (utilsPay.error.code === 'USERPAYING') {
            this.info = {
              type: 'warning',
              message: '等待用户付款中'
            }
            this.sleep = 7
            setTimeout(() => {
              this.handerPayQuery()
            }, this.sleep * 1000)// 等待10秒
          } else {
            this.info = {
              type: 'error',
              message: utilsPay.error.detail
            }
          }
        }
      }).catch(error => {
        this.handerEnd()
        if (error.message.indexOf('timeout of') !== -1) {
          this.info = {
            type: 'warning',
            message: '支付超时查询支付中'
          }
        } else {
          const detail = error.response.data.detail
          this.$notify({
            type: 'error',
            title: '支付失败',
            message: detail
          })
        }
        this.handerPayQuery()
      })
    },
    isJSON(str) {
      if (typeof str === 'string') {
        try {
          var obj = JSON.parse(str)
          if (typeof obj === 'object' && obj) {
            return true
          } else {
            return false
          }
        } catch (e) {
          return false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pay-container{
  text-align:center
}
.await{
  font-size: 8vw;
  color: #E6A23C;
}
.wechat{
  color: #67C23A;
}
.alipay{
  color: #409EFF;
}

.end{
  font-size: 3vw;
  color: #303133;
  .svg-icon{
    font-size: 8vw;
    margin-bottom: 3vw;
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
}



</style>
