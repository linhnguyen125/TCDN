<template>
  <transition name="slide">
    <div v-if="isShowModal" class="m-wrapper-modal">
      <div class="m-modal">
        <Form
            class="h-full"
            @submit="onSubmit"
            @invalid-submit="onInvalidSubmit"
            id="formAddEmployee"
            style="background-color: inherit"
            autocomplete="off"
        >
          <div class="m-modal-header">
            <div class="m-header-left">
              <div class="m-header-title">
                Thông tin nhà cung cấp
              </div>
              <!--              radio box-->
              <label class="m-radiobox mr-26">Tổ chức
                <Field
                    v-slot="{ field }"
                    name="account_object_type"
                >
                  <input
                      v-bind="field"
                      type="radio"
                      :value="1"
                  />
                </Field>
                <span class="m-radio-border"></span>
                <span class="m-radio-circle"></span>
              </label>

              <label class="m-radiobox mr-26">Cá nhân
                <Field
                    v-slot="{ field }"
                    name="account_object_type"
                >
                  <input
                      v-bind="field"
                      type="radio"
                      :value="0"
                  />
                </Field>
                <span class="m-radio-border"></span>
                <span class="m-radio-circle"></span>
              </label>
              <!--              end radio box-->
              <div class="ml-50">
                <label class="m-checkbox">Là khách hàng
                  <input
                      type="checkbox"
                      name="checkbox"
                  />
                  <span class="m-check-border"></span>
                  <span class="m-check-mark"></span>
                </label>
              </div>
            </div>
            <div class="m-header-right">
              <div class="m-help m-icon ms-tooltip">
                <ms-tooltip :title="'Trợ giúp'"></ms-tooltip>
              </div>
              <div class="m-close m-icon ms-tooltip" @click="closeModal">
                <ms-tooltip :title="'Đóng (ESC)'"></ms-tooltip>
              </div>
            </div>
          </div>
          <div class="m-modal-content flex flex-direction-column flex-1">
            <div>
              <div class="info">
                <!--              left input-->
                <div class="w-1/2 pr-26">
                  <div class="flex row-input">
                    <div class="form-group m-input pr-6 w-2/5">
                      <div class="m-input">
                        <label>Mã số thuế</label>
                        <Field
                            v-model="provider.tax_code"
                            name="tax_code"
                            v-slot="{ field, errorMessage }"
                            type="text"
                        >
                          <input
                              v-bind="field"
                              :class="{invalid: errorMessage}"
                              :title="errorMessage"
                          />
                        </Field>
                      </div>
                    </div>
                    <div class="form-group m-input w-3/5">
                      <div class="m-input">
                        <label>Mã nhà cung cấp<span class="m-input-required"> *</span></label>
                        <Field
                            name="account_object_code"
                            v-slot="{ field, errorMessage }"
                            type="text"
                            v-model="provider.account_object_code"
                        >
                          <input
                              v-bind="field"
                              :class="{invalid: errorMessage}"
                              :title="errorMessage"
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div class="row-input w-full">
                    <div class="form-group m-input">
                      <div class="m-input">
                        <label>Tên nhà cung cấp<span
                            class="m-input-required"> *</span></label>
                        <Field
                            v-slot="{ field, errorMessage }"
                            name="account_object_name"
                            v-model="provider.account_object_name"
                        >
                          <input
                              v-bind="field"
                              :class="{invalid: errorMessage}"
                              :title="errorMessage"
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div class="row-input w-full">
                    <div class="form-group m-input">
                      <div class="m-input">
                        <label>Địa chỉ</label>
                        <textarea
                            v-model="provider.address"
                            class="m-text-area"
                            autocomplete="off"
                            rows="2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!--              end left input-->
                <!--              right input-->
                <div class="w-1/2">
                  <div class="flex row-input">
                    <div class="form-group m-input pr-6 w-2/5">
                      <div class="m-input">
                        <label>Điện thoại</label>
                        <Field
                            name="tel"
                            v-slot="{ field, errorMessage }"
                            type="text"
                            v-model="provider.phone_number"
                        >
                          <input
                              v-bind="field"
                              :class="{invalid: errorMessage}"
                              :title="errorMessage"
                          />
                        </Field>
                      </div>
                    </div>
                    <div class="form-group m-input w-3/5">
                      <div class="m-input">
                        <label>Website</label>
                        <Field
                            name="website"
                            v-slot="{ field, errorMessage }"
                            type="text"
                            v-model="provider.website"
                        >
                          <input
                              v-bind="field"
                              :class="{invalid: errorMessage}"
                              :title="errorMessage"
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div class="row-input w-full">
                    <div class="form-group m-input">
                      <div class="m-input">
                        <label>Nhóm nhà cung cấp</label>
                        <v-select
                            v-model="provider.account_object_group_code_list"
                            :multiple="true"
                            :options="['Đối tượng 1', 'Đối tượng 2', 'Đối tượng 3']"
                            label="label"
                            id="account_object_group_code_list"
                        ></v-select>
                      </div>
                    </div>
                  </div>
                  <div class="row-input w-full">
                    <div class="form-group m-input">
                      <div class="m-input">
                        <label>Nhân viên mua hàng</label>
                        <ms-combobox
                            v-model="provider.employee_code"
                            :show-header="true"
                            :searchable="true"
                            :options="employee"
                            :list-header="employeeHeader"
                            :append-to-body="true"
                            label="employee_name"
                            value="employee_code"
                        ></ms-combobox>
                      </div>
                    </div>
                  </div>
                </div>
                <!--              end right input-->
              </div>
              <div class="contact flex">
                <!--tabs input-->
                <div id="tabs" class="container">
                  <!--tab list-->
                  <div class="tabs">
                    <ul class="ms-tabs">
                      <li @click="activeTab=1" :class="{ active: activeTab === 1 }">
                        <div class="ms-tabs-btn">Liên hệ</div>
                      </li>
                      <li @click="activeTab=2" :class="{ active: activeTab === 2 }">
                        <div class="ms-tabs-btn">Điều khoản thanh toán</div>
                      </li>
                      <li @click="activeTab=3" :class="{ active: activeTab === 3 }">
                        <div class="ms-tabs-btn">Tài khoản ngân hàng</div>
                      </li>
                      <li @click="activeTab=4" :class="{ active: activeTab === 4 }">
                        <div class="ms-tabs-btn">Địa chỉ khác</div>
                      </li>
                      <li @click="activeTab=5" :class="{ active: activeTab === 5 }">
                        <div class="ms-tabs-btn">Ghi chú</div>
                      </li>
                    </ul>
                  </div>
                  <!--end tab list-->
                  <!--tab content-->
                  <div class="content">
                    <!--tab 1-->
                    <div v-show="activeTab === 1" class="tab-content">
                      <div class="flex">
                        <div class="flex flex-direction-column w-1/2 pr-26">
                          <div class="row-input flex">
                            <div class="form-group m-input">
                              <label>Người liên hệ</label>
                              <div class="flex m-input">
                                <v-select
                                    v-model="provider.prefix"
                                    :appendToBody="true"
                                    :placeholder="'Xưng hô'"
                                    class="w-1/3 h-32"
                                    :options="prefix"
                                    label="label"
                                    :reduce="(prefix) => prefix.value"
                                ></v-select>
                                <Field
                                    v-slot="{ field, errorMessage }"
                                    name="einvoice_contact_name"
                                >
                                  <input
                                      v-model="provider.einvoice_contact_name"
                                      :placeholder="'Họ và tên'"
                                      v-bind="field"
                                      :class="['w-2/3 ml-6', {invalid: errorMessage}]"
                                      :title="errorMessage"
                                  />
                                </Field>
                              </div>
                            </div>
                          </div>
                          <div class="row-input">
                            <div class="form-group m-input">
                              <Field
                                  v-slot="{ field, errorMessage }"
                                  name="contact_email"
                              >
                                <input
                                    v-model="provider.contact_email"
                                    :placeholder="'Email'"
                                    v-bind="field"
                                    :class="{invalid: errorMessage}"
                                    :title="errorMessage"
                                />
                              </Field>
                            </div>
                          </div>
                          <div class="row-input">
                            <div class="form-group m-input w-1/2">
                              <Field
                                  v-slot="{ field, errorMessage }"
                                  name="contact_mobile"
                              >
                                <input
                                    v-model="provider.contact_mobile"
                                    :placeholder="'Số điện thoại'"
                                    v-bind="field"
                                    :class="{invalid: errorMessage}"
                                    :title="errorMessage"
                                />
                              </Field>
                            </div>
                          </div>
                        </div>
                        <div class="w-1/2">
                          <div class="row-input">
                            <div class="form-group m-input">
                              <label>Đại diện theo PL</label>
                              <Field
                                  v-slot="{ field, errorMessage }"
                                  name="legal_representative"
                              >
                                <input
                                    v-model="provider.legal_representative"
                                    :placeholder="'Đại diện theo PL'"
                                    v-bind="field"
                                    :class="{invalid: errorMessage}"
                                    :title="errorMessage"
                                />
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--end tab 1-->
                    <!--tab 2-->
                    <div v-show="activeTab === 2" class="tab-content">
                      <div class="row-input flex">
                        <div class="form-group m-input w-1/4 pr-6">
                          <label>Điều khoản thanh toán</label>
                          <ms-combobox
                              v-model="provider.payment_term_name"
                              :show-header="true"
                              :searchable="true"
                              :options="paymentTerm"
                              :list-header="paymentTermHeader"
                              :append-to-body="true"
                              label="payment_term_name"
                              value="payment_term_code"
                          ></ms-combobox>
                        </div>
                        <div class="form-group m-input w-1/4 pr-6">
                          <label>Số ngày được nợ</label>
                          <Field
                              name="due_time"
                              v-slot="{ field, errorMessage }"
                              type="text"
                          >
                            <input
                                v-model="provider.due_time"
                                v-bind="field"
                                :class="['text-align-right', {invalid: errorMessage}]"
                                :title="errorMessage"
                            />
                          </Field>
                        </div>
                        <div class="form-group m-input w-1/4">
                          <label>Số nợ tối đa</label>
                          <Field
                              name="maximize_debt_amount"
                              v-slot="{ field, errorMessage }"
                              type="text"
                          >
                            <input
                                v-model="provider.maximize_debt_amount"
                                v-bind="field"
                                :class="['text-align-right', {invalid: errorMessage}]"
                                :title="errorMessage"
                            />
                          </Field>
                        </div>
                      </div>
                      <div class="row-input">
                        <div class="form-group m-input w-1/4 pr-6">
                          <label>Tài khoản công nợ phải trả</label>
                          <ms-combobox
                              v-model="provider.pay_account"
                              :show-header="true"
                              :searchable="true"
                              :options="pay_account"
                              :list-header="pay_account_header"
                              :append-to-body="true"
                              label="pay_account_name"
                              value="pay_account_number"
                          ></ms-combobox>
                        </div>
                      </div>
                    </div>
                    <!--end tab 2-->
                    <!--tab 3-->
                    <div v-show="activeTab === 3" class="tab-content">
                      <ms-table-editor
                          :header-data="headerData"
                          :body-data="account_object_bank_account"
                          :control="true"
                          :delete-function="true"
                          object-name="bank"
                          @handleAddRow="addRow"
                          @handleDeleteRow="deleteRow"
                          @handleDeleteAllRow="deleteAllRow"
                      ></ms-table-editor>
                    </div>
                    <!--end tab 3-->
                    <!--tab 4-->
                    <div v-show="activeTab === 4" class="tab-content">
                      <div class="flex">
                        <div class="flex flex-direction-column w-1/2 pr-26">
                          <div class="row-input flex">
                            <div class="form-group m-input">
                              <label>Vị trí địa lý</label>
                              <div class="flex">
                                <v-select
                                    v-model="provider.country"
                                    :appendToBody="true"
                                    :placeholder="'Việt Nam'"
                                    class="w-1/2"
                                    :options="country"
                                    label="label"
                                    :reduce="(country) => country.value"
                                ></v-select>
                                <ms-combobox
                                    v-model="provider.province_or_city"
                                    :show-header="false"
                                    :searchable="true"
                                    :options="location"
                                    :list-header="[{key: 'name'}]"
                                    :append-to-body="true"
                                    placeholder="Tỉnh/Thành phố"
                                    label="name"
                                    value="codename"
                                    class="w-1/2 ml-6"
                                ></ms-combobox>
                              </div>
                            </div>
                          </div>
                          <div class="row-input">
                            <div class="form-group m-input">
                              <div class="flex">
                                <ms-combobox
                                    v-model="provider.district"
                                    :show-header="false"
                                    :searchable="true"
                                    :options="districts"
                                    :list-header="[{key: 'name'}]"
                                    :append-to-body="true"
                                    placeholder="Quận/Huyện"
                                    label="name"
                                    value="codename"
                                    class="w-1/2"
                                ></ms-combobox>
                                <ms-combobox
                                    v-model="provider.ward_or_commune"
                                    :show-header="false"
                                    :searchable="true"
                                    :options="wards"
                                    :list-header="[{key: 'name'}]"
                                    :append-to-body="true"
                                    placeholder="Xã Phường"
                                    label="name"
                                    value="codename"
                                    class="w-1/2 ml-6"
                                ></ms-combobox>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="w-1/2">
                          <div class="row-input">
                            <div class="form-group m-input">
                              <label>Địa chỉ giao hàng</label>
                              <label class="m-checkbox pl-0 ml-18 fw-500 fs-13">Giống địa chỉ nhà cung cấp
                                <input
                                    v-model="isSameAddress"
                                    type="checkbox"
                                    name="checkbox"
                                    @change="sameAddress"
                                />
                                <span class="m-check-border"></span>
                                <span class="m-check-mark"></span>
                              </label>
                            </div>
                          </div>
                          <ms-table-editor
                              :header-data="shipAddressHeader"
                              :body-data="account_object_address"
                              :control="true"
                              :object-name="'address'"
                              @handleAddRow="addRow"
                              @handleDeleteRow="deleteRow"
                              @handleDeleteAllRow="deleteAllRow"
                          ></ms-table-editor>
                        </div>
                      </div>
                    </div>
                    <!--end tab 4-->
                    <!--tab 5-->
                    <div v-show="activeTab === 5" class="tab-content">
                      <div class="m-input w-full">
                        <Field
                            name="description"
                            v-slot="{ field, errorMessage }"
                        >
                        <textarea
                            v-model="provider.description"
                            style="min-height: 190px; width: 100%"
                            class="m-text-area"
                            v-bind="field"
                            :class="{invalid: errorMessage}"
                            :title="errorMessage"
                            rows="2"
                        />
                        </Field>
                      </div>
                    </div>
                    <!--end tab 5-->
                  </div>
                  <!--end tab content-->
                </div>
                <!--            end tabs input-->
              </div>
            </div>
          </div>

          <div class="m-modal-footer">
            <div class="flex justify-content-space-between">
              <button @click="closeModal" type="button" class="m-modal-btn">Hủy</button>
              <div class="flex">
                <button ref="save" class="m-modal-btn mx-3 ms-tooltip">Cất
                  <ms-tooltip :title="'Cất (Ctrl S)'"></ms-tooltip>
                </button>
                <button class="m-modal-btn-secondary ms-tooltip" id="btnSave" ref="btnSaveAndInsert"
                        @click="onSaveAndInsert">
                  Cất và thêm
                  <ms-tooltip :title="'Cất và thêm (Ctrl Shift S)'"></ms-tooltip>
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </transition>
  <ms-dialog ref="dialog" :option="popupOption" @handleConfirm="confirm"></ms-dialog>
