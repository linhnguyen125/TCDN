<template>
  <div class="content-header" ref="employeeList">
    <div class="content-header-top">
      <div class="m-content-title">Nhân viên</div>
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
                @click="openModal({data: {}, formMode: enumFormMode.Create})"
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
      <div class="check-all-dropdown">
        <button class="m-btn relative" @click="showBtnDel">
          <div class="m-wrapper-btn">
            <span class="m-btn-text">Thực hiện hàng loạt</span>
            <div class="m-btn-icon m-icon m-icon-more-dark"></div>
          </div>
          <div id="m-dropdown" class="m-dropdown" v-if="isShowDel && isShowBtnDel" :class="{block: isShowBtnDel}">
            <div @click="multipleDel">Xóa</div>
          </div>
        </button>
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
    <div class="data-table">
      <ms-table-v2
          ref="table"
          :body-data="bodyData"
          :header-data="headerData"
          @handleOpenModalUpdate="openModal"
          @handleShowFunc="showFunc"
          @handleChangeArrIds="onChangeArrIds"
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

    <employee-detail
        ref="modal"
        v-if="isShowModal === true"
        :isShowModal="isShowModal"
        @handleCloseModal="closeModal"
        @handleOnSave="onSave"
        @handSaveAndInsert="onSaveAndInsert"
        :employeeProps="employee"
        :newEmployeeCode="newEmployeeCode"
        :formMode="formMode"
    ></employee-detail>

    <ms-dialog
        v-show="isShowDialog === true"
        @handleConfirm="onConfirm"
        :option="option"
    ></ms-dialog>
  </div>

  <emp-drop-down
      :isShowFunc="isShowFunc"
      @handleDelete="onDeleteEmployee"
      @handleCopy="onCopyEmployee"
  ></emp-drop-down>

  <div id="toast"></div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {toast} from "@/lib/toast.js";
import Enum from "@/script/enum.js";
import Resource from "@/resources/resources";
import _ from 'lodash';
import {createKeybindingsHandler} from "tinykeys"
import MsPaging from "@/components/base/MSPagning.vue";
import MsDialog from "@/components/base/MSDialog";
import MSTableV2 from "@/components/base/MSTableV2";
import EmployeeDetail from "@/view/employee/EmployeeDetail.vue";
import EmpDropDown from "@/view/employee/EmpDropDown";
import MsTooltip from "@/components/base/MSTooltip";
import MSMultiButton from "@/components/base/MSMultiButton";

const FileDownload = require('js-file-download');
const format = require('string-format');

