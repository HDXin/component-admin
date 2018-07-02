<template>
  <page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item to="/distributor/audited/">已审核分销员</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="14"
              class="text-right">
        <el-button type="primary"
                   size="small"
                   @click="dialogVisible = true">修改分销资格</el-button>
      </el-col>
    </el-row>
    <el-dialog title="修改分销资格"
               :visible.sync="dialogVisible">
      <el-form label-width="150px">
        <el-form-item label="分销资格">
          <el-radio-group v-model="agencyLevel">
            <el-radio label="SALE">消费品</el-radio>
            <el-radio label="PRESELL">预售品</el-radio>
            <el-radio label="NONE">解除关联</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="changeLevel" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-row class="grid-table-border">
      <el-form label-width="150px">
        <el-col :span="12">
          <el-form-item label="姓名">{{model.fullName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号">{{model.cellphone}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号码">{{model.idcard}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分销资格">{{model.agencyLevel|goodsTypeFilter}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证正面照">
            <images :src="model.idcardFront"></images>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证反面照">
            <images :src="model.idcardBack"></images>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-row class="grid-table-border"
            style="margin:20px 0;">
      <el-form label-width="100px">
        <el-col :span="8">
          <el-form-item label="认证日期">{{model.createTime|dateFilter('yyyy-MM-dd hh:mm:ss')}}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="累计业绩">{{model.totalSalesVolume / 100 }}</el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="累计提成">{{model.totalSalesBonus / 10000}}</el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-form inline>
      <k-form-item label="客户姓名" v-model="fullName"></k-form-item>
      <k-form-item label="客户手机"></k-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <k-table :data="tableData"
             :columns="columns"
             :total="total"
             @current-change="handleCurrentChange" />
  </page>
</template>
<script>
import { AgencyInfoApi, AgencyCustomerApi ,customerListApi} from "@/api";
export default {
  data() {
    return {
      queryParams:{
        fullName:'',
      },
      tableData: [],
      dialogVisible: false,
      agencyLevel: '',
      columns: [
        {
          label: "客户姓名",
           render: (h, { row }) => (
             <span>{row.sessionUser.fullName}</span>
          )

        },
        {
          label: "首次关联时间",
          prop: "createTime",
         formatter: row => {
            return this.$dateFilter(
              row.createTime,
              "yyyy-MM-dd hh:mm:ss"
            );
          }
          
        },
        {
          label: "最近下单时间",
          prop: "lastOrderTime",
            formatter: row => {
            return this.$dateFilter(
              row.lastOrderTime,
              "yyyy-MM-dd hh:mm:ss"
            );
          }
        },
        {
          label: "分销订单数",
          prop: "orderQuantity"
        },
        {
          label: "客户手机",
          prop: "name"
        },
        {
          label: "操作",
          align: "center",
          render: (h, { row }) => (
            <el-button size="mini" round onClick={()=>{
                this.changeStatus(row.customerId)
            }}>
              解除关联 
            </el-button>
          )
        }
      ],
      model: {},
      total: null,
      tableParams: {
        limit: 10,
        page: 1
      },
      queryParams: {}
    };
  },
  mounted() {
    this.getDetail();
    this.getCustorers();
  },
  methods: {
    async changeStatus(id){
      try {
        await customerListApi.delete({id: id});
        this.getCustorers();
      }catch (e) {
        this.$message.error(e.message);
      }
    },
    getDetail() {
      AgencyInfoApi.get({ userId: this.$route.params.id })
        .then(res => {
          this.model = res;
          this.agencyLevel = res.agencyLevel;
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "error"
          });
        });
    },
    getCustorers(params = Object.assign(this.tableParams, this.queryParams)) {
      _.extend(params,{agencyId:this.$route.params.id})
      customerListApi.query(params).then(res => {
        this.tableData = res.items;
        this.total = res.total;
      });
    },
    handleCurrentChange(val) {
      this.tableParams.page = val;
      this.getList();
    },
    changeLevel(){
      AgencyInfoApi.update({userId: this.$route.params.id,agencyLevel: this.agencyLevel}).then(res =>{
        this.$message({
          message: '成功',
          type: 'success'
        });
        this.dialogVisible = false;
        this.getDetail();
      }).catch(err =>{
        this.$message({
          message: err.message,
          type: 'error'
        });
      })
    }
  }
};
</script>
<style scoped>
.report {
  margin: 10px 0 20px;
  display: flex;
  justify-content: space-around;
  font-size: 16px;
}
</style>


