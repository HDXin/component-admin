<template>
  <page>
    <el-row slot="header"
            :span="24">
      <el-col :span="22">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>商品新增</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-form :model="form"
             ref="form"
             label-width="100px"
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
        <div v-if='form.goodsType=="SALE"'>
          <el-row>
            <el-col :span="4"
                    v-if='!consumList.length'>
              <el-button type="primary"
                         @click='gotoAdd'>
                <i class="el-icon-plus"></i>
              </el-button>

            </el-col>
          </el-row>
          <el-row>
            <el-col
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
        <div v-if='form.goodsType=="PRESALE"'>
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
        <el-radio-group v-model="form.shelves">
            <el-radio label="true">上架</el-radio>
            <el-radio label="false">下架</el-radio>
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
          <el-form-item label="分销比例">
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
    <!-- <CitySelect></CitySelect> -->
  </page>
</template>
<script>
import ConsumProductForm from "./ConsumProductForm.vue";
import AdvanceProductForm from "./AdvanceProductForm.vue";
import WangEditor from "@/components/common/WangEditor.vue";
// import CitySelect from "@/components/common/CitySelect.vue";
import { createProductApi, getAllTreeOfCategory } from "@/api";

export default {
  name: "product_create",
  components: {
    ConsumProductForm,
    AdvanceProductForm,
    WangEditor
    // CitySelect
  },
  mounted() {
    this.getAllTree();
  },
  methods: {
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
              priceTicket: res.priceTicket*100,
              price: res.price*100,
              originPrice: res.price*100,
              // stock: res.stock,
              attrs: [
                {
                  attrType: "SPEC",
                  attrLabel: "",
                  attrValue: res.attrValue
                }
              ]
            };
            arr.push(obj);
          });
        } else {
          console.log(this.adviceList);
          _.forEach(this.adviceList, res => {
            var obj = {
              price: res.price*100,
              priceTicket: res.priceTicket*100,
              originPrice: res.originPrice*100,
              attrs: [
                {
                  attrType: "SPEC",
                  attrLabel: "",
                  attrValue: res.attrValue
                }
              ]
            };
            arr.push(obj);
          });
        }
        var form = {};
        _.extend(form, { skus: arr }, this.form);
        form.coverImage = form.coverImage[0].response;
        if (form.description.length) {
          form.description = form.description[0].response;
        } else {
          form.description = "";
        }
        if (form.noticeForUser.length) {
          form.noticeForUser = form.noticeForUser[0].response;
        } else {
          form.noticeForUser = '';
        }
        form.medias = form.medias.map(item => {
          return { mediaUrl: item.response, mediaType: "STATIC_IMG" };
        });
        if (valid) {
          createProductApi(form).then(res => {
            this.$message({
              type: "success",
              message: "新增成功"
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
         priceTicket: "",
        originPrice: ""
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
          priceTicket: "",
          originPrice: ""
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
        this.consumList.push({
          attrValue: "",
          price: "",
          priceTicket: "",
        });
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
        priceTicket: "",
        price: "",
        attrValue: ""
      };
      this.consumList.push(obj);
    }
  },
  data() {
    return {
      categary: [],
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
        shelves:'UN_SHELVES',
        medias: [],
        coverImage: [],
        // winningRate:'',
        // radio: "3",
        // shelves:'true',
        goodsType: "SALE",
        title: "",
        tags: "",
        salesVolume: "",
        categoryId: "",
        categoryName: ""
        // thumb: [],
        // pictureList: []
      }
    };
  }
};
</script>

