import axios from "axios";
import {loading} from "@/lib/loading";
import {LOCAL_API_URL} from "../../../public/config";

const state = {
    account_objects: null,
    new_account_object_code: null,
};

const getters = {
    account_objects: (state) => {
        return state.account_objects;
    },
    new_account_object_code: (state) => {
        return state.new_account_object_code;
    }
};

const mutations = {
    setAccountObjects(state, account_objects) {
        state.account_objects = account_objects;
    },
    setNewCode(state, new_code) {
        state.new_account_object_code = new_code;
    }
};

const actions = {
    /**
     * Gọi api lấy account object theo phân trang
     * @param commit
     * @param filterObject
     * @param pageSize - Number (số bản ghi trên 1 trang)
     * @returns {Promise<void>}
     * @since 12/04/2022
     * @author Nguyễn Văn Linh
     */
    async getAccountObjectsPaging({commit}, filterObject) {
        try {
            const response = await axios.post(
                `${LOCAL_API_URL}/AccountObjects/filter`, filterObject
            );
            commit("setAccountObjects", response.data);
        } catch (error) {
            console.log(error)
        }
    },

    /**
     * Gọi api thêm mới account object
     * @param commit
     * @param accountObject - object
     * @returns {Promise<void>}
     * @since 16/04/2022
     * @author Nguyễn Văn Linh
     */
    async createAccountObject({commit}, accountObject) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios
                .post(`${LOCAL_API_URL}/AccountObjects`, accountObject);
            loading.hide();
            return response;
        } catch (error) {
            loading.hide();
            console.log(error)
        }
    },

    /**
     * Gọi api xóa ncc
     * @param commit
     * @param employee
     * @returns {Promise<AxiosResponse<any>|any>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async deleteAccountObject({commit}, vendor) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios.delete(
                `${LOCAL_API_URL}/AccountObjects/${vendor.account_object_id}`
            );
            commit("deleted", vendor.account_object_id);
            loading.hide();
            return response;
        } catch (error) {
            loading.hide();
            return error.response;
        }
    },

    /**
     * Gọi api cập nhập ncc
     * @param commit
     * @param accountObject - Object (Value nhập từ input)
     * @returns {Promise<AxiosResponse<any>|any>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async updateAccountObject({commit}, accountObject) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios.put(
                `${LOCAL_API_URL}/AccountObjects`,
                accountObject,
            );
            loading.hide();
            return response;
        } catch (error) {
            loading.hide();
            return error.response;
        }
    },

    /**
     * Gọi api xóa nhiều nhân viên
     * @param commit
     * @param arrIds
     * @returns {Promise<AxiosResponse<any>|any>}
     * @since 14/03/2022
     * @author Nguyễn Văn Linh
     */
    async deleteAccountObjects({commit}, arrIds) {
        loading.show();
        try {
            const response = await axios.delete(
                `${LOCAL_API_URL}/AccountObjects`, {data: arrIds}
            );
            loading.hide();
            return response;
        } catch (error) {
            loading.hide();
            return error.response;
        }
    },

    async getNewAccountObjectCode({commit}) {
        loading.show();
        try {
            const response = await axios.get(`${LOCAL_API_URL}/AccountObjects/newAccountObjectCode`);
            loading.hide();
            commit("setNewCode", response.data);
        } catch (error) {
            loading.hide();
            return error.response;
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};