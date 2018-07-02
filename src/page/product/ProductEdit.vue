<template>
  <page>
    <el-row slot="header"
            :span="24">
      <el-col :span="22">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>商品编辑</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-form :model="form"
             ref="form"
             label-width="120px"
             :rules="rules"
             label-position="right">
      <el-form-item label="商品缩略图">
        <Upload v-model='form.coverImage'
                :data="{notCompress:true}"
                :limit='1'>
          <i class="el-icon-plus"></i>
        </Upload>
      </el-form-item>
      <el-form-item label="商品图片">
        <Upload v-model='form.medias'
                :data="{notCompress:true}"
                :limit='5'>
          <i class="el-icon-plus"></i>
        </Upload>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商品类别">
            <el-cascader :options="options"
                         change-on-select
                         :props="{value:'categoryId',label:'name',children:'children'}"
                         @active-item-change="change"
                         v-model="selectedOptions3">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品标签">
            <el-input v-model="form.tags"
                      placeholder="商品标签"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="销售类型">
            <el-radio-group v-model="form.goodsType">
              <el-radio label="SALE">消费商品</el-radio>
              <el-radio label="PRESALE">预售商品</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="规格/价格">
        <div v-if='form.goodsType == "SALE"'>
          <el-row>
            <el-col :span="4"
                    v-if='!consumList.length'>
              <el-button type="primary"
                         @click='gotoAdd'>
                <i class="el-icon-plus"></i>
              </el-button>
              <!-- <el-button @click='gotoReduce'
                                    type="primary">
                                <i class="el-icon-minus"></i>
                            </el-button> -->
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24"
                    v-for="(item,index) in consumList"
                    :key='index'>
              <ConsumProductForm :item='item'
                                 @saveForm='saveForm'
                                 @remove="formRemove"
                                 style="margin-bottom:20px"
                                 :index='index'
                                 :length='consumList.length'></ConsumProductForm>
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <el-row>
            <el-col :span="4"
                    v-if='!adviceList.length'>
              <el-button type="primary"
                         @click='gotoAddAdvance'>
                <i class="el-icon-plus"></i>
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24"
                    v-for="(item,index) in adviceList"
                    :key='index'>
              <AdvanceProductForm :item='item'
                                  @advanceFormSave='advanceFormSave'
                                  @advanceFormSaveRemove="advanceFormSaveRemove"
                                  style="margin-bottom:20px"
                                  :index='index'
                                  :length='adviceList.length'></AdvanceProductForm>
            </el-col>
          </el-row>
        </div>

      </el-form-item>
      <!-- <el-form-item label="状态">
                  <el-radio-group v-model="form.radio">
                    <el-radio label="3">上架</el-radio>
                    <el-radio label="6">下架</el-radio>
                </el-radio-group>
            </el-form-item> -->
      <el-row>
        <el-col :span="6">
          <el-form-item label="销量基数">
            <el-input v-model="form.salesVolume"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
  
      <el-row>
        <el-col :span="6">
          <el-form-item label="分销员销售提成">
            <el-input v-model="form.agencyPercent"
                      placeholder="请输入比例">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"> 
          <el-form-item label="门店直售提成">
            <el-input v-model='form.storeSalePercent' placeholder="请输入比例">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"> 
          <el-form-item label="提货服务提成">
            <el-input v-model='form.storePickupPercent' placeholder="请输入比例">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="产品">
        <Upload v-model='form.description'
                :data="{notCompress:true}"
                :limit='1'>
          <i class="el-icon-plus"></i>
        </Upload>
      </el-form-item>
      <el-form-item label="须知">
        <Upload v-model='form.noticeForUser'
                :data="{notCompress:true}"
                :limit='1'>
          <i class="el-icon-plus"></i>
        </Upload>
      </el-form-item>
      <el-form-item>
        <el-button @click='submit'>提交 </el-button>
      </el-form-item>

    </el-form>
  </page>
