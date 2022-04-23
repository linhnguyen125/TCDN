<template>
  <button :class="option.class" :type="type">{{ option.title }}</button>
</template>

<script>
export default {
  name: "MSButton",
  props: {
    option: Object,
    type: {
      type: String,
      default: "button"
    }
  }
};
</script>

<style></style>
