<template>
  <div>
    <div style="position: relative">
      <div class="m-input">
        <input
            ref="input"
            :maxlength="maxlength"
            class="text-align-right"
            :value="modelValue"
            @input="onInputNumber($event)"
            v-bind:class="{invalid: isError,}"
            :placeholder="placeholder"
            @change="$emit('onChange', modelValue)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MSInputNumber",
  emits: ["update:modelValue"],
  data() {
    return {};
  },
  props: {
    //placeholder của input
    placeholder: {
      type: String,
      default: "",
    },
    //input này có bắt buộc không?
    isRequire: {
      type: Boolean,
      default: false,
    },
    //số ký tự có thể nhập là bao nhiêu?
    maxlength: {
      type: Number,
      default: 255,
    },
    //giá trị khởi tạo cho input
    modelValue: {
      type: String,
      default: "",
    },
    //thêm class lỗi nếu lỗi
    isError: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**-----------------------------------------------------------
     * Hàm thực hiện format định dạng số ngay trong khi nhập liệu.
     * Author: quyetkaito (27/03/2022).
     -----------------------------------*/
    onInputNumber(event) {
      //gọi hàm format định dạng số ngay khi nhập liệu từ base
      this.onNumberInput(event);

      //cập nhật lại vào value
      this.$emit("update:modelValue", event.target.value);
    },
    /**--------------------------------
     * Hàm dùng để focus vào input.
     * Author: quyetkaito (03/03/2022)
     ----------------------------------*/
    focus: function () {
      this.$refs.input.focus();
    },
    /**------------------------------------
     * Hàm dùng để thêm css lỗi cho input.
     * Author: quyetkaito (03/03/2022)
     --------------------------------------*/
    addError: function () {
      this.$refs.input.classList.add("error");
      this.$refs.input.setAttribute(
          "title",
          `${this.labelText} không được bỏ trống`
      );
    },
    /**--------------------------
     * Hàm thêm border đỏ cho input
     * Author: quyetkaito (20/03/2022)
     -------------------------*/
    addRedBorder: function () {
      this.$refs.input.classList.add("error");
    },

    /**------------------------------------
     * Hàm dùng để bỏ css lỗi cho input.
     * Author: quyetkaito (03/03/2022)
     --------------------------------------*/
    removeError: function () {
      this.$refs.input.classList.remove("error");
      this.$refs.input.setAttribute("title", "");
    },

    onNumberInput(event) {
      try {
        //lấy ra giá trị của ô input hiện tại
        let value = event.target.value;
        if (event.data === ",") {
          //nếu người dùng nhập dấu ',' và không có dấu ',' nào đã tồn tại => đang nhập số thập phân
          if ((value.match(/,/g) || []).length <= 1) {
            console.log("chưa phải số thập phân");
            return; //cho nhập liệu tiếp
          }
        }
        //format số
        event.target.value = this.formatCurrency(value);
      } catch (error) {
        console.log(error);
      }
    },

    /**--------------------------------------
     * Hàm format định dạng tiền tệ Việt Nam. => 123.123.123,4869
     * @param {String} money dạng chuỗi, có thể chứa cả dấu chấm dấu phẩy, ký tự chữ
     * @returns: kết quả dạng String.
     * Author: quyetkaito (27/03/2022)
     ----------------------------------------*/
    formatCurrency(money) {
      try {
        let moneyFormatted;
        //nếu money có giá trị
        if (money) {
          //nếu không phải là số (Not A Number)
          if (isNaN(money)) {
            //khi có 2 dấu '.' trở lên thì không phải là số nữa
            // loại bỏ kí tự không phải số
            money = money.replaceAll(".", "");
            //nếu có dấu phẩy => đang nhập số thập phân
            money = money.replaceAll(",", ".");
            money = money.replaceAll(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
            //format lại
            moneyFormatted = new Intl.NumberFormat("vi-VN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 4, //phần thập phân tối đa 4 số
            }).format(money);
            return moneyFormatted;
          } else {
            //nếu đã là số rồi (có 1 dấu '.' vẫn là số)
            money = money.replaceAll(".", "");
            //format lại
            moneyFormatted = new Intl.NumberFormat("vi-VN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 4,
            }).format(money);
            return moneyFormatted;
          }
        } else {
          return "";
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style></style>