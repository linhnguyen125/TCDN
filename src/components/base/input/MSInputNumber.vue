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
            :disabled="disabled"
            :placeholder="placeholder"
            @change="$emit('onChange', modelValue)"
            @blur="onBlur"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MSInputNumber",
  emits: ["update:modelValue"],
  mounted() {
    this.$refs.input.value = Intl.NumberFormat("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    }).format(this.modelValue);
  },
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
    //quy định disabled cho input
    disabled: {
      type: Boolean,
      default: false
    },
    errorClass: {
      type: String,
      default: "invalid"
    },
    errorTitle: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * Hàm thực hiện format định dạng số ngay trong khi nhập liệu.
     * @param event
     * @since 18/04/2022
     * @author NVLINH
     */
    onInputNumber(event) {
      //gọi hàm format định dạng số ngay khi nhập liệu
      this.onNumberInput(event);

      //cập nhật lại vào value
      this.$emit("update:modelValue", event.target.value);
    },

    focus: function () {
      this.$refs.input.classList.remove(this.errorClass);
      this.$refs.input.focus();
    },

    /**
     * Hàm thêm css lỗi cho input
     * @since 18/04/2022
     * @author NVLINH
     */
    addError: function () {
      this.$refs.input.classList.add(this.errorClass);
      this.$refs.input.setAttribute("title", this.errorTitle);
    },

    /**
     * Hàm clear css lỗi cho input
     * @since 18/04/2022
     * @author NVLINH
     */
    clearError: function () {
      this.$refs.input.classList.remove(this.errorClass);
      this.$refs.input.setAttribute("title", "");
    },

    onBlur() {
      if (this.required === true) {
        if (this.modelValue == 0) {
          this.addError();
        } else {
          this.clearError();
        }
      }
    },

    onNumberInput(event) {
      try {
        //lấy ra giá trị của ô input hiện tại
        let value = event.target.value;
        if (event.data === ",") {
          //nếu người dùng nhập dấu ',' và không có dấu ',' nào đã tồn tại => đang nhập số thập phân
          if ((value.match(/,/g) || []).length <= 1) {
            return; //cho nhập liệu tiếp
          }
        }
        //format số
        event.target.value = this.formatCurrency(value);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm format định dạng tiền tệ Việt Nam. => 123.123.123,4869
     * @param money
     * @returns {string}
     * @since 18/04/2022
     * @author NVLINH
     */
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