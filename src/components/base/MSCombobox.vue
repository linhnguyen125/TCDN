<template>
  <div class="m-combobox">
    <v-select
        v-model="page"
        :append-to-body="true"
        :calculate-position="withPopper"
        :options="options"
        :reduce="(options) => options.value"
        label="label"
    ></v-select>
  </div>
</template>
<script>
import {createPopper} from '@popperjs/core'

export default {
  name: "MsCombobox",
  data() {
    return {
      options: [
        {label: "10 bản ghi trên 1 trang", value: 10},
        {label: "20 bản ghi trên 1 trang", value: 20},
        {label: "50 bản ghi trên 1 trang", value: 50},
        {label: "100 bản ghi trên 1 trang", value: 100},
      ],
      page: 20,
    };
  },
  props: {
    isShowPageSize: {
      type: Boolean,
      default: false,
    },
    option: Array,
    pageSize: {
      type: Number,
      default: 20,
    },
  },
  watch: {
    page() {
      this.changePageSize()
    }
  },
  methods: {
    /**
     * Lựa chon số bản ghi trên 1 trang và emit ra component cha xử lý
     * @since 06/03/2022
     * @author Nguyễn Văn Linh
     */
    changePageSize() {
      let pageSize = this.page;
      this.$emit("handleChangePageSize", pageSize);
    },

    /**
     * Hàm custom combobox position
     * @param dropdownList
     * @param component
     * @param width
     * @returns {function(): void}
     */
    withPopper(dropdownList, component, {width}) {
      /**
       * We need to explicitly define the dropdown width since
       * it is usually inherited from the parent with CSS.
       */
      dropdownList.style.width = 200 + 'px'

      /**
       * Here we position the dropdownList relative to the $refs.toggle Element.
       *
       * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
       * the dropdownList overlap by 1 pixel.
       *
       * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
       * wrapper so that we can set some styles for when the dropdown is placed
       * above.
       */
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1],
            },
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({state}) {
              component.$el.classList.toggle(
                  'drop-up',
                  state.placement === 'top'
              )
            },
          },
        ],
      })

      /**
       * To prevent memory leaks Popper needs to be destroyed.
       * If you return function, it will be called just before dropdown is removed from DOM.
       */
      return () => popper.destroy()
    },
  },
};
</script>
<style></style>
