<template>
  <div>
      <span>扫码支付测试</span>
        <el-form :model="order" :inline="true" ref="order" label-width="150px">
          <el-form-item label="支付方式" prop="signType">
            <el-radio-group v-model="order.method">
              <el-radio label="wechat"><svg-icon icon-class="wechat" class="wechat"/> 微信</el-radio>
              <el-radio label="alipay"><svg-icon icon-class="alipay" class="alipay"/> 支付宝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="付款码" prop="privateKey">
            <el-input v-model="order.authCode"></el-input>
          </el-form-item>
          <el-form-item label="付款金额" prop="aliPayPublicKey">
            <el-input v-model="totalAmount"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('order')">保存</el-button>
            <el-button @click="resetForm('order')">重置</el-button>
          </el-form-item>
        </el-form>
        <pay ref="pay"/>
  </div>
</template>

<script>
import Pay from '@/components/Pay'
export default {
  name: 'TestPay',
  components: { Pay },
  props: {},
  data() {
    return {
      totalAmount: 0.01,
      order: {
        id: '',
        storeId: this.$store.state.user.userId,
        method: 'wechat',
        authCode: '',
        title: '测试支付订单',
        totalAmount: 0,
        operatorId: '',
        terminalId: ''
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.order.totalAmount = this.totalAmount * 100// 换算成分
          this.$refs.pay.hander(this.order)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
</style>
