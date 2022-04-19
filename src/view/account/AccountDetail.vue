<template>
  <transition name="display">
    <div v-if="isShowModal" class="m-wrapper-modal-v2">
      <div ref="modal-v2" class="m-modal-v2">
        <!--      header-->
        <div class="m-modal-header flex">
          <div class="m-modal-title">
            <h2>Thêm tài khoản</h2>
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
        <Form
            class="h-full"
            @submit="onSubmit"
            :validation-schema="schema"
            @invalid-submit="onInvalidSubmit"
            ref="formAccount"
        >
          <div class="m-modal-content">
            <div>

              <div class="basic-information pt-12">
                <div class="row-input">
                  <div class="form-group m-input w-1/4">
                    <div class="m-input">
                      <label>Số tài khoản<span class="m-input-required"> *</span></label>
                      <Field
                          v-model="account.account_number"
                          name="account_number"
                          v-slot="{ field, errorMessage }"
                      >
                        <input
                            v-bind="field"
                            :class="{invalid: errorMessage}"
                            :title="errorMessage"
                            ref="account_number"
                        />
                      </Field>
                    </div>
                  </div>
                </div>
                <div class="row-input flex">
                  <div class="form-group m-input w-1/2 pr-12">
                    <div class="m-input">
                      <label>Tên tài khoản<span class="m-input-required"> *</span></label>
                      <Field
                          v-model="account.account_name"
                          name="account_name"
                          v-slot="{ field, errorMessage }"
                      >
                        <input
                            v-bind="field"
                            :class="{invalid: errorMessage}"
                            :title="errorMessage"
                            ref="account_name"
                        />
                      </Field>
                    </div>
                  </div>
                  <div class="form-group m-input w-1/2">
                    <div class="m-input">
                      <label>Tên tiếng anh</label>
                      <Field
                          v-model="account.account_name_english"
                          name="account_name_english"
                          v-slot="{ field, errorMessage }"
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
                <div class="row-input flex">
                  <div class="form-group m-input w-1/4 pr-12">
                    <div class="m-input">
                      <label>Tài khoản tổng hợp</label>
                      <v-select
                          v-model="account.parent_id"
                          :options="parent_id"
                          label="label"
                          :reduce="(parent_id) => parent_id.value"
                      ></v-select>
                    </div>
                  </div>
                  <div class="form-group m-input w-1/4 pr-12">
                    <div class="m-input">
                      <label>Tính chất<span class="m-input-required"> *</span></label>
                      <Field
                          class="d-none"
                          as="select"
                          v-model="account.account_object_type"
                          name="account_object_type">
                      </Field>
                      <v-select
                          v-model="account.account_object_type"
                          :options="account_object_type"
                          label="label"
                          :reduce="(account_object_type) => account_object_type.value"
                          ref="account_object_type"
                      ></v-select>
                    </div>
                  </div>
                </div>
                <div class="row-input flex">
                  <div class="form-group m-input w-full">
                    <div class="m-input">
                      <label>Diễn giải</label>
                      <Field
                          as="textarea"
                          v-model="account.description"
                          name="description"
                          rows="2"
                          class="m-text-area"
                      >
                      </Field>
                    </div>
                  </div>
                </div>
                <label for="is_postable_in_foreign_currency" class="m-checkbox mb-16">Có hoạch toán ngoại tệ
                  <input
                      v-model="account.is_postable_in_foreign_currency"
                      type="checkbox"
                      id="is_postable_in_foreign_currency"
                      name="is_postable_in_foreign_currency"
                  />
                  <span class="m-check-border"></span>
                  <span class="m-check-mark"></span>
                </label>
              </div>
              <div class="w-full ms-collapse-information">
                <a href="javascript:void(0)" class="ms-collapse-item--header">
                  <div class="flex align-item-center">
                    <div class="m-icon m-arrow-right--black w-4 h-4 mr-6"></div>
                    <div class="label">Theo dõi chi tiết theo</div>
                  </div>
                </a>
              </div>
              <div class="con-content--item">
                <!--            row input-->
                <div class="row-input flex justify-content-space-between">
                  <div class="m-input w-1/2">
                    <div class="w-5/6">
                      <!--                  content item-->
                      <content-item :option="detail_by_account_object"
                                    @handleChangeDetail="onChangeDetail"
                      >
                        <template v-slot:default="{isDisable}">
                          <v-select
                              v-model="account.detail_by_account_object_kind"
                              class="w-1/2"
                              :options="detail_by_account_object_kind"
                              label="label"
                              :reduce="(detail_by_account_object_kind) => detail_by_account_object_kind.value"
                              :disabled="isDisable"
                          ></v-select>
                        </template>
                      </content-item>
                    </div>
                  </div>
                  <div class="m-input w-1/2">
                    <div class="w-5/6">
                      <!--                  content item -->
                      <content-item :option="detail_by_bank_account"
                                    @handleChangeDetail="onChangeDetail"
                      >
                        <template v-slot:default></template>
                      </content-item>
                    </div>
                  </div>
                </div>
                <!--            end row input-->

                <!--            row input-->
                <div class="row-input flex justify-content-space-between">
                  <div class="m-input w-1/2">
                    <div class="w-5/6">
                      <!--                  content item-->
                      <content-item :option="detail_by_job"
                                    @handleChangeDetail="onChangeDetail"
                      >
                        <template v-slot:default="{isDisable}">
                          <v-select
                              v-model="account.detail_by_job_kind"
                              class="w-1/2"
                              :options="detail_other_kind"
                              label="label"
                              :reduce="(detail_other_kind) => detail_other_kind.value"
                              :disabled="isDisable"
                          ></v-select>
                        </template>
                      </content-item>
                    </div>
                  </div>
                  <div class="m-input w-1/2">
                    <div class="w-5/6">
                      <!--                  content item-->
                      <content-item :option="detail_by_project_work"
                                    @handleChangeDetail="onChangeDetail"
                      >
                        <template v-slot:default="{isDisable}">
                          <v-select
                              v-model="account.detail_by_project_work_kind"
                              class="w-1/2"
                              :options="detail_other_kind"
                              label="label"
                              :reduce="(detail_other_kind) => detail_other_kind.value"
                              :disabled="isDisable"
                          ></v-select>
                        </template>
                      </content-item>
                    </div>
                  </div>
                </div>
                <!--            end row input-->

                <!--            row input-->
                <div class="row-input flex justify-content-space-between">
                  <div class="m-input w-1/2">
                    <div class="w-5/6">
                      <!--                  content item-->
                      <content-item :option="detail_by_order"
                                    @handleChangeDetail="onChangeDetail"
                      >
                        <template v-slot:default="{isDisable}">
                          <v-select
                              v-model="account.detail_by_order_kind"
                              class="w-1/2"
                              :options="detail_other_kind"
                              label="label"
                              :reduce="(detail_other_kind) => detail_other_kind.value"
                              :disabled="isDisable"
                          ></v-select>
                        </template>
                      </content-item>
                    </div>
                  </div>
                  <div class="m-input w-1/2">
                    <div class="w-5/6">
                      <!--                  content item-->
                      <content-item :option="detail_by_contract"
                                    @handleChangeDetail="onChangeDetail"
                      >
                        <template v-slot:default="{isDisable}">
                          <v-select
                              v-model="account.detail_by_contract_kind"
                              class="w-1/2"
                              :options="detail_other_kind"
                              label="label"
                              :reduce="(detail_other_kind) => detail_other_kind.value"
                              :disabled="isDisable"
                          ></v-select>
                        </template>
                      </content-item>
                    </div>
                  </div>
                </div>
                <!--            end row input-->

                <!--            row input-->
                <div class="row-input flex justify-content-space-between">
                  <div class="m-input w-1/2">
                    <div class="w-5/6">
                      <!--                  content item-->
                      <content-item :option="detail_by_pu_contract"
                                    @handleChangeDetail="onChangeDetail"
                      >
                        <template v-slot:default="{isDisable}">
                          <v-select
                              v-model="account.detail_by_pu_contract_kind"
                              class="w-1/2"
                              :options="detail_other_kind"
                              label="label"
                              :reduce="(detail_other_kind) => detail_other_kind.value"
                              :disabled="isDisable"
                          ></v-select>
                        </template>
                      </content-item>
                    </div>
                  </div>
                  <div class="m-input w-1/2">
                    <div class="w-5/6">
                      <!--                  content item-->
                      <content-item :option="detail_by_expense_item"
                                    @handleChangeDetail="onChangeDetail"
                      >
                        <template v-slot:default="{isDisable}">
                          <v-select
                              v-model="account.detail_by_expense_item_kind"
                              class="w-1/2"
                              :options="detail_other_kind"
                              label="label"
                              :reduce="(detail_other_kind) => detail_other_kind.value"
                              :disabled="isDisable"
                          ></v-select>
                        </template>
                      </content-item>
                    </div>
                  </div>
                </div>
                <!--            end row input-->

                <!--            row input-->
                <div class="row-input flex justify-content-space-between">
                  <div class="m-input w-1/2">
                    <div class="w-5/6">
                      <!--                  content item-->
                      <content-item :option="detail_by_department"
                                    @handleChangeDetail="onChangeDetail"
                      >
                        <template v-slot:default="{isDisable}">
                          <v-select
                              :appendToBody="true"
                              class="w-1/2"
                              :options="detail_other_kind"
                              label="label"
                              :reduce="(detail_other_kind) => detail_other_kind.value"
                              :disabled="isDisable"
                          ></v-select>
                        </template>
                      </content-item>
                    </div>
                  </div>
                  <div class="m-input w-1/2">
                    <div class="w-5/6">
                      <!--                  content item-->
                      <content-item :option="detail_by_list_item"
                                    @handleChangeDetail="onChangeDetail"
                      >
                        <template v-slot:default="{isDisable}">
                          <v-select
                              class="w-1/2"
                              :appendToBody="true"
                              :options="detail_other_kind"
                              label="label"
                              :reduce="(detail_other_kind) => detail_other_kind.value"
                              :disabled="isDisable"
                          ></v-select>
                        </template>
                      </content-item>
                    </div>
                  </div>
                </div>
                <!--            end row input-->
              </div>

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
                    :option="{
                  title: 'Cất',
                  class: 'm-modal-btn'
                }"
                />
                <ms-modal-button
                    :option="{
                  title: 'Cất và thêm',
                  class: 'm-modal-btn-secondary ml-3'
                }"
                />
              </div>
            </div>
          </div>
          <!--      end footer-->
        </Form>

        <!--      resize-->
        <div @click="resize" ref="resize" class="resize flex is-full-screen-false cursor-pointer">
          <div class="m-icon mi-chevron-left w-4 h-4"></div>
        </div>
        <!--      end resize-->
      </div>
    </div>
  </transition>

  <ms-dialog ref="dialog" :option="option" @handleConfirm="confirm"></ms-dialog>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {Field, Form} from "vee-validate";
