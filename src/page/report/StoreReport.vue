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
                label:'门店名称',
                prop:'name'
            },{
                label:'订单数量',
                prop:'name'
            },{
                label:'销售金额',
                prop:'name'
            }]
        }
    }
};
</script>

<style>

</style>
