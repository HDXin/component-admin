<template>
  <page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item to="/store/store_management">门店管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="14"
              class="text-right">
        <el-button type="primary"
                   size="small"
                   @click="$router.push({name:'store_goods_select',
                            params:{id:$route.params.id},
                            query:{storeName:$route.query.storeName}})">
          新增商品
        </el-button>
      </el-col>
    </el-row>
       <el-form class="search-bar" :model="queryParams"
                 :inline="true">
          <el-row :gutter="10">
            <el-col :span="5">
              <el-input placeholder="请输入内容" v-model="queryParams.title">
                <template slot="prepend">商品名称</template>
              </el-input>
            </el-col>

            <el-col :span="3">
              <el-select v-model="queryParams.goodsType" placeholder="销售类型">
                <el-option label='预售商品' value='PRESALE'></el-option>
                <el-option label='销售商品' value='SALE'></el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select v-model="queryParams.shelves" placeholder="状态">
                  <el-option label='未上架'
                             value='UN_SHELVES'></el-option>
                  <el-option label='已上架'
                             value='ON_SHELVES'></el-option>
                  <el-option label='下架'
                             value='OFF_SHELVES'></el-option>
              </el-select>
            </el-col>

            <el-col :span="4">
              <el-cascader placeholder="商品类别"
                           :options="options"
                           change-on-select
                           :props="{value:'categoryId',label:'name',children:'children'}"
                           @active-item-change="change"
                           v-model="selectedOptions3">
              </el-cascader>
            </el-col>

            <el-col :span="4">
              <el-button type="primary"
                           @click='search'>搜索</el-button>
              <el-button @click='reset'>重置</el-button>
            </el-col>
          </el-row>
        </el-form>
    <k-table :data="tableData"
             :columns="columns"
             :total="total"
             @current-change="handleCurrentChange" />
    <transfer :visible.sync="transferDialog"
              :infos="infos" />
    <edit-stock :visible.sync="stockDialog"
                :type="type"
                @on-success="getList"
                :infos="infos" />
  </page>