import Enum from "@/script/enum";
import Resource from "@/resources/resources";
import {toast} from "@/lib/toast";
import * as yup from "yup";
import ValidateRule from "@/script/validate-rule";
import format from "string-format";
import MSModalButton from "@/components/base/modal/MSModalButton";
import ContentItem from "@/view/account/ContentItem";
import MSTooltip from "@/components/base/MSTooltip";
import MSDialog from "@/components/base/v2/MSDialog";

export default {
  name: "AccountDetail",
  data() {
    const schema = yup.object({
      account_number: yup
          .string()
          .required(Resource.Employee.Invalid_EmployeeCode_Required),
      account_name: yup
          .string()
          .required(Resource.Employee.Invalid_FullName_Required),
      account_object_type: yup
          .number()
          .required(Resource.Employee.Invalid_FullName_Required),
    });
    return {
      schema,
      account: {},
      parent_id: [
        {label: "0011", value: "0f8fad5b-d9cb-469f-a165-70867728950e"},
        {label: "0012", value: "7c9e6679-7425-40de-944b-e07fc1f90ae7"},
        {label: "0013", value: "0f8fad5b-d9cb-469f-a165-70867728951e"},
        {label: "0014", value: "7c9e6679-7425-40de-944b-e07fc1f90ae8"},
      ],
      account_object_type: [
        {label: "Dư nợ", value: 1},
        {label: "Dư có", value: 2},
        {label: "Lưỡng tính", value: 3},
        {label: "Không có số dư", value: 4},
      ],
      detail_by_account_object: {id: "detail_by_account_object", label: "Đối tượng"},
      detail_by_account_object_kind: [
        {label: "Nhà cung cấp", value: 1},
        {label: "Khách hàng", value: 2},
        {label: "Nhân viên", value: 3},
      ],
      detail_by_bank_account: {id: "detail_by_bank_account", label: "Tài khoản ngân hàng"},
      detail_by_expense_item: {id: "detail_by_expense_item", label: "Khoản mục CP"},
      detail_other_kind: [
        {label: "Chỉ cảnh báo", value: 1},
        {label: "Bắt buộc nhập", value: 2},
      ],
      detail_by_order: {id: "detail_by_order", label: "Đơn đặt hàng"},
      detail_by_pu_contract: {id: "detail_by_pu_contract", label: "Hợp đồng mua"},
      detail_by_department: {id: "detail_by_department", label: "Đơn vị"},
      detail_by_project_work: {id: "detail_by_project_work", label: "Công trình"},
      detail_by_contract: {id: "detail_by_contract", label: "Hợp đồng bán"},
      detail_by_job: {id: "detail_by_job", label: "Đối tượng THCP"},
      detail_by_list_item: {id: "detail_by_list_item", label: "Mã thống kê"},
      isFullScreen: false,
      isShowModal: false,
      option: {},
      formMode: Enum.FormMode.Create,
    }
  },
  components: {
    "MsModalButton": MSModalButton,
    Field, Form,
    ContentItem,
    "MsTooltip": MSTooltip,
    "MsDialog": MSDialog,
  },
  methods: {
    ...mapActions(["createAccount"]),

    /**
     * Sự kiện khi thay đổi checkbox detail
     * @param name
     * @param isChecked
     * @since 08/04/2022
     * @author NVLINH
     */
    onChangeDetail({name, isChecked}) {
      let object_kind = name + '_kind';
      if (isChecked) {
        this.account[name] = isChecked;
        this.account[object_kind] = 1;
      } else {
        delete this.account[name];
        delete this.account[object_kind];
      }
    },

    /**
     * Hàm responsive
     * @since 01/04/2022
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
     * Mở modal thêm tài khoản
     * @since 01/04/2022
     * @author NVLINH
     */
    openModal({data, formMode}) {
      this.formMode = formMode;
      this.account = data;
      this.isShowModal = true;
    },

    /**
     * Đóng modal thêm tài khoản
     * @since 01/04/2022
     * @author NVLINH
     */
    closeModal() {
      this.isShowModal = false;
    },

    /**
     * Hàm thực hiện submit form
     * @param values
     */
    onSubmit(values) {
      if (this.formMode === Enum.FormMode.Create) {
        let response = this.createAccount(this.account);
        response.then((res) => {
          let data = res.data;
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
            console.log(errorData, errorMsg);
          } else { // Lỗi server
            console.log(res);
          }
        })
      } else if (this.formMode === Enum.FormMode.Update) {
        console.log("Update");
      } else {
        console.log("Delete");
      }
    },

    /**
     * Hàm thực hiện khi có lỗi validate
     * @param errors
     */
    onInvalidSubmit({errors}) {
      // Hiển thị lỗi input ra màn hình
      this.showError(errors);
    },

    /**
     * Hàm hiển thị message lỗi
     * @param errors
     * @since 09/04/2022
     * @author NVLINH
     */
    showError(errors) {
      try {
        let keys = Object.keys(errors);
        // Lấy thông báo lỗi đầu tiên
        let msg = errors[keys[0]]
        // Hiển thị thông báo lỗi:
        for (let item in errors) {
          if (item === 'account_object_type') {
            let account_object_type = this.$refs.account_object_type.$refs.toggle;
            account_object_type.classList.add("invalid")
            account_object_type.setAttribute("title", errors[item]);
          } else {
            let element = this.$refs[item];
            element.classList.add("invalid");
            element.setAttribute("title", errors[item]);
          }
        }
        this.openPopup(Enum.DialogCode.Info, msg);
      } catch (error) {
        console.log(error);
      }
      console.log(errors)
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
}

.form-group {
  box-sizing: border-box;
}
</style>