export default {
  name: "EmployeeList",
  components: {
    EmpDropDown,
    MsPaging,
    EmployeeDetail,
    MsDialog,
    "MsTableV2": MSTableV2,
    MsTooltip,
    "MsMultiButton": MSMultiButton,
  },
  data: function () {
    return {
      // Thuộc tính quy định ẩn hiện Modal thêm/sửa nhân viên
      isShowModal: false,
      // Form mode (delete : xóa, create: thêm mới, update: sửa)
      formMode: 1,
      // dữ liệu nhân viên lấy được khi chọn từng dòng trên table
      employee: {},
      // thuộc tính quy định ẩn hiện dialog cảnh báo
      isShowDialog: false,
      // thuộc tính quy định ẩn hiện dropdown func
      isShowFunc: false,
      // option truyền cho dialog
      option: {},
      // số bản ghi trên 1 trang
      pageSize: 10,
      // trang hiện tại
      currentPage: 1,
      // text tìm kiếm
      txtSearch: "",
      // thuộc tính quy định tính năng cất và thêm mới
      isSaveAndInsert: false,
      // mảng id nhân viên cần xóa
      arrIds: [],
      // thuộc tính quy định ẩn hiện nút xóa
      isShowBtnDel: false,
      newEmployeeCode: null,
      // thuộc tính quy định form đã valid hay chưa
      isFormValid: true,
      isLoading: true,
      headerData: [
        {name: "Mã nhân viên", key: "employee_code", theadClass: "sticky l-3 z-3", bodyClass: "sticky l-3"},
        {name: "Tên nhân viên", key: "full_name", theadClass: "sticky l-13 z-3", bodyClass: "sticky l-13"},
        {name: "Giới tính", key: "gender_name", theadClass: "mw-5", bodyClass: "mw-5"},
        {name: "Ngày sinh", key: "date_of_birth", theadClass: "text-align-center", bodyClass: "text-align-center"},
        {name: "Tên đơn vị", key: "department_name"},
        {name: "Chức danh", key: "position_name"},
        {name: "Số CMND", key: "identity_number"},
        {name: "Ngày câp", key: "identity_date", theadClass: "text-align-center", bodyClass: "text-align-center"},
        {name: "Nơi cấp", key: "identity_place", theadClass: "mw-20"},
        {name: "Địa chỉ", key: "address", theadClass: "mw-20"},
        {name: "ĐT di động", key: "phone_number"},
        {name: "ĐT cố định", key: "land_line"},
        {name: "Email", key: "email"},
        {name: "Tài khoản ngân hàng", key: "bank_account"},
        {name: "Tên ngân hàng", key: "bank_name"},
        {name: "Chi nhánh ngân hàng", key: "bank_branch"},
      ],
    };
  },
  computed: {
    ...mapGetters(["employees", "employeesPaging"]),

    // Data truyền cho table emp
    bodyData() {
      let _data = [];
      if (this.employeesPaging) {
        _data = this.employeesPaging["data"];
      }
      return _data;
    },

    // Tổng số trang
    totalPage() {
      if (this.employeesPaging) {
        return this.employeesPaging.totalPage;
      }
      return 1;
    },

    enumFormMode() {
      return Enum.FormMode;
    },

    // Tổng số bản ghi
    totalRecord() {
      if (this.employeesPaging) {
        return this.employeesPaging.totalRecord;
      }
      return 0;
    },

    isShowDel() {
      return this.arrIds.length >= 1;
    }
  },
  async created() {
    // Thực hiện lấy dữ liệu hiển thị ra màn hình
    this.isLoading = true;
    await this.getEmployeesPaging({
      pageSize: 10,
      pageNumber: 1,
      txtSearch: this.txtSearch,
    });
    this.isLoading = false;
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
    ...mapActions([
      "createEmployee",
      "updateEmployee",
      "deleteEmployee",
      "getEmployeesPaging",
      "deleteEmployees",
      "getNewEmployeeCode",
      "exportToExcel"
    ]),

    /**
     * Mở modal nhân viên
     * @param data - object
     * @param formMode - string
     * @since 27/02/2022
     * @author NVLINH
     */
    async openModal({data, formMode}) {
      // gán formMode
      this.formMode = formMode;
      // props data cho Modal
      this.employee = data;
      // Format định dạng ngày (nếu có) tháng trước khi hiển thị lên form
      if (this.employee.date_of_birth) {
        this.employee.date_of_birth = new Date(this.employee.date_of_birth);
      }
      if (this.employee.identity_date) {
        this.employee.identity_date = new Date(this.employee.identity_date);
      }
      // bind newEmployeeCode trước khi mởi form
      if (formMode !== Enum.FormMode.Update) {
        await this.bindNewEmployeeCode();
      }
      this.isShowModal = true;
    },

    /**
     * Đóng modal thêm nhân viên
     * @param isShowModal (true: mở, false: đóng)
     * @param isChangeData (true: đã thay đổi, false: chưa thay đổi)
     * @since 27/02/2022
     * @author NVLINH
     */
    closeModal({isShowModal, isChangeData}) {
      if (isChangeData) {
        // Nếu dữ liệu đã thay đổi thì đưa ra thông báo
        this.openPopup(Enum.DialogCode.Edit, Resource.Dialog.Data_changed);
      } else {
        // Đóng form
        this.isShowModal = isShowModal;
      }
    },

    /**
     * Lưu dữ liệu khi nhấn Lưu
     * @param employee - object
     * @since 27/02/2022
     * @author NVLINH
     */
    onSave(employee) {
      try {
        // Thêm mới
        if (this.formMode === Enum.FormMode.Create) {
          // Gọi api thêm mới
          let response = this.createEmployee(employee);
          response.then((res) => {
            // Xử lý khi có thông tin trả về
            this.showDialog(res, Enum.StatusCode.Created, Resource.Employee.Success_created, Enum.ToastType.Success);
            this.checkAfterSubmit()
          })
        } else if (this.formMode === Enum.FormMode.Update) {
          // Gọi api cập nhật
          let response = this.updateEmployee({
            employeeId: employee.employeeId,
            employee: employee,
          });
          response.then((res) => {
            // Xử lý khi có thông tin trả về
            this.showDialog(res, Enum.StatusCode.OK, Resource.Employee.Success_updated, Enum.ToastType.Success);
            this.checkAfterSubmit();
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Show dialog xóa nhân viên
     * @since 27/02/2022
     * @author NVLINH
     */
    onDeleteEmployee() {
      // Gán lại formMode
      this.formMode = Enum.FormMode.Delete;
      // Mở popup cảnh báo
      this.openPopup(Enum.DialogCode.Delete, format(Resource.Message.Delete, this.employee.employee_code));
    },

    /**
     * Thực hiện nhân bản dữ liệu
     * @since 14/03/2022
     * @author NVLINH
     */
    onCopyEmployee() {
      // Mở form
      this.openModal({data: this.employee, formMode: Enum.FormMode.Create});
      // Đóng dropdown
      this.isShowFunc = false;
    },

    /**
     * Xác nhận thao tác với dữ liệu
     * @param confirmation
     * @since 27/02/2022
     * @author NVLINH
     */
    onConfirm(confirmation) {
      switch (this.formMode) {
          // Form Mode là xóa
        case Enum.FormMode.Delete:
          if (confirmation === true) {
            // Thực hiện gọi api xóa nhân viên
            let response = this.deleteEmployee(this.employee);
            response.then((res) => {
              // Xử lý sau khi có thông tin trả về
              this.showDialog(res, Enum.StatusCode.OK, Resource.Employee.Success_deleted, Enum.ToastType.Success);
            });
            // Đóng popup
            this.isShowDialog = false;
            this.isShowFunc = false;
          } else {
            // Đóng popup
            this.isShowDialog = false;
            this.isShowFunc = false;
          }
          break;
          // Form Mode là update
        case Enum.FormMode.Update:
          switch (confirmation) {
            case 'cancel':
              // Nếu hủy thao tác thì đóng dialog
              this.isShowDialog = false;
              break;
            case false:
              // Đóng popup
              this.isShowDialog = false;
              this.isShowFunc = false;
              if (this.isFormValid !== false) {
                this.isShowModal = false;
              }
              this.isFormValid = true;
              break;
            case true:
              // Thực hiện cập nhật
              this.$refs.modal.submit();
              this.isShowDialog = false;
              break;
            default:
              break;
          }
          break;
          // Form Mode là create
        case Enum.FormMode.Create:
          switch (confirmation) {
            case 'cancel':
              // Nếu hủy thao tác thì đóng popup
              this.isShowDialog = false;
              break;
            case false:
              this.isShowDialog = false;
              this.isShowFunc = false;
              if (this.isFormValid !== false) {
                this.isShowModal = false;
              }
              this.isFormValid = true;
              break;
            case true:
              // Thực hiện thêm nhân viên
              this.$refs.modal.submit();
              this.isShowDialog = false;
              break;
            default:
              break;
          }
          break;
          // Form Mode là multidelete
        case Enum.FormMode.MultiDelete:
          if (confirmation === false) {
            // Nếu không đồng ý thì hủy thao tác
            this.isShowDialog = false;
            this.isShowBtnDel = false;
            this.isShowDel = false;
          } else {
            // Gọi api xóa dữ liệu
            let response = this.deleteEmployees(this.arrIds);
            response.then((res) => {
              // Xử lý khi có thông tin trả về
              this.showDialog(res, Enum.StatusCode.OK, Resource.Employee.Success_deleted, Enum.ToastType.Success);
              // Đóng btn
              this.isShowBtnDel = !this.isShowBtnDel;
              this.isShowDialog = false;
              this.isShowDel = false;
              // reset arrIds
              this.arrIds = [];
              this.loadData();
              this.$refs.table.unCheckAll();
            })
          }
          break;
      }
      return null;
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
        await this.getEmployeesPaging({
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
     * Hàm quy định ẩn hiện dropdown func
     * @param employee - object (dữ liệu trên dòng muốn thực hiện thao tác)
     * @since 04/03/2022
     * @author NVLINH
     */
    showFunc(employee) {
      this.isShowFunc = !this.isShowFunc;
      this.employee = employee;
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
     * Hiển thị thông báo khi lưu
     * @param response - response
     * @param statusCode - Mã thông báo thành công
     * @param title - String (Nội dung thông báo lỗi)
     * @param type - String (kiểu thông báo)
     * @since 06/03/2022
     * @author NVLINH
     */
    showDialog(response, statusCode, title, type) {
      try {
        // Nếu có lỗi 400
        if (response.data.statusCode === 400) {
          this.isFormValid = false;
          let keys = Object.keys(response.data.data);
          if (keys[0] === 'EmployeeCode') {
            let msg = response.data.data[keys[0]];
            this.option = {
              status: Enum.DialogCode.Warning,
              msg: msg,
            }
            this.isShowDialog = true;
          }
        } else {
          // Lỗi do server
          if (response.data.statusCode !== statusCode) { // Có lỗi
            let msg = response.data.userMsg;
            this.option = {
              status: Enum.DialogCode.Info,
              msg: msg,
            }
            this.isShowDialog = true;
          } else {
            // Hiển thị thông báo thành công
            toast({
              title: title,
              type: type,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
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

    /**
     * Xử lý cất và thêm
     * @since 14/03/2022
     * @author NVLINH
     */
    onSaveAndInsert() {
      this.isSaveAndInsert = true;
    },

    /**
     * Reset lại modal khi nhấn cất và thêm
     * @since 14/03/2022
     * @author NVLINH
     */
    resetModal() {
      // reset lại data Employee
      this.employee = {};
      // reset input lỗi
      setTimeout(this.$refs.modal.clearError, 100);
      // this.$refs.modal.clearError();
      // đặt formMode = create
      this.formMode = Enum.FormMode.Create;
    },

    /**
     * Lấy giá trị mảng employeeId khi thay đổi
     * @param arrIds
     * @since 14/03/2022
     * @author NVLINH
     */
    onChangeArrIds(arrIds) {
      this.arrIds = Object.values(arrIds);
    },

    /**
     * Mở chức năng xóa nhiều nhân viên
     * @since 14/03/2022
     * @author NVLINH
     */
    showBtnDel() {
      this.isShowBtnDel = !this.isShowBtnDel;
    },

    /**
     * Thực hiện xóa nhân viên theo arrId
     * @since 14/03/2022
     * @author NVLINH
     */
    multipleDel() {
      this.formMode = Enum.FormMode.MultiDelete
      // Mở form cảnh báo
      this.option = {
        status: Enum.DialogCode.Delete,
        msg: Resource.Employee.Multi_delete
      }
      this.isShowDialog = true;
    },

    /**
     * Bind newEmployeeCode lên data
     * @since 15/03/2022
     * @author NVLINH
     */
    async bindNewEmployeeCode() {
      try {
        // Gán newEmployeeCode
        let response = await this.getNewEmployeeCode();
        this.newEmployeeCode = response;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm check lỗi và reset form sau khi submit
     * @since 16/03/2022
     * @author NVLINH
     */
    async checkAfterSubmit() {
      if (this.isSaveAndInsert === false) {
        if (this.isFormValid === true) {
          // Đóng form
          this.isShowModal = false;
        }
      } else {
        if (this.isFormValid === true) {
          await this.resetModal();
          // bind newEmployeeCode
          await this.bindNewEmployeeCode();
          this.isSaveAndInsert = false;
        }
      }
      // load lại data
      this.loadData();
    },

    /**
     * Hàm thực hiện xuất khẩu dữ liệu
     * @since 18/03/2022
     * @author NVLINH
     */
    exportData() {
      let tableExport = [
        {name: "Mã nhân viên", key: "employee_code"},
        {name: "Họ và tên", key: "full_name"},
        {name: "Giới tính", key: "gender_name"},
        {name: "Ngày sinh", key: "date_of_birth"},
        {name: "Chức danh", key: "department_name"},
        {name: "Vị trí", key: "position_name"},
        {name: "Email", key: "email"},
        {name: "Số điện thoại", key: "phone_number"},
        {name: "Số CMND", key: "identity_number"},
        {name: "Ngày Cấp", key: "identity_date"},
        {name: "Tài khoản ngân hàng", key: "bank_account"},
        {name: "Tên ngân hàng", key: "bank_name"},
        {name: "Chi nhánh ngân hàng", key: "bank_branch"}
      ];
      let response = this.exportToExcel(tableExport);
      response.then((response) => {
        FileDownload(response, 'Danh_sach_nhan_vien.xlsx');
      })
    },

    /**
     * Hàm mở popup cảnh báo
     * @param type - Kiểu cảnh báo
     * @param msg - câu cảnh báo
     * @since 21/03/2022
     * @author NVLINH
     */
    openPopup(type, msg) {
      this.option = {
        status: type,
        msg: msg,
      };
      // Mở dialog cảnh báo
      this.isShowDialog = true;
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
    arrIds() {
      this.isShowBtnDel = false;
    },
  },
};
</script>

<style scoped>
@import url("../../style/pages/employee.css");
</style>
