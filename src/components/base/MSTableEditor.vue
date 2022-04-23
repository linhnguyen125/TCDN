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
          <tbody v-if="disabled !== true" class="dis-contents">
          <tr v-for="(data, index) in this.bodyData" :key="index" @click="selectRow(index)">
            <td v-if="colIndex === true" class="w-index text-align-center z-3">{{ index + 1 }}</td>
            <td v-for="(thead, col) in headerData" :key="col"
                :class="['cursor-pointer', {'w-38': thead.type === typeOfTableEditor.CheckBox}]">
              <div class="editable flex align-item-center">
                <div class="flex align-item-center flex-1">
                  <div :class="['h-32 w-full', thead.class]">
                    <div class="m-input flex align-item-center">
                      <div class="m-input" v-if="thead.type === typeOfTableEditor.Input">
                        <input
                            v-if="thead.objectType !== 'number'"
                            :ref="thead.key + rowSelected"
                            class="input-editor w-full"
                            v-model="data[thead.key]"
                            :disabled="rowSelected !== index"
                            :name="`${thead.key}`">
                        <ms-input-number
                            v-else
                            v-model="data[thead.key]" :required="thead.required"
                            :error-title="thead.errorTitle"
                            @onChange="onChange"
                        ></ms-input-number>
                      </div>
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
                      <span v-if="thead.type === typeOfTableEditor.Text">{{ data[thead.key] }}</span>
                      <ms-combobox
                          :ref="thead.key + index"
                          v-if="thead.type === typeOfTableEditor.Combobox"
                          :options="data[thead.data]"
                          v-model="data[thead.key]"
                          :append-to-body="true"
                          :searchable="true"
                          :add-item="false"
                          :list-header="data[thead.header]"
                          :cbx-name="thead.key"
                          :lazy-loading="true"
                          :required="thead.required"
                          :error-title="thead.errorTitle"
                          @handleLoadNext="loadNext"
                          @changeModelValue="changeModelValue"
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
          <tbody v-else class="dis-contents">
          <tr v-for="(data, index) in this.bodyData" :key="index" @click="selectRow(index)">
            <td v-if="colIndex === true" class="w-index text-align-center z-3">{{ index + 1 }}</td>
            <td v-for="(thead, col) in headerData" :key="col"
                :class="['cursor-pointer', {'w-38': thead.type === typeOfTableEditor.CheckBox}]">
              <div class="editable flex align-item-center">
                <div class="flex align-item-center flex-1">
                  <div :class="['h-32 w-full', thead.class]">
                    <div class="m-input flex align-item-center">
                      <input v-if="thead.objectType !== 'number'" class="m-input"
                             disabled="disabled" :value="data[thead.key]">
                      <ms-input-number v-else v-model="data[thead.key]" :disabled="disabled"></ms-input-number>
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
          <tfoot v-if="showFooter">
          <tr>
            <th></th>
            <th v-for="(thead, col) in headerData" :key="col" :class="{'text-align-right': thead.key === 'amount_oc'}">
              <span v-if="thead.key === 'amount_oc'">{{ Intl.NumberFormat("vi-VN").format(total) }}</span>
            </th>
            <th></th>
          </tr>
          </tfoot>
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
import {formatCurrencyToSave} from '@/lib/number-format';
import Enum from "@/script/enum";
import MSCombobox from "@/components/base/v2/MSCombobox";
import MSInputNumber from "@/components/base/input/MSInputNumber";
import {isString} from "lodash";

export default {
  name: "MSTableEditor",
  data() {
    return {
      // list các cột được tích chọn sẽ hiển thị ra giao diện
      columns: [],
      typeOfTableEditor: Enum.TypeOfTableEditor,
      rowSelected: 0,
      customTemplate: [],
    }
  },
  created() {
    // khi mở form phải tích chọn những cột người dùng đã chọn
    this.columns = this.bodyData.filter(item => item["isShow"] === true);
    console.log(this.headerData)
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
    "MsInputNumber": MSInputNumber,
  },
  props: {
    //hiển thị chức năng thêm xóa dòng
    control: {
      type: Boolean,
      default: false
    },
    // hiển thị file update
    fileUpload: {
      type: Boolean,
      default: false
    },
    // list header hiển thị ra màn hình
    headerData: {
      type: Object,
      default: () => {
      }
    },
    // data cho table
    bodyData: {
      type: Array,
      default: () => []
    },
    // tên obj của table
    objectName: {
      type: String,
      default: "bank"
    },
    maxHeight: {
      type: Boolean,
      default: true
    },
    // cột tích chọn
    colIndex: {
      type: Boolean,
      default: false
    },
    // cột chức năng xóa dòng
    deleteFunction: {
      type: Boolean,
      default: true
    },
    // footer của table
    showFooter: {
      type: Boolean,
      default: false
    },
    // disabled
    disabled: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0
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
      if (this.disabled !== true) {
        this.$emit("handleAddRow", this.objectName);
      }
    },

    /**
     * Xóa hết dòng
     * @since 05/04/2022
     * @author NVLINH
     */
    deleteAllRow() {
      // gán lại dòng được chọn = 0
      if (this.disabled !== true) {
        this.rowSelected = 0;
        this.$emit("handleDeleteAllRow", this.objectName);
      }
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
      if (this.disabled !== true) {
        this.$emit("handleDeleteRow", row, this.objectName);
      }
    },

    /**
     * Xử lý khi thay đổi tổng tiền
     * @param amount_oc
     * @since 19/04/2022
     * @author NVLINH
     */
    onChange(amount_oc) {
      this.$emit('changeAmount')
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
     * Xử lý khi thay đổi giá trị tên đối tượng (payment detail)
     * @param value - gía trị value của v-model thay đổi
     * @param cbxName - tên đối tượng của combobox
     * @since 13/04/2022
     * @author NVLINH
     */
    changeModelValue(value, cbxName) {
      this.$emit("changeObject", value, this.rowSelected, cbxName);
    },

    addErrorCbx(refName) {
      this.$refs[refName][0].addError();
    }
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