import axios from "axios";
import {loading} from "@/lib/loading";
import {LOCAL_API_URL} from "../../../public/config";

const state = {
    layout: null,
};

const getters = {
    layout: (state) => {
        return state.layout;
    },
};

const mutations = {
    setLayout(state, layout) {
        state.layout = layout;
    },
};

const actions = {
    /**
     * Gọi api lấy layout template
     * @param commit
     * @param is_default
     * @param layout_code
     * @param category
     * @returns {Promise<any>}
     */
    async getLayout({commit}, {is_default = true, layout_code = ""}) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios
                .get(`${LOCAL_API_URL}/Layouts/filter?is_default=${is_default}&layout_code=${layout_code}`);
            commit("setLayout", response.data);
            loading.hide();
            return response.data;
        } catch (error) {
            loading.hide();
            return error.response;
        }
    },

    /**
     * cập nhật layout custom
     * @param commit
     * @param template
     * @param account
     * @returns {Promise<AxiosResponse<any>|any>}
     */
    async updateLayout({commit}, template) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios.put(
                `${LOCAL_API_URL}/Layouts/update`, template
            );
            loading.hide();
            return response.data;
        } catch (error) {
            loading.hide();
            return error.response;
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};