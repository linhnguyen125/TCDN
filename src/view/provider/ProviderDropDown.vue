<template>
  <div id="m-dropdown-func" class="m-dropdown-func"
       v-show="isShowFunc"
  >
    <div>Xem</div>
    <div>Sửa</div>
    <div @click="copy">Nhân bản</div>
    <div @click="onDelete">Xóa</div>
    <div>Ngừng sử dụng</div>
  </div>
</template>

<script>
export default {
  name: "ProviderDropDown",
  data() {
    return {
      isShowFunc: false
    }
  },
  methods: {
    toggle() {
      this.isShowFunc = !this.isShowFunc;
    },
    hide() {
      this.isShowFunc = false;
    },
    /**
     * Emit ra component cha xóa dữ liệu
     * @since 06/03/2022
     * @author Nguyễn Văn Linh
     */
    onDelete() {
      this.hide();
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

<style scoped>

</style>