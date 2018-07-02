<template>
    <div>
        <el-form inline>
            <k-form-item label="开始时间"
                         type="date-picker"></k-form-item>
            <k-form-item label="结束时间"
                         type="date-picker"></k-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button type="primary">导出</el-button>
            </el-form-item>
        </el-form>
        <k-table :data="tableData" :columns="columns"/>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData:[],
            columns:[{
                label:'日期',
                prop:'name'
            },{
                label:'订单数量',
                prop:'name'
            },{
                label:'商品数量',
                prop:'name'
            },{
                label:'销售额',
                prop:'name'
            },{
                label:'订单（自提）数',
                prop:'name'
            },{
                label:'订单（快递）数',
                prop:'name'
            },{
                label:'订单（送人）数',
                prop:'name'
            },]
        }
    }
};
</script>

<style>

</style>
