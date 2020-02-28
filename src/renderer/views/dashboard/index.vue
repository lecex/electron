<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ hello }}</div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: { },
  data() {
    return {
      hello: 'hello'
    }
  },
  computed: {
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
