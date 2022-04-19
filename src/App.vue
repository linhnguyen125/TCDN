<template>
  <div class="m-container">
    <the-sidebar></the-sidebar>
    <div class="m-content-area">
      <the-navbar></the-navbar>
      <the-content></the-content>
    </div>
  </div>
</template>

<script>
import TheSidebar from "./components/layout/TheSidebar.vue";
import TheNavbar from "./components/layout/TheNavbar.vue";
import TheContent from "./components/layout/TheContent.vue";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheNavbar,
    TheContent,
  },
  mounted() {
    let headerIcon = document.querySelector(".header-icon.m-icon.m-icon-header-dark");
    let toggleIcon = document.querySelector(".m-toggle.m-icon.m-icon-toggle-light");
    let container = document.querySelector(".m-container");
    let sidebar = document.querySelector(".m-sidebar");
    headerIcon.addEventListener("click", function () {
      sidebar.classList.add("responsive");
      container.classList.add("responsive")
      headerIcon.style.display = "none";
    })
    toggleIcon.addEventListener("click", function () {
      sidebar.classList.remove("responsive");
      container.classList.remove("responsive")
      headerIcon.style.display = "block";
    })
  }
};
</script>

<style>
@import url("./style/main.css");
</style>
