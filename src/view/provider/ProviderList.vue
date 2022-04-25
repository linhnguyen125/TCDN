<template>
  <div class="content-header" ref="employeeList">
    <div class="content-header-top">
      <div class="m-content-title">Danh sách nhà cung cấp</div>
      <div class="btn-group">
        <ms-button :title="'Tiện ích'"></ms-button>

        <ms-multi-button>
          <template v-slot:button>
            <button
                class="m-btn-add"
                @click="openModal({ data: {}, formMode: 1 })"
            >
              <span>Thêm</span>
            </button>
          </template>
        </ms-multi-button>
      </div>
    </div>
    <div class="content-header-bottom d-none">
      <div class="m-icon m-icon-back"></div>
      <a href="#">Tất cả danh mục</a>
    </div>
  </div>

  <ms-overview></ms-overview>

  <div class="content-body">
    <div class="button-list">
      <div class="flex align-item-center">
        <div
            class="m-icon m-arrow-check-all cursor-pointer w-6 h-6 mt-10 ml-3"
        ></div>
        <div class="w-4 h-4"></div>
        <ms-button :title="'Thực hiện hàng loạt'" @click="showListAction = !showListAction"></ms-button>
        <div class="w-4 h-4"></div>
        <ms-button :title="'Lọc'"></ms-button>
      </div>

      <div class="ultility-buttons">
        <div class="body-search">
          <div class="m-input-icon">
            <input
                type="text"
                placeholder="Tìm kiếm theo mã, tên nhân viên"
                v-model="txtSearch"
                @input="onSearch"
                maxlength="255"
                ref="txtSearch"
            />
            <div class="m-icon-input m-icon m-icon-search"></div>
          </div>
        </div>
        <div class="refresh-button" @click="loadData">
          <div
              class="w-h-100 m-icon m-icon-refresh-medium ms-tooltip"
          >
            <ms-tooltip :title="'Tải lại (Ctrl R)'"></ms-tooltip>
          </div>
        </div>
        <div class="export-button" @click="exportData">
          <div class="w-h-100 m-icon m-icon-export-medium ms-tooltip">
            <ms-tooltip :title="'Xuất khẩu (Ctrl E)'"></ms-tooltip>
          </div>
        </div>
        <div class="setting-button" @click="openEditorDisplay">
          <div
              class="w-h-100 m-icon m-icon-setting-medium ms-tooltip"
          >
            <ms-tooltip :title="'Tùy chỉnh giao diện'"></ms-tooltip>
          </div>
        </div>
      </div>
    </div>

    <div class="data-table">
      <ms-table-v2
          ref="table"
          :header-data="headerData"
          :body-data="bodyData"
          :isLoading="isLoading"
          :page-size="pageSize"
          @handleOpenModalUpdate="openModal"
          @handleShowFunc="showFunc"
          @handleChangeArrIds="onChangeArrIds"
      ></ms-table-v2>
    </div>

    <div v-if="showListAction === true && showMultiDelete === true" id="m-dropdown" class="m-dropdown block"
         style="top: 262px;left: 335px;">
      <div @click="multipleDel">Xóa</div>
    </div>

    <!-- paging -->
    <ms-paging
        @handleChangePageSize="changePageSize"
        @handleChangCurrentPage="changeCurrentPage"
        :totalPage="totalPage"
        :pageSize="pageSize"
        :currentPage="currentPage"
        :totalRecord="totalRecord"
    ></ms-paging>
    <!-- end paging -->

    <display-editor
        ref="display-editor"
        :list-data="template"
        :category="category"
        @handleChangeDisplayData="onChangeDisplayData"
        @handleChangeColumn="onChangeColumn"
    ></display-editor>

    <provider-detail ref="provider-detail"></provider-detail>

  </div>

  <provider-drop-down
      ref="provider-drop-down"
      @handleDelete="onDeleteProvider"
      @handleCopy="onCopyProvider"
  ></provider-drop-down>

  <ms-dialog ref="dialog" :option="popupOption" @handleConfirm="confirm"></ms-dialog>

  <div id="toast"></div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import _ from "lodash";
import MsOverview from "@/components/base/MSOverview";
import MSTableV2 from "@/components/base/MSTableV2";
import MsPaging from "@/components/base/MSPagning";
import MsTooltip from "@/components/base/MSTooltip";
import MSMultiButton from "@/components/base/MSMultiButton";
import MSButton from "@/components/base/MSButton";
import ProviderDetail from "@/view/provider/ProviderDetail";
import DisplayEditor from "@/view/provider/DisplayEditor";
import ProviderDropDown from "@/view/provider/ProviderDropDown";
import Enum from "@/script/enum";
import format from "string-format";
import Resource from "@/resources/resources";
import MSDialog from "@/components/base/v2/MSDialog";
import {toast} from "@/lib/toast";
import {createKeybindingsHandler} from "tinykeys";

