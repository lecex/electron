<template>
  <div class="app-container">
    <!-- <test-auth/> -->
        <div class="filter-container">
      <el-button v-permit="['ui_socialite_add']" v-waves class="filter-item" type="success" icon="el-icon-plus" @click="handleCreate">
        添加
      </el-button>
    </div>
    <!-- 列表内容开始 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="驱动" prop="driver" align="center" min-width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.driver }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ClientId" prop="clientId" align="center" min-width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.clientId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ClientSecret" prop="clientSecret" align="center" min-width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.clientSecret }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center" min-width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">开启</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-permit="['ui_socialite_update']" type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-permit="['ui_socialite_delete']" size="mini" type="danger" @click="handleDeleted(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表内容结束 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 创建、编辑弹窗 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="formData" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="驱动" prop="driver">
          <el-select 
            v-model="formData.driver" 
            placeholder="请选择驱动"
            @change="changeHandler"
          >
              <el-option
              v-for="(value,key) in options"
              :key="key"
              :label="value"
              :value="key"
              >
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ClientId" prop="clientId">
          <el-input v-model="formData.clientId" />
        </el-form-item>
        <el-form-item label="ClientSecret" prop="clientSecret">
          <el-input v-model="formData.clientSecret" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="formData.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button :disabled="dialogDisabled" type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
    <!-- 创建、编辑弹窗 -->
  </div>
</template>

<script>
import { List, Create, Delete, Update } from '@/api/socialite'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import testAuth from './components/testAuth.vue'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'ConfigList',
  components: {
    // testAuth,
    Pagination
  },
  directives: { waves },
  props: {},
  data() {
    return {
      options: {
        miniprogram_wechat: '微信小程序',
        wechat: '微信'
      },
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: 'created_at desc'
      },
      // 弹窗控制
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑社会登录配置',
        create: '添加社会登录配置'
      },
      dialogDisabled: false, // 创建用户和更新用户按钮提示后禁用
      // form
      formData: {
        name: '',
        driver: '',
        clientId: '',
        clientSecret: '',
        status: true
      },
      rules: {
        clientId: [
          { required: true, message: '请输入驱动客户端ID 一般为AppID', trigger: 'blur' },
          { min: 4, max: 64, message: '长度在 4 到 64 个字符', trigger: 'blur' }
        ],
        clientSecret: [
          { required: true, message: '请输入驱动客户端秘钥 一般为AppSecret', trigger: 'blur' },
          { min: 4, max: 128, message: '长度在 4 到 128 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  mounted() {
    this.getList()
  },
  methods: {
    changeHandler(key) {
      this.formData.name = this.options[key]
    },
    sortChange(data) {
      if (data.prop) {
        this.listQuery.sort = (data.prop + ' ' + data.order).replace('ending', '')
        this.getList()
      }
    },
    getList() {
      this.listLoading = true
      List(this.listQuery).then(response => {
        this.list = response.data.configs
        this.total = Number(response.data.total)
        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.dialogDisabled = false
      this.formData = {
        name: '',
        driver: '',
        clientId: '',
        clientSecret: '',
        status: true
      }
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.dialogDisabled = false
      this.formData = {
        id: row.id,
        name: row.name,
        driver: row.driver,
        clientId: row.clientId,
        clientSecret: row.clientSecret,
        status: row.status
      }
    },
    handleDeleted(row) {
      this.$confirm('此操作将永久删除该驱动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteData(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteData(id) {
      Delete({ id: id }).then(response => {
        const valid = response.data.valid
        if (valid) {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogDisabled = true
          Create(this.formData).then(res => {
            console.log(res)
            if (valid) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '添加成功',
                message: '添加驱动配置成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogDisabled = true
          Update(this.formData).then(res => {
            console.log(res)
            if (valid) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '更新成功',
                message: '更新驱动配置成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
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
