<template>
  <div class="app-container">
    <div class="filter-container">
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" :model="props.row" label-width="150px">
            <span><svg-icon icon-class="wechat" class="wechat"/> 微信</span>
            <el-form-item label="应用ID">
              <el-input v-model="props.row.wechat.appId"></el-input>
            </el-form-item>
            <el-form-item label="商家ID">
              <el-input v-model="props.row.wechat.mchId"></el-input>
            </el-form-item>
            <el-form-item label="API秘钥">
              <el-input v-model="props.row.wechat.apiKey"></el-input>
            </el-form-item>
            <el-form-item label="子应用ID">
              <el-input v-model="props.row.wechat.subAppId"></el-input>
            </el-form-item>
            <el-form-item label="子商家ID">
              <el-input v-model="props.row.wechat.subMchId"></el-input>
            </el-form-item>
            <el-form-item label="沙盒状态">
              <el-switch
                v-model="props.row.wechat.sandbox"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <span><svg-icon icon-class="alipay" class="alipay"/> 支付宝</span>
            <el-form-item label="应用ID">
              <el-input v-model="props.row.alipay.appId"></el-input>
            </el-form-item>
            <el-form-item label="私钥">
              <el-input v-model="props.row.alipay.privateKey"></el-input>
            </el-form-item>
            <el-form-item label="支付宝公钥">
              <el-input v-model="props.row.alipay.aliPayPublicKey"></el-input>
            </el-form-item>
            <el-form-item label="签名方式">
              <el-radio-group v-model="props.row.alipay.signType">
                <el-radio label="RSA2"></el-radio>
                <el-radio label="RSA"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="沙盒状态">
              <el-switch
                v-model="props.row.alipay.sandbox"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" prop="id" align="center" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" prop="storeName" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.storeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信" prop="wechat" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.wechat.appId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付宝" prop="alipay" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.alipay.appId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="stauts" align="center" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.stauts"
            @change="updateData(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" sortable="custom" align="center" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-permit="['ui_config_delete']" size="mini" type="danger" @click="handleDeleted(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { List, Update, Delete } from '@/api/pay-config'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'ConfigList',
  components: {
    Pagination
  },
  directives: { waves },
  props: {},
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 5,
        sort: 'created_at desc'
      },
      listLoading: true,
      dialogFormVisible: false, // 窗口关闭
      dialogDisabled: false // 窗口按钮引用
    }
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
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
    handleDeleted(row) {
      this.$confirm('此操作将永久删除该用户支付配置, 是否继续?', '提示', {
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
    updateData(row) {
      this.dialogDisabled = true
      Update(row).then(response => {
        this.dialogFormVisible = false
        this.dialogDisabled = false
        this.$message({
          message: '更新配置成功',
          type: 'success'
        })
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
.alipay{
  color: #409EFF;
}
</style>
