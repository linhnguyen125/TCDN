<template>
  <div id="modalAddEmployee" ref="modalAddEmployee">
    <div class="m-wrapper-modal">
      <div class="m-modal">
        <Form
            @submit="onSubmit"
            :validation-schema="schema"
            @invalid-submit="onInvalidSubmit"
            id="formAddEmployee"
            style="background-color: inherit"
            autocomplete="off"
        >
          <div class="m-modal-header">
            <div class="m-header-left">
              <div class="m-header-title">
                Thông tin nhân viên
              </div>
              <label for="customer" class="m-checkbox"
              >Là khách hàng
                <input
                    type="checkbox"
                    id="customer"
                    name="checkbox"
                />
                <span class="m-check-border"></span>
                <span class="m-check-mark"></span>
              </label>
              <label for="provider" class="m-checkbox"
              >Là nhà cung cấp
                <input
                    type="checkbox"
                    id="provider"
                    name="checkbox"
                />
                <span class="m-check-border"></span>
                <span class="m-check-mark"></span>
              </label>
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

          <div class="m-modal-content">
            <div class="info">
              <div class="w-1/2 pr-26">
                <div class="flex row-input">
                  <div class="form-group m-input pr-6 w-2/5">
                    <div class="m-input">
                      <label for="employeeCode">Mã<span class="m-input-required"> *</span></label>
                      <Field
                          v-model="employee.employee_code"
                          name="employeeCode"
                          v-slot="{ field, errorMessage }"
                          type="text"
                      >
                        <input
                            v-bind="field"
                            id="employeeCode"
                            :class="{invalid: errorMessage}"
                            :title="errorMessage"
                            ref="employeeCode"
                        />
                      </Field>
                    </div>
                  </div>
                  <div class="form-group m-input w-3/5">
                    <div class="m-input">
                      <label for="fullName">Tên<span class="m-input-required"> *</span></label>
                      <Field
                          v-model="employee.full_name"
                          name="fullName"
                          v-slot="{ field, errorMessage }"
                          type="text"
                      >
                        <input
                            v-bind="field"
                            id="fullName"
                            :class="{invalid: errorMessage}"
                            :title="errorMessage"
                            ref="fullName"
                            autocomplete="off"
                        />
                      </Field>
                    </div>
                  </div>
                </div>
                <div class="row-input w-full">
                  <div class="form-group m-input">
                    <div class="m-input">
                      <label>Đơn vị<span class="m-input-required"> *</span></label>
                      <Field
                          class="d-none"
                          as="select"
                          v-model="employee.department_id"
                          name="departmentId">
                      </Field>
                      <v-select
                          ref="departmentId"
                          v-model="employee.department_id"
                          :options="selectData"
                          label="label"
                          :reduce="(selectData) => selectData.value"
                          @open="onOpen"
                          @close="onClose"
                      ></v-select>
                    </div>
                  </div>
                </div>
                <div class="row-input w-full">
                  <div class="form-group m-input">
                    <div class="m-input">
                      <label for="positionName">Chức danh</label>
                      <Field
                          v-model="employee.position_name"
                          v-slot="{ field, errorMessage }"
                          name="positionName"
                      >
                        <input
                            v-bind="field"
                            id="positionName"
                            :class="{invalid: errorMessage}"
                            :title="errorMessage"
                            ref="positionName"
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-1/2">
                <div class="flex row-input">
                  <div class="w-2/5 pr-6">
                    <div class="form-group m-input">
                      <div class="m-input">
                        <label for="dateOfBirth">Ngày sinh</label>
                        <Field name="dateOfBirth"
                               id="dateOfBirth"
                        >
                          <date-picker
                              v-model:value="employee.date_of_birth"
                              :class="['m-input']"
                              autocomplete="off"
                              :lang="languageString"
                              :format="formatStringV2"
                              :placeholder="formatStringV2"
                              :disabled-date="disabledAfterToday"
                              :clearable="false"
                          ></date-picker>
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div class="w-3/5 flex pl-10">
                    <div class="form-group m-input">
                      <label class="block">Giới tính</label>
                      <div class="flex h-32 al-end">
                        <label for="male" class="m-radiobox mr-26">Nam
                          <Field
                              v-model="employee.gender"
                              v-slot="{ field }"
                              name="gender"
                          >
                            <input
                                v-bind="field"
                                id="male"
                                type="radio"
                                :value="1"
                                :checked="employee.gender === 1"
                            />
                          </Field>
                          <span class="m-radio-border"></span>
                          <span class="m-radio-circle"></span>
                        </label>

                        <label for="female" class="m-radiobox mr-26">Nữ
                          <Field
                              v-model="employee.gender"
                              v-slot="{ field }"
                              name="gender"
                          >
                            <input
                                v-bind="field"
                                id="female"
                                type="radio"
                                :value="0"
                                :checked="employee.gender === 0"
                            />
                          </Field>
                          <span class="m-radio-border"></span>
                          <span class="m-radio-circle"></span>
                        </label>

                        <label for="other" class="m-radiobox mr-26">Khác
                          <Field
                              v-model="employee.gender"
                              v-slot="{ field }"
                              type="radio"
                              name="gender"
                          >
                            <input
                                v-bind="field"
                                id="other"
                                type="radio"
                                :value="2"
                                :checked="employee.gender === 2"
                            />
                          </Field>
                          <span class="m-radio-border"></span>
                          <span class="m-radio-circle"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex row-input">
                  <div class="w-3/5">
                    <div class="form-group m-input pr-6">
                      <div class="m-input">
                        <label for="identityNumber">Số CMND</label>
                        <Field
                            v-model="employee.identity_number"
                            name="identityNumber"
                            v-slot="{field, errorMessage}"
                            type="text"
                        >
                          <input
                              v-bind="field"
                              id="identityNumber"
                              :class="{invalid:errorMessage}"
                              :title="errorMessage"
                              ref="identityNumber"
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div class="w-2/5">
                    <div class="form-group m-input">
                      <div class="m-input">
                        <label for="identityDate">Ngày cấp</label>
                        <Field
                            v-model="employee.identity_date"
                            name="identityDate"
                            type="text"
                            id="identityDate"
                        >
                          <date-picker
                              v-model:value="employee.identity_date"
                              :class="['m-input']"
                              autocomplete="off"
                              :lang="languageString"
                              :format="formatStringV2"
                              :placeholder="formatStringV2"
                              :disabled-date="disabledAfterToday"
                              :clearable="false"
                          ></date-picker>
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row-input">
                  <div class="form-group m-input">
                    <div class="m-input">
                      <label for="identityPlace"
                      >Nơi cấp</label
                      >
                      <Field
                          v-model="employee.identity_place"
                          name="identityPlace"
                          v-slot="{ field, errorMessage }"
                          type="text"
                      >
                        <input
                            v-bind="field"
                            id="identityPlace"
                            :class="{invalid: errorMessage}"
                            :title="errorMessage"
                            ref="identityPlace"
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="contact">
              <div class="row-input">
                <div class="form-group m-input">
                  <div class="m-input">
                    <label for="address"
                    >Địa chỉ</label
                    >
                    <Field
                        v-model="employee.address"
                        name="address"
                        v-slot="{ field, errorMessage }"
                        type="text"
                    >
                      <input
                          v-bind="field"
                          id="address"
                          :class="{invalid: errorMessage}"
                          :title="errorMessage"
                          ref="address"
                      />
                    </Field>
                  </div>
                </div>
              </div>
              <div class="flex row-input">
                <div class="form-group m-input pr-6 w-1/4">
                  <div class="m-input">
                    <label for="phoneNumber"
                    >ĐT di động</label
                    >
                    <Field
                        v-model="employee.phone_number"
                        name="phoneNumber"
                        v-slot="{ field, errorMessage }"
                        type="text"
                    >
                      <input
                          v-bind="field"
                          id="phoneNumber"
                          :class="{invalid: errorMessage}"
                          :title="errorMessage"
                          ref="phoneNumber"
                      />
                    </Field>
                  </div>
                </div>
                <div class="form-group m-input pr-6 w-1/4">
                  <div class="m-input">
                    <label for="landLine"
                    >ĐT cố định</label
                    >
                    <Field
                        v-model="employee.land_line"
                        name="landLine"
                        v-slot="{ field, errorMessage }"
                        type="text"
                    >
                      <input
                          v-bind="field"
                          id="landLine"
                          :class="{invalid: errorMessage}"
                          :title="errorMessage"
                          ref="landLine"
                      />
                    </Field>
                  </div>
                </div>
                <div class="form-group m-input w-1/4">
                  <div class="m-input">
                    <label for="email">Email</label>
                    <Field
                        v-model="employee.email"
                        name="email"
                        v-slot="{ field, errorMessage }"
                        type="text"
                    >
                      <input
                          v-bind="field"
                          id="email"
                          :class="{invalid: errorMessage}"
                          :title="errorMessage"
                          ref="email"
                      />
                    </Field>
                  </div>
                </div>
              </div>
              <div class="flex row-input">
                <div class="form-group m-input pr-6 w-1/4">
                  <div class="m-input">
                    <label for="bankAccount"
                    >TK ngân hàng</label
                    >
                    <Field
                        v-model="employee.bank_account"
                        name="bankAccount"
                        v-slot="{ field, errorMessage }"
                        type="text"
                    >
                      <input
                          v-bind="field"
                          id="bankAccount"
                          :class="{invalid: errorMessage}"
                          :title="errorMessage"
                          ref="bankAccount"
                      />
                    </Field>
                  </div>
                </div>
                <div class="form-group m-input pr-6 w-1/4">
                  <div class="m-input">
                    <label for="bankName"
                    >Tên ngân hàng</label
                    >
                    <Field
                        v-model="employee.bank_name"
                        name="bankName"
                        v-slot="{ field, errorMessage }"
                        type="text"
                    >
                      <input
                          v-bind="field"
                          id="bankName"
                          :class="{invalid: errorMessage}"
                          :title="errorMessage"
                          ref="bankName"
                      />
                    </Field>
                  </div>
                </div>
                <div class="form-group m-input w-1/4">
                  <div class="m-input">
                    <label for="bankBranch"
                    >Chi nhánh ngân hàng</label
                    >
                    <Field
                        v-model="employee.bank_branch"
                        name="bankBranch"
                        v-slot="{ field, errorMessage }"
                        type="text"
                    >
                      <input
                          v-bind="field"
                          id="bankBranch"
                          :class="{invalid: errorMessage}"
                          :title="errorMessage"
                          ref="bankBranch"
                      />
                    </Field>
                  </div>
                </div>
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
  </div>
  <ms-dialog :option="option" v-show="isShowDialog" @handleConfirm="confirm"></ms-dialog>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {Form, Field} from "vee-validate";
