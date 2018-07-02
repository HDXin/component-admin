<template>
  <div>
    <input type="text"
           v-focus
           v-model="inputModel"
           style="width:40px"
           :disabled='isDisabled'
           @blur="gotoBlur">


  </div>
</template>
<script>
import { updateAgencyPercentApi } from "@/api";
export default {
  props: ["index", "length", "item", "disabled", "row", "type"],
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  watch: {
    item: {
      handler(val) {
        this.$nextTick(() => {
          this.form = val;
        });
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    isDisabled: {
      get() {
        return !this.disabled;
      },
      set(val) {
        this.$emit("update:disabled", val);
      }
    },
    inputModel: {
      get() {
        return this.item;
      },
      set(val) {
        this.$emit("update:item", val);
      }
    }
  },
  methods: {
    format(value) {
      if (!value) {
        this.$message({
          type: "error",
          message: "请输入数字"
        });
        return false;
      } else {
        var values = Number(value);
        if (!Number(values)&&value!=0) {
          this.$message({
            type: "error",
            message: "请输入数字"
          });
          return false;
        }
        if (values < 0 || values > 100) {
          this.$message({
            type: "error",
            message: "请输入大于0的数字或者小余100的数字"
          });
          return false;
        }
        return true;
      }
      return true;
    },
    gotoBlur() {
      if (this.format(this.inputModel)) {
        this.$emit("update:disabled", false);
        if (this.type == "agencyPercent") {
          var obj = {
            id: this.row.goodsId,
            agencyPercent: this.inputModel,
            goodsType: this.row.goodsType
          };
        }
        if (this.type == "storePickupPercent") {
          var obj = {
            id: this.row.goodsId,
            storePickupPercent: this.inputModel,
            goodsType: this.row.goodsType
          };
        }
        if (this.type == "storeSalePercent") {
          var obj = {
            id: this.row.goodsId,
            storeSalePercent: this.inputModel,
            goodsType: this.row.goodsType
          };
        }

        updateAgencyPercentApi(obj).then(res => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
        });
      }
    },
    gotoAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("advanceFormSave", this.index, this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    gotoSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$emit("advanceFormSave", this.index, this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    gotoRemove() {
      this.$emit("advanceFormSaveRemove", this.index);
    }
  },
  data() {
    var amounts = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入数字"));
      } else {
        var values = Number(value);
        if (!Number(values)) {
          callback(new Error("请输入数字"));
        }
        if (values < 0) {
          callback(new Error("请输入大于0的数字"));
        }
        callback();
      }
      callback();
    };
    var quantity = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入红包数量"));
      } else {
        var values = Number(value);
        if (!Number.isInteger(values)) {
          callback(new Error("请输入数字"));
        }
        if (values < 0) {
          callback(new Error("请输入大于0的数字"));
        }
        callback();
      }
      callback();
    };
    return {
      rules: {
        attrValue: [
          { required: true, message: "请输入商品规格", trigger: "blur" }
        ],
        price: [{ required: true, validator: amounts, trigger: "blur" }],
        priceTicket: [{ required: true, validator: amounts, trigger: "blur" }],
        originPrice: [{ required: true, validator: amounts, trigger: "blur" }]
      },
      form: {
        attrValue: "",
        price: "",
        priceTicket: "",
        originPrice: ""
      }
    };
  }
};
</script>

