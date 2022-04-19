<template>
  <table id="m-table" class="m-table">
    <thead v-if="showHeader === true">
    <tr>
      <th style="width: 48px !important; min-width: 48px !important;" v-if="colIndex === true" class="sticky l-0">
        <label
            for="employee"
            class="m-checkbox absolute pos-center"
        >
          <input type="checkbox" id="employee" v-model="selectAll" ref="selectAll"/>
          <span class="m-check-border"></span>
          <span class="m-check-mark"></span>
        </label>
      </th>
      <th v-for="(thead, index) in headerData"
          :key="index"
          :class="[thead.theadClass, {'w-full': thead.resize}]"
          :style="{'width': thead.col_width+'px', 'min-width': thead.col_width+'px !important', 'max-width': thead.col_width+'px !important'}"
      >
        {{ thead.name }}
      </th>
      <th v-if="showFunction === true" class="sticky r-0">Chức năng</th>
    </tr>
    </thead>
    <tbody v-if="isLoading === false">
    <tr v-for="(data, index) in bodyData"
        :key="index"
        @dblclick="onUpdate(data, formMode.Update)"
        @click="onSelectOption(data, index)"
    >
      <td v-if="colIndex === true" class="sticky l-0">
        <label
            :for="`employee-${index}`"
            class="m-checkbox absolute pos-center"
        >
          <input type="checkbox" :id="`employee-${index}`" v-model="arrIds" :value="data"/>
          <span class="m-check-border"></span>
          <span class="m-check-mark"></span>
        </label>
      </td>
      <td v-for="(thead, index) in headerData" :key="index" :class="thead.bodyClass">
        <p :style="{'width': thead.col_width+'px', 'min-width': thead.col_width+'px !important', 'max-width': thead.col_width+'px !important'}"
           class="content">{{ showData(data[thead.key], thead.key) }}</p>
      </td>
      <td v-if="showFunction === true" class="sticky r-0">
        <div class="func">
          <button @click="onUpdate(data, formMode.Update)">Sửa</button>
          <div
              class="edit-icon m-icon m-icon-edit"
              @click="showFunc($event, data)"
          ></div>
        </div>
      </td>
    </tr>
    </tbody>

    <!--    Skeleton-->
    <tbody v-else class="empty">
    <tr v-for="index in pageSize"
        :key="index"
    >
      <td v-if="colIndex === true" class="sticky l-0">
        <label
            :for="`employee-${index}`"
            class="m-checkbox absolute pos-center"
        >
          <input type="checkbox" :id="`employee-${index}`"/>
          <span class="m-check-border"></span>
          <span class="m-check-mark"></span>
        </label>
      </td>
      <td v-for="(thead, col) in headerData" :key="col" :class="thead.bodyClass">
        <p class="content"></p>
      </td>
      <td class="sticky r-0">
        <p class="content"></p>
      </td>
    </tr>
    </tbody>

    <!--    Empty data-->
    <tbody v-if="headerData.length === 0">
    <tr>
      <td :colspan="headerData.length + 2">
        <div style="width: 200vh; padding-left: 20%" class="flex justify-content-center flex-direction-column">
          <img
              src="https://actappg1.misacdn.net/img/bg_report_nodata.76e50bd8.svg?fbclid=IwAR2aBsYyuZjArO35Z-1bXfHHckdaShr8Yk5mxIoM7v8gha_Of_3Bu8KlwNg"
              alt=""
              width="100"
              height="100">
          <p>Không có dữ liệu</p>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {formatDateOfBirth} from '@/script/helper.js';
import moment from 'moment';
import {mapActions} from "vuex";
import Enum from "@/script/enum";