</template>
<script>
import Transfer from "@/components/store/Transfer";
import EditStock from "@/components/store/EditStock";
import { StoreSkuApi ,qrCodeStreamApi,getAllTreeOfCategory} from "@/api";
import { mixin } from "@/mixins/search";
export default {
  components: {
    Transfer,
    EditStock
  },
  mixins: [mixin],
  data() {
    return {
      options:[],
      selectedOptions3:[],
      transferDialog: false,
      stockDialog: false,
      queryParams: {
        shelves: "",
        title: "",
        tag: "",
        goodsType: ""
      },
      tableParams: {
        limit: 10,
        page: Number(this.$route.query.page)
          ? Number(this.$route.query.page)
          : 1,
        storeId: this.$route.params.id
      },
      tableData: [],
      infos: {},
      type: "",
      columns: [
        {
          label: "ID",
          prop: "goodsId",
          width: 70
        },
        {
          label: "缩略图",
          width: 100,
          // prop: "name"
          render: (h, { row }) => {
            return <images src={row.coverImage} style="width:100%" />;
          }
        },
        {
          label: "二维码",
          width: 100,
          // prop: "name"
          render: (h, { row }) => {
            return <images src={row.qrcode} style="width:100%" />;
          }
        },
        {
          label: "名称",
          prop: "title"
        },
        {
          label: "销售类型",
          width: 100,
          align: "center",
          prop: "goodsType",
          formatter: row => this.$goodsTypeFilter(row.goodsType)
        },
        {
          label: "商品类别",
          width: 100,
          align: "center",
          prop: "categoryName"
        },
        {
          label: "规格",
          width: 100,
          align: "center",
          prop: "weightSpec"
        },
        {
          label: "单价",
          width: 100,
          align: "right",
          prop: "unitPrice",
          formatter: row => this.$currency(row.unitPrice / 100)
        },
        {
          label: "库存",
          width: 100,
          align: "center",
          prop: "stock"
        },
        {
          label: "操作",
          align: "center",
          width: 250,
          render: (h, { row }) => (
            <div>
              {row.storeType == "HEAD_OFFICE" ? (
                <div>
                  <el-button
                    size="mini"
                    round
                    onClick={() => this.openEditStcok("plus", row)}
                  >
                    库存增加
                  </el-button>&nbsp;
                  <el-button
                    size="mini"
                    round
                    onClick={() => this.openEditStcok("minus", row)}
                  >
                    库存减少
                  </el-button>&nbsp;
                </div>
              ) : (
                ""
              )}
              <el-button
                size="mini"
                round
                onClick={() => this.openTransfer(row)}
              >
                库存调拨
              </el-button>&nbsp;
              <el-button
                size="mini"
                round
                onClick={() =>
                  this.$router.push({
                    name: "store_goods_transfer_log",
                    params: {
                      storeId: this.$route.params.id,
                      skuId: row.skuId
                    },
                    query: {
                      storeName: this.$route.query.storeName
                    }
                  })}
              >
                库存记录
              </el-button>&nbsp;
              <el-button
                size="mini"
                round
                class={{ "text--danger": row.shelves == "ON_SHELVES" }}
                onClick={() => this.shelves(row)}
              >
                {row.shelves == "UN_SHELVES" || row.shelves == "OFF_SHELVES"
                  ? "上架"
                  : "下架"}
              </el-button>&nbsp;
              <el-button
                size="mini"
                round
                class="text--danger"
                onClick={() => this.remove(row.id)}
              >
                移除
              </el-button>
            </div>
          )
        }
      ]
    };
  },
  mounted() {
    this.getAllTree()
  },
  
  
  methods: {
     reset() {
      if (this.selectedOptions3) {
        this.selectedOptions3 = [];
      }

      this.tableParams = {
        limit: 10,
        page: 1
      };
      this.queryParams = {
        shelves: "",
        title: "",
        goodsType: ""
      };

      this.$router.push({ path: this.$route.path, query: {} });
      this.getList({ limit: 10, page: 1, storeId: this.$route.params.id });
    },
     getAllTree() {
      getAllTreeOfCategory().then(res => {
        this.$set(this, "options", res);
      });
    },
     change(item) {
      console.log(item);
    },
    openTransfer(row) {
      this.transferDialog = true;
      this.infos = row;
    },
    openEditStcok(type, row) {
      this.stockDialog = true;
      this.type = type;
      this.infos = row;
    },
    getList(params = Object.assign({}, this.tableParams, this.queryParams,)) {
     
      _.extend(params,{storeId:this.$route.params.id})
    if (this.selectedOptions3) {
        var id = this.selectedOptions3[this.selectedOptions3.length - 1];
        _.extend(params, { categoryId: id });
      }
      StoreSkuApi.query(params).then(res => {
        // this.tableData = res.items;
        this.total = res.total;
        // _.forEach(this.tableData,function(res=>{

        // })
        var arr =[]
        res.items.map(items=>{
          var  str = 'http://admin.dsabc.dev.sudaotech.com/api/service/image/qrCodeStream?content='+ 'storeId:'+items.storeId+';'+'skuId:'+items.skuId
          items = _.extend(items,{qrcode:str})
            //  qrCodeStreamApi(str).then(res=>{
            //    items = _.extend(items,{qrcode:res})
            //     arr.push(items)
            // })
        })
        this.tableData  =  res.items
       console.log(this.tableData)
         
       
      });
    },
    remove(id) {
      this.$confirm("您确定要移除该SKU吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          StoreSkuApi.delete({ id: id })
            .then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getList();
            })
            .catch(err => {
              this.$message({
                message: err.message,
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            message: "取消",
            type: "info"
          });
        });
    },
    shelves(row) {
      let shelve =
        row.shelves == "UN_SHELVES" || row.shelves == "OFF_SHELVES"
          ? "ON_SHELVES"
          : "OFF_SHELVES";
      let title =
        row.shelves == "UN_SHELVES" || row.shelves == "OFF_SHELVES"
          ? "您确定要上架该SKU吗？"
          : "您确定要下架该SKU吗？";
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          StoreSkuApi.update({ id: row.id, shelves: shelve })
            .then(res => {
              this.$message({
                message: "成功",
                type: "success"
              });
              this.getList();
            })
            .catch(err => {
              this.$message({
                message: err.message,
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            message: "取消",
            type: "info"
          });
        });
    }
  }
};
</script>

