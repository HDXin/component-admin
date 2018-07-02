<template>
    <div>
        <el-select v-model="model.provinceId"
                   @change="getCityList"
                   placeholder="">
            <el-option v-for="item in provinceList"
                       :key="item.code"
                       :value="item.code"
                       :label="item.name"></el-option>
        </el-select>
        <el-select v-model="model.cityId"
                   @change="getCountyList"
                   placeholder="">
            <el-option v-for="item in cityList"
                       :key="item.code"
                       :value="item.code"
                       :label="item.name"></el-option>
        </el-select>
        <el-select v-model="model.countyId"
                   placeholder="">
            <el-option v-for="item in countyList"
                       :key="item.code"
                       :value="item.code"
                       :label="item.name"></el-option>
        </el-select>
    </div>
</template>
<script>
import {
  StoreApi,
  getProvinceListApi,
  getCityListApi,
  getCountyListApi
} from "@/api";
export default {
  props: ["provinceId", "cityId", "countyId", "address"],
  data() {
    return {
      provinceList: [],
      cityList: [],
      countyList: []
    };
  },
  mounted() {
    this.getProvinceList();
  },
  computed: {
      provinceCode:{
          get(){
              return this.provinceId
          },
          set(){
              
          }
      }
  },
  watch: {
    provinceId(code) {
      this.getCityList(code);
    },
    cityId(code) {
      this.getCountyList(code);
    }
  },
  methods: {
    getProvinceList() {
      getProvinceListApi({ code: 1 }).then(res => {
        this.provinceList = res;
      });
    },
    getCityList(code) {
      getCityListApi({ code: code }).then(res => {
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
      getCountyListApi({ code: code }).then(res => {
        this.countyList = res;
        let flag = !res.find(item => {
          return this.model.countyId == item.code;
        });
        if (flag) {
          this.model.countyId = "";
        }
      });
    }
  }
};
</script>

