<template>
  <div :class="['grid-model-control', {'maxh-500': maxHeight === false}]">
    <div class="grid-component h-full">
      <div class="flex">
        <table class="m-table-editor">
          <thead>
          <tr>
            <th v-if="colIndex === true" class="w-index text-align-center z-3">#</th>
            <th v-for="(thead, index) in headerData" :key="index"
                :class="[{'w-38': thead.type === typeOfTableEditor.CheckBox}, thead.class, 'z-3']"
                :style="[{'width': thead.width + 'px'}, {'width': thead.col_width + 'px'}, {'min-width': thead.col_width + 'px'}]">
              <div class="pr-16" v-if="thead.type === typeOfTableEditor.CheckBox">
                <label v-if="thead.type === typeOfTableEditor.CheckBox" class="m-checkbox pl-0">
                  <input
                      type="checkbox"
                      name="checkbox"
                      v-model="selectAll" ref="selectAll"
                  />
                  <span class="m-check-border"></span>
                  <span class="m-check-mark"></span>
                </label>
              </div>
              <div class="header-col flex text-align-left"><span>{{ thead.name }}</span></div>
            </th>
            <th v-if="deleteFunction === true" class="w-index text-align-center z-3"></th>
          </tr>
          </thead>
          <tbody class="dis-contents">
          <tr v-for="(data, index) in this.bodyData" :key="index" @click="selectRow(index)">
            <td v-if="colIndex === true">{{ index + 1 }}</td>
            <td v-for="(thead, col) in headerData" :key="col"
                :class="['cursor-pointer', {'w-38': thead.type === typeOfTableEditor.CheckBox}]">
              <div class="editable flex align-item-center">
                <div class="flex align-item-center flex-1">
                  <div :class="['h-32 w-full', thead.class]">
                    <div class="m-input flex align-item-center">
                      <input
                          v-if="thead.type === typeOfTableEditor.Input"
                          :class="['input-editor w-full', {'text-align-right': thead.objectType === 'number'}]"
                          v-model="data[thead.key]"
                          :disabled="rowSelected !== index"
                          :name="`${thead.key}`">
                      <label v-if="thead.type === typeOfTableEditor.CheckBox" class="m-checkbox pl-0">
                        <input
                            type="checkbox"
                            :name="`${data.key}`"
                            v-model="columns"
                            :value="data"
                        />
                        <span class="m-check-border"></span>
                        <span class="m-check-mark"></span>
                      </label>
                      <span v-if="thead.type === typeOfTableEditor.Text">{{ data.name }}</span>
                      <ms-combobox
                          v-if="thead.type === typeOfTableEditor.Combobox"
                          :options="data[thead.data]"
                          v-model="data[thead.key]"
                          :append-to-body="true"
                          :searchable="true"
                          :add-item="false"
                          :list-header="data[thead.header]"
                          :label="thead.label"
                          :value="thead.value">
                      </ms-combobox>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td v-if="deleteFunction === true">
              <div class="flex align-item-center justify-content-center">
                <div @click="deleteRow(index)" class="m-icon m-icon-delete h-4 w-4 cursor-pointer"></div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="grid-control-item w-3/4">
    <div v-if="control" class="pt-10 pb-16">
      <div @click="addRow" class="grid-control-btn">Thêm dòng</div>
      <div @click="deleteAllRow" class="grid-control-btn">Xóa hết dòng</div>
    </div>
    <div v-if="fileUpload" class="w-1/2 input-grid-control">
      <div class="ms-title-upload">
        <div class="attach-text">
          <div class="m-icon m-attach h-18 w-18 mr-8"></div>
          <div>Đính kèm</div>
        </div>
        <div class="max-size-upload">
          Dung lượng tối đa 5MB
        </div>
      </div>
      <div class="ms-img-upload">
        <div class="ms-input-upload">
          <input type="file" multiple="multiple">
          <span class="text-input">kéo/thả tệp vào đây hoặc bấm vào đây</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createPopper} from '@popperjs/core';
