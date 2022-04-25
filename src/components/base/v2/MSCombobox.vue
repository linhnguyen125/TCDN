<template>
  <div class="m-combobox">
    <div
        class="m-custom-input-container flex align-item-center"
        v-click-outside="hideOptions"
    >
      <!-- Input -->
      <div class="m-input">
        <input
            ref="input"
            :readonly="!searchable"
            type="text"
            :value="selectedText"
            :placeholder="placeholder"
            class="m-input m-cbx-input"
            :title="errorTitle"
            :disabled="disabled"
            @blur="onBlur"
            @focus="onFocus"
            @input="lodashDelay($event.target.value)"
        />
      </div>
      <div v-if="addItem" :class="['m-combobox-button add', {'bg-inherit': disabled === true}]">
        <slot></slot>
      </div>
      <div
          :class="['m-combobox-button flex align-center', {'bg-inherit': disabled === true}]"
          @click="toggleOptions($event)"
      >
        <div ref="arrow" class="m-icon h-8 w-8 m-arrow-dropdown cursor-pointer"></div>
      </div>
    </div>
    <!-- Dropdown content -->
    <transition name="slide">
      <div
          v-show="showCombobox"
          ref="dropDownContent"
          class="m-combobox-content"
          :class="{ 'append-body': appendToBody }"
          @scroll="lazyLoad"
      >
        <ms-table
            ref="table"
            :header-data="listHeader"
            :body-data="myOptions"
            :show-function="false"
            :col-index="false"
            :show-header="showHeader"
            @onClick="getOption"
        >
        </ms-table>
      </div>
    </transition>
  </div>
</template>
<script>
import vClickOutside from "click-outside-vue3";
import _ from "lodash";
import MSTableV2 from "@/components/base/MSTableV2";

