import axios from "axios";
import {loading} from "@/lib/loading";
import {API_URL, LOCAL_API_URL} from "../../../public/config";

const state = {
    departments: null,
};

const getters = {
    departments: (state) => {
        return state.departments;
    },
};

const mutations = {
    setDepartments(state, departments) {
        state.departments = departments;
    },
};

const actions = {
    /**
     * Gọi api lấy tất cả phòng ban
     * @param commit
     * @returns {Promise<void>}
     * @since 25/02/2022
     * @author Nguyễn Văn Linh
     */
    async getDepartments({commit}) {
        loading.show();
        try {
            // Hiển thị loading
            const response = await axios.get(
                `${LOCAL_API_URL}/Departments`
            );
            commit("setDepartments", response.data);
            // Tắt loading
            loading.hide();
        } catch (error) {
            loading.hide();
            console.log(error);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