import {mapGetters, mapActions} from 'vuex';
import Enum from "@/script/enum";
import MSCombobox from "@/components/base/v2/MSCombobox";
import {header_account} from "@/script/object";

export default {
  name: "MSTableEditor",
  data() {
    return {
      // list các cột được tích chọn sẽ hiển thị ra giao diện
      columns: [],
      typeOfTableEditor: Enum.TypeOfTableEditor,
      rowSelected: 0,
      customTemplate: [],
      headerAccount: header_account,
    }
  },
  created() {
    // khi mở form phải tích chọn những cột người dùng đã chọn
    this.columns = this.bodyData.filter(item => item["isShow"] === true);
  },
  computed: {
    ...mapGetters(["layout"]),
    selectAll: {
      get: function () {
        return this.bodyData ? this.columns.length === this.bodyData.length : false;
      },
      set: function (value) {
        let selected = [];

        if (value) {
          this.bodyData.forEach(function (item) {
            selected.push(item);
          });
        }
        this.columns = selected;
      }
    },
  },
  components: {
    "MsCombobox": MSCombobox,
  },
  props: {
    control: {
      type: Boolean,
      default: false
    },
    fileUpload: {
      type: Boolean,
      default: false
    },
    headerData: {
      type: Object,
      default: () => {
      }
    },
    bodyData: {
      type: Array,
      default: () => []
    },
    objectName: {
      type: String,
      default: "bank"
    },
    maxHeight: {
      type: Boolean,
      default: true
    },
    colIndex: {
      type: Boolean,
      default: false
    },
    deleteFunction: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    columns() {
      this.$emit("handleChangeColumns", this.columns);
    }
  },
  methods: {
    /**
     * Thêm dòng mới
     * @since 05/04/2022
     * @author NVLINH
     */
    addRow() {
      this.$emit("handleAddRow", this.objectName);
    },

    /**
     * Xóa hết dòng
     * @since 05/04/2022
     * @author NVLINH
     */
    deleteAllRow() {
      // gán lại dòng được chọn = 0
      this.rowSelected = 0;
      this.$emit("handleDeleteAllRow", this.objectName);
    },

    /**
     * Lấy ra index dòng được chọn
     * @param index
     * @since 05/04/2022
     * @author NVLINH
     */
    selectRow(index) {
      this.rowSelected = index;
    },

    /**
     * Xóa 1 dòng theo index
     * @param row - int
     * @since 05/04/2022
     * @author NVLINH
     */
    deleteRow(row) {
      this.$emit("handleDeleteRow", row, this.objectName);
    },

    /**
     * set template (dùng khi lấy mẫu ngầm định)
     * @param layout
     * @since 13/04/2022
     * @author NVLINH
     */
    setCustomTemplate(layout) {
      this.columns = layout;
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
      dropdownList.style.width = 140 + 'px'

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
  }
}
</script>

<style scoped>
.grid-model-control {
  overflow: auto;
  max-height: 158px;
  min-width: 100%;
}

/**---------------------
  custom scroll bar
 ----------------------*/

/* width */
.grid-model-control::-webkit-scrollbar {
  height: 8px;
  width: 8px;
  background-color: #fff;
}

/* Handle */
.grid-model-control::-webkit-scrollbar-thumb {
  background-color: rgb(182, 182, 182);
}

/* Handle on hover */
.grid-model-control::-webkit-scrollbar-thumb:hover {
  background: #868686;
}

.grid-component {
  position: relative;
  min-width: 100%;
  border: 0 solid #c7c7c7 !important;
}

.input-editor:hover {
  cursor: grab;
}

.input-editor:focus {
  cursor: text;
}

.input-editor:disabled {
  border: none !important;
  outline: none !important;
}

.pl-0 {
  padding-left: 0 !important;
}
</style>