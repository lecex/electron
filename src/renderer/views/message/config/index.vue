<template>
  <div class="app-container">
    <test-send/>
    <el-tabs type="border-card">
      <el-tab-pane>
        <!-- sms -->
        <span slot="label"><svg-icon icon-class="sms" class="sms"/> 短信</span>
        <el-form :model="config.sms" ref="smsForm" label-width="180px">
          <el-form-item label="驱动" prop="drive">
            <el-select v-model="config.sms.drive" placeholder="请选择驱动">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <!-- aliyun -->
          <el-form-item  v-if="config.sms.drive==='aliyun'" label="阿里云AccessKeyID" prop="accessKeyID">
            <el-input v-model="config.sms.aliyun.accessKeyID"></el-input>
          </el-form-item>
          <el-form-item  v-if="config.sms.drive==='aliyun'" label="阿里云AccessKeySecret" prop="accessKeySecret">
            <el-input v-model="config.sms.aliyun.accessKeySecret"></el-input>
          </el-form-item>
          <el-form-item  v-if="config.sms.drive==='aliyun'" label="阿里云SignName" prop="signName">
            <el-input v-model="config.sms.aliyun.signName"></el-input>
          </el-form-item>
          <!-- cloopen -->
          <el-form-item  v-if="config.sms.drive==='cloopen'" label="容联云AppID" prop="appID">
            <el-input v-model="config.sms.cloopen.appID"></el-input>
          </el-form-item>
          <el-form-item  v-if="config.sms.drive==='cloopen'" label="容联云AccountSid" prop="accountSid">
            <el-input v-model="config.sms.cloopen.accountSid"></el-input>
          </el-form-item>
          <el-form-item  v-if="config.sms.drive==='cloopen'" label="容联云AccountToken" prop="accountToken">
            <el-input v-model="config.sms.cloopen.accountToken"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('smsForm')">保存</el-button>
            <el-button @click="resetForm('smsForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
            <el-tab-pane>
        <!-- wechat -->
        <span slot="label"><svg-icon icon-class="wechat" class="wechat"/> 微信</span>
        <el-form :model="config.wechat" ref="wechatForm" label-width="180px">
          <el-form-item label="微信Appid" prop="appid">
            <el-input v-model="config.wechat.appid"></el-input>
          </el-form-item>
          <el-form-item label="微信Secret" prop="secret">
            <el-input v-model="config.wechat.secret"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('wechatForm')">保存</el-button>
            <el-button @click="resetForm('wechatForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ConfigGet, ConfigUpdate } from '@/api/message'
import TestSend from './components/testSend.vue'
export default {
  name: 'ConfigSelf',
  components: { TestSend },
  props: {},
  data() {
    return {
      options: [
        {
          label: '阿里云',
          value: 'aliyun'
        }, {
          label: '容联云',
          value: 'cloopen'
        }
      ],
      config: {
        sms: {
          drive: 'cloopen',
          cloopen: {
            appID: '',
            accountSid: '',
            accountToken: ''
          },
          aliyun: {
            accessKeyID: '',
            accessKeySecret: '',
            signName: ''
          }
        },
        email: {
          smtp: {
            host: '',
            port: '',
            user: '',
            password: ''
          }
        },
        wechat: {
          appid: '',
          secret: '',
          accessToken: '',
          validityTime: ''
        }
      }
    }
  },
  created() {
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      ConfigGet().then(response => {
        if (response.data.config) {
          this.config = response.data.config
        }
      }).catch(error => {
        console.error(error.response)
      })
    },
    submitForm() {
      ConfigUpdate(this.config).then(response => {
        if (response.data.valid) {
          this.$message({
            type: 'success',
            message: '消息配置成功!'
          })
          this.getInfo()
        }
      }).catch(error => {
        console.error(error.response)
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
</style>
