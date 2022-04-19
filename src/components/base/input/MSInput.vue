<template>
  <div class="m-input">
    <label :for="option.id"
    >{{ option.label }}
      <span v-if="option.required === true" class="m-input-required"
      >*</span
      ></label
    >
    <Field
        :name="option.name"
        v-slot="{ field, errorMessage }"
    >
      <input
          v-if="option.name !== 'dateOfBirth'"
          v-bind="field"
          :id="option.id"
          :type="option.type"
          :class="{ invalid: errorMessage }"
          :title="errorMessage"
          :ref="option.name"
      />
      <datepicker
          v-if="option.name === 'dateOfBirth'"
          :typeable="true"
          :id="option.id"
          :class="['m-input', { invalid: errorMessage }]"
          :title="errorMessage"
          :ref="option.name"
          :inputFormat="formatString"
          :locale="language"
          :upperLimit="new Date()"
          placeholder="DD/MM/YYYY"
          v-model="date"
      />
    </Field>
  </div>
</template>

<script>
import {Field} from "vee-validate";
import Datepicker from "vue3-datepicker";
import {vi} from 'date-fns/locale';

export default {
  name: "MsInput",
  components: {
    Field,
    Datepicker,
  },
  data() {
    return {
      date: null,
      language: vi,
      formatString: "dd-MM-yyyy"
    }
  },
  props: {
    option: Object,
  },
  watch: {
    dateOfBirth() {
      this.date = this.dateOfBirth;
    }
  }
};
</script>

<style></style>
