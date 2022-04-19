import {createApp} from "vue";
import App from "./App.vue";
import vSelect from "vue-select";
import DatePicker from 'vue-datepicker-next';

// import router
import router from "./router";

// import store
import store from "./store/store.js";

// import css library
import "vue-select/dist/vue-select.css";
import 'vue-datepicker-next/index.css';

const app = createApp(App);
app.use(router);
app.use(store);
app.component("v-select", vSelect);
app.component("date-picker", DatePicker);
app.mount("#app");