export default {
  name: "ProviderList",
  data() {
    return {
      showListAction: false,
      category: "vendor",
      isLoading: true,
      // số bản ghi trên 1 trang
      pageSize: 20,
      // trang hiện tại
      currentPage: 1,
      // text tìm kiếm
      txtSearch: "",
      // header truyền cho table v2 (filter những cột isShow = true trong list template)
      headerData: [],
      // list column để filter data
      columns: [],
      // list template custom
      template: [],
      provider: {},
      popupOption: {},
      formMode: 1,
      arrIds: [],
    };
  },
  async created() {
    // lấy ra custom template từ api
    let response = await this.getLayout({is_default: false, layout_code: this.category});
    // gán custom template
    this.template = JSON.parse(response["template_content"]);
    // lấy header data (lấy những cột có isShow = true) để hiển thị ra màn hình
    this.headerData = this.template.filter(item => item["isShow"] === true);
    // lấy column filter
    for (let item in this.headerData) {
      if (this.headerData[item]["isShow"] === true) {
        this.columns.push(this.headerData[item]["key"]);
      }
    }
    /**
     * Thực hiện lấy dữ liệu hiển thị ra màn hình
     */
    this.isLoading = true;
    await this.getAccountObjectsPaging({
      page_size: this.pageSize,
      page_number: this.currentPage,
      category: this.category,
      txt_search: this.txtSearch,
      columns: this.columns,
    });
    this.isLoading = false;
  },
  computed: {
    ...mapGetters(["account_objects", "layout"]),
    // Data truyền cho table
    bodyData() {
      let _data = [];
      if (this.account_objects) {
        _data = this.account_objects["data"];
      }
      return _data;
    },

    // Tổng số trang
    totalPage() {
      if (this.account_objects) {
        return this.account_objects.totalPage;
      }
      return 1;
    },

    // Tổng số bản ghi
    totalRecord() {
      if (this.account_objects) {
        return this.account_objects.totalRecord;
      }
      return 0;
    },

    showMultiDelete() {
      return this.arrIds.length >= 1;

    }
  },
  watch: {
    pageSize() {
      // Đặt lại trang hiện tại = 1
      this.currentPage = 1;
      this.loadData();
    },
    currentPage() {
      this.loadData();
    },
    columns() {
      this.loadData();
    },
    arrIds() {
      this.showListAction = false;
    },
  },
  mounted() {
    // Xử lý phím tắt
    let handler = createKeybindingsHandler({
      "$mod+Alt+O": () => {
        this.openModal({data: {}, formMode: Enum.FormMode.Create});
      },
      "$mod+K": (event) => {
        event.preventDefault();
        this.$refs.txtSearch.focus();
      },
      "$mod+R": (event) => {
        event.preventDefault();
        this.loadData();
      },
      "$mod+E": (event) => {
        event.preventDefault();
        this.exportData();
      },
    })
    window.addEventListener("keydown", handler)
  },
  methods: {
    ...mapActions(["getAccountObjectsPaging", "getLayout", "deleteAccountObject", "deleteAccountObjects"]),

    /**
     * Hàm load lại dữ liệu
     * @since 04/03/2022
     * @author NVLINH
     */
    async loadData() {
      try {
        // show loading skeleton
        this.isLoading = true;
        await this.getAccountObjectsPaging({
          page_size: this.pageSize,
          page_number: this.currentPage,
          category: this.category,
          txt_search: this.txtSearch,
          columns: this.columns,
        });
        // ẩn loading skeleton
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thay đổi số bản ghi trên 1 trang
     * @param pageSize
     * @since 06/03/2022
     * @author NVLINH
     */
    changePageSize(pageSize) {
      this.pageSize = pageSize;
    },

    /**
     * Thay đổi số trang trang hiện tại (currentPage)
     * @param page
     * @since 06/03/2022
     * @author NVLINH
     */
    changeCurrentPage(page) {
      this.currentPage = page;
    },

    /**
     * Mở from detail
     * @param data
     * @param formMode
     */
    openModal({data, formMode}) {
      this.$refs["provider-detail"].openModal({data, formMode});
      this.$refs["provider-detail"].autoFocus();
    },

    /**
     * Mở tùy chỉnh giao diện
     * @since 13/04/2022
     * @author NVLINH
     */
    openEditorDisplay() {
      this.$refs["display-editor"].openModal();
    },

    /**
     * Khi thay đổi giao diện => cập nhật lại list column filter
     * @param data
     * @since 13/04/2022
     * @author NVLINH
     */
    onChangeDisplayData(data) {
      // gán lại list column thành rỗng
      this.columns = [];
      // cập nhật list header (lấy những cột isShow = true) mà người dùng thay đổi
      this.headerData = data.filter(item => item["isShow"] === true);
      for (let item in this.headerData) {
        // cập nhật lại list column filter
        this.columns.push(this.headerData[item]["key"]);
      }
    },

    /**
     * Hàm thực hiện khi tích chọn dòng thay đổi giao diện
     * @param columns
     * @since 14/04/2022
     * @author NVLINH
     */
    onChangeColumn(columns) {
      // thay đổi key isShow = true cho những cột mà người dùng tích chọn
      for (let i in this.template) {
        let keyTmp = this.template[i]["key"];
        for (let j in columns) {
          let key = columns[j]["key"];
          if (keyTmp === key) {
            this.template[i]["isShow"] = true;
            break;
          } else {
            this.template[i]["isShow"] = false;
          }
        }
      }
    },

    /**
     * Lấy giá trị mảng accountObjectId khi thay đổi
     * @param arrIds
     * @since 14/03/2022
     * @author NVLINH
     */
    onChangeArrIds(arrIds) {
      this.arrIds = [];
      arrIds.forEach(item => {
        this.arrIds.push(item.account_object_id);
      })
    },

    /**
     * Hàm quy định ẩn hiện dropdown func
     * @param provider - object (dữ liệu trên dòng muốn thực hiện thao tác)
     * @since 04/03/2022
     * @author NVLINH
     */
    showFunc(provider) {
      this.$refs["provider-drop-down"].toggle();
      this.provider = provider;
    },

    /**
     * Show dialog xóa ncc
     * @since 27/02/2022
     * @author NVLINH
     */
    onDeleteProvider() {
      // Gán lại formMode
      this.formMode = Enum.FormMode.Delete;
      // Mở popup cảnh báo
      this.openPopup(Enum.DialogCode.Delete, format(Resource.Message.Delete, "nhà cung cấp ", this.provider.account_object_code));
    },

    /**
     * Show dialog xóa hàng loạt
     * @since 27/02/2022
     * @author NVLINH
     */
    multipleDel() {
      this.formMode = Enum.FormMode.MultiDelete
      this.showListAction = false;
      // Mở form cảnh báo
      this.openPopup(Enum.DialogCode.Delete, format(Resource.Employee.Multi_delete, "nhà cung cấp"))
    },

    /**
     * Hàm xác nhận trên dialog
     */
    async confirm(confirmation) {
      if (confirmation === true) {
        switch (this.formMode) {
          case Enum.FormMode.Delete:
            await this.deleteAccountObject(this.provider);
            // Xử lý khi có thông tin trả về
            this.showToastMsg({
              title: format(Resource.Employee.Success_deleted, "nhà cung cấp "),
              type: Enum.ToastType.Success
            })
            this.$refs["provider-drop-down"].hide();
            this.$refs["dialog"].closeDialog();
            await this.loadData();
            break;
          case Enum.FormMode.MultiDelete:
            await this.deleteAccountObjects(this.arrIds);
            this.showToastMsg({
              title: format(Resource.Employee.Success_deleted, "nhà cung cấp "),
              type: Enum.ToastType.Success
            })
            this.$refs["dialog"].closeDialog();
            await this.loadData();
            break;
        }
      }
    },

    /**
     * Hàm hiển thị toast message
     * @param title
     * @param type
     * @since 09/04/2022
     */
    showToastMsg({title, type}) {
      toast({
        title: title,
        type: type,
      });
    },

    /**
     * Hàm mở popup cảnh báo
     * @param type - Kiểu cảnh báo
     * @param msg - câu cảnh báo
     * @since 09/04/2022
     * @author NVLINH
     */
    openPopup(type, msg) {
      this.popupOption = {
        status: type,
        msg: msg,
      };
      // Mở dialog
      this.$refs.dialog.openDialog();
    },

    /**
     * Hàm search dữ liệu
     * @since 08/03/2022
     * @author NVLINH
     */
    onSearch: _.debounce(function () {
      // đặt lại currentPage
      this.currentPage = 1;
      // thực hiện load lại dữ liệu theo txt tìm kiếm
      this.loadData();
    }, 1000),
  },
  components: {
    MsOverview,
    MsTableV2: MSTableV2,
    MsPaging,
    MsTooltip,
    MsMultiButton: MSMultiButton,
    MsButton: MSButton,
    ProviderDetail,
    DisplayEditor,
    ProviderDropDown,
    "MsDialog": MSDialog,
  },
};
</script>
<style></style>
