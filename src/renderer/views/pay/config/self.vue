<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><svg-icon icon-class="wechat" class="wechat"/> 微信</span>
        微信
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><svg-icon icon-class="alipay" class="alipay"/> 支付宝</span>
        支付宝
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'ConfigSelf',
  props: {},
  data() {
    return {
      wechatForm: {
        app_id: '',
        mch_id: '',
        api_key: '',
        sub_app_id: '',
        sub_mch_id: ''
      },
      wechatRules: {
        app_id: [{ required: true, message: '请输入应用ID', trigger: 'change' }],
        mch_id: [{ required: true, message: '请输入商家ID', trigger: 'change' }],
        api_key: [{ required: true, message: '请输入API秘钥', trigger: 'change' }],
        sub_app_id: [{ required: true, message: '请输入子应用ID', trigger: 'change' }],
        sub_mch_id: [{ required: true, message: '请输入子商家ID', trigger: 'change' }]
      },
      alipayForm: {
        app_id: '',
        private_key: '',
        ali_pay_public_key: '',
        sign_type: ''
      },
      alipayRules: {
        app_id: [{ required: true, message: '请输入应用ID', trigger: 'change' }],
        private_key: [{ required: true, message: '请输入私钥', trigger: 'change' }],
        ali_pay_public_key: [{ required: true, message: '请输入支付宝公钥', trigger: 'change' }],
        sign_type: [{ required: true, message: '选择签名方式', trigger: 'change' }]
      }
    }
  },
  created() {
  },
  mounted() {},
  methods: {}
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
