<template>
  <el-dialog
    :visible.sync="dialogVisible"
    top="30vh"
    width="50%"
    class="pay-container"
    :show-close="false"
  >
    <span v-show="begin" class="await"><i class="fa fa-spinner fa-pulse fa-fw"></i> 付款中</span>
    <span v-show="end" class="end">
      <svg-icon :icon-class="this.order.method" :class="this.order.method"/>
      <svg-icon :icon-class="info.type" :class="info.type"/><br>
      {{ info.message }}
    </span>
  </el-dialog>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { AopF2F } from '@/api/pay'
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
      }
    }
  },
  computed: {
  },
  methods: {
    hander(order) {
      this.dialogVisible = true
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
      this.order.id = uuidv4() // 生成随机UUID
      // this.order.id = '38e494c5-a47a-45d4-b68b-7522554472fe'
      AopF2F(this.order).then(result => {
        this.handerEnd()
        this.info = {
          type: 'success',
          message: '支付成功'
        }
      }).catch(error => {
        this.handerEnd()
        switch (this.order.method) {
          case 'alipay':
            this.alipayHander(error)
            break
          case 'wechat':
            this.wechatHander(error)
            break
        }
      })
    },
    wechatHander(error) {
      if (this.isJSON(error.response.data.detail)) {
        const detail = JSON.parse(error.response.data.detail)
        switch (detail['return_code']) {
          default:
            this.info = {
              type: 'error',
              message: detail['return_msg']
            }
            break
        }
      }
    },
    alipayHander(error) {
      if (this.isJSON(error.response.data.detail)) {
        const detail = JSON.parse(error.response.data.detail)
        switch (detail['code']) {
          case '10003':
            this.info = {
              type: 'warning',
              message: '等待用户付款'
            }
            break
          default:
            this.info = {
              type: 'error',
              message: detail['sub_msg']
            }
            break
        }
      } else {
        const detail = error.response.data.detail
        switch (detail) {
          case 'auth_code : cannot be empty':
            this.info = {
              type: 'error',
              message: '付款码不允许为空'
            }
            break
          default:
            break
        }
      }
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
    color: #F56C6C;
  }
  .warning{
    color: #F56C6C;
  }
}



</style>