</template>
<script>
import {Form, Field} from "vee-validate";
import {mapGetters, mapActions} from 'vuex';
import {payment_term_header, payment_term, pay_account_header, pay_account, header_employee} from '@/script/object';
import {toast} from "@/lib/toast";
import Resource from "@/resources/resources";
import MSDialog from "@/components/base/v2/MSDialog";
import Enum from "@/script/enum";
import MSTooltip from "@/components/base/MSTooltip";
import MSTableEditor from "@/components/base/MSTableEditor";
import MSCombobox from "@/components/base/v2/MSCombobox";
import format from "string-format";

export default {
  name: "ProviderDetail",
  data() {
    return {
      provider: {},
      paymentTermHeader: payment_term_header,
      paymentTerm: payment_term,
      payAccountHeader: pay_account_header,
      payAccount: pay_account,
      employee: [],
      prefix: [
        {label: "Anh", value: 1},
        {label: "Chị", value: 2},
        {label: "Ông", value: 3},
        {label: "Bà", value: 4},
      ],
      employeeHeader: header_employee,
      country: [{label: "Việt Nam", value: "viet_nam"}],
      formMode: Enum.FormMode.Create,
      isShowModal: false,
      activeTab: 1,
      headerData: [
        {name: "Số tài khoản", key: "bank_account", type: Enum.TypeOfTableEditor.Input},
        {name: "Tên tài khoản", key: "bank_name", type: Enum.TypeOfTableEditor.Input},
        {name: "Chi nhánh", key: "bank_branch_name", width: 150, type: Enum.TypeOfTableEditor.Input},
        {name: "Tỉnh/TP của ngân hàng", key: "bank_province_or_city", type: Enum.TypeOfTableEditor.Input},
      ],
      account_object_bank_account: [
        {}
      ],
      shipAddressHeader: [
        {name: 'Địa chỉ giao hàng', key: 'ship_address', class: 'w-full', type: Enum.TypeOfTableEditor.Input}
      ],
      account_object_address: [
        {}
      ],
      districts: [],
      wards: [],
      isSameAddress: false,
      popupOption: {},
    }
  },
  components: {
    Field,
    Form,
    "MsTooltip": MSTooltip,
    "MsTableEditor": MSTableEditor,
    "MsCombobox": MSCombobox,
    "MsDialog": MSDialog,
  },
  async created() {
    await this.getLocation();
    await this.getEmployees();
    this.employees.forEach((item) => {
      this.employee.push({employee_code: item.employee_code, employee_name: item.full_name});
    })
  },
  computed: {
    ...mapGetters(["location", "employees"]),
  },
  watch: {
    "provider.province_or_city": function (value) {
      if (value) {
        const locate = this.location.filter(item => item["codename"] === value);
        this.provider.district = "";
        this.provider.ward_or_commune = "";
        this.districts = locate[0].districts;
      }
    },
    "provider.district": function (value) {
      if (value) {
        const locate = this.districts.filter(item => item["codename"] === value);
        this.provider.ward_or_commune = "";
        this.wards = locate[0].wards;
      }
    }
  },
  methods: {
    ...mapActions(["getLocation", "createAccountObject", "getEmployees", "updateAccountObject"]),

    /**
     * Hàm thêm dòng mới
     * @since 11/04/2022
     * @author NVLINH
     */
    addRow(objectName) {
      switch (objectName) {
        case 'bank':
          this.account_object_bank_account.push({});
          break;
        case 'address':
          this.account_object_address.push({});
          break
        default:
          break;
      }
      // let keys = Object.keys(this.account_object_bank_account);
      // for (let item in keys) {
      //   if (JSON.stringify(this.account_object_bank_account[item]) === JSON.stringify({})) {
      //     console.log("rỗng", item)
      //   } else {
      //     console.log(item)
      //   }
      // }
    },

    /**
     * Hàm xóa dòng
     * @since 11/04/2022
     * @author NVLINH
     */
    deleteRow(row, objectName) {
      switch (objectName) {
        case 'bank':
          this.account_object_bank_account.splice(row, 1);
          break;
        case 'address':
          this.account_object_address.splice(row, 1);
          break
        default:
          break;
      }
    },

    /**
     * Hàm xóa hết dòng
     * @param objectName
     * @since 11/04/2022
     * @author NVLINH
     */
    deleteAllRow(objectName) {
      switch (objectName) {
        case 'bank':
          this.account_object_bank_account = [{}];
          break;
        case 'address':
          this.account_object_address = [{}];
          break
        default:
          break;
      }
    },

    /**
     * Hàm đóng form thêm nhà cung cấp
     * @since 11/04/2022
     * @author NVLINH
     */
    closeModal() {
      this.isShowModal = false;
    },

    /**
     * Hàm mở form thêm nhà cung cấp
     * @since 11/04/2022
     * @author NVLINH
     */
    openModal({data, formMode}) {
      this.provider = data;
      this.formMode = formMode;
      this.isShowModal = true;
    },

    /**
     * Hàm thực hiện khi submit form
     * @param value
     * @since 11/04/2022
     * @author NVLINH
     */
    async onSubmit(value) {
      this.provider.sub_address = JSON.stringify(this.account_object_address);
      this.provider.bank_info = JSON.stringify(this.account_object_bank_account);
      this.provider.is_vendor = true;
      if (this.formMode === Enum.FormMode.Create) {
        let response = this.createAccountObject(this.provider);
        let data = response.data;
        // Xử lý khi có thông tin trả về
        if (data.statusCode === Enum.StatusCode.Created) { // Thành công
          this.showToastMsg({title: Resource.Employee.Success_created, type: Enum.ToastType.Success})
          this.closeModal();
          this.$emit("handleLoadData");
        } else if (data.statusCode === Enum.StatusCode.BadRequest) { // Trùng số tài khoản
          let errorData = data.data;
          let keys = Object.keys(errorData);
          let errorMsg = errorData[keys[0]];
          this.openPopup(Enum.DialogCode.Warning, errorMsg);
        } else { // Lỗi server
          console.log(response);
        }
      } else {
        await this.updateAccountObject(this.provider);
        this.showToastMsg({
          title: format(Resource.Employee.Success_updated, "nhà cung cấp "),
          type: Enum.ToastType.Success
        })
        this.closeModal();
        this.$emit("handleLoadData");
      }
    },

    /**
     * Thực hiện khi tích chọn giống địa chỉ ncc
     * @since 11/04/2022
     * @author NVLINH
     */
    sameAddress() {
      if (this.isSameAddress === true)
        this.account_object_address = [{ship_address: this.provider.address}];
      else
        this.account_object_address = [{}];
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
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
}

ul.ms-tabs {
  margin: 0;
  width: 100%;
  height: 100%;
  padding-left: 0;
  position: relative;
  display: flex;
  z-index: 2;
  align-items: flex-end;
}

ul.ms-tabs li {
  list-style: none;
  cursor: pointer;
  height: 26px;
  margin: 0 1px;
  border: 1px solid #c9ccd2;
  border-bottom: none;
  border-radius: 2px 2px 0 0;
}

.ms-tabs-btn {
  position: relative;
  width: 100%;
  cursor: pointer;
  transition: all .2s ease;
  z-index: 0;
  font-size: 13px;
  height: 100%;
  margin: 0;
  padding: 0 8px;
  display: flex;
  place-items: center;
  text-align: center;
  white-space: nowrap;
}

.ms-tabs-btn:hover {
  color: #2ca01c;
}

.active {
  background: #cce4f9;
  height: 32px !important;
}

/*tab content*/

.content {
  border: 1px solid #c9ccd2;
  z-index: 1;
  min-height: 215px;
}

.tab-content {
  margin: 11px 8px;
}

/*end tab content*/

.m-modal-content {
  height: calc(100% - 73px - 75px);
  overflow-y: scroll;
}

.m-modal-content::-webkit-scrollbar {
  height: 8px;
  width: 8px;
  background-color: #fff;
}

/* Handle */
.m-modal-content::-webkit-scrollbar-thumb {
  background-color: rgb(182, 182, 182);
}

/* Handle on hover */
.m-modal-content::-webkit-scrollbar-thumb:hover {
  background: #868686;
}

.contact {
  padding-bottom: 0 !important;
}

.m-modal-header {
  padding-bottom: 0 !important;
}

.row-input {
  padding-bottom: 6px !important;
}
</style>