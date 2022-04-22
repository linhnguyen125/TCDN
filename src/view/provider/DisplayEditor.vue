<template>
  <transition name="display">
    <div v-if="isShowModal" class="m-wrapper-modal-v2">
      <div ref="modal-v2" class="m-modal-v2">
        <!--      header-->
        <div class="m-modal-header flex">
          <div class="m-modal-title">
            <h2>Tùy chỉnh giao diện</h2>
          </div>
          <div class="ms-popup-close flex">
            <div class="m-icon m-icon-help-dark ms-tooltip cursor-pointer mr-6 w-6 h-6">
              <ms-tooltip :title="'Trợ giúp'"></ms-tooltip>
            </div>
            <div class="m-icon m-icon-close cursor-pointer ms-tooltip w-6 h-6" @click="closeModal">
              <ms-tooltip :title="'Đóng (ESC)'"></ms-tooltip>
            </div>
          </div>
        </div>
        <!--      end header-->
        <!--      content-->
        <div class="m-modal-content">
          <div class="content-header flex">
            <div class="w-1/2">
              <ms-input-icon>
                <template v-slot:default>
                  <input
                      type="text"
                      placeholder="Nhập từ khóa tìm kiếm"
                      v-model="txtSearch"
                      @input="onSearch"
                      maxlength="255"
                      ref="txtSearch"
                  />
                </template>
              </ms-input-icon>
            </div>
            <div class="w-1/2">
              <div class="show-layout-info text-align-right">
                Sửa tên cột hiển thị và độ rộng
              </div>
            </div>
          </div>
          <div class="content-body">
            <ms-table-editor
                ref="table-editor"
                :max-height="false"
                :is-show-control="false"
                :header-data="headerData"
                :body-data="listData"
                :delete-function="false"
                @handleChangeColumns="onChangeColumns"
            ></ms-table-editor>
          </div>
        </div>
        <!--      end content-->
        <!--      footer-->
        <div class="m-modal-footer">
          <div class="divide-is-right"></div>
          <div class="btn-group flex justify-content-space-between">
            <ms-modal-button
                @click="closeModal"
                :option="{
                title: 'Hủy',
                class: 'm-modal-btn'
              }"
            />
            <div class="flex">
              <ms-modal-button
                  @click="onGetDefaultLayout"
                  :option="{
                  title: 'Lấy mẫu ngầm định',
                  class: 'm-modal-btn'
                }"
              />
              <ms-modal-button
                  :option="{
                  title: 'Cất',
                  class: 'm-modal-btn-secondary ml-3'
                }"
                  @click="onSubmit"
              />
            </div>
          </div>
        </div>
        <!--      end footer-->

        <!--      resize-->
        <div @click="resize" ref="resize" class="resize flex is-full-screen-false cursor-pointer">
          <div class="m-icon mi-chevron-left w-4 h-4"></div>
        </div>
        <!--      end resize-->
      </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import MSModalButton from "@/components/base/modal/MSModalButton";
import MSTooltip from "@/components/base/MSTooltip";
import MSInputIcon from "@/components/base/input/MSInputIcon";
import MSTableEditor from "@/components/base/MSTableEditor";
import Enum from "@/script/enum";

