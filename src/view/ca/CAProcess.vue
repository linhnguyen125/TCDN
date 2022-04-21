<template>
  <div class="ms-ca-process flex justify-content-center align-item-center">
    <div class="flex">
      <div class="process-and-utility-area">
        <div class="flex flex-col process-area">
          <div class="title">
            Nghiệp vụ tiền mặt
          </div>
          <div class="content-area m-svg-price">
            <div class="div-face-button hoverable receive">
              <div class="title-button">Thu tiền</div>
            </div>
            <div @mouseover="over" class="div-face-button hoverable payment">
              <div class="title-button">Chi tiền</div>
            </div>
            <div class="div-face-button hoverable audit">
              <div class="title-button">Kiểm kê quỹ</div>
            </div>
          </div>
        </div>
        <div class="dictionary-area flex">
          <router-link to="/DI/DIAccount" class="dictionary-item hoverable w-1/4 mw-1/4">
            <div class="dictionary-content">
              <div class="m-icon w-6 h-6 m-process-customer"></div>
              <div class="text">Tài khoản</div>
            </div>
          </router-link>
          <router-link to="/DI/DIVendor" class="dictionary-item hoverable w-1/4 mw-1/4">
            <div class="dictionary-content">
              <div class="m-icon w-6 h-6 m-process-provider"></div>
              <div class="text">Nhà cung cấp</div>
            </div>
          </router-link>
          <router-link to="/DI/DIEmployee" class="dictionary-item hoverable w-1/4 mw-1/4">
            <div class="dictionary-content">
              <div class="m-icon w-6 h-6 m-process-employee"></div>
              <div class="text">Nhân viên</div>
            </div>
          </router-link>
          <div class="dictionary-item hoverable w-1/4 mw-1/4">
            <div class="dictionary-content">
              <div class="m-icon w-6 h-6 m-calculate"></div>
              <div class="text">Tính tỷ giá xuất quỹ</div>
            </div>
          </div>
        </div>
      </div>
      <div class="report-area ml-10 flex flex-col">
        <div class="title">
          Báo cáo
        </div>
        <div class="favorite-report">
          <ul>
            <li>Bảng kê số dư tiền theo ngày</li>
            <li>Dòng tiền</li>
            <li>Bảng kê số dư tiền theo ngày</li>
            <li>Bảng kê số dư tiền theo ngày</li>
            <li>Bảng kê số dư tiền theo ngày</li>
          </ul>
        </div>
        <div class="footer">Tất cả báo cáo</div>
      </div>
    </div>
  </div>
  <ms-drop-down ref="dropdown" :position="position">
    <template v-slot:default>
      <div @click="this.$refs['payment-detail'].openModal({data: {}, formMode: 1})">Phiếu chi</div>
      <div>Trả tiền theo hóa đơn</div>
      <div>Nộp thuế</div>
    </template>
  </ms-drop-down>
  <payment-detail ref="payment-detail"></payment-detail>
</template>
<script>
import CAPaymentDetail from "@/view/popup/CAPaymentDetail";
import MSDropDown from "@/components/base/MSDropDown";

export default {
  name: "CAProcess",
  data() {
    return {
      position: {},
    }
  },
  components: {
    "MsDropDown": MSDropDown,
    "PaymentDetail": CAPaymentDetail,
  },
  methods: {
    over(e) {
      if (Object.keys(this.position).length !== 2) {
        this.position = {
          top: e.clientX - 250 + 'px',
          left: e.clientY - 50 + 'px'
        }
      }
      this.$refs.dropdown.showDropDown();
    },
  }
}
</script>
<style scoped>
.ms-ca-process {
  height: calc(100vh - 55px - 14px - 48px);
  max-height: calc(100vh - 55px - 14px - 48px);
  flex-direction: column;
  justify-content: center;
  overflow: auto;
}

.ms-ca-process .title {
  text-transform: uppercase;
  min-height: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
}

.ms-ca-process .process-and-utility-area {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration-style: solid;
}

.ms-ca-process .content-area {
  position: relative;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  width: 690px;
  height: 380px;
  box-sizing: border-box;
}

.ms-ca-process .process-area {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  width: 690px;
  height: 380px;
  box-sizing: border-box;
}

.ms-ca-process .report-area {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  margin-left: 10px;
  width: 300px;
  height: 460px;
  box-sizing: border-box;
}

.ms-ca-process .favorite-report {
  flex: 1;
  overflow: auto;
  min-height: 0;
  box-sizing: border-box;
}

.ms-ca-process .favorite-report ul {
  margin: 0;
  padding: 0 16px;
}

.ms-ca-process .favorite-report ul li {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e5e5e5;
  height: 74px;
  box-sizing: border-box;
}

.ms-ca-process .favorite-report ul li:last-child {
  border: none !important;
}

.ms-ca-process .footer {
  border-top: 1px solid #e5e5e5;
  cursor: pointer;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #0075c0;
}

.ms-ca-process .dictionary-area {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  margin-top: 10px;
  height: 70px;
  width: 100%;
  box-sizing: border-box;
}

.ms-ca-process .hoverable:hover {
  cursor: pointer;
  box-shadow: 4px 4px #babec5;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
}

.ms-ca-process .dictionary-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e5e5e5;
  box-sizing: border-box;
  text-decoration: none !important;
  color: #000;
}

.ms-ca-process .dictionary-item:last-child {
  border: none !important;
}

.ms-ca-process .dictionary-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.ms-ca-process .text {
  text-align: center;
}

.ms-ca-process .div-face-button {
  width: 90px;
  padding-top: 60px;
  position: absolute;
  transition: all .2s ease;
  text-align: center;
}

.ms-ca-process .title-button {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: flex-end;
  padding-bottom: 10px;
}

.receive {
  top: 40px;
  left: 90px;
}

.payment {
  top: 215px;
  left: 90px;
}

.audit {
  top: 125px;
  left: 335px;
  width: 125px !important;
}

.ml-10 {
  margin-left: 10px;
}

@media only screen and (max-width: 600px) {

}
</style>