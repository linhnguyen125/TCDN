<template>
  <div class="m-input">
    <label :for="option.id"
    >{{ option.label }}
      <span v-if="option.required === true" class="m-input-required"
      >*</span
      ></label
    >
    <Field
        as="select"
        :name="option.name"
        v-slot="{ field, errorMessage }"
        :class="['m-select', { invalid: errorMessage }]"
        :id="option.id"
        :v-bind="field"
        @blur="handleBlur($event, option.label)"
        @focus="handleFocus"
        @change="handleChange"
    >
      <option
          v-for="(item, index) in option.data"
          :key="index"
          :value="item.departmentId"
      >
        {{ item.departmentName }}
      </option>
    </Field>
  </div>
</template>

<script>
import {Field} from "vee-validate";

export default {
  name: "MsInput",
  components: {
    Field,
  },
  props: {
    option: Object,
  },
  methods: {
    handleBlur(event, label) {
      let value = event.target.value;
      if (value == "") {
        event.target.classList.add("invalid");
        event.target.setAttribute(
            "title",
            `${label} không được để trống`
        );
      }
    },

    handleFocus(event) {
      event.target.classList.remove("invalid");
      event.target.removeAttribute("title");
    },

    handleChange(event) {
      this.$emit("handleChange", event.target.value);
    }
  },
};
</script>

<style></style>
