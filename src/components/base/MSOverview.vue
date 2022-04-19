<template>
  <div class="ms-overview flex sticky l-0">
    <!--    over view item-->
    <div class="w-1/3 over-view">
      <div class="con-ms-tooltip bg-orange">
        <div class="m-icon m-icon-funnel-icon"></div>
        <div class="total-money">4.646,0</div>
        <div class="label-overview">Nợ quá hạn</div>
      </div>
      <div class="over-view-line"></div>
    </div>
    <!--    end over view item-->

    <!--    over view item-->
    <div class="w-1/3 mx-6 over-view">
      <div class="con-ms-tooltip bg-gray">
        <div class="m-icon m-icon-funnel-icon"></div>
        <div class="total-money">43.007.646,0</div>
        <div class="label-overview">Tổng nợ phải trả</div>
      </div>
      <div class="over-view-line"></div>
    </div>
    <!--    end over view item-->

    <!--    over view item-->
    <div class="w-1/3 over-view">
      <div class="con-ms-tooltip bg-green">
        <div class="total-money">0</div>
        <div class="label-overview">Đã thanh toán (30 ngày gần đây)</div>
      </div>
    </div>
    <!--    end over view item-->
  </div>
</template>

<script>
export default {
  name: "MSOverview"
}
</script>

<style scoped>
.ms-overview {
  color: #fff;
  position: relative;
  margin-top: 13px;
  height: 72px;
  max-height: 72px;
  box-sizing: border-box;
}

.ms-overview .over-view {
  position: relative;
  padding-top: 8px;
  height: 100%;
  box-sizing: border-box;
}

.ms-overview .over-view:hover {
  padding-top: 0;
}

.ms-overview .over-view:hover .over-view-line {
  display: block;
}

.ms-overview .con-ms-tooltip {
  position: relative;
  height: 100%;
  padding: 4px 10px;
  cursor: pointer;
  box-sizing: border-box;
}

.m-icon-funnel-icon {
  width: 18px;
  height: 22px;
  right: 10px;
  top: 4px;
  position: absolute;
}

.ms-overview .total-money {
  font-size: 24px;
  text-align: left;
}

.ms-overview .label-overview {
  font-size: 14px;
}

.ms-overview .over-view-line {
  position: absolute;
  bottom: 0;
  height: 6px;
  width: 100%;
  background: #707070;
  opacity: .5;
  display: none;
}

.mx-6 {
  margin-left: 6px;
  margin-right: 6px;
}

.bg-orange {
  background: #ff7f2c;
}

.bg-gray {
  background: #B8BCC3;
}

.bg-green {
  background: #74CB2F;
}
</style>