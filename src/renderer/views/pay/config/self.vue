<template>
  <div class="app-container">
    <test-pay/>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><svg-icon icon-class="wechat" class="wechat"/> 微信</span>
        <el-form :model="config.wechat" :rules="wechatRules" ref="wechatForm" label-width="150px">
          <el-form-item label="公众账号APPID" prop="appId">
            <el-input v-model="config.wechat.appId"></el-input>
          </el-form-item>
          <el-form-item label="商家APPID" prop="mchId">
            <el-input v-model="config.wechat.mchId"></el-input>
          </el-form-item>
          <el-form-item label="API秘钥" prop="apiKey">
            <el-input v-model="config.wechat.apiKey"></el-input>
          </el-form-item>
          <el-form-item label="子公众账号ID" prop="subAppId">
            <el-input v-model="config.wechat.subAppId"></el-input>
          </el-form-item>
          <el-form-item label="子商家ID" prop="subMchId">
            <el-input v-model="config.wechat.subMchId"></el-input>
          </el-form-item>
          <el-form-item label="证书" prop="pemCert">
            <el-input 
              v-model="config.wechat.pemCert"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="秘钥" prop="pemKey">
            <el-input 
              v-model="config.wechat.pemKey"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="沙盒模式" prop="sandbox">
            <el-switch
              v-model="config.wechat.sandbox"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="手续费" prop="fee">
            <el-input v-model="wechatFee" >
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><svg-icon icon-class="alipay" class="alipay"/> 支付宝</span>
        <el-form :model="config.alipay" :rules="alipayRules" ref="alipayForm" label-width="150px">
          <el-form-item label="应用ID" prop="appId">
            <el-input v-model="config.alipay.appId"></el-input>
          </el-form-item>
          <el-form-item label="私钥" prop="privateKey">
            <el-input 
              v-model="config.alipay.privateKey"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="支付宝公钥" prop="aliPayPublicKey">
            <el-input 
              v-model="config.alipay.aliPayPublicKey"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择签名方式" prop="signType">
            <el-radio-group v-model="config.alipay.signType">
              <el-radio label="RSA2"></el-radio>
              <el-radio label="RSA"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="授权Token" prop="appAuthToken">
            <el-input 
              v-model="config.alipay.appAuthToken"
            ></el-input>
          </el-form-item>
          <el-form-item label="服务商ID" prop="sysServiceProviderId">
            <el-input 
              v-model="config.alipay.sysServiceProviderId"
            ></el-input>
          </el-form-item>
          <el-form-item label="沙盒模式" prop="sandbox">
            <el-switch
              v-model="config.alipay.sandbox"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="手续费" prop="fee">
            <el-input v-model="alipayFee" >
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><svg-icon icon-class="icbc" class="icbc"/> 工行</span>
        <el-form :model="config.icbc" :rules="icbcRules" ref="icbcForm" label-width="150px">
          <el-form-item label="应用ID" prop="appId">
            <el-input v-model="config.icbc.appId"></el-input>
          </el-form-item>
          <el-form-item label="私钥" prop="privateKey">
            <el-input 
              v-model="config.icbc.privateKey"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="工行公钥" prop="icbcPublicKey">
            <el-input 
              v-model="config.icbc.icbcPublicKey"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="发送签名方式" prop="signType">
            <el-radio-group v-model="config.icbc.signType">
              <el-radio label="RSA2"></el-radio>
              <el-radio label="RSA"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="返回签名方式" prop="returnSignType">
            <el-radio-group v-model="config.icbc.returnSignType">
              <el-radio label="RSA2"></el-radio>
              <el-radio label="RSA"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商户ID" prop="merId">
            <el-input 
              v-model="config.icbc.merId"
            ></el-input>
          </el-form-item>
          <el-form-item label="沙盒模式" prop="sandbox">
            <el-switch
              v-model="config.icbc.sandbox"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="手续费" prop="fee">
            <el-input v-model="icbcFee" >
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-form  label-width="150px">
        <el-form-item/>
        <el-form-item label="默认通道" prop="fee">
            <el-select v-model="channel" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SelfUpdate, Info } from '@/api/pay-config'
import TestPay from './components/testPay.vue'
export default {
  name: 'ConfigSelf',
  components: { TestPay },
  props: {},
  data() {
    return {
      channel: '',
      options: [
        {
          value: '',
          label: '默认直连'
        }, {
          value: 'icbc',
          label: '工行'
        }
      ],
      config: {
        channel: '',
        wechat: {
          appId: '',
          mchId: '',
          apiKey: '',
          subAppId: '',
          subMchId: '',
          pemCert: '',
          pemKey: '',
          fee: 0,
          sandbox: false
        },
        alipay: {
          appId: '',
          privateKey: '',
          aliPayPublicKey: '',
          signType: 'RSA2',
          appAuthToken: '',
          sysServiceProviderId: '',
          fee: 0,
          sandbox: false
        },
        icbc: {
          appId: '',
          privateKey: '',
          icbcPublicKey: '',
          signType: 'RSA2',
          returnSignType: 'RSA',
          merId: '',
          fee: 0,
          sandbox: false
        }
      },
      wechatRules: {
        // appId: [{ required: true, message: '请输入应用APPID', trigger: 'change' }],
        // mchId: [{ required: true, message: '请输入商家APPID', trigger: 'change' }],
        // apiKey: [{ required: true, message: '请输入API秘钥', trigger: 'change' }],
        // subAppId: [{ message: '请输入子应用ID', trigger: 'change' }],
        // subMchId: [{ required: true, message: '请输入子商家ID', trigger: 'change' }]
      },
      alipayRules: {
        // appId: [{ required: true, message: '请输入应用ID', trigger: 'change' }],
        // privateKey: [{ required: true, message: '请输入私钥', trigger: 'change' }],
        // aliPayPublicKey: [{ required: true, message: '请输入支付宝公钥', trigger: 'change' }],
        // signType: [{ required: true, message: '选择签名方式', trigger: 'change' }]
      },
      icbcRules: {
        // appId: [{ required: true, message: '请输入应用ID', trigger: 'change' }],
        // privateKey: [{ required: true, message: '请输入私钥', trigger: 'change' }],
        // aliPayPublicKey: [{ required: true, message: '请输入支付宝公钥', trigger: 'change' }],
        // signType: [{ required: true, message: '选择签名方式', trigger: 'change' }]
      },
      wechatFee: '',
      alipayFee: '',
      icbcFee: ''
    }
  },
  created() {
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      Info().then(response => {
        if (response.data.config) {
          this.config = response.data.config
          if (this.config.channel) {
            this.channel = this.config.channel
          }
          this.wechatFee = this.config.wechat.fee ? (this.config.wechat.fee / 100).toFixed(2) : '' // 手续费转换为百分之一
          this.alipayFee = this.config.alipay.fee ? (this.config.alipay.fee / 100).toFixed(2) : ''// 手续费转换为百分之一
        }
      })
    },
    submitForm(formName) {
      this.config.wechat.fee = Math.round(this.wechatFee * 100) // 手续费转换万分之一
      this.config.alipay.fee = Math.round(this.alipayFee * 100) // 手续费转换万分之一
      this.config.channel = this.channel
      this.config.status = true
      SelfUpdate(this.config).then(response => {
        this.$message({
          type: 'success',
          message: '支付信息配置成功!'
        })
        this.getInfo()
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '支付信息配置失败:' + error
        })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
.icbc{
  color: #ff0000;
  font-size: 18px;
}
</style>
