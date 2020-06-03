<template>
  <div class="dashboard-container">
    <div class="dashboard-text">账号: {{ username }}</div>
    <div class="dashboard-text">用户名: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: { },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'username'
    ])
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
