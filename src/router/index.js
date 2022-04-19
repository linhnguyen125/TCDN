// import vue-router
import { createRouter, createWebHistory } from "vue-router";

// import components
import Report from "../view/report/Report.vue";

// import router from modules
import EmployeeRouter from "./modules/Employee";

const routes = [
	{ path: "/report", component: Report },
	{ path: "/:pathMatch(.*)*", component: Report },
	...EmployeeRouter,
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

export default router;
