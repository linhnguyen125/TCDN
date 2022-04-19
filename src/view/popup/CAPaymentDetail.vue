<template>
  <div class="ca-payment">
    <div class="header">
      <div class="top-header">
        <div class="m-icon m-recent-log w-6 h-6 cursor-pointer"></div>
        <div class="title">Phiếu chi PC001</div>
        <div class="header-detail-input">
          <div class="m-input" style="width: 350px !important;">
            <v-select
                :options="['Phiếu thu', 'Phiếu chi', 'Khác']"
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
          <div class="detail-btn" @click="closeModal">
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
                            :options="employee"
                            :list-header="headerEmployee"
                            :append-to-body="true"
                            label="employee_name"
                            value="employee_code"
                        ></ms-combobox>
                      </div>
                    </div>
                    <div class="w-4/7 flex w-240">
                      <div class="w-145 m-input">
                        <label>Kèm theo</label>
                        <Field v-model="payment.document_included" v-slot="{field, errorMessage}"
                               name="document_included">
                          <input
                              v-bind="field"
                              :class="['text-align-right', {invalid: errorMessage}]"
                              placeholder="Số lượng"
                              :title="errorMessage"
                          />
                        </Field>
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
                        ></date-picker>
                      </Field>
                    </div>
                  </div>
                  <div class="row-input left-separate">
                    <div class="m-input">
                      <label>Số phiếu chi</label>
                      <input
                          style="width: 167.2px"
                          v-bind="field"
                          :class="{invalid: errorMessage}"
                          :title="errorMessage"
                      />
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
                {{ Intl.NumberFormat('de-DE').format(payment.total_amount) }}
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
                <div style="width: calc(100vw - 40px);">
                  <ms-table-editor
                      :header-data="headerData"
                      :body-data="description"
                      :control="true"
                      :file-upload="true"
                      :col-index="true"
                      object-name="description"
                      @handleAddRow="addRow"
                      @handleDeleteRow="deleteRow"
                      @handleDeleteAllRow="deleteAllRow"
                  ></ms-table-editor>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="flex-1">
          <ms-button :option="{
          title: 'Hủy',
          class: 'm-modal-btn bg-inherit text-white'
        }"></ms-button>
        </div>
        <div class="flex">
          <ms-button :option="{
          title: 'Cất',
          class: 'm-modal-btn bg-inherit text-white mr-6'
        }"></ms-button>
          <ms-button :option="{
          title: 'Cất Và In',
          class: 'm-modal-btn-secondary'
        }"></ms-button>
        </div>
      </div>
    </Form>
  </div>

  <display-editor
      ref="display-editor"
      :list-data="template"
      :category="category"
      @handleChangeDisplayData="onChangeDisplayData"
      @handleChangeColumn="onChangeColumn">
  </display-editor>

  <provider-detail ref="provider-detail"></provider-detail>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import 'vue-datepicker-next/locale/vi';
import {Form, Field} from 'vee-validate';
import Enum from "@/script/enum";
import {header_account_object, header_employee, header_account} from "@/script/object";
import DisplayEditor from "@/view/provider/DisplayEditor";
import MSModalButton from "@/components/base/modal/MSModalButton";
import MSTableEditor from "@/components/base/MSTableEditor";
import MSCombobox from "@/components/base/v2/MSCombobox";
import ProviderDetail from "@/view/provider/ProviderDetail";

export default {
  name: "CAPaymentDetail",
  data() {
    return {
      payment: {
        total_amount: 0,
        posted_date: new Date(),
        refdate: new Date(),
      },
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
    }
  },
  components: {
    "ms-button": MSModalButton,
    Form,
    Field,
    "MsTableEditor": MSTableEditor,
    "DisplayEditor": DisplayEditor,
    "MsCombobox": MSCombobox,
    ProviderDetail
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
    await this.getEmployees();
    this.employees.forEach((item) => {
      this.employee.push({employee_code: item.employee_code, employee_name: item.full_name});
    })

    console.log(this.headerAccountObject)
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
    ...mapGetters(["layout", "account_objects", "employees", "accounts"]),

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
      let accountObject = this.account_objects["data"].filter(item => item.account_object_code === value);
      let accountObjectName = accountObject[0].account_object_name;
      this.payment.account_object_name = accountObjectName
      this.payment.account_object_contact_name = accountObjectName;
      this.payment.journal_memo = `Chi tiền cho ${accountObjectName}`
    }
  },
  methods: {
    ...mapActions(["getLayout", "getAccountObjectsPaging", "getEmployees", "getAllAccount"]),

    onSubmit(value) {
      console.log(this.payment)
      let descTmp = JSON.parse(JSON.stringify(this.description));
      descTmp.forEach(item => {
        delete item["accounts"]
        delete item["account_objects"]
        delete item["account_header"]
        delete item["account_object_header"]
      })
      console.log(descTmp)
    },

    onInvalidSubmit({errors}) {
      console.log(errors)
    },

    // đóng form chi tiền
    closeModal() {
      this.$router.push("/CA/CAProcess");
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
        account_object_header: this.headerAccountObject
      });
    },

    /**
     * Hàm xóa 1 dòng
     * @since 11/04/2022
     * @author NVLINH
     */
    deleteRow(row, objectName) {
      this.description.splice(row, 1);
    },

    /**
     * Hàm xóa tất cả dòng
     * @since 11/04/2022
     * @author NVLINH
     */
    deleteAllRow(objectName) {
      this.description = [{
        accounts: this.accounts,
        account_objects: this.accountObjects,
        account_header: this.headerAccount,
        account_object_header: this.headerAccountObject
      }];
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

    openProviderModal() {
      this.$refs["provider-detail"].openModal({data: {}, formMode: 1});
    }
  }
}
</script>

<style scoped>
@import "@/style/components/payment-detail.css";
</style>