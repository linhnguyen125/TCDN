<template>
  <button :class="option.class">{{ option.title }}</button>
</template>

<script>
export default {
  name: "MSButton",
  props: {
    option: Object
  }
};
</script>

<style></style>
