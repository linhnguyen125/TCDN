<template>
  <label :for="option.id" class="m-radiobox mr-26"
  >{{ option.label }}

    <Field
        v-slot="{ field }"
        type="radio"
        :name="option.name"
        :value="option.value"
        @change="handleChange"
    >
      <input
          v-bind="field"
          :name="option.name"
          type="radio"
          :value="option.value"
          :id="option.id"
      />
    </Field>
    <span class="m-radio-border"></span>
    <span class="m-radio-circle"></span>
  </label>
</template>

<script>
import {Field} from "vee-validate";

export default {
  name: "MsRadio",
  props: {
    option: Object,
  },
  components: {
    Field,
  },
  methods: {
    handleChange(event) {
      this.$emit("handleChange", event.target.value);
    }
  }
};
</script>

<style></style>