</template>
<script>
import ConsumProductForm from "./ConsumProductForm.vue";
import AdvanceProductForm from "./AdvanceProductForm.vue";
import WangEditor from "@/components/common/WangEditor.vue";
import { editProductApi, getAllTreeOfCategory, getProductApi } from "@/api";
export default {
  name: "product_create",
  components: {
    ConsumProductForm,
    AdvanceProductForm,
    WangEditor
  },
  mounted() {
    this.getAllTree();
  },
  methods: {
    hasValue(data, rule) {
      Object.keys(data).forEach(function(k) {
        if (rule.hasOwnProperty(k)) {
          rule[k] = data[k];
        }
        return true;
      });
    },
    getDetail() {
      getProductApi({ id: this.$route.params.id }).then(res => {
        this.hasValue(res, this.form);
        //  consumList
        
        if(res.coverImage){
            this.form.coverImage = [{ url: res.coverImage }];
        }else{
          this.form.coverImage  = []
        }
        if(res.noticeForUser){
            this.form.noticeForUser = [{ url: res.noticeForUser }];
        }else{
          this.form.noticeForUser  = []
        }
        if(res.description){
          this.form.description = [{ url: res.description }];
        }else{
          this.form.description = []
        }
        
        this.form.medias = this.form.medias.map(item => {
          return { url: item.mediaUrl, id: item.goodsMediaId };
        });

        var arr = [];
        if (this.form.goodsType == "SALE") {
          _.forEach(this.form.skus, res => {
            var obj = {
              // stock: res.stock,
              price: res.price/100,
              attrValue: res.attrs[0].attrValue,
              goodsSkuId: res.goodsSkuId,
              goodsSkuAttrId:res.attrs[0].goodsSkuAttrId,
              priceTicket:res.priceTicket/100
            };
            arr.push(obj);
          });
          this.consumList = arr;
        } else {

          _.forEach(this.form.skus, res => {
            var obj = {
              // stock: res.stock,
              price: res.price/100,
              originPrice: res.originPrice/100,
              attrValue: res.attrs[0].attrValue,
              goodsSkuId: res.goodsSkuId,
              goodsSkuAttrId:res.attrs[0].goodsSkuAttrId,
              priceTicket:res.priceTicket/100
           
            };
            arr.push(obj);
          });
          this.adviceList = arr;
        }

        this.getParentId(this.options, this.form.categoryId);
        this.getData(this.options, this.treeData[0].parentId);
        this.dataList.unshift(this.treeData[0].parentId);
        this.dataList.unshift(this.treeData[0].categoryId);
        this.selectedOptions3 = this.dataList.reverse();
        // console.log(this.dataList);
      });
    },
    getData(data, parentId) {
      var vm = this;
      if (data) {
        for (var i = 0; i < data.length; i++) {
          if (parentId == data[i].categoryId && data[i].parentId != 0) {
            vm.dataList.push(data[i].parentId);
            vm.getData(vm.options, data[i].parentId);
          }
          if (data[i].hasOwnProperty("children")) {
            vm.getData(data[i].children, parentId);
          }
        }
      }
    },
    getParentId(data, id) {
      var vm = this;
      if (data) {
        for (var i = 0; i < data.length; i++) {
          if (id == data[i].categoryId) {
            vm.treeData.push(data[i]);
          }
          if (data[i].hasOwnProperty("children")) {
            vm.getParentId(data[i].children, id);
          }
        }
      }
    },
    getNameById(data, id) {
      if (data) {
        var vm = this;
        for (var i = 0; i < data.length; i++) {
          if (id == data[i].categoryId) {
            vm.categary.push(data[i].name);
          }
          if (data[i].hasOwnProperty("children")) {
            vm.getNameById(data[i].children, id);
          }
        }
      }
    },
    getAllTree() {
      getAllTreeOfCategory().then(res => {
        this.$set(this, "options", res);
        this.getDetail();
      });
    },
    submit() {
      this.$refs["form"].validate(valid => {
        var id = this.selectedOptions3[this.selectedOptions3.length - 1];
        this.getNameById(this.options, id);
        this.form.categoryName = this.categary[0];
        this.form.categoryId = id;
        var arr = [];
        if (this.form.goodsType == "SALE") {
          _.forEach(this.consumList, res => {
            var obj = {
              priceTicket:res.priceTicket*100,
              price: res.price*100,
              originPrice: res.price*100,
              // stock: res.stock,
              goodsSkuId: res.goodsSkuId || "",
              attrs: [
                {
                  attrType: "SPEC",
                  attrLabel: "",
                  attrValue: res.attrValue,
                  goodsSkuId: res.goodsSkuId || "",
                    goodsSkuAttrId:res.goodsSkuAttrId|| ""
                }
              ]
            };
            arr.push(obj);
          });
        } else {
          _.forEach(this.adviceList, res => {
            var obj = {
              priceTicket:res.priceTicket*100,
              price: res.price*100,
              // stock: res.stock,
              goodsSkuId: res.goodsSkuId || "",
              originPrice: res.originPrice *100,
              attrs: [
                {
                  attrType: "SPEC",
                  attrLabel: "",
                  attrValue: res.attrValue,
                  goodsSkuId: res.goodsSkuId || "",
                  goodsSkuAttrId:res.goodsSkuAttrId|| ""
                }
              ]
            };
            arr.push(obj);
          });
        }
        var data = _.extend({ skus: arr });
        if (valid) {
          var obj = Object.assign(
            {},
            { id: this.$route.params.id },
            this.form,
            data
          );
          var form = _.clone(obj);
            if (form.coverImage.length) {
                form.coverImage = form.coverImage[0].hasOwnProperty("response")
            ? form.coverImage[0].response
            : form.coverImage[0].url.match(/download(\S*)/)[1];
            }else{
                form.coverImage = ''
            }
         if (form.description.length) {
          form.description = form.description[0].hasOwnProperty("response")
            ? form.description[0].response
            : form.description[0].url.match(/download(\S*)/)[1];
          }else{
            form.description = ''
          }
          if (form.noticeForUser.length) {
            form.noticeForUser = form.noticeForUser[0].hasOwnProperty( "response")
              ? form.noticeForUser[0].response
              : form.noticeForUser[0].url.match(/download(\S*)/)[1];
          }else{
            form.noticeForUser = ''
          }
          form.medias = form.medias.map(item => {
            if (item.hasOwnProperty("response")) {
              return { mediaUrl: item.response, mediaType: "STATIC_IMG" };
            } else {
              item.url = item.url.match(/download(\S*)/)[1];
              return {
                mediaUrl: item.url,
                mediaType: "STATIC_IMG",
                goodsMediaId: item.id
              };
            }
          });
        // var mdoel = _.clone(form);
        //   mdoel.agencyPercent = mdoel/100
        //   mdoel.storeSalePercent = mdoel/100
        //   mdoel.storePickupPercent = model/100
          editProductApi(form).then(res => {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.$router.go(-1);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    change(item) {
      console.log(item);
    },
    gotoAddAdvance() {
      var obj = {
        attrValue: "",
        price: "",
        // stock: "",
        originPrice: "",
        priceTicket:'',
      };
      this.adviceList.push(obj);
    },
    advanceFormSave(index, form) {
      //表单的保存
      this.adviceList[index] = form;
      if (this.adviceList.length - 1 == index) {
        this.adviceList.push({
          attrValue: "",
          price: "",
          // stock: "",
          originPrice: "",
          priceTicket:''
        });
      }
    },
    advanceFormSaveRemove(index) {
      this.adviceList.splice(index, 1);
    },
    saveForm(index, form) {
      //表单的保存
      this.consumList[index] = form;
      if (this.consumList.length - 1 == index) {
        this.consumList.push({ weight: "", price: "", quntity: "",priceTicket:'' });
      }
    },
    formRemove(index) {
      //表单的删除
      var arr = this.deepCopy([], this.consumList);
      arr.splice(index, 1);
      this.consumList = [];
      this.consumList = arr;
      console.log(arr);
    },
    deepCopy(target, ...options) {
      if (!options.length) return target;
      options.forEach(option => {
        Object.keys(option).forEach(key => {
          if (option[key] instanceof Array) {
            target[key] = this.deepCopy([], option[key]);
          } else if (option[key] instanceof Object) {
            target[key] = this.deepCopy({}, option[key]);
          } else {
            target[key] = option[key];
          }
        });
      });
      return target;
    },
    gotoReduce() {},
    gotoAdd() {
      var obj = {
        // stock: "",
        price: "",
        attrValue: "",
        priceTicket:''
      };
      this.consumList.push(obj);
    }
  },
  data() {
    return {
      dataList: [],
      categary: [],
      treeData: [],
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        tags: [{ required: true, message: "请输入商品标签", trigger: "blur" }]
      },
      consumList: [],
      adviceList: [],
      options: [],
      selectedOptions3: [],
      form: { 
        storeSalePercent:'',// 门店直售提成
        storePickupPercent:'',//门店提货提成
        description: [], //产品描述
        noticeForUser: [], //使用须知
        agencyPercent: "", //分销比例
        skus: [],
        coverImage: [],
        medias: [],
        // winningRate:'',
        // radio: "3",
        title: "",
        tags: "",
        salesVolume: "",
        categoryId: "",
        categoryName: "",
        goodsType: "SALE"
        // thumb: [],
        // pictureList: []
      }
    };
  }
};
</script>

