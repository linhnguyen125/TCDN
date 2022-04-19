<template>
  <div id="m-dropdown-func" class="m-dropdown-func"
       v-show="isShowFunc"
  >
    <div @click="copy">Nhân bản</div>
    <div @click="onDelete">Xóa</div>
    <div>Ngừng sử dụng</div>
  </div>
</template>

<script>
export default {
  name: "EmpDropDown",
  props: {
    isShowFunc: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * Emit ra component cha xóa dữ liệu
     * @since 06/03/2022
     * @author Nguyễn Văn Linh
     */
    onDelete() {
      this.$emit("handleDelete");
    },

    /**
     * Emit ra component cha copy dữ liệu
     */
    copy() {
      this.$emit("handleCopy");
    }
  }
}
</script>

<style>
.m-dropdown-func {
  position: absolute;
  right: 45px;
  max-width: max-content;
  box-sizing: border-box;
  border: 1px solid rgb(121, 121, 121);
  padding: 2px 1px;
  z-index: 3;
  background-color: #fff;
}

.m-dropdown-func div {
  width: 100%;
  padding: 5px 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  box-sizing: border-box;
}

.m-dropdown-func div:hover {
  background-color: #dbdbdb;
  color: #2ca01c;
}
</style>