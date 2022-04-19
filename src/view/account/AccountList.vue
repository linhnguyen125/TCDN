<template>
  <div class="content-header" ref="employeeList">
    <div class="content-header-top">
      <div class="m-content-title">Hệ thống tài khoản</div>
      <div class="btn-group">
        <button class="m-btn d-none">
          <div class="m-wrapper-btn">
            <span class="m-btn-text">Tiện ích</span>
            <div class="m-btn-icon m-icon m-icon-more-dark"></div>
          </div>
        </button>

        <ms-multi-button>
          <template v-slot:button>
            <button
                class="m-btn-add"
                @click="openModal({data: {}, formMode: 1})"
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
  <div class="content-body">
    <div class="button-list">
      <div class="ultility-buttons flex w-full justify-content-space-between">
        <div class="body-search">
          <div class="m-input-icon">
            <input
                type="text"
                placeholder="Tìm kiếm theo số, tên tài khoản"
                name="txt_search"
                v-model="txtSearch"
                @input="onSearch"
                maxlength="255"
                ref="txtSearch"
            />
            <div class="m-icon-input m-icon m-icon-search"></div>
          </div>
        </div>
        <div class="flex">
          <div class="refresh-button" @click="loadData">
            <div class="w-h-100 m-icon m-icon-refresh-medium ms-tooltip">
              <ms-tooltip :title="'Tải lại (Ctrl R)'"></ms-tooltip>
            </div>
          </div>
          <div class="export-button" @click="exportData">
            <div class="w-h-100 m-icon m-icon-export-medium ms-tooltip">
              <ms-tooltip :title="'Xuất khẩu (Ctrl E)'"></ms-tooltip>
            </div>
          </div>
          <div class="setting-button d-none">
            <div class="w-h-100 m-icon m-icon-setting-medium"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="data-table">
      <ms-table-v2
          ref="table"
          :header-data="headerData"
          :body-data="bodyData"
          :col-index="false"
          @handleOpenModalUpdate="openModal"
          @handleShowFunc="showFunc"
          :isLoading="isLoading"
      ></ms-table-v2>
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

    <account-detail
        ref="account-detail"
        @handleLoadData="loadData"
    ></account-detail>

    <!-- <employee-detail
        ref="modal"
        v-if="isShowModal === true"
        :isShowModal="isShowModal"
        @handleCloseModal="closeModal"
        @handleOnSave="onSave"
        @handSaveAndInsert="onSaveAndInsert"
        :employeeProps="employee"
        :newEmployeeCode="newEmployeeCode"
        :formMode="formMode"
    ></employee-detail> -->

    <ms-dialog
        ref="dialog"
        :option="option"
        @handleConfirm="confirm"
    ></ms-dialog>
  </div>

  <account-drop-down
      ref="drop-down"
  >
    <template v-slot:default>
      <div @click="copy">Nhân bản</div>
      <div @click="onDelete">Xóa</div>
      <div>Chuyển tài khoản hoạch toán</div>
      <div>Ngừng sử dụng</div>
    </template>
  </account-drop-down>

  <div id="toast"></div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import Enum from "@/script/enum";
import MSMultiButton from "@/components/base/MSMultiButton";
import MSTableV2 from "@/components/base/MSTableV2";
import MsPaging from "@/components/base/MSPagning";
import MsTooltip from "@/components/base/MSTooltip";
import AccountDetail from "@/view/account/AccountDetail";
import AccountDropDown from "@/view/account/AccountDropDown";
import format from "string-format";
import Resource from "@/resources/resources";
import MSDialog from "@/components/base/v2/MSDialog";
import {toast} from "@/lib/toast";

export default {
  name: "AccountList",
  data() {
    return {
      enum: Enum.FormMode,
      isLoading: true,
      // số bản ghi trên 1 trang
      pageSize: 20,
      // trang hiện tại
      currentPage: 1,
      // text tìm kiếm
      txtSearch: "",
      headerData: [
        {name: "Số tài khoản", key: "account_number", theadClass: "mw-10"},
        {name: "Tên tài khoản", key: "account_name"},
        {name: "Tính chất", key: "account_object_type_name", theadClass: "mw-10"},
        {name: "Tên tiếng anh", key: "account_name_english"},
        {name: "Diễn giải", key: "description", theadClass: "mw-20"},
        {name: "Trạng thái", key: "state_name"},
      ],
      account: {},
      isShowFunc: false,
      option: {},
      formMode: null,
    }
  },
  components: {
    "MsMultiButton": MSMultiButton,
    "MsTableV2": MSTableV2,
    MsPaging,
    MsTooltip,
    AccountDetail,
    AccountDropDown,
    "MsDialog": MSDialog,
  },
  async created() {
    // Thực hiện lấy dữ liệu hiển thị ra màn hình
    this.isLoading = true;
    await this.getAccountsPaging({
      pageSize: 10,
      pageNumber: 1,
      txtSearch: this.txtSearch,
    });
    this.isLoading = false;
  },
  computed: {
    ...mapGetters(["accountsPaging"]),

    // Data truyền cho table emp
    bodyData() {
      let _data = [];
      if (this.accountsPaging) {
        _data = this.accountsPaging["data"];
      }
      return _data;
    },

    // Tổng số trang
    totalPage() {
      if (this.accountsPaging) {
        return this.accountsPaging.totalPage;
      }
      return 1;
    },

    // Tổng số bản ghi
    totalRecord() {
      if (this.accountsPaging) {
        return this.accountsPaging.totalRecord;
      }
      return 0;
    },
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
  },
  methods: {
    ...mapActions([
      "getAccountsPaging",
      "deleteAccount",
    ]),

    openModal({data, formMode}) {
      this.$refs["account-detail"].openModal({data, formMode});
    },

    /**
     * Hàm load lại dữ liệu
     * @since 04/03/2022
     * @author NVLINH
     */
    async loadData() {
      try {
        // show loading skeleton
        this.isLoading = true;
        await this.getAccountsPaging({
          pageSize: this.pageSize,
          pageNumber: this.currentPage,
          txtSearch: this.txtSearch,
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
     * Hàm quy định ẩn hiện dropdown func
     * @param account - object (dữ liệu trên dòng muốn thực hiện thao tác)
     * @since 04/03/2022
     * @author NVLINH
     */
    showFunc(account) {
      this.$refs["drop-down"].showDropDown();
      this.account = account;
    },

    /**
     * hàm xóa nhân viên
     * @since 11/04/2022
     * @author NVLINH
     */
    onDelete() {
      // Gán lại formMode
      this.formMode = Enum.FormMode.Delete;
      // Mở popup cảnh báo
      this.openPopup(Enum.DialogCode.Delete, format(Resource.Message.Delete, this.account.account_number));
    },

    async confirm(confirmation) {
      if (this.formMode === Enum.FormMode.Delete && confirmation) {
        let response = await this.deleteAccount(this.account);
        let data = response.data;
        if (data.statusCode === Enum.StatusCode.OK) { // thành công
          this.showToastMsg({title: Resource.Employee.Success_deleted, type: Enum.ToastType.Success})
          this.$refs.dialog.closeDialog();
          this.$refs["drop-down"].hideDropDown();
          await this.loadData();
        } else if (data.statusCode === Enum.StatusCode.BadRequest) { // Lỗi badrequest
          let errorMsg = data.userMsg;
          this.openPopup(Enum.DialogCode.Warning, errorMsg);
        } else {
          console.log(data);
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
      this.option = {
        status: type,
        msg: msg,
      };
      // Mở dialog
      this.$refs.dialog.openDialog();
    }
  },
}
</script>
<style>

</style>