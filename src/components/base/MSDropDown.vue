<template>
  <div
      :style="{top: position.top, left: position.left}" id="m-dropdown-func" class="m-dropdown-func"
      v-show="isShowDropDown"
      @mouseleave="leave"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MSDropDown",
  data() {
    return {
      isShowDropDown: false
    }
  },
  props: {
    listDropDown: {
      type: Array,
      default: () => {
        return []
      }
    },
    position: {
      type: Object,
      default: () => {
        return {
          top: '50%',
          left: '20px'
        }
      }
    },
  },
  methods: {
    showDropDown() {
      this.isShowDropDown = true;
    },
    hideDropDown() {
      this.isShowDropDown = false;
    },
    leave() {
      this.hideDropDown();
    },
  }
}
</script>

<style>
.m-dropdown-func a {
  text-decoration: none;
  color: inherit;
}
</style>