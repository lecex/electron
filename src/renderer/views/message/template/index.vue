<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="#" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板名称" prop="name" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事件" prop="event" sortable="custom" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.event }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代码" prop="templateCode" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.templateCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.type  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="260" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button size="mini" type="primary" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDeleted(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { TemplateList, TemplateDelete } from '@/api/message'
// import { Query, Cancel, OpenRefund, AffirmRefund } from '@/api/pay'
// import utilsPay from '@/utils/pay'
export default {
  name: 'ORderList',
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
        limit: 10,
        where: '',
        sort: 'created_at desc'
      },
      listLoading: true,
      dialogFormVisible: false, // 窗口关闭
      dialogDisabled: false // 窗口按钮引用
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'roles'
    ])
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
      const where = ' true'
      this.listQuery.where = where
      this.listLoading = true
      TemplateList(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.templates
        this.total = Number(response.data.total)
        // Just to simulate the time of the request
        this.listLoading = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    deleteData(id) {
      TemplateDelete({ id: id }).then(response => {
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
    handleDeleted(row) {
      this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.error{
  color: #F56C6C;
}
.success{
  color: #67C23A;
}
.warning{
  color: #E6A23C;
}
</style>
