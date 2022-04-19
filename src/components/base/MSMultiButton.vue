<template>
  <div class="add-btn m-dropdown">
    <slot name="button"></slot>
    <button class="m-btn-dropdown">
      <div class="m-btn-icon m-icon m-icon-more-light"></div>
    </button>
  </div>
</template>

<script>
export default {
  name: "MSMultiButton"
}
</script>

<style scoped>

</style>