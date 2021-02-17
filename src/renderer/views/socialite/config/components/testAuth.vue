<template>
  <div>
      <h3>社会登录测试</h3>
        <el-form :model="socialite" :inline="true" ref="socialiteForm" :rules="rules" label-width="150px">
          <el-form-item label="类型" prop="driver">
            <el-select v-model="socialite.driver" placeholder="请选择类型">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="小程序代码CODE" prop="code">
            <el-input v-model="socialite.code" placeholder="授权代码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('socialiteForm')">登录</el-button>
            <el-button @click="resetForm('socialiteForm')">重置</el-button>
          </el-form-item>
        </el-form>
  </div>
</template>

<script>
import { Auth } from '@/api/socialite'
export default {
  name: 'TestPay',
  props: {},
  data() {
    return {
      options: [
        {
          label: '微信小程序',
          value: 'miniprogram_wechat'
        }, {
          label: '微信',
          value: 'wechat'
        }
      ],
      socialite: {
        code: '',
        driver: 'miniprogram_wechat'
      },
      rules: {
        // code: [{ required: true, message: '请输入授权代码CODE', trigger: 'change' }]
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
          Auth(this.socialite).then(response => {
            if (response.data.valid) {
              this.$message({
                type: 'success',
                message: '发送成功'
              })
            }
          }).catch(error => {
            console.error(error.response.data)
          })
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
