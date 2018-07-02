<template>
		<div>
				<h4>快递信息</h4>
				<el-row class="grid-table-border">
					<el-form inline label-width="150px">
						<el-col :span="8">
							<k-form-item label="快递公司"></k-form-item>
						</el-col>
						<el-col :span="8">
							<k-form-item label="快递单号"></k-form-item>
						</el-col>
						<el-col :span="8">
						</el-col>
					</el-form>
				</el-row>
		</div>
</template>
<script>
export default {
  name:'logisticsInfo'
}
</script>

