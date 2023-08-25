export default {
  methods: {
    isLogin () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '使用该功能前，请先登录！',
          confirmButtonText: '前往登录',
          cancelButtonText: '再随便逛逛'
        }).then(() => {
          // this.$route.fullPath（会包含查询参数）
          this.$router.push({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {})
        return false
      }
      return true
    }

  }
}
