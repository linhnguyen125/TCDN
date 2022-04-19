<template>
    <div class="ms-ca">
        <div class="ms-tabs flex">
            <div class="ms-tabs-item"><router-link exact-active-class="ms-tabs-item-active" to="/CA/CAProcess">Quy trình</router-link></div>
            <div class="ms-tabs-item"><router-link exact-active-class="ms-tabs-item-active" to="/CA/CAReceipt">Thu, chi tiền</router-link></div>
            <div class="ms-tabs-item"><router-link exact-active-class="ms-tabs-item-active" to="/">Kiểm kê</router-link></div>
            <div class="ms-tabs-item"><router-link exact-active-class="ms-tabs-item-active" to="/">Dự báo dòng tiền</router-link></div>
            <div class="ms-tabs-item"><router-link exact-active-class="ms-tabs-item-active" to="/">Báo cáo</router-link></div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "CA",
}
</script>
<style scoped>
.ms-ca {
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
}

.ms-tabs {
    width: 100%;
    height: 50px;
    max-height: 50px;
    box-sizing: border-box;
    background-color: #F8F8F8;
    margin-top: 14px;
    border-bottom: 1px solid #bbb;
    align-items: center;
}

.ms-tabs .ms-tabs-item {
    box-sizing: border-box;
}

.ms-tabs .ms-tabs-item a {
    padding: 15px 20px;
    text-decoration: none;
    width: 100%;
    height: 100%;
    color: #000;
}

.ms-tabs .ms-tabs-item:hover a {
    color: #2ca01c;
}

.ms-tabs .ms-tabs-item-active {
    position: relative;
    font-weight: 600;
}

.ms-tabs .ms-tabs-item-active::before {
    content: "";
    height: 4px;
    width: 100%;
    left: 0;
    bottom: 0;
    position: absolute;
    border-bottom: 4px solid #2ca01c;
}
</style>