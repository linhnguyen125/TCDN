<template>
  <sidebar class="m-sidebar">
    <div class="m-logo">
      <a href="javascript:void(0)" class="m-toggle m-icon m-icon-toggle-light"></a>
      <a href="" class="logo">
        <img
            src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg"
            alt=""
        />
      </a>
    </div>
    <div class="m-menu-list">
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/dashboard" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-overview-dark"></div>
          <div class="text">Tổng quan</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link active-class="active" to="/CA/CAProcess" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-money-dark"></div>
          <div class="text">Tiền mặt</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/report" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-bank-dark"></div>
          <div class="text">Tiền gửi</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-bag-dark"></div>
          <div class="text">Mua hàng</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-sale-dark"></div>
          <div class="text">Bán hàng</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-invoice-dark"></div>
          <div class="text">Quản lý hóa đơn</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-stock-dark"></div>
          <div class="text">Kho</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-tools-dark"></div>
          <div class="text">Công cụ dụng cụ</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-fixed-assets-dark"></div>
          <div class="text">Tài sản cố định</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-tax-dark"></div>
          <div class="text">Thuế</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-price-dark"></div>
          <div class="text">Giá thành</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-general-dark"></div>
          <div class="text">Tổng hợp</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-budget-dark"></div>
          <div class="text">Ngân sách</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-report-dark"></div>
          <div class="text">Báo cáo</div>
        </router-link>
      </div>
      <div class="m-menu-item">
        <router-link exact-active-class="active" to="/overview" class="m-menu-link">
          <div class="m-menu-icon m-icon m-icon-finance-dark"></div>
          <div class="text">Phân tích tài chính</div>
        </router-link>
      </div>
    </div>
  </sidebar>
</template>

<script>
export default {
  name: "TheSidebar",
};
</script>

<style scoped>
@import url("../../style/components/sidebar.css");
</style>