export default {
  name: "MSCombobox",
  emits: ["update:modelValue"],
  //click ra ngoài để đóng combobox options.
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    "MsTable": MSTableV2,
  },
  //các props của combobox
  props: {
    //modelValue để ăn v-model
    modelValue: {
      type: [String, Number],
      default: "",
    },
    //dropdown có label hay không?
    isHasLabel: {
      type: Boolean,
      default: true, //mặc định có label
    },
    //quy định hiển thị icon add
    addItem: {
      type: Boolean,
      default: false
    },
    //input này có được nhập vào không?
    searchable: {
      type: Boolean,
      default: true, //mặc định cho nhập vào
    },
    //Có show header của bảng dropdown bên dưới không?
    showHeader: {
      type: Boolean,
      default: true,
    },
    //place holder của combobox là gì?
    placeholder: {
      type: String,
      default: "",
    },
    //giá trị muốn hiển thị lên ô input khi chọn vào options.
    label: {
      type: String,
      default: "label",
    },
    value: {
      type: String,
      default: "value",
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    //prop chứa các tiêu đề của bảng trong combobox.
    listHeader: {
      type: Array,
      default: () => [
        {
          text: "",
          fieldName: "label", // fieldName = "label" sẽ là giá trị hiển thị sau khi chọn.
        },
      ],
      required: true, //bắt buộc có header để map mới cột trong table
    },
    //list option
    options: {
      type: Array,
      default: () => [],
    },
    //dropdown có append thẳng vào body hay không?
    appendToBody: {
      type: Boolean,
      default: false,
    },
    // tên của combobox
    cbxName: {
      type: String,
      default: ""
    },
    // disabled
    disabled: {
      type: Boolean,
      default: false
    },
    //content có lazy loading hay khong?
    lazyLoading: {
      type: Boolean,
      default: false,
    },
    //class cho combobox
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
  data() {
    return {
      //giá trị được chọn hiện lên input
      selectedText: "",
      myOptions: [],
      showCombobox: false,
      valid: true,
    };
  },
  created() {
    this.myOptions = this.options;
  },
  mounted() {
    //khi khởi tạo mà model value có giá trị
    if (this.modelValue) {
      try {
        //tìm kiếm trong danh sách option
        let option = this.options.filter(item => item[this.value] === this.modelValue
            || item[this.label] === this.modelValue
            || item[this.cbxName] === this.modelValue);
        //gán text vào ô input
        this.selectedText = option[0][this.label];
        //css cho nó được chọn.
        this.$refs.table.addSelectedRow(option);
      } catch (error) {
        //log ra lỗi
        console.log(error);
      }
    }
  },
  watch: {
    options: function (value) {
      this.myOptions = value;
    },
    modelValue(value) {
      if (value !== "") {
        try {
          //tìm kiếm trong danh sách option
          let option = this.options.filter(item => item[this.value].includes(value));
          //gán text vào ô input
          this.selectedText = option[0][this.label];
          //css cho nó được chọn.
          this.$refs.table.addSelectedRow(option);
          this.$emit("changeModelValue", value, this.cbxName);
        } catch (error) {
          //log ra lỗi
          console.log(error);
        }
      }
    },
    // valid(value) {
    //   this.$emit("eValid", value, this.cbxName);
    // }
  },
  methods: {
    /**
     * Hàm xử lý ẩn hiện dropdown
     * @param event
     * @since 18/04/2022
     * @author NVLINH
     */
    toggleOptions(event) {
      if (this.disabled !== true) {
        //focus vào input
        this.focus();
        //toggle hiện combobox
        this.toggleShow();
        // this.$refs.dropDownContent.classList.toggle("show");
        //show content
        // this.$refs.dropDownContent.classList.toggle("show");
        //xoay 180 độ mũi tên
        this.$refs.arrow.classList.toggle("rotation-180");
        //độ cao dropdown
        let dropdownHeight = this.$refs.dropDownContent.clientHeight;
        //độ cao hiện tại của màn hình
        let viewHeight = event.view.innerHeight;

        //nếu không phải append to body
        if (!this.appendToBody) {
          //vị trí chuột y
          let clientY = event.clientY;
          let top = 33;
          if (this.isHasLabel)
            top = 53;
          if (viewHeight < clientY + dropdownHeight) {
            if (this.isHasLabel)
              top = 0 - dropdownHeight + 16; //nếu có label thì cộng thêm 16
            else
              top = 0 - dropdownHeight - 2;
          }
          this.$refs.dropDownContent.style.top = top + "px";
        } else { //nếu là append to body
          //lấy vị trí của input trên màn hình
          let inputPosition = this.$refs.input.getBoundingClientRect();
          let inputX = inputPosition.x;
          let inputTop = inputPosition.top;
          let inputHeight = inputPosition.height;
          let inputWidth = inputPosition.width;
          //nếu độ cao hiện tại của màn hình trừ cho inputTop < dropdownheight => cho lên trên
          if (viewHeight - inputTop < dropdownHeight) {
            this.$refs.dropDownContent.style.top = inputTop - dropdownHeight - 5 + "px";
          } else {
            this.$refs.dropDownContent.style.top = inputTop + inputHeight + "px";
          }
          //style vị trí cho dropdown
          this.$refs.dropDownContent.style.left = inputX + "px";
          // this.$refs.dropDownContent.style.minWidth = inputWidth + "px";
          this.$refs.dropDownContent.style.width = "fit-content";
        }
      }
      return;
    },

    /**
     * Hàm xử lý ẩn dropdown
     * @since 18/04/2022
     * @author NVLINH
     */
    hideOptions() {
      // this.$refs.dropDownContent.classList.remove("show");
      this.showCombobox = false;
      this.$refs.arrow.classList.remove("rotation-180");
    },


    /**
     * focus vào ô input
     */
    onFocus() {
      this.focus();
    },

    /**
     * Hàm thực  hiện tìm kiếm (auto complete)
     * @since 18/04/2022
     * @author NVLINH
     */
    lodashDelay: _.debounce(function (value) {
      this.selectedText = value;
      // this.showCombobox = true;
      this.$emit("handleLoadNext", this.cbxName, value);
    }, 500),

    /**
     * focus vào ô input
     */
    focus: function () {
      this.$refs.input.focus();
    },

    toggleShow() {
      this.showCombobox = !this.showCombobox;
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
        if (this.modelValue === "") {
          this.valid = false;
          this.addError();
        } else {
          console.log(this.modelValue)
          this.valid = true;
          this.clearError();
        }
      }
    },

    /**
     * hàm lấy object được chọn từ dropdown
     * @param object
     * @since 18/04/2022
     * @author NVLINH
     */
    getOption(object) {
      //gán giá trị mong muốn vào value, label
      this.selectedText = object[this.label];
      this.dropdownValue = object[this.value];
      //emit tới cha value của option
      this.$emit("update:modelValue", this.dropdownValue);
      this.clearError();
      this.valid = true;
    },

    /**
     * Lazy loading cho dropdown
     * @since 18/04/2022
     * @author NVLINH
     */
    lazyLoad() {
      if (this.lazyLoading) {
        //độ cao dropdown
        let dropdownHeight = this.$refs.dropDownContent.clientHeight;
        let scrollTop = this.$refs.dropDownContent.scrollTop;
        //toàn bộ độ cao có thể scroll
        let scrollHeight = this.$refs.dropDownContent.scrollHeight;
        //vị trí hiện tại của con lăn
        let total = dropdownHeight + Math.floor(scrollTop);
        //nếu bằng scrollHeight thì là đang ở bottom
        if (total === scrollHeight) {
          total = 0;
          //emit tới cha load tiếp thông tin
          this.$emit("handleLoadNext", this.cbxName, this.selectedText);
        }
      }
    },
  },
  computed: {},
};
</script>