export default {
  name: "MSTableV2",
  data() {
    return {
      arrIds: [],
    }
  },
  props: {
    headerData: Object,
    bodyData: Object,
    isLoading: Boolean,
    // quy định hiển thị cột chức năng
    showFunction: {
      type: Boolean,
      default: true
    },
    // quy định hiển thị cột tích chọn
    colIndex: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    }
  },
  watch: {
    arrIds() {
      this.changeArrIds();
    },
  },
  computed: {
    formMode() {
      return Enum.FormMode;
    },

    selectAll: {
      get: function () {
        return this.bodyData ? this.arrIds.length === this.bodyData.length : false;
      },
      set: function (value) {
        let selected = [];

        if (value) {
          this.bodyData.forEach(function (item) {
            selected.push(item);
          });
        }
        this.arrIds = selected;
      }
    },
  },
  methods: {
    ...mapActions(["getEmployeeById"]),

    /**
     * Quy định cách hiển thị dữ liệu
     * @param data - object
     * @param key - tên của trường dữ liệu
     * @returns {string|Date|*}
     * @since 05/03/2022
     * @author Nguyễn Văn Linh
     */
    showData(data, key) {
      if (data !== null && (key === "date_of_birth" || key === "identity_date")) {
        let format = moment(data)
        return format.format('DD/MM/YYYY');
      }
      return data;
    },

    /**
     * Emit ra component cha mở cập nhật dữ liệu
     * @param data - object (dữ liệu cần update)
     * @param formMode
     * @since 05/03/2022
     * @author Nguyễn Văn Linh
     */
    onUpdate(data, formMode) {
      this.$emit("handleOpenModalUpdate", {data, formMode});
    },

    /**
     * Hàm quy định ẩn hiện thao tác với từng dòng, lấy được data trên từng dòng để thực hiện các thao tác
     * @param event - event mặc định
     * @param data - object (employee trên từng dòng)
     * @since 05/03/2022
     * @author Nguyễn Văn Linh
     */
    showFunc(event, data) {
      let y = event.clientY;
      let height = screen.height;
      if (y < height - 300) {
        document.getElementById("m-dropdown-func").style.top = `${y + 15}px`;
      } else {
        document.getElementById("m-dropdown-func").style.top = `${y - 100}px`;
      }
      this.$emit("handleShowFunc", data);
    },
    /**
     * Emit ra component cha để xóa
     * @param data - object
     * @param isShowDialog - boolean
     * @param index - int (index dòng muốn xóa)
     * @since 05/03/2022
     * @author Nguyễn Văn Linh
     */
    onDelete(data, isShowDialog, index) {
      this.$emit("handleDelete", data, isShowDialog);
    },

    /**
     * Emit arrIs ra component cha
     * @since 14/03/2022
     * @author Nguyễn Văn Linh
     */
    changeArrIds() {
      this.$emit("handleChangeArrIds", this.arrIds);
    },

    /**
     * Un check all sau khi xóa
     */
    unCheckAll() {
      if (this.$refs.selectAll.checked === true)
        this.$refs.selectAll.checked = false;
    },

    /**
     * style cho những hàng được chọn
     * @param selectedRow
     */
    addSelectedRow(selectedRow) {
      // console.log("option ban đầu", selectedRow[0]);
      //tìm trong danh sách, nếu có option thì thêm css cho hàng đó
      for (let i = 0; i < this.bodyData.length; i++) {
        if (JSON.stringify(this.bodyData[i]) === JSON.stringify(selectedRow[0])) {
          //xóa background cho tất cả các hàng khác, giữ lại hàng đang được click
          this.$el.querySelectorAll(`tbody tr`).forEach((e) => {
            e.classList.remove("ms__selected");
          });
          this.$el.querySelector(`tbody tr:nth-child(${i + 1})`).classList.add("ms__selected");
        }
      }
    },

    onSelectOption(option, index) {
      this.$emit('onClick', option);
      //xóa background cho tất cả các hàng khác, giữ lại hàng đang được click
      this.$el.querySelectorAll(`tbody tr`).forEach((e) => {
        e.classList.remove("ms__selected");
      });
      this.$el.querySelector(`tbody tr:nth-child(${index + 1})`).classList.add("ms__selected");
    }
  }
}
</script>

<style scoped>

</style>