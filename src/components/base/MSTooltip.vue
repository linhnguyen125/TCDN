<template>
  <span class="tooltipText">{{ title }}</span>
</template>

<script>
export default {
  name: "MSTooltip",
  props: {
    title: String,
  }
}
</script>

<style>
.ms-tooltip {
  position: relative;
  display: inline-block;
}

.ms-tooltip .tooltipText {
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  width: max-content;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  right: 110%;
  margin-left: -60px;
  min-height: 1.5rem;
  font-weight: 500 !important;
}

.ms-tooltip .tooltipText::after {
  content: "";
  position: absolute;
  border-color: black transparent transparent transparent;
}

.ms-tooltip:hover .tooltipText {
  visibility: visible;
}
</style>