<template>
  <div ref="select" class="flex justify-content-space-between align-item-center h-32">
    <label :for="option.id" class="m-checkbox">{{ option.label }}
      <input
          type="checkbox"
          :id="option.id"
          :name="option.id"
          @change="onChange($event)"
      />
      <span class="m-check-border"></span>
      <span class="m-check-mark"></span>
    </label>
    <slot :isDisable="isDisable"></slot>
  </div>
</template>

<script>
export default {
  name: "ContentItem",
  data() {
    return {
      isDisable: true,
    }
  },
  props: {
    option: Object,
  },
  methods: {
    /**
     * Sự kiện khi thay đổi checkbox
     * @param e
     * @since 08/04/2022
     * @author NVLINH
     */
    onChange(e) {
      this.isDisable = !this.isDisable;
      this.$emit("handleChangeDetail", {name: e.target.name, isChecked: !this.isDisable})
    }
  }
}
</script>

<style scoped>
.m-input label {
  display: inline-block;
  font-size: 13px;
  white-space: nowrap;
  font-weight: 500;
  padding-bottom: 0;
  color: #111;
  cursor: pointer;
}
</style>