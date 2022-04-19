<template>
  <nav class="m-navbar flex justify-content-space-between">
    <div class="flex justify-content-space-between">
      <div class="header-icon m-icon m-icon-header-dark"></div>
      <div class="header-branch m-nav-select">
        <div class="branch-name m-nav-select-name">
          Công ty cổ phần misa
        </div>
        <a
            href="javascript:void(0)"
            class="angle-down m-icon m-icon-angle-down"
        ></a>
      </div>
    </div>
    <div class="ms-tooltip">
      <div class="header-current-db">
        <div class="icon-header-current-db"></div>
        <div class="header-current-db-name">DC-01</div>
      </div>
    </div>
    <div class="header-space"></div>
    <div class="ms-download m-icon m-icon-download"></div>
    <div class="header-quick-search">
      <div class="m-input-icon">
        <input
            type="text"
            placeholder="Tìm kiếm theo mã, tên nhân viên"
        />
        <div class="m-icon-input m-icon m-icon-search"></div>
      </div>
    </div>
    <div class="header-option m-action">
      <div class="option-icon m-icon m-icon-option-dark"></div>
    </div>
    <div class="header-setting m-action">
      <div class="option-icon m-icon m-icon-setting-dark"></div>
    </div>
    <div class="chatting m-action">
      <div class="option-icon m-icon m-icon-chatting-dark"></div>
    </div>
    <div class="help m-action">
      <div class="option-icon m-icon m-icon-help-dark"></div>
    </div>
    <div class="notify m-action">
      <div class="option-icon m-icon m-icon-notify-dark"></div>
    </div>
    <div class="flex justify-content-space-between align-item-center h-full">
      <!-- <div class="notify m-action mr-4">
        <div class="option-icon m-icon m-icon-notify-dark"></div>
      </div> -->
      <div class="account-info m-nav-select align-item-center">
        <!-- <div class="user-avatar">
          <div class="m-icon m-icon-avatar"></div>
        </div> -->
        <div class="user-name m-nav-select-name">Nguyễn Văn Linh</div>
        <a
            href="javascript:void(0)"
            class="angle-down m-icon m-icon-angle-down-small"
        ></a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNavbar",
};
</script>

<style scoped>
@import url("../../style/components/navbar.css");
</style>
