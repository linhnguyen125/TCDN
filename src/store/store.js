import {createStore} from "vuex";

import Employees from "./modules/employee";
import Department from "./modules/department";
import Account from "./modules/account";
import Layout from "./modules/layout";
import AccountObject from "./modules/account_object";
import Location from "@/store/modules/location";

export default createStore({
    state: {
        value: null,
    },
    modules: {
        Employees,
        Department,
        Account,
        Layout,
        AccountObject,
        Location,
    },
});