import 'vue-datepicker-next/locale/vi';
import * as yup from "yup";
import {createKeybindingsHandler} from "tinykeys"
import Resource from "@/resources/resources";
import {setTimeZone} from '@/script/helper.js';
import ValidateRule from "@/script/validate-rule";
import MsTooltip from "@/components/base/MSTooltip";
import MsDialog from "@/components/base/MSDialog";
import Enum from "@/script/enum";

const format = require('string-format')

export default {
  name: "EmployeeDetail",
  data() {
    const schema = yup.object({
      employeeCode: yup
          .string()
          .required(Resource.Employee.Invalid_EmployeeCode_Required)
          .max(ValidateRule.Employee.MaxLength.EmployeeCode,
              format(Resource.Employee.Invalid_MaxLength_EmployeeCode, ValidateRule.Employee.MaxLength.EmployeeCode)),
      fullName: yup
          .string()
          .required(Resource.Employee.Invalid_FullName_Required)
          .max(ValidateRule.Employee.MaxLength.FullName,
              format(Resource.Employee.Invalid_MaxLength_FullName, ValidateRule.Employee.MaxLength.FullName)),
      email: yup
          .string()
          .email(Resource.Employee.Invalid_Email)
          .max(ValidateRule.Employee.MaxLength.Email,
              format(Resource.Employee.Invalid_MaxLength_Email, ValidateRule.Employee.MaxLength.Email))
          .nullable(true),
      departmentId: yup
          .string()
          .required(Resource.Department.Invalid_DepartmentId_Required),
      phoneNumber: yup
          .string()
          .max(ValidateRule.Employee.MaxLength.PhoneNumber,
              format(Resource.Employee.Invalid_MaxLength_PhoneNumber, ValidateRule.Employee.MaxLength.PhoneNumber))
          .nullable(true),
      positionName: yup
          .string()
          .max(ValidateRule.Employee.MaxLength.PositionName,
              format(Resource.Employee.Invalid_MaxLength_PositionName, ValidateRule.Employee.MaxLength.PositionName))
          .nullable(true),
      identityNumber: yup
          .string()
          .max(ValidateRule.Employee.MaxLength.IdentityNumber,
              format(Resource.Employee.Invalid_MaxLength_IdentityNumber, ValidateRule.Employee.MaxLength.IdentityNumber))
          .nullable(true),
      identityPlace: yup
          .string()
          .max(ValidateRule.Employee.MaxLength.IdentityPlace,
              format(Resource.Employee.Invalid_MaxLength_IdentityPlace, ValidateRule.Employee.MaxLength.IdentityPlace))
          .nullable(true),
      taxCode: yup
          .string()
          .max(ValidateRule.Employee.MaxLength.TaxCode,
              format(Resource.Employee.Invalid_MaxLength_TaxCode, ValidateRule.Employee.MaxLength.TaxCode))
          .nullable(true),
      address: yup
          .string()
          .max(ValidateRule.Employee.MaxLength.Address,
              format(Resource.Employee.Invalid_MaxLength_Address, ValidateRule.Employee.MaxLength.Address))
          .nullable(true),
      landLine: yup
          .string()
          .max(ValidateRule.Employee.MaxLength.LandLine,
              format(Resource.Employee.Invalid_MaxLength_LandLine, ValidateRule.Employee.MaxLength.LandLine))
          .nullable(true),
      bankAccount: yup
          .string()
          .max(ValidateRule.Employee.MaxLength.BankAccount,
              format(Resource.Employee.Invalid_MaxLength_BankAccount, ValidateRule.Employee.MaxLength.BankAccount))
          .nullable(true),
      bankName: yup
          .string()
          .max(ValidateRule.Employee.MaxLength.BankName,
              format(Resource.Employee.Invalid_MaxLength_BankName, ValidateRule.Employee.MaxLength.BankName))
          .nullable(true),
      bankBranch: yup
          .string()
          .max(ValidateRule.Employee.MaxLength.BankBranch,
              format(Resource.Employee.Invalid_MaxLength_BankBranch, ValidateRule.Employee.MaxLength.BankBranch))
          .nullable(true),
    });
    return {
      schema,
      formIsValid: true,
      employee: {},
      languageString: "vi",
      formatStringV2: Enum.Datepicker.Format_String_v2,
      original: {},
      option: {},
      isShowDialog: false,
      formErrors: {},
    };
  },
  props: {
    newEmployeeCode: String,
    employeeProps: Object,
    formMode: String,
  },
  components: {
    Form,
    Field,
    MsTooltip,
    MsDialog,
  },
  computed: {
    ...mapGetters(["departments"]),
    selectData() {
      let data = [];
      for (let item in this.departments) {
        let object = {};
        object.label = this.departments[item].department_name;
        object.value = this.departments[item].department_id;
        data.push(object)
      }
      return data;
    }
  },
  created() {
    this.getDepartments();
  },
  mounted() {
    // Focus vào ô đầu tiên khi mở form
    this.$nextTick(function () {
      this.$refs.employeeCode.focus();
    });
    this.employee = this.employeeProps;
    if (this.formMode !== Enum.FormMode.Update) {
      this.employee.employee_code = this.newEmployeeCode;
    }
    // Lưu lại data ban đầu khi mở form
    this.original = this.snapModal();
    // Xử lý phím tắt
    let handler = createKeybindingsHandler({
      "$mod+S": (event) => {
        event.preventDefault();
        this.submit();
      },
      "$mod+Shift+S": (event) => {
        event.preventDefault();
        this.onSaveAndInsert();
        this.$refs.btnSaveAndInsert.click();
      },
      "Escape": event => {
        event.preventDefault()
        this.closeModal();
      },
    })
    this.$refs.modalAddEmployee.addEventListener("keydown", handler)
  },
  watch: {
    employeeProps() {
      this.employee = this.employeeProps;
      this.original = this.snapModal();
      this.$refs.employeeCode.focus();
    },
    newEmployeeCode() {
      this.employee.employee_code = this.newEmployeeCode;
    }
  },
  methods: {
    ...mapActions([
      "createEmployee",
      "updateEmployee",
      "getDepartments",
      "getNewEmployeeCode",
    ]),

    /**
     * Disable ngày trong tương lai
     * @param date
     * @returns {boolean}
     */
    disabledAfterToday(date) {
      return date > new Date();
    },

    /**
     * Emit ra component cha để đóng modal
     * @since 25/02/2022
     * @author NVLINH
     */
    closeModal() {
      // Kiểm tra xem data đã có sự thay đổi hay chưa
      let current = this.snapModal();
      if (current !== this.original) {
        // Nếu có thay đổi thì hiển thị cảnh báo
        this.$emit("handleCloseModal", {isShowModal: false, isChangeData: true});
      } else {
        // Nếu chưa thay đổi thì đóng form
        this.$emit("handleCloseModal", {isShowModal: false, isChangeData: false});
      }
    },

    /**
     * Thực hiện submit khi form đã valid
     * @param values - Object (Giá trị các trường từ input)
     * @since 25/02/2022
     * @author NVLINH
     */
    onSubmit(values) {
      let employee = this.employee;
      //Set timezone
      if (employee.dateOfBirth) {
        employee.dateOfBirth = setTimeZone(this.employee.dateOfBirth)
      }
      if (employee.identityDate) {
        employee.identityDate = setTimeZone(this.employee.identityDate)
      }
      //Lấy departmentName
      if (employee.department_id) {
        let department = this.departments.find(d => d.department_id === employee.department_id);
        employee.department_name = department.department_name;
      }

      this.$emit("handleOnSave", employee);
    },

    /**
     * Thực hiện khi nhấn submit form nhưng chưa valid
     * @param errors - Object (Các input chưa valid và thông báo lỗi tương ứng)
     * @since 25/02/2022
     * @author NVLINH
     */
    onInvalidSubmit({errors}) {
      this.formErrors = errors;
      // Hiển thị lỗi input ra màn hình
      this.showError(this.formErrors);
    },

    /**
     * Lưu lại dữ liệu khi bắt đầu mở form
     * @returns {string}
     * @since 12/03/2022
     * @author NVLINH
     */
    snapModal() {
      return JSON.stringify(this.employee);
    },

    /**
     * Click submit form
     * @since 13/03/2022
     * @author NVLINH
     */
    submit() {
      this.$refs.save.click();
    },

    /**
     * Xử lý khi nhấn nút cất và thêm
     * @since 13/03/2022
     * @author NVLINH
     */
    onSaveAndInsert() {
      this.$emit("handSaveAndInsert")
    },

    /**
     * Hàm thực hiện clear lỗi input
     * @since 14/03/2022
     * @author NVLINH
     */
    clearError() {
      let _this = this;
      try {
        // lặp các input có lỗi và thực hiện clear
        for (let el in _this.$refs) {
          let element = _this.$refs[el];
          if (el === 'departmentId') {
            let inputDepartment = _this.$refs.departmentId.$refs.search;
            if (inputDepartment.classList.value.includes("invalid")) {
              inputDepartment.classList.remove("invalid")
              inputDepartment.setAttribute("title", "")
            }
          } else {
            if (element.classList.value.includes("invalid")) {
              element.classList.remove("invalid");
              element.setAttribute("title", "");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị lỗi input form
     * @param errors - object lỗi
     * @since 14/03/2022
     * @author NVLINH
     */
    showError(errors) {
      try {
        let keys = Object.keys(errors);
        // Lấy thông báo lỗi đầu tiên
        let msg = errors[keys[0]]
        // Hiển thị thông báo lỗi:
        this.openPopup(Enum.DialogCode.Info, Resource.Employee.Validate_error);
        for (let item in errors) {
          if (item === 'departmentId') {
            let inputDepartment = this.$refs.departmentId.$refs.toggle;
            inputDepartment.classList.add("invalid")
            inputDepartment.setAttribute("title", errors[item]);
          } else {
            let element = this.$refs[item];
            element.classList.add("invalid");
            element.setAttribute("title", errors[item]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Khi người dùng đóng cảnh báo lỗi
     * @since 15/03/2022
     * @author NVLINH
     */
    confirm() {
      // Đóng popup cảnh báo
      this.isShowDialog = false;
      let keys = Object.keys(this.formErrors);
      // Focus vào ô nhập liễu bị lỗi đầu tiên
      if (keys[0] !== 'departmentId') {
        this.$refs[keys[0]].focus();
      }
    },

    /**
     * Xử lý khi mở selectbox mã phòng ban
     * @since 15/03/2022
     * @author NVLINH
     */
    onOpen() {
      let inputDepartment = this.$refs.departmentId.$refs.toggle;
      if (inputDepartment.classList.value.includes("invalid")) {
        inputDepartment.classList.remove("invalid");
        inputDepartment.setAttribute("title", "");
      }
    },

    /**
     * Xử lý khi đóng selectbox mã phòng ban
     * @since 15/03/2022
     * @author NVLINH
     */
    onClose() {
      let inputDepartment = this.$refs.departmentId.$refs.toggle;
      if (this.employee.department_id != null) {
        if (inputDepartment.classList.value.includes("invalid")) {
          inputDepartment.classList.remove("invalid");
          inputDepartment.setAttribute("title", "");
        }
      } else {
        inputDepartment.classList.add("invalid");
        inputDepartment.setAttribute("title", Resource.Department.Invalid_DepartmentId_Required);
      }
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
};
</script>

<style></style>
