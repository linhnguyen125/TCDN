<template>
  <transition name="slide">
    <div v-if="isShow" class="ca-payment">
      <div class="header">
        <div class="top-header">
          <div class="m-icon m-recent-log w-6 h-6 cursor-pointer"></div>
          <div class="title">Phiếu chi PC001</div>
          <div class="header-detail-input">
            <div class="m-input" style="width: 350px !important;">
              <v-select
                  :options="['1. Phiếu thu', '2. Phiếu chi', '3. Khác']"
                  label="label"
              ></v-select>
            </div>
          </div>
          <div class="header-detail-btn pl-18">
            <div class="flex pr-6">
              <div class="m-icon m-tour w-6 h-6 cursor-pointer"></div>
              <span class="pl-5"><a href="#">Hướng dẫn</a></span>
            </div>
            <div class="detail-btn" @click="openEditorDisplay">
              <div class="m-icon m-icon-setting-dark h-6 w-6"></div>
            </div>
            <div class="detail-btn">
              <div class="m-icon m-icon-help-dark h-6 w-6"></div>
            </div>
            <div class="detail-btn" @click="hide">
              <div class="m-icon m-close h-6 w-6"></div>
            </div>
          </div>
        </div>
      </div>
      <Form @submit="onSubmit" @invalid-submit="onInvalidSubmit" class="w-full h-full">
        <div class="content">
          <div class="content-top">
            <div class="main-information">
              <div class="w-3/4">
                <div class="basic-information flex">
                  <div class="w-4/5 right-separate">
                    <div class="flex row-input">
                      <div class="w-3/7 column-space">
                        <div class="m-input">
                          <label>Đối tượng</label>
                          <ms-combobox
                              :options="accountObjects"
                              v-model="payment.account_object_code"
                              :append-to-body="true"
                              :searchable="true"
                              :add-item="true"
                              :listHeader="headerAccountObject"
                              :disabled="formMode === 5"
                              :lazy-loading="true"
                              cbx-name="account_object"
                              @handleLoadNext="LoadNext"
                              label="account_object_code"
                              value="account_object_code"
                          >
                            <template v-slot:default>
                              <div class="m-icon h-6 w-6 m-plus--success" @click="openProviderModal"></div>
                            </template>
                          </ms-combobox>
                        </div>
                      </div>
                      <div class="w-4/7">
                        <div class="m-input">
                          <label>Tên đối tượng</label>
                          <Field v-model="payment.account_object_name" v-slot="{field, errorMessage}"
                                 name="account_object_name">
                            <input
                                v-bind="field"
                                :class="{invalid: errorMessage}"
                                :title="errorMessage"
                                :disabled="formMode === 5"
                            />
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div class="flex row-input">
                      <div class="w-3/7 column-space">
                        <div class="m-input">
                          <label>Người nhận</label>
                          <Field v-model="payment.account_object_contact_name" v-slot="{field, errorMessage}"
                                 name="account_object_contact_name">
                            <input
                                v-bind="field"
                                :class="{invalid: errorMessage}"
                                :title="errorMessage"
                                :disabled="formMode === 5"
                            />
                          </Field>
                        </div>
                      </div>
                      <div class="w-4/7">
                        <div class="m-input">
                          <label>Địa chỉ</label>
                          <Field v-model="payment.account_object_address" v-slot="{field, errorMessage}"
                                 name="account_object_address">
                            <input
                                v-bind="field"
                                :class="{invalid: errorMessage}"
                                :title="errorMessage"
                                :disabled="formMode === 5"
                            />
                          </Field>
                        </div>
                      </div>

                    </div>
                    <div class="flex row-input w-full">
                      <div class="m-input">
                        <label>Lý do chi</label>
                        <Field v-model="payment.journal_memo" v-slot="{field, errorMessage}"
                               name="journal_memo">
                          <input
                              v-bind="field"
                              :class="{invalid: errorMessage}"
                              :title="errorMessage"
                              :disabled="formMode === 5"
                          />
                        </Field>
                      </div>
                    </div>
                    <div class="flex row-input">
                      <div class="w-3/7 column-space">
                        <div class="m-input">
                          <label>Nhân viên</label>
                          <ms-combobox
                              v-model="payment.employee_code"
                              :show-header="true"
                              :searchable="true"
                              :options="employees"
                              :list-header="headerEmployee"
                              :append-to-body="true"
                              :disabled="formMode === 5"
                              :lazy-loading="true"
                              cbx-name="employee"
                              @handleLoadNext="LoadNext"
                              label="employee_name"
                              value="employee_code"
                          ></ms-combobox>
                        </div>
                      </div>
                      <div class="w-4/7 flex w-240">
                        <div class="w-145 m-input">
                          <label>Kèm theo</label>
                          <ms-input-number
                              v-model="payment.document_included"
                              :disabled="formMode === 5"
                              placeholder="Số lượng"></ms-input-number>
                        </div>
                        <div class="root-invoice">chứng từ gốc</div>
                      </div>
                    </div>
                    <div class="flex pt-12">
                      <div class="reference-title-main">Tham chiếu</div>
                      <div class="reference-title">...</div>
                    </div>
                  </div>
                  <div class="w-1/5">
                    <div class="row-input left-separate">
                      <div class="m-input">
                        <label>Ngày hoạch toán</label>
                        <Field name="posted_date">
                          <date-picker
                              v-model:value="payment.posted_date"
                              :class="['m-input']"
                              autocomplete="off"
                              :lang="languageString"
                              :format="formatStringV2"
                              :placeholder="formatStringV2"
                              :clearable="false"
                              :disabled="formMode === 5"
                          ></date-picker>
                        </Field>
                      </div>
                    </div>
                    <div class="row-input left-separate">
                      <div class="m-input">
                        <label>Ngày phiếu chi</label>
                        <Field name="refdate">
                          <date-picker
                              v-model:value="payment.refdate"
                              :class="['m-input']"
                              autocomplete="off"
                              :lang="languageString"
                              :format="formatStringV2"
                              :placeholder="formatStringV2"
                              :clearable="false"
                              :disabled="formMode === 5"
                          ></date-picker>
                        </Field>
                      </div>
                    </div>
                    <div class="row-input left-separate">
                      <div class="m-input">
                        <label>Số phiếu chi</label>
                        <Field v-model="payment.ca_payment_code" v-slot="{field, errorMessage}"
                               name="ca_payment_code">
                          <input
                              style="width: 167.2px"
                              v-bind="field"
                              :class="{invalid: errorMessage}"
                              :title="errorMessage"
                              :disabled="formMode === 5"
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-1/4 text-align-right">
                <div class="summary-info-title">
                  Tổng tiền
                </div>
                <h1 class="summary-info-number">
                  {{ Intl.NumberFormat('vi-VN').format(payment.total_amount) }}
                </h1>
              </div>
            </div>
            <div class="grid-tab row-input grid-tab-single">
              <div class="w-full">
                <div class="con-ms-ul-tabs tab-detail flex">
                  <ul class="flex flex-1">
                    <li>
                      <div class="ms-tabs-btn">
                        <div class="tab-label">
                          Hoạch toán
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="tab-header-extend-con">
                    <div class="grid-option flex">
                      <div class="label-option">Loại tiền</div>
                      <div class="m-input" style="width: 100px">
                        <v-select
                            v-model="payment.currency_id"
                            :appendToBody="true"
                            :options="['VND', 'USD']"
                            label="label"
                        ></v-select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="con-ms-ul-tabs tab-detail pt-0 flex">
                  <div style="width: 100%">
                    <ms-table-editor
                        ref="table-editor"
                        :header-data="headerData"
                        :body-data="description"
                        :control="true"
                        :file-upload="true"
                        :col-index="true"
                        :show-footer="true"
                        :disabled="formMode === 5"
                        :total="payment.total_amount"
                        object-name="description"
                        @handleAddRow="addRow"
                        @handleDeleteRow="deleteRow"
                        @handleDeleteAllRow="deleteAllRow"
                        @changeAmount="changeAmount"
                        @changeObject="changeObject"
                    ></ms-table-editor>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--        insert-->
        <div class="footer" v-if="formMode === 1">
          <div class="flex-1">
            <ms-button @click="hide" :option="{
          title: 'Hủy',
          class: 'm-modal-btn bg-inherit text-white mr-6'
        }"></ms-button>
          </div>
          <div class="flex">
            <ms-button
                ref="btn_save"
                type="submit"
                :option="{
                title: 'Cất',
                class: 'm-modal-btn bg-inherit text-white mr-6'
              }"
            >
            </ms-button>
            <ms-button :option="{
          title: 'Cất Và In',
          class: 'm-modal-btn-secondary'
        }"></ms-button>
          </div>
        </div>
        <!--        update-->
        <div class="footer" v-if="formMode === 2">
          <div class="flex-1">
            <ms-button @click="hide" :option="{
          title: 'Hủy',
          class: 'm-modal-btn bg-inherit text-white mr-6'
        }"></ms-button>
            <ms-button @click="backupData" :option="{
            title: 'Hoãn',
            class: 'm-modal-btn bg-inherit text-white'
          }"></ms-button>
          </div>
          <div class="flex">
            <ms-button
                ref="btn_save"
                type="submit"
                :option="{
          title: 'Cất',
          class: 'm-modal-btn bg-inherit text-white mr-6'
        }"></ms-button>
            <ms-button
                type="submit"
                :option="{
                  title: 'Cất Và In',
                  class: 'm-modal-btn-secondary'
                }"
            >
            </ms-button>
          </div>
        </div>
        <!--        view-->
        <div class="footer" v-if="formMode === 5">
          <div class="flex-1">
            <ms-button @click="hide" :option="{
            title: 'Hủy',
            class: 'm-modal-btn bg-inherit text-white'
          }"></ms-button>
          </div>
          <div class="flex">
            <ms-button @click="this.formMode = 2" :option="{
            title: 'Sửa',
            class: 'm-modal-btn bg-inherit text-white mr-6'
          }"></ms-button>
            <ms-button :option="{
            title: 'Ghi sổ',
            class: 'm-modal-btn-secondary'
          }"></ms-button>
          </div>
        </div>
      </Form>
    </div>
  </transition>

  <display-editor
      ref="display-editor"
      :list-data="template"
      :category="category"
      @handleChangeDisplayData="onChangeDisplayData"
      @handleChangeColumn="onChangeColumn">
  </display-editor>

  <provider-detail ref="provider-detail" @created="onCreatedProvider"></provider-detail>

  <ms-dialog ref="dialog" :option="popupOption" @handleConfirm="confirm"></ms-dialog>

  <div id="toast"></div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import 'vue-datepicker-next/locale/vi';
