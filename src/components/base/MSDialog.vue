<template>
  <div class="m-wrapper-dialog">
    <div v-show="option.status === DialogCode.Info" class="m-dialog m-dialog-info">
      <div class="m-dialog-header">
        <div class="m-icon"></div>
        <div class="m-text">{{ option.msg }}</div>
      </div>
      <div class="m-dialog-footer">
        <ms-button
            :option="{
            title: 'Đóng',
            class: 'm-modal-btn-secondary'
          }"
            @click="confirm(false)"
        />
      </div>
    </div>

    <div v-show="option.status === DialogCode.Warning" class="m-dialog m-dialog-warning">
      <div class="m-dialog-header">
        <div class="m-icon"></div>
        <div class="m-text">{{ option.msg }}
        </div>
      </div>
      <div class="m-dialog-footer">
        <ms-button
            :option="{
            title: 'Đóng',
            class: 'm-modal-btn-secondary'
          }"
            @click="confirm(false)"
        />
      </div>
    </div>

    <div v-show="option.status === DialogCode.Delete" class="m-dialog m-dialog-warning delete">
      <div class="m-dialog-header">
        <div class="m-icon"></div>
        <div class="m-text">{{ option.msg }}</div>
      </div>
      <div class="m-dialog-footer">
        <ms-button
            :option="{
            title: 'Không',
            class: 'm-modal-btn'
          }"
            @click="confirm(false)"
        />
        <ms-button
            :option="{
            title: 'Có',
            class: 'm-modal-btn-secondary'
          }"
            @click="confirm(true)"
        />
      </div>
    </div>

    <div v-show="option.status === DialogCode.Edit" class="m-dialog m-dialog-warning edit">
      <div class="m-dialog-header">
        <div class="m-icon"></div>
        <div class="m-text">
          {{ option.msg }}
        </div>
      </div>
      <div class="m-dialog-footer flex justify-content-space-between">
        <ms-button
            :option="{
            title: 'Hủy',
            class: 'm-modal-btn'
          }"
            @click="confirm('cancel')"
        />
        <div class="flex">
          <ms-button
              :option="{
            title: 'Không',
            class: 'm-modal-btn'
          }"
              @click="confirm(false)"
          />
          <ms-button
              :option="{
            title: 'Có',
            class: 'm-modal-btn-secondary mx-3'
          }"
              @click="confirm(true)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MsButton from "@/components/base/modal/MSModalButton";
import Enum from '@/script/enum.js';

export default {
  name: "MSDialog",
  data() {
    return {
      DialogCode: Enum.DialogCode,
    }
  },
  props: {
    option: Object,
  },
  methods: {
    /**
     * Emit ra component cha xóa nhân viên
     * @param confirmation
     * @since 28/02/2022
     * @author Nguyễn Văn Linh
     */
    confirm(confirmation) {
      this.$emit("handleConfirm", confirmation)
    }
  },
  components: {
    MsButton,
  }
};
</script>

<style></style>
