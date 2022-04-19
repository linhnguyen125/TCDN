import EmployeeList from "../../view/employee/EmployeeList";
import CA from "@/view/ca/CA.vue";
import CAProcess from "@/view/ca/CAProcess.vue";
import ProviderList from "@/view/provider/ProviderList.vue";
import AccountList from "@/view/account/AccountList.vue";
import CAPaymentDetail from "@/view/popup/CAPaymentDetail";

const router = [
    // { path: "/employee", component: EmployeeList },
    {
        path: "/CA",
        component: CA,
        children: [
            {
                path: "/CA/CAProcess",
                component: CAProcess,
            },
            {
                path: "/CA/CAReceipt",
                component: ProviderList,
            },
        ],
    },
    {path: "/DI/DIVendor", component: ProviderList},
    {path: "/DI//DIEmployee", component: EmployeeList},
    {path: "/DI//DIAccount", component: AccountList},
    {path: "/popup/CAPaymentDetail", component: CAPaymentDetail},
];

export default router;