import {Form, Field} from 'vee-validate';
import Enum from "@/script/enum";
import {toast} from "@/lib/toast";
import format from "string-format";
import Resource from "@/resources/resources";
import axios from "axios";
import {formatCurrencyToSave} from "@/lib/number-format";
import {header_account_object, header_employee, header_account} from "@/script/object";
import DisplayEditor from "@/view/provider/DisplayEditor";
import MSModalButton from "@/components/base/modal/MSModalButton";
import MSTableEditor from "@/components/base/MSTableEditor";
import MSCombobox from "@/components/base/v2/MSCombobox";
import ProviderDetail from "@/view/provider/ProviderDetail";
import MSDialog from "@/components/base/v2/MSDialog";
import MSInputNumber from "@/components/base/input/MSInputNumber";
import {isString} from "lodash";

export default {
  name: "CAPaymentDetail",
  data() {
    return {
      isShow: false,
      payment: {},
      languageString: "vi",
      formatStringV2: Enum.Datepicker.Format_String_v2,
      headerData: [],
      description: [{}],
      // list template custom
      template: [],
      employee: [],
      category: "payment_detail",
      // số bản ghi trên 1 trang
      pageSize: 20,
      // trang hiện tại
      currentPage: 1,
      // text tìm kiếm
      txtSearch: "",
      headerAccountObject: header_account_object,
      headerEmployee: header_employee,
      accountObjectColumns: [],
      headerAccount: header_account,
      formMode: 1,
      popupOption: {},
      backup: {},
      backupDetail: {},
      pageSizeEmployee: 20,
      origin: "",
    }
  },
  components: {
    "ms-button": MSModalButton,
    Form,
    Field,
    "MsTableEditor": MSTableEditor,
    "DisplayEditor": DisplayEditor,
    "MsCombobox": MSCombobox,
    ProviderDetail,
    "MsDialog": MSDialog,
    "MsInputNumber": MSInputNumber,
  },
  async created() {
    // lấy ra custom template từ api
    let response = await this.getLayout({is_default: false, layout_code: this.category});
    // gán custom template
    this.template = JSON.parse(response["template_content"]);
    // lấy header data (lấy những cột có isShow = true) để hiển thị ra màn hình
    this.headerData = this.template.filter(item => item["isShow"] === true);

    // lấy account_object column filter
    for (let item in this.headerAccountObject) {
      this.accountObjectColumns.push(this.headerAccountObject[item]["key"]);
    }

    // lấy dữ liệu nhân viên
    await this.getEmployeesPaging({
      pageSize: 20,
      pageNumber: 1,
      txtSearch: "",
    });

    // lấy dữ liệu nhà cung cấp
    await this.getAccountObjectsPaging({
      page_size: this.pageSize,
      page_number: this.currentPage,
      category: "vendor",
      txt_search: "",
      columns: this.accountObjectColumns,
    });

    // lấy dữ liệu account
    await this.getAllAccount();
    this.description = [{
      accounts: this.accounts,
      account_objects: this.accountObjects,
      account_header: this.headerAccount,
      account_object_header: this.headerAccountObject
    }]
  },
  computed: {
    ...mapGetters(["layout", "account_objects", "employeesPaging", "accounts", "newPaymentCode"]),

    employees() {
      let _data = [];
      if (this.employeesPaging) {
        let employeesPaging = this.employeesPaging["data"];
        employeesPaging.forEach(item => {
          _data.push({
            employee_id: item.employee_id,
            employee_code: item.employee_code,
            employee_name: item.full_name,
            address: item.address,
            phone_number: item.phone_number
          })
        })
      }
      return _data;
    },

    accountObjects() {
      let _data = [];
      if (this.account_objects) {
        let accountObjects = this.account_objects["data"];
        accountObjects.forEach(item => {
          _data.push({
            account_object_id: item.account_object_id,
            account_object_code: item.account_object_code,
            account_object_name: item.account_object_name,
            address: item.address,
            phone_number: item.phone_number
          })
        })
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
  },
  watch: {
    "payment.account_object_code": function (value) {
      // lấy obj đối tượng được chọn
      try {
        let accountObject = this.account_objects["data"].filter(item => item.account_object_code === value);
        let accountObjectName = accountObject[0].account_object_name;
        this.payment.account_object_name = accountObjectName
        this.payment.account_object_contact_name = accountObjectName;
        this.payment.journal_memo = `Chi tiền cho ${accountObjectName}`;
        this.payment.account_object_address = accountObject[0].address;
        this.payment.account_object_id = accountObject[0].account_object_id;
      } catch (e) {
        console.log(e)
      }
    },
    "payment.employee_code": function (value) {
      // lấy obj nhân viên được chọn
      try {
        let employee = this.employees.filter(item => item.employee_code === value);
        this.payment.employee_name = employee[0].full_name;
        this.payment.employee_id = employee[0].employee_id;
      } catch (e) {
        console.log(e)
      }
    }
  },
  methods: {
    ...mapActions(["getLayout",
      "getAccountObjectsPaging",
      "getEmployeesPaging",
      "getAllAccount",
      "createPayment",
      "updatePayment",
      "getNewPaymentCode"]),

    async onSubmit(value) {
      let valid = true;
      let descTmp = JSON.parse(JSON.stringify(this.description));
      let index = 0;
      descTmp.forEach(item => {
        delete item["accounts"]
        delete item["account_objects"]
        delete item["account_header"]
        delete item["account_object_header"]

        // validate cho tài khoản nợ
        if (!item['debit_account']) {
          valid = false;
          let refName = "debit_account" + index;
          this.$refs['table-editor'].addErrorCbx(refName);
          this.openPopup(Enum.DialogCode.Info, "Tài khoản nợ không được để trống")
          return
        }
        // validate cho tài khoản có
        if (!item['credit_account']) {
          valid = false;
          let refName = "credit_account" + index;
          this.$refs['table-editor'].addErrorCbx(refName);
          this.openPopup(Enum.DialogCode.Info, "Tài khoản có không được để trống")
          return
        }
        // validate số tiền & format lại thành kiểu decimal (amount_oc)
        if (item['amount_oc'] != 0) {
          if (isString(item['amount_oc'])) {
            item['amount_oc'] = formatCurrencyToSave(item['amount_oc']);
          }
        } else {
          valid = false;
          this.openPopup(Enum.DialogCode.Info, "Số tiền không được để trống")
          return
        }
        index++;
      })
      this.payment["ca_payment_detail"] = descTmp;
      // chuyển số chứng từ về dạng số
      this.payment.document_included = formatCurrencyToSave(this.payment.document_included);

      if (valid !== false) {
        if (this.formMode === Enum.FormMode.Create) { // Thêm mới
          let response = await this.createPayment(this.payment);
          if (response.data.statusCode === Enum.StatusCode.Created) {
            // hiển thị thông báo thành công
            this.showToastMsg({
              title: format(Resource.Employee.Success_created, "Phiếu chi "),
              type: Enum.ToastType.Success
            });
            // load lại data
            this.$emit("loadData");
            // đóng form
            this.hide();
          } else {
            let errorData = response.data.data;
            let keys = Object.keys(errorData);
            let errorMsg = errorData[keys[0]];
            this.openPopup(Enum.DialogCode.Warning, errorMsg);
            this.payment.document_included = Intl.NumberFormat("vi-VN").format(this.payment.document_included);
          }
        } else if (this.formMode === Enum.FormMode.Update) { // Cập nhật
          let response = await this.updatePayment(this.payment);
          if (response.data.statusCode === Enum.StatusCode.OK) {
            // hiển thị thông báo thành công
            this.showToastMsg({
              title: format(Resource.Employee.Success_updated, "Phiếu chi "),
              type: Enum.ToastType.Success
            })
            this.hide();
          } else {
            let errorData = response.data.data;
            let keys = Object.keys(errorData);
            let errorMsg = errorData[keys[0]];
            this.openPopup(Enum.DialogCode.Warning, errorMsg);
            this.payment.document_included = Intl.NumberFormat("vi-VN").format(this.payment.document_included);
          }
        }
      }
    },

    onInvalidSubmit({errors}) {
      console.log(errors)
    },

    /**
     * Hàm thêm dòng mới
     * @since 11/04/2022
     * @author NVLINH
     */
    addRow(objectName) {
      this.description.push({
        accounts: this.accounts,
        account_objects: this.accountObjects,
        account_header: this.headerAccount,
        account_object_header: this.headerAccountObject,
        amount_oc: 0,
      });
    },

    /**
     * Hàm xóa 1 dòng
     * @since 11/04/2022
     * @author NVLINH
     */
    deleteRow(row, objectName) {
      this.description.splice(row, 1);
      // cập nhật lại tổng tiền
      this.updateTotalAmount();
    },

    /**
     * Hàm xóa tất cả dòng
     * @since 11/04/2022
     * @author NVLINH
     */
    deleteAllRow(objectName) {
      this.payment.total_amount = 0;
      this.description = [{
        accounts: this.accounts,
        account_objects: this.accountObjects,
        account_header: this.headerAccount,
        account_object_header: this.headerAccountObject,
        amount_oc: 0,
      }];
    },

    /**
     * Xử lý khi thay đổi tổng tiền
     * @since 13/04/2022
     * @author NVLINH
     */
    changeAmount() {
      // cập nhật lại tổng tiền
      this.updateTotalAmount();
    },

    /**
     * Xử lý khi thay đổi đối tượng (payment detail)
     * @param value
     * @param row
     * @param cbxName - tên đối tượng của combobox
     * @since 13/04/2022
     * @author NVLINH
     */
    changeObject(value, row, cbxName) {
      if (cbxName === "account_object_id") {
        // lấy đối tượng
        let accountObject = this.accountObjects.filter(item => item.account_object_id === value)
        // lấy tên đối tượng
        this.description[row]["account_object_name"] = accountObject[0].account_object_name;
        // lấy code đối tượng
        this.description[row]["account_object_code"] = accountObject[0].account_object_code;
      }
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
     * Cập nhật lại total amount khi thay đổi giá trị chi tiết phiếu chi
     * @since 22/04/2022
     * @author NVLINH
     */
    updateTotalAmount() {
      let description = JSON.parse(JSON.stringify(this.description));
      this.payment.total_amount = 0;
      if (description.length === 0) {
        this.payment.total_amount = 0;
      } else {
        description.forEach(item => {
          if (isString(item['amount_oc'])) {
            item['amount_oc'] = formatCurrencyToSave(item['amount_oc']);
            this.payment.total_amount += item['amount_oc'];
          } else {
            this.payment.total_amount += item['amount_oc'];
          }
        })
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
     * Mở form chi tiết phiếu chi
     * @param data
     * @param formMode
     * @returns {Promise<void>}
     */
    async openModal({data, formMode}) {
      this.payment = data;
      // gán formMode
      this.formMode = formMode;
      // lấy mã mới bind lên form
      if (formMode === Enum.FormMode.Create) {
        await this.getNewPaymentCode();
        this.payment.ca_payment_code = this.newPaymentCode;
      }
      // Format định dạng ngày tháng (nếu có) trước khi hiển thị lên form
      if (this.payment.posted_date) {
        this.payment.posted_date = new Date(this.payment.posted_date);
      } else {
        this.payment.posted_date = new Date();
      }
      if (this.payment.refdate) {
        this.payment.refdate = new Date(this.payment.refdate);
      } else {
        this.payment.refdate = new Date();
      }

      // Loại tiền
      if (this.payment['currency_id'] === null || this.payment['currency_id'] === undefined) {
        this.payment['currency_id'] = "VND";
      }

      // Tổng tiền
      if (this.payment.total_amount === null || this.payment.total_amount === "" || this.payment.total_amount === undefined) {
        this.payment.total_amount = 0;
      }
      // lấy account object và dữ liệu chi tiết phiếu chi (detail)
      if (this.formMode !== Enum.FormMode.Create) {
        // push account object vào list account object ban đầu
        delete this.payment['ca_payment_detail'];
        this.accountObjects.unshift(this.payment);

        // chi tiết phiếu chi
        let response = await axios.get(`http://localhost:5278/api/v1/CaPaymentDetails/getByRefid?refid=${data['ca_payment_id']}`)
        let descriptions = response.data;
        this.description = [];
        descriptions.forEach(item => {
          item.accounts = this.accounts;
          item.account_objects = this.accountObjects;
          item.account_header = this.headerAccount;
          item.account_object_header = this.headerAccountObject;
          this.description.push(item);
        })
      } else {
        this.description = [{
          accounts: this.accounts,
          account_objects: this.accountObjects,
          account_header: this.headerAccount,
          account_object_header: this.headerAccountObject,
          amount_oc: 0
        }];
      }
      // gán dữ liệu phiếu chi vào backup
      this.backup = JSON.parse(JSON.stringify(this.payment));
      this.backupDetail = JSON.parse(JSON.stringify(this.description));
      this.origin = this.snapModal(this.description);
      this.isShow = true;
    },

    backupData() {
      this.payment = JSON.parse(JSON.stringify(this.backup));
      this.description = JSON.parse(JSON.stringify(this.backupDetail));
    },

    /**
     * Đóng form thêm mới phiếu chi
     */
    hide() {
      let current = this.snapModal(this.description);
      if (this.origin !== current) {
        this.openPopup(Enum.DialogCode.Edit, Resource.Dialog.Data_changed)
        return;
      }
      this.payment = {};
      this.description = [{}];
      this.isShow = false
    },

    /**
     * Mở form nhà cung cấp
     * @since 15/04/2022
     * @author NVLINH
     */
    openProviderModal() {
      if (this.formMode !== 5) {
        this.$refs["provider-detail"].openModal({data: {}, formMode: 1});
      }
      return;
    },

    /**
     * Lưu lại dữ liệu khi bắt đầu mở form
     * @returns {string}
     * @since 12/03/2022
     * @author NVLINH
     */
    snapModal(description) {
      this.payment.description = description;
      return JSON.stringify(this.payment);
    },

    confirm(confirmation) {
      if (confirmation === false) {
        this.payment = {};
        this.description = [{}];
        this.$refs['dialog'].closeDialog();
        this.isShow = false
      } else {
        this.$refs['dialog'].closeDialog();
        this.onSubmit(0);
      }
    },

    /**
     * Hàm lazy loading cho cbx
     * @param cbxName
     * @param txtSearch
     * @returns {Promise<void>}
     * @constructor
     */
    async LoadNext(cbxName, txtSearch) {
      if (cbxName === 'account_object') {
        this.pageSize += 20;
        await this.getAccountObjectsPaging({
          page_size: this.pageSize,
          page_number: this.currentPage,
          category: "vendor",
          txt_search: txtSearch,
          columns: this.accountObjectColumns,
        });
      } else if (cbxName === 'employee') {
        this.pageSizeEmployee += 20;
        await this.getEmployeesPaging({
          pageSize: this.pageSizeEmployee,
          pageNumber: 1,
          txtSearch: txtSearch,
        });
      }
    },

    /**
     * Hàm bind dữ liệu lên form khi thêm mới account object thành công
     * @param provider
     * @since 23/04/2022
     * @author NVLINH
     */
    onCreatedProvider(provider) {
      this.accountObjects.push(provider);
      this.payment.account_object_code = provider.account_object_code;
      this.payment.account_object_name = provider.account_object_name
      this.payment.account_object_contact_name = provider.account_object_name;
      this.payment.journal_memo = `Chi tiền cho ${provider.account_object_name}`;
      this.payment.account_object_address = provider.address;
      this.payment.account_object_id = provider.account_object_id;
    }
  }
}
</script>

<style scoped>
@import "@/style/components/payment-detail.css";
</style>