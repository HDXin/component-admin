<template>
    <div class="header">
            <el-button type="text" @click="logout">退出</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            status: false
        }
    },
    methods: {
        logout(){
            window.sessionStorage.removeItem('$LoginUser');
            this.$router.push('/login')
        }
    },

}
</script>

<style lang="less">
.header {
    line-height: 64px;
    text-align: right;
    // margin-right: 260px;
}
</style>
