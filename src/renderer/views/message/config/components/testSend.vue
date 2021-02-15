<template>
  <div>
      <h3>扫码支付测试</h3>
        <el-form :model="send" :inline="true" ref="send" :rules="rules" label-width="150px">
          <el-form-item label="类型" prop="type">
            <el-select v-model="send.type" placeholder="请选择类型">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" prop="addressee">
            <el-input v-model="send.addressee" placeholder="手机/邮箱/微信ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('send')">发送</el-button>
            <el-button @click="resetForm('send')">重置</el-button>
          </el-form-item>
        </el-form>
  </div>
</template>

<script>
import { VerifySend } from '@/api/message'
export default {
  name: 'TestPay',
  props: {},
  data() {
    return {
      options: [
        {
          label: '短信',
          value: 'sms'
        }, {
          label: '邮件',
          value: 'email'
        }, {
          label: '微信',
          value: 'wechat'
        }
      ],
      send: {
        addressee: '',
        event: 'register_verify', // 默认注册代码
        type: 'sms'
      },
      rules: {
        addressee: [{ required: true, message: '请输入发送手机/邮箱/微信ID', trigger: 'change' }]
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
          switch (this.send.type) {
            case 'sms':
              VerifySend(this.send).then(response => {
                if (response.data.valid) {
                  this.$message({
                    type: 'success',
                    message: '发送成功'
                  })
                }
              }).catch(error => {
                console.error(error.response.data)
              })
              break
            default:
              console.log(1, this.send)
              break
          }
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
