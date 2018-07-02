<template>
    <div>
          <!-- 自提 -->
    <el-row class="grid-table-border" v-if="dataList.shippingType == 'PICK_UP'">
        <el-col :span="8">
            <el-form-item label="订单号">{{dataList.saleOrderNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="订单日期">{{dataList.createTime|dateFilter('yyyy-MM-dd hh:mm:ss')}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="分销员" v-if='dataList.agencyInfo'>{{dataList.agencyInfo.agencyName}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="关联订单">
              
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="订单类型">
                {{dataList.orderType|orderType}}
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="提货方式">{{dataList.shippingType|ShippingType}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="剩余支付">{{dataList.finalTotalAmount-dataList.paidAmount}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="客户名称">{{dataList.customer.fullName}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="联系电话">{{dataList.customer.cellphone}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="自提门店 ">{{dataList.storeName}}</el-form-item>
        </el-col>
         <el-col :span="24">
                <el-form-item label="备注">{{dataList.paymentRemark}}</el-form-item>
         </el-col>
    </el-row>
    <!-- 未知 -->
    <el-row class="grid-table-border" v-if="dataList.shippingType == 'UNKNOWN'"> 
        <el-col :span="8">
  
            <el-form-item label="订单号">{{dataList.saleOrderNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="订单日期">{{dataList.createTime|dateFilter('yyyy-MM-dd hh:mm:ss')}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="分销员" v-if='dataList.agencyInfo'>{{dataList.agencyInfo.agencyName}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="订单类型">
                {{dataList.orderType|orderType}}
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="提货方式">{{dataList.shippingType|ShippingType}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="客户名称">{{dataList.customer.fullName}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="联系电话">{{dataList.customer.cellphone}}</el-form-item>
        </el-col>
         <el-col :span="16"></el-col>
         <el-col :span="24">
                <el-form-item label="备注">{{dataList.paymentRemark}}</el-form-item>
         </el-col>
    
    </el-row>
    <!-- 快递 -->
    <el-row class="grid-table-border" v-if="dataList.shippingType == 'MAIL'"> 
        <el-col :span="8">
            <el-form-item label="订单号">{{dataList.saleOrderNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="订单日期">{{dataList.createTime|dateFilter('yyyy-MM-dd hh:mm:ss')}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="分销员" v-if='dataList.agencyInfo'>{{dataList.agencyInfo.agencyName}}</el-form-item>
        </el-col>
          <el-col :span="8">
            <el-form-item label="关联订单"></el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="订单类型">
                {{dataList.orderType|orderType}}
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="提货方式">{{dataList.shippingType|ShippingType}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="客户名称">{{dataList.customer.fullName}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="联系电话">{{dataList.customer.cellphone}}</el-form-item>
        </el-col>
         <el-col :span="8">
            <el-form-item label="收货人">{{dataList.receiver}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="收货人联系电话">{{dataList.cellphone}}</el-form-item>
        </el-col>
        <el-col :span="16">
            <el-form-item label="收货地址">{{dataList.provinceName}} {{dataList.cityName}} {{dataList.countyName}} {{dataList.address}}</el-form-item>
        </el-col>
         <el-col :span="24">
                <el-form-item label="备注">{{dataList.paymentRemark}}</el-form-item>
         </el-col>
    
    
    </el-row>
    <!-- 未知 -->
    <el-row class="grid-table-border" v-if="dataList.shippingType == 'PERSENT'"> 
        <el-col :span="8">
  
            <el-form-item label="订单号">{{dataList.saleOrderNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="订单日期">{{dataList.createTime|dateFilter('yyyy-MM-dd hh:mm:ss')}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="分销员" v-if='dataList.agencyInfo'>{{dataList.agencyInfo.agencyName}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="订单类型">
                {{dataList.orderType|orderType}}
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="提货方式">{{dataList.shippingType|ShippingType}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="客户名称">{{dataList.customer.fullName}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="联系电话">{{dataList.customer.cellphone}}</el-form-item>
        </el-col>
          <el-col :span="8">
            <el-form-item label="收货人">{{dataList.receiver}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="收货人联系电话">{{dataList.cellphone}}</el-form-item>
        </el-col>
        <el-col :span="16">
            <el-form-item label="收货地址">{{dataList.provinceName}} {{dataList.cityName}} {{dataList.countyName}} {{dataList.address}}</el-form-item>
        </el-col>
         <el-col :span="24">
                <el-form-item label="备注">{{dataList.paymentRemark}}</el-form-item>
         </el-col>
    </el-row>
         <!-- 店销 -->
    <el-row class="grid-table-border" v-if="dataList.shippingType == 'STORE_SALE'"> 
        <el-col :span="8">
  
            <el-form-item label="订单号">{{dataList.saleOrderNo}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="订单日期">{{dataList.createTime|dateFilter('yyyy-MM-dd hh:mm:ss')}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="订单类型">
                {{dataList.orderType|orderType}}
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="提货方式">{{dataList.shippingType|ShippingType}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="客户名称">{{dataList.customer.fullName}}</el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="联系电话">{{dataList.customer.cellphone}}</el-form-item>
        </el-col>
           <el-col :span="8">
            <el-form-item label="销售门店">{{dataList.storeName}}</el-form-item>
        </el-col>
         <el-col :span="24">
                <el-form-item label="备注">{{dataList.paymentRemark}}</el-form-item>
         </el-col>
    </el-row>
    
   </div>
</template>
<script>
export default {
   props:['dataList'],
   data(){
       return {
           items:{

           }
       }
   },
   methods:{

   },
   filters: {
       orderType:function(type){
           return{
               SALE:'销售商品',
               PRESALE:'预售商品'
           }[type]
       }
   },
   watch: {
       'dataList':function(newValue,oldValue){
           console.log(newValue)
        //    this.items = newValue
       }
   }
}
</script>

