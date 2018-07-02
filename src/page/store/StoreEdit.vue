<template>
  <page>
    <el-row slot="header">
      <el-col :span="10">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item to="/store/store_management">门店管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.params.id?'编辑':'新增'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="1"
              :span="20">
        <el-form :model="model"
                 ref="form"
                 :rules="rules"
                 label-width="150px">
          <el-form-item label="门店缩略图"
                        prop="coverImage"
                        required>
            <Upload :limit="1"
                    :data="{notCompress:true}"
                    v-model="model.coverImage">
              <i class="el-icon-plus"></i>
            </Upload>
          </el-form-item>

          <el-form-item label="门店图片"
                        prop="images"
                        required>
            <Upload :limit="5"
                    :data="{notCompress:true}"
                    v-model="model.images">
              <i class="el-icon-plus"></i>
            </Upload>
          </el-form-item>
          <k-form-item label="门店名称"
                       v-model="model.storeName"
                       prop="storeName"></k-form-item>
          <el-form-item label="门店地址"
                        required>
            <el-form-item prop="provinceId"
                          style="display:inline-block">
              <el-select v-model="model.provinceId"
                         @change="getCityList"
                         placeholder="">
                <el-option v-for="item in provinceList"
                           :key="item.code"
                           :value="item.code"
                           :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="cityId"
                          style="display:inline-block">
              <el-select v-model="model.cityId"
                         @change="getCountyList"
                         placeholder="">
                <el-option v-for="item in cityList"
                           :key="item.code"
                           :value="item.code"
                           :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="countyId"
                          style="display:inline-block">
              <el-select v-model="model.countyId"
                         @change="getCounty"
                         placeholder="">
                <el-option v-for="item in countyList"
                           :key="item.code"
                           :value="item.code"
                           :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="display:inline-block" prop="address">
              <el-input v-model="model.address" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="经纬度" required>
            <label for="">经度</label>
            <el-form-item style="display:inline-block" prop="lon">
              <el-input v-model.number="model.lon" placeholder="" type="number"></el-input>
            </el-form-item>
            <label for="">纬度</label>
            <el-form-item style="display:inline-block" prop="lat">
              <el-input v-model.number="model.lat" placeholder="" type="number"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="营业时间"
                        required>
            <el-form-item style="display:inline-block"
                          prop="openingStart">
              <el-time-select v-model="model.openingStart"
                              :picker-options="{
                                  start: '07:00',
                                  step: '00:05',
                                  end: '22:30'
                              }"
                              placeholder=""></el-time-select>
            </el-form-item>
            <label>至</label>
            <el-form-item style="display:inline-block"
                          prop="openingEnd">
              <el-time-select v-model="model.openingEnd"
                              :picker-options="{
                                  start: '07:00',
                                 step: '00:05',
                                  end: '22:30',
                                  minTime: model.openingStart
                              }"
                              placeholder=""></el-time-select>
            </el-form-item>
          </el-form-item>
          <k-form-item label="联系电话"
                       prop="tel"
                       v-model="model.tel"></k-form-item>
          <el-form-item label="商家介绍">
            <el-input v-model="model.description"
                      type="textarea"
                      :rows="6"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="model.storeStatus">
              <el-radio label="ENABLE">正常</el-radio>
              <el-radio label="DISABLE">停运</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submit"
                       :loading="loading">{{$route.params.id?'保存':'提交'}}
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page>
</template>
<script>
  import {
    StoreApi,
    getProvinceListApi,
    getCityListApi,
    getCountyListApi
  } from "@/api";

  export default {
    data() {
      return {
        model: {
          coverImage: [],
          storeName: "",
          openingStart: "",
          openingEnd: "",
          tel: "",
          description: "",
          provinceId: "",
          cityId: "",
          countyId: "",
          storeStatus: 'ENABLE',
          address: '',
          lon: '',
          lat: ''
        },
        fileList: [],
        loading: false,
        rules: {
          storeName: [{required: true, message: "请输入门店名称", trigger: "blur"}],
          openingStart: [
            {
              required: true,
              message: "请选择门店营业的开始时间",
              trigger: "change"
            }
          ],
          openingEnd: [
            {
              required: true,
              message: "请选择门店营业的结束时间",
              trigger: "change"
            }
          ],
          tel: [{required: true, message: "请输入联系号码", trigger: "change"}],
          provinceId: [
            {
              required: true,
              message: "请选择门店所在省份",
              trigger: "change",
              type: "number"
            }
          ],
          cityId: [
            {
              required: true,
              message: "请选择门店所在市",
              trigger: "change",
              type: "number"
            }
          ],
          countyId: [
            {
              required: true,
              message: "请选择门店所在区",
              trigger: "change",
              type: "number"
            }
          ],
          address: [
            {
              required: true,
              message: "请输入门店详细地址",
              trigger: "blur",
            }
          ],
          lon: [
            {
              required: true,
              message: "请输入经度",
              trigger: "blur",
              type: 'number'
            }
          ],
          lat: [
            {
              required: true,
              message: "请输入纬度",
              trigger: "blur",
              type: 'number'
            }
          ]
        },
        provinceList: [],
        cityList: [],
        countyList: []
      };
    },
    mounted() {
      if (this.$route.params.id !== undefined) {
        this.getInfo();
      }
      this.getProvinceList();
    },
    methods: {
      getProvinceList() {
        getProvinceListApi({parentCode: 1}).then(res => {
          this.provinceList = res;
        });
      },
      getCityList(code) {
        if (this.provinceList.length) {
          this.model.provinceName = this.provinceList.find(item => {
            return item.code == code;
          }).name;
        }

        getCityListApi({parentCode: code}).then(res => {
          this.cityList = res;
          let flag = !res.find(item => {
            return this.model.cityId == item.code;
          });
          if (flag) {
            this.model.cityId = "";
            this.model.countyId = "";
            this.countyList = [];
          }
        });
      },
      getCountyList(code) {
        if (this.cityList.length) {
          this.model.cityName = this.cityList.find(item => {
            return item.code == code;
          }).name;
        }
        getCountyListApi({parentCode: code}).then(res => {
          this.countyList = res;
          let flag = !res.find(item => {
            return this.model.countyId == item.code;
          });
          if (flag) {
            this.model.countyId = "";
          }
        });
      },
      getCounty(code) {
        if (this.countyList.length) {
          this.model.countyName = this.countyList.find(item => {
            return item.code == code;
          }).name;
        }
      },
      getInfo() {
        StoreApi.get({storeId: this.$route.params.id})
          .then(res => {
            res.images = res.images
              ? res.images.map(item => {
                return {url: item};
              })
              : [];


            res.coverImage = res.hasOwnProperty('coverImage') ? [{url: res.coverImage}] : []
            this.model = res;
            this.model.lon = Number(this.model.lon)
            this.model.lat = Number(this.model.lat)
            this.getCityList(res.provinceId);
            this.getCountyList(res.cityId);
          })
          .catch(err => {
            this.$message({
              message: err.message,
              type: "error"
            });
          });
      },

      submit() {
        this.$refs.form.validate(valid => {
          if (!valid) return false;
          this.loading = true;
          let params = Object.assign({}, this.model);
          params.images = params.images.map(item => {
            return item.response || item.url.split("download")[1];
          });
          console.log(params)
          // params.coverIamge = params.coverIamge.map(item => {
          //   return item.response || item.url.split("download")[1];
          // });
          params.coverImage = params.coverImage[0].hasOwnProperty("response")
            ? params.coverImage[0].response
            : params.coverImage[0].url.match(/download(\S*)/)[1];
          if (this.$route.params.id) {
            this.update(params);
          } else {
            this.create(params);
          }
        });
      },
      create(params) {
        StoreApi.create(params)
          .then(res => {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.loading = false;
            this.$router.go(-1);
          })
          .catch(err => {
            this.loading = false;
            this.$message({
              message: err.message,
              type: "error"
            });
          });
      },
      update(params) {
        StoreApi.update(params)
          .then(res => {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.loading = false;
            this.$router.go(-1);
          })
          .catch(err => {
            this.loading = false;
            this.$message({
              message: err.message,
              type: "error"
            });
          });
      }
    }
  };
</script>