<style>
.m-combobox {
  position: relative;
  display: inline-block;
  width: 100%;
}

/**---------
label
 ----------*/

.m-label {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  padding-bottom: 4px;
  white-space: nowrap;
  color: #111;
  cursor: pointer;
}

/*Chứa nội dung sổ xuống*/
.m-combobox-content {
  position: absolute;
  left: 0;
  top: 53px;
  background-color: #ffffff;
  /*min-width: 100px;*/
  height: fit-content;
  width: fit-content;
  max-height: 200px;
  overflow: auto;
  border-radius: 2px;
  border: 1px solid #b7b7b7;
  box-shadow: #b7b7b7 1px 5px 12px;
  z-index: 99999;
  /*display: none;*/
}

.show {
  display: block;
}

.m-combobox-content .m-table {
  margin: 0 !important;
  border: none;
  border-collapse: unset;
}

.m-combobox-content .m-table tr td,
.m-combobox-content .m-table tr th {
  border: none;
}

.append-body.m-combobox-content {
  position: fixed !important;
  border-radius: 2px;
  z-index: 99999;
}

.m-combobox input.m-cbx-input {
  padding: 0 32px 0 12px;
}

/*.show {*/
/*  display: block;*/
/*}*/

/*-------------------
  input dropdown
---------------------*/
.m-custom-input-container .m-combobox-button {
  position: absolute;
  right: 1px;
  bottom: 1px;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 2px;
}

.add {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  right: 33px !important;
}

.m-custom-input-container .m-combobox-button:hover,
.m-custom-input-container .m-combobox-button:focus {
  background-color: #e0e0e0;
}

/* Custom table trong dropdown */
.m-combobox-content .m-table thead th {
  cursor: default;
}

.m-combobox-content .m-table tbody tr {
  background-color: #ffffff;
  cursor: pointer;
}

.m-combobox-content .m-table tbody tr td {
  height: 32px;
}

.m-combobox-content .m-table tbody tr:hover {
  background-color: #e1e1e1;
}

.m-combobox-content .ms__selected td {
  color: #fff !important;
  background-color: #2ca01c !important;
  padding-top: 5px;
  padding-bottom: 5px;
}

.m-combobox-content th {
  overflow: hidden !important;
}

.m-combobox-content td p.content {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.m-combobox-content .ms__selected:hover td {
  background-color: #12b400 !important;
}

/*------------------
custom scroll bar
 -----------------*/

/* width */
.m-combobox-content::-webkit-scrollbar {
  height: 8px;
  width: 8px;
  background-color: #fff;
}

/* Handle */
.m-combobox-content::-webkit-scrollbar-thumb {
  background-color: rgb(182, 182, 182);
}

/* Handle on hover */
.m-combobox-content::-webkit-scrollbar-thumb:hover {
  background: #868686;
}

</style>