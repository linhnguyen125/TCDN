<template>
  <div class="row-input">
    <ms-combobox
        :options="options2"
        v-model="dropdownValue"
        :append-to-body="true"
        :searchable="true"
        :listHeader="headerEmployee"
        labelText="Tài khoản ngân hàng"
        label="label"
    ></ms-combobox>
  </div>
  <div class="row-input">
    <div class="m-input">
      <ms-input-number v-model="number"></ms-input-number>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import MSCombobox from "@/components/base/v2/MSCombobox";
import MSInputNumber from "@/components/base/input/MSInputNumber";

export default {
  components: {
    "MsCombobox": MSCombobox,
    "MsInputNumber": MSInputNumber,
  },
  data() {
    return {
      number: null,
      dropdownValue: "123456",
      options2: [
        {
          value: "123",
          label: "Nguyễn Văn Quyết",
        },
        {
          value: "1234",
          label: "Nguyễn Văn Quyết 2",
        },
        {
          value: "12345",
          label: "Nguyễn Văn Quyết 3",
        },
        {
          value: "123456",
          label: "Nguyễn Văn Quyết 4",
        },
      ],
      headerEmployee: [
        {
          name: "Mã nhân viên",
          key: "value",
          col_width: 150,
          resize: false
        },
        {
          name: "Tên nhân viên",
          key: "label",
          col_width: 300,
          resize: false
        },
      ],
    };
  },
  name: "ReportComponent",
  computed: {
    ...mapGetters(["departments"]),
  },
  methods: {
    ...mapActions(["getDepartments"]),
  },
  created() {
    this.getDepartments();
  },
};
</script>

<style scoped>
.report {
  width: 100%;
  height: 200px;
  background-color: blueviolet;
  text-align: center;
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
}
</style>
