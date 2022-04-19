import axios from "axios";
import {loading} from "@/lib/loading";
import {LOCAL_API_URL} from "../../../public/config";

const state = {
    accounts: null,
    accounts_paging: null,
};

const getters = {
    accountsPaging: (state) => {
        return state.accounts_paging;
    },
    accounts: (state) => {
        return state.accounts;
    }
};

const mutations = {
    setAccountsPaging(state, accounts) {
        state.accounts_paging = accounts;
    },
    setAccounts(state, accounts) {
        state.accounts = accounts;
    },
};

const actions = {

    async getAllAccount({commit}) {
        try {
            const response = await axios.get(
                `${LOCAL_API_URL}/Accounts`
            );
            commit("setAccounts", response.data);
        } catch (error) {
            console.log(error)
        }
    },

    /**
     * Gọi api lấy tài khoản theo phân trang
     * @param commit
     * @param pageSize - Number (số bản ghi trên 1 trang)
     * @param pageNumber - Number (trang hiện tại)
     * @param txtSearch - String (txt tìm kiếm thông tin)
     * @returns {Promise<void>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async getAccountsPaging({commit}, {pageSize = 20, pageNumber = 1, txtSearch = ""}) {
        try {
            const response = await axios.get(
                `${LOCAL_API_URL}/Accounts/filter?pageSize=${pageSize}&pageNumber=${pageNumber}&txtSearch=${txtSearch}`
            );
            commit("setAccountsPaging", response.data);
        } catch (error) {
            console.log(error)
        }
    },

    /**
     * Gọi api thêm mới tài khoản
     * @param commit
     * @param account - object
     * @returns {Promise<void>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async createAccount({commit}, account) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios
                .post(`${LOCAL_API_URL}/Accounts`, account);
            loading.hide();
            return response;
        } catch (error) {
            loading.hide();
            return error.response;
        }
    },

    /**
     * tool
     * @param commit
     * @param account
     * @returns {Promise<AxiosResponse<any>|any>}
     */
    async deleteAccount({commit}, account) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios.delete(
                `${LOCAL_API_URL}/Accounts/${account["account_id"]}`
            );
            loading.hide();
            return response;
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