<template>
  <div class="app-container">
    <test-auth/>
    <el-tabs type="border-card">
      <el-tab-pane>
        <!-- miniprogramWechat -->
        <span slot="label"><svg-icon icon-class="miniprogramWechat" class="miniprogramWechat"/> 微信小程序</span>
        <el-form :model="config.miniprogramWechat" ref="miniprogramWechatForm" label-width="180px">
          <el-form-item  label="微信小程序AppId" prop="appId">
            <el-input v-model="config.miniprogramWechat.appId"></el-input>
          </el-form-item>
          <el-form-item  label="微信小程序Secret" prop="secret">
            <el-input v-model="config.miniprogramWechat.secret"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('miniprogramWechatForm')">保存</el-button>
            <el-button @click="resetForm('miniprogramWechatForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane>
        <!-- wechat -->
        <span slot="label"><svg-icon icon-class="wechat" class="wechat"/> 微信</span>
        <el-form :model="config.wechat" ref="wechatForm" label-width="180px">
          <el-form-item label="微信Appid" prop="appId">
            <el-input v-model="config.wechat.appId"></el-input>
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
import { ConfigGet, ConfigUpdate } from '@/api/socialite'
import testAuth from './components/testAuth.vue'
export default {
  name: 'ConfigSelf',
  components: { testAuth },
  props: {},
  data() {
    return {
      config: {
        wechat: {
          appId: '',
          secret: ''
        },
        miniprogramWechat: {
          appId: '',
          secret: ''
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
            message: '社会登录配置成功!'
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
.miniprogramWechat{
  color: #67C23A;
}
.alipay{
  color: #409EFF;
}
</style>
