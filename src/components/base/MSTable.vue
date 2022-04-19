<template>
  <table id="m-table" class="m-table">
    <thead>
    <tr>
      <th class="sticky l-0">
        <label
            for="employee"
            class="m-checkbox absolute pos-center"
        >
          <input type="checkbox" id="employee" v-model="selectAll" ref="selectAll"/>
          <span class="m-check-border"></span>
          <span class="m-check-mark"></span>
        </label>
      </th>
      <th v-for="(thead, index) in tableData.thead"
          :key="index"
          :class="thead.theadClass"
      >
        {{ thead.name }}
      </th>
      <th class="sticky r-0">Chức năng</th>
    </tr>
    </thead>
    <tbody v-if="isLoading === false">
    <tr v-for="(data, index) in tableData.data"
        :key="index"
        @dblclick="onUpdate(data, formMode.Update)"
    >
      <td class="sticky l-0">
        <label
            :for="`employee-${index}`"
            class="m-checkbox absolute pos-center"
        >
          <input type="checkbox" :id="`employee-${index}`" v-model="arrIds" :value="data['employeeId']"/>
          <span class="m-check-border"></span>
          <span class="m-check-mark"></span>
        </label>
      </td>
      <td v-for="(item, index) in tableData.thead" :key="index" :class="item.bodyClass">
        <p class="content">{{ showData(data[item.key], item.key) }}</p>
      </td>
      <td class="sticky r-0">
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
    <tr v-for="(data, index) in dataTable.data"
        :key="index"
    >
      <td class="sticky l-0">
        <label
            :for="`employee-${index}`"
            class="m-checkbox absolute pos-center"
        >
          <input type="checkbox" :id="`employee-${index}`"/>
          <span class="m-check-border"></span>
          <span class="m-check-mark"></span>
        </label>
      </td>
      <td v-for="(item, index) in dataTable.thead" :key="index" :class="item.bodyClass">
        <p class="content"></p>
      </td>
      <td class="sticky r-0">
        <p class="content"></p>
      </td>
    </tr>
    </tbody>
    <!--    Empty data-->
    <tbody v-if="tableData.data.length === 0">
    <tr>
      <td :colspan="tableData.thead.length + 2">
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
import {mapActions} from "vuex";
import Enum from "@/script/enum";

export default {
  name: "MSTable",
  data() {
    return {
      arrIds: [],
    }
  },
  props: {
    tableData: Object,
    isLoading: Boolean,
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
        return this.tableData.data ? this.arrIds.length === this.tableData.data.length : false;
      },
      set: function (value) {
        let selected = [];

        if (value) {
          this.tableData.data.forEach(function (item) {
            selected.push(item.employeeId);
          });
        }
        this.arrIds = selected;
      }
    },

    dataTable() {
      let _data = [];
      for (let i = 0; i < 10; i++) {
        let obj = {}
        _data.push(obj);
      }
      return {
        thead: [
          {name: "Mã nhân viên", key: "employeeCode", theadClass: "sticky l-3 z-3", bodyClass: "sticky l-3"},
          {name: "Tên nhân viên", key: "fullName", theadClass: "sticky l-13 z-3", bodyClass: "sticky l-13"},
          {name: "Giới tính", key: "genderName", theadClass: "mw-5", bodyClass: "mw-5"},
          {name: "Ngày sinh", key: "dateOfBirth", theadClass: "text-align-center", bodyClass: "text-align-center"},
          {name: "Tên đơn vị", key: "departmentName"},
          {name: "Chức danh", key: "positionName"},
          {name: "Số CMND", key: "identityNumber"},
          {name: "Ngày câp", key: "identityDate", theadClass: "text-align-center", bodyClass: "text-align-center"},
          {name: "Nơi cấp", key: "identityPlace", theadClass: "mw-20"},
          {name: "Địa chỉ", key: "address", theadClass: "mw-20"},
          {name: "ĐT di động", key: "phoneNumber"},
          {name: "ĐT cố định", key: "landLine"},
          {name: "Email", key: "email"},
          {name: "Tài khoản ngân hàng", key: "bankAccount"},
          {name: "Tên ngân hàng", key: "bankName"},
          {name: "Chi nhánh ngân hàng", key: "bankBranch"},
        ],
        data: [..._data],
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
      if (key === "dateOfBirth" || key === "identityDate") {
        return formatDateOfBirth(data);
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
    }
  }
}
</script>