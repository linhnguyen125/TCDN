<template>
  <button class="m-btn relative">
    <div class="m-wrapper-btn">
      <span class="m-btn-text">{{ title }}</span>
      <div class="m-btn-icon m-icon m-icon-more-dark"></div>
    </div>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MSButton",
  props: {
    title: String,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
