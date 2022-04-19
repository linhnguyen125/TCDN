<template>
  <div id="m-dropdown-func" class="m-dropdown-func"
       v-show="isShowDropDown"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AccountDropDown",
  data() {
    return {
      isShowDropDown: false,
    }
  },
  methods: {
    showDropDown() {
      this.isShowDropDown = true;
    },
    hideDropDown() {
      this.isShowDropDown = false;
    },

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
</style>