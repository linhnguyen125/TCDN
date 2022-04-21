import axios from "axios";
import {loading} from "@/lib/loading";
import {LOCAL_API_URL} from "../../../public/config";

const state = {
    payments: null,
};

const getters = {
    payments: (state) => {
        return state.payments;
    },
};

const mutations = {
    setPayments(state, payments) {
        state.payments = payments;
    },
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
    async getPaymentsPaging({commit}, filterObject) {
        try {
            const response = await axios.post(
                `${LOCAL_API_URL}/CaPayments/filter`, filterObject
            );
            commit("setPayments", response.data);
        } catch (error) {
            console.log(error)
        }
    },

    /**
     * Gọi api thêm mới account object
     * @param commit
     * @param payment
     * @returns {Promise<void>}
     * @since 16/04/2022
     * @author Nguyễn Văn Linh
     */
    async createPayment({commit}, payment) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios
                .post(`${LOCAL_API_URL}/CaPayments`, payment);
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
    // async deleteAccountObject({commit}, vendor) {
    //     // Hiển thị loading
    //     loading.show();
    //     try {
    //         const response = await axios.delete(
    //             `${LOCAL_API_URL}/AccountObjects/${vendor.account_object_id}`
    //         );
    //         commit("deleted", vendor.account_object_id);
    //         loading.hide();
    //         return response;
    //     } catch (error) {
    //         loading.hide();
    //         return error.response;
    //     }
    // },

    /**
     * Gọi api cập nhập ncc
     * @param commit
     * @param accountObject - Object (Value nhập từ input)
     * @returns {Promise<AxiosResponse<any>|any>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    // async updateAccountObject({commit}, accountObject) {
    //     // Hiển thị loading
    //     loading.show();
    //     try {
    //         const response = await axios.put(
    //             `${LOCAL_API_URL}/AccountObjects`,
    //             accountObject,
    //         );
    //         loading.hide();
    //         return response;
    //     } catch (error) {
    //         loading.hide();
    //         return error.response;
    //     }
    // },

    /**
     * Gọi api xóa nhiều nhân viên
     * @param commit
     * @param arrIds
     * @returns {Promise<AxiosResponse<any>|any>}
     * @since 14/03/2022
     * @author Nguyễn Văn Linh
     */
    // async deleteAccountObjects({commit}, arrIds) {
    //     loading.show();
    //     try {
    //         const response = await axios.delete(
    //             `${LOCAL_API_URL}/AccountObjects`, {data: arrIds}
    //         );
    //         loading.hide();
    //         return response;
    //     } catch (error) {
    //         loading.hide();
    //         return error.response;
    //     }
    // },
};

export default {
    state,
    getters,
    mutations,
    actions,
};