export default {
  name: "DisplayEditor",
  data() {
    return {
      isFullScreen: false,
      isShowModal: false,
      headerData: [
        {name: "", key: "", type: Enum.TypeOfTableEditor.CheckBox},
        {name: "Tên cột dữ liệu", key: "name", type: Enum.TypeOfTableEditor.Text},
        {name: "Độ rộng", key: "col_width", type: Enum.TypeOfTableEditor.Input},
      ],
      // layout ngầm định
      defaultLayout: [],
      // template
      template: null,
    }
  },
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
    category: {
      type: String,
      default: "",
    }
  },
  computed: {
    ...mapGetters(["layout"]),
  },
  components: {
    "MsModalButton": MSModalButton,
    "MsTooltip": MSTooltip,
    "MsInputIcon": MSInputIcon,
    "MsTableEditor": MSTableEditor,
  },
  methods: {
    ...mapActions(["getLayout", "updateLayout"]),

    /**
     * Hàm thay đổi kích thước (responsive)
     * @since 14/04/2022
     * @author NVLINH
     */
    resize() {
      this.isFullScreen = !this.isFullScreen;
      const resize = this.$refs.resize;
      const modal = this.$refs["modal-v2"];
      if (this.isFullScreen) {
        resize.classList.add("is-full-screen-true")
        modal.classList.add("w-full-resize");
      } else {
        resize.classList.remove("is-full-screen-true")
        modal.classList.remove("w-full-resize");
      }
    },

    /**
     * Mở modal tùy chỉnh giao diện
     * @since 05/04/2022
     * @author NVLINH
     */
    openModal() {
      this.isShowModal = true;
    },

    /**
     * Đóng modal tùy chỉnh giao diện
     * @since 05/04/2022
     * @author NVLINH
     */
    closeModal() {
      this.isShowModal = false;
    },

    /**
     * Hàm thực hiện khi lưu form tùy chỉnh giao diện
     * @returns {Promise<void>}
     * @since 14/04/2022
     * @author NVLINH
     */
    async onSubmit() {
      // tạo template content đã thay đổi theo người dùng custom
      let template_content = JSON.stringify(this.listData);
      // tạo object layout
      let layout = {template_content: template_content, layout_code: this.category};
      // thực hiện cập nhật layout custom (is_default = false)
      let response = await this.updateLayout(layout);
      if (response > 0) {
        // gọi ra hàm cha để thay đổi listHeader và list column filter
        this.$emit("handleChangeDisplayData", this.listData)
        // đóng form tùy chỉnh
        this.closeModal();
      }
    },

    /**
     * Lấy mẫu ngầm định
     * @since 14/04/2022
     * @author NVLINH
     */
    async onGetDefaultLayout() {
      // gọi api lấy mẫu ngầm định
      let response = await this.getLayout({is_default: true, layout_code: this.category});
      if (response) {
        // gán default layout
        this.defaultLayout = JSON.parse(response["template_content"]);
        // tạo layout chỉ chứa các key isShow = true từ default layout
        const layout = this.defaultLayout.filter(item => item["isShow"] === true);
        // set custom layout giống default layout
        this.$refs["table-editor"].setCustomTemplate(layout);
      }
    },

    /**
     * Hàm thực hiện khi thay đổi tích chọn các cột
     * @since 14/04/2022
     * @author NVLINH
     */
    onChangeColumns(columns) {
      this.$emit("handleChangeColumn", columns)
    }
  },
}
</script>

<style scoped>
.m-wrapper-modal-v2 {
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 5;
}

.m-modal-v2 {
  position: relative;
  height: 100%;
  right: 0;
  left: auto;
  min-width: 800px;
  max-width: 800px;
  width: 800px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  transition: all .3s ease-in;
}

/*header*/

.m-modal-header {
  padding: 16px 16px 20px 16px;
  width: 100%;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
  justify-content: space-between;
  box-sizing: border-box;
}

.ms-collapse-item--header {
  font-size: 18px;
  display: block;
  padding: 10px 10px 10px 0;
  position: relative;
  transition: all .2s ease-out;
  color: inherit;
  text-decoration: none;
}

.ms-collapse-item--header:hover {
  color: #12b400;
}

/*end header*/

/*content*/

.m-modal-content {
  padding: 0 16px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  box-sizing: border-box;
}

.con-content--item {
  padding: 0 10px 10px 10px;
}

/*end content*/

/*footer*/

.m-modal-footer {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
}

.m-modal-footer .divide-is-right {
  height: 4px;
  background: #f4f5f8;
  width: 100%;
}

.m-modal-footer .btn-group {
  padding: 11px 16px;
  box-sizing: border-box;
}

/*end footer*/

/*resize*/

.is-full-screen-false {
  transform: rotate(0deg);
}

.resize {
  width: 12px;
  height: 50px;
  background: #fff;
  border: 1px solid #d4d7dc;
  border-radius: 8px;
  position: absolute;
  align-items: center;
  left: -6px;
  top: 43%;
  z-index: 99;
  resize: both;
  box-sizing: border-box;
}

.is-full-screen-true {
  transform: rotate(180deg) !important;
}

.w-full-resize {
  left: 6px !important;
  min-width: calc(100vw - 6px) !important;
  max-width: calc(100vw - 6px) !important;
  width: calc(100vw - 6px) !important;
}

/*end resize*/

h2 {
  margin: 0;
  font-size: 24px;
}

.show-layout-info {
  font-size: 13px;
  color: #0075c0;
  cursor: pointer;
}
</style>