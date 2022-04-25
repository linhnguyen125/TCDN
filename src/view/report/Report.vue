<template>
  <!--  <div class="row-input">-->
  <!--    <ms-combobox-->
  <!--        :options="options2"-->
  <!--        v-model="dropdownValue"-->
  <!--        :append-to-body="true"-->
  <!--        :searchable="true"-->
  <!--        :listHeader="headerEmployee"-->
  <!--        labelText="Tài khoản ngân hàng"-->
  <!--        label="label"-->
  <!--    ></ms-combobox>-->
  <!--  </div>-->
  <!--  <div class="row-input">-->
  <!--    <div class="m-input">-->
  <!--      <ms-input-number v-model="number"></ms-input-number>-->
  <!--    </div>-->
  <!--  </div>-->
  <h1>Tính năng đang được phát triển</h1>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import MSCombobox from "@/components/base/v2/MSCombobox";
import MSInputNumber from "@/components/base/input/MSInputNumber";

export default {
  components: {},
  data() {
    return {};
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
