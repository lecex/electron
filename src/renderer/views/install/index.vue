<template>
  <div class="install-container">
    <el-steps :active="active" finish-status="success">
      <el-step title="服务器API"></el-step>
    </el-steps>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <span v-if="active==0">
        <el-form-item label="服务器API" prop="api">
          <el-input 
            v-model="ruleForm.api" 
            :autosize="{ minRows: 2, maxRows: 8}"
            placeholder="负载均衡服务器,一行一个"
            type="textarea"
          >
          </el-input>
        </el-form-item>
      </span>
      <el-form-item class="foot">
          <el-button @click="previous('ruleForm')">上一步</el-button>
          <el-button v-if="active==1" type="primary" @click="complete()">完成</el-button>
          <el-button v-else type="primary" @click="next('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isServer } from '@/utils/healthy'
import { parseTime } from '@/utils'
// 安装页面
export default {
  name: 'Install',
  data() {
    return {
      active: 0,
      ruleForm: {
        api: 'http://rpc1.binzhou.vip/rpc'
      },
      rules: {
        api: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                value.split(/[\n]/).forEach(async url => {
                  if (await isServer(url)) {
                    callback()
                  } else {
                    callback()
                    callback(url + ':请求失败,请检查服务器地址')
                  }
                })
              } else {
                callback('请输入服务器API地址')
              }
            },
            trigger: 'blur'
          }
        ]
      },
      activities: [
      ]
    }
  },
  mounted() {
  },
  methods: {
    next(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.active === 1) {
            this.activities = []
            this.initConfig()
          }
          if (this.active++ > 2) this.active = 2
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    previous(formName) {
      if (this.active-- === 0) this.active = 0
    },
    initConfig() {
      this.activities.push({
        content: '初始化配置',
        timestamp: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}'),
        color: '#409EFF'
      })
      Object.keys(this.ruleForm).forEach(key => {
        this.$store.dispatch('settings/changeSetting', { key, value: this.ruleForm[key] })
      })
    },
    // 完成
    complete() {
      Object.keys(this.ruleForm).forEach(key => {
        this.$store.dispatch('settings/changeSetting', { key: 'install', value: true })
      })
      this.$router.push(`/login`)
    }
  }
}
</script>


<style lang="scss" scoped>
.install-container{
  padding: 10vw;
}
.foot{
  margin-top:3vh;
}
.el-steps{
  margin-bottom: 3vh;
}
</style>
