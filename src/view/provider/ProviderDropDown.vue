<template>
  <transition name="slide">
    <div id="m-dropdown-func" class="m-dropdown-func" v-click-outside="onclickOutside"
         v-show="isShowFunc"
    >
      <div>Xem</div>
      <div>Sửa</div>
      <div @click="copy">Nhân bản</div>
      <div @click="onDelete">Xóa</div>
      <div>Ngừng sử dụng</div>
    </div>
  </transition>
</template>

<script>
import vClickOutside from "click-outside-vue3";

export default {
  name: "ProviderDropDown",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      isShowFunc: false
    }
  },
  methods: {
    onclickOutside(event) {
      try {
        if (event.path[0].nodeName === 'DIV' && event.path[0].className.includes('edit-icon'))
          return null;
      } catch (err) {
        console.log(err)
      }
      this.hide();
    },
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