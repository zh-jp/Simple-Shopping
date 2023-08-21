<template>
    <div class="editAddress">
        <van-nav-bar title="新增收货地址" fixed left-arrow @click-left="$router.go(-1)" />
    </div>
</template>
<script>
export default {
  name: 'addressEditPage',
  created () {
    console.log(this.$route.params.id)
  }
}
</script>
<style lang="less" scoped>
.editAddress {
    padding-top: 46px;
}
</style>
