<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-permit="['ui_user_add']" v-waves class="filter-item" type="success" icon="el-icon-plus" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="头像" prop="avatar" align="center" width="60">
        <template slot-scope="scope">
          <dialog-picture
            v-if="scope.row.avatar"
            :src="scope.row.avatar"
            :alt="scope.row.name"
            style-object="border-radius:10px"
            width="40px"
            height="40px"
          />
        </template>
      </el-table-column>
      <el-table-column label="用户ID" prop="id" align="center" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户" prop="username" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="name" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机" prop="mobile" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" sortable="custom" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-permit="['ui_user_roles']" size="mini" type="warning" @click="handleRole(row)">
            角色
          </el-button>
          <el-button v-permit="['ui_user_update']" type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-permit="['ui_user_delete']" size="mini" type="danger" @click="handleDeleted(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="formData" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="账户" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            show-password
          />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="formData.mobile" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <!-- <el-form-item label="头像">
          <el-input v-model="formData.avatar" />
        </el-form-item> -->
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
    <el-dialog title="角色管理" :visible.sync="dialogRoleVisible">
      <el-form ref="form" label-width="80px">
        <checkbox-indeterminate
          v-if="dialogRoleVisible"
          v-model="checkedRoles"
          :options="roles"
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRoleVisible = false">
          取消
        </el-button>
        <el-button :disabled="dialogDisabled" type="primary" @click="updateUserRoles()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { All } from '@/api/role'
import { GetRoles, UpdateRoles } from '@/api/casbin'
import { Exist, List, Create, Delete, Update } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import DialogPicture from '@/components/DialogPicture'
import CheckboxIndeterminate from '@/components/CheckboxIndeterminate'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'UserList',
  components: {
    DialogPicture,
    CheckboxIndeterminate,
    Pagination
  },
  directives: { waves },
  props: {},
  data() {
    return {
      // 角色管理
      roles: {},
      checkedRoles: [],
      dialogRoleVisible: false,
      userID: '', // 当前选择用户id
      // list 列表
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 5,
        sort: 'created_at desc'
      },
      // 弹窗控制
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑用户',
        create: '添加用户'
      },
      // form 数据
      dialogDisabled: false, // 创建用户和更新用户按钮提示后禁用
      formData: {
        id: '',
        username: '',
        password: '',
        mobile: '',
        email: '',
        name: '',
        avatar: ''
      },
      // 缓存 update 数据
      updateFormData: {
        id: '',
        username: '',
        password: '',
        mobile: '',
        email: '',
        name: '',
        avatar: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              // 更新时不进行验证
              if (this.updateFormData.username !== value) {
                // 去后端验证是否存在
                Exist({ username: value }).then(response => {
                  if (response.data.valid) {
                    callback('用户名已存在')
                  }
                  callback()
                })
              } else {
                callback()
              }
            }, trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === undefined) {
                callback()
              } else {
                if (!/^.{6,16}$/.test(value)) {
                  callback('密码长度请控制在 6 到 16 个字符')
                }
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        mobile: [{
          required: true,
          validator: (rule, value, callback) => {
            if (value === undefined) {
              callback('请输入手机号码')
            } else {
              if (!/^1[23456789]\d{9}$/.test(value)) {
                callback('请输入正确的手机号码')
              } else {
                // 更新时不进行验证
                if (this.updateFormData.mobile !== value) {
                // 去后端验证是否存在
                  Exist({ mobile: value }).then(response => {
                    if (response.data.valid) {
                      callback('用户名已存在')
                    }
                    callback()
                  })
                } else {
                  callback()
                }
              }
            }
          },
          trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              // 更新时不进行验证
              if (this.updateFormData.email !== value) {
              // 去后端验证是否存在
                Exist({ email: value }).then(response => {
                  if (response.data.valid) {
                    callback('用户名已存在')
                  }
                  callback()
                })
              } else {
                callback()
              }
            }, trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请输入别名', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoles()
    this.getList()
  },
  mounted() {},
  methods: {
    initFormData() {
      this.formData = {
        id: '',
        username: '',
        password: '',
        mobile: '',
        email: '',
        name: '',
        avatar: ''
      }
      this.updateFormData = {
        id: '',
        username: '',
        password: '',
        mobile: '',
        email: '',
        name: '',
        avatar: ''
      }
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
        this.list = response.data.users
        this.total = Number(response.data.total)

        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    getRoles() {
      All().then(response => {
        this.roles = response.data.roles
      })
    },
    // 获取用户角色
    getUserRoles(row) {
      GetRoles({ label: row.id }).then(response => {
        const roles = response.data.roles
        if (roles) {
          this.checkedRoles = roles
        }
      })
    },
    // 更新用户角色
    updateUserRoles() {
      this.dialogDisabled = true
      UpdateRoles({
        label: this.userID,
        roles: this.checkedRoles
      }).then(response => {
        if (response.data.valid) {
          this.dialogRoleVisible = false
          this.$message({
            type: 'success',
            message: '用户角色更新成功!'
          })
        }
      })
    },
    handleRole(row) {
      this.dialogRoleVisible = true
      this.dialogDisabled = false
      // 初始化权限列表防止冲突
      this.checkedRoles = []
      this.getUserRoles(row)
      this.userID = row.id
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.dialogDisabled = false
      this.initFormData()
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.dialogDisabled = false
      this.formData = {
        id: row.id,
        username: row.username,
        mobile: row.mobile,
        email: row.email,
        name: row.name,
        avatar: row.avatar
      }
      this.updateFormData = {
        id: row.id,
        username: row.username,
        mobile: row.mobile,
        email: row.email,
        name: row.name,
        avatar: row.avatar
      }
    },
    handleDeleted(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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
          Create(this.formData).then(response => {
            if (valid) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '添加成功',
                message: '添加用户',
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
          Update(this.formData).then(response => {
            if (valid) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '更新成功',
                message: '更新用户',
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
</style>
