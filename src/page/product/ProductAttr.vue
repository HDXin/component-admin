<template>
    <div>
        <el-row slot="header">
            <el-col :span="24"
                    v-for="(item,index) in list"
                    :key='index'>
                <span>{{item.attrValue}}</span>
                <span>|</span>
                <span>￥{{item.price/100}}</span>
                <span>|</span>
                <span>{{item.stock}}</span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  components: {}
};
</script>
<style lang="less" type="text/less">

</style>