import axios from "axios";
import {loading} from "@/lib/loading";
import {LOCAL_API_URL} from "../../../public/config";

const state = {
    payments: null,
    newPaymentCode: null,
};

const getters = {
    payments: (state) => {
        return state.payments;
    },
    newPaymentCode: (state) => {
        return state.newPaymentCode;
    }
};

const mutations = {
    setPayments(state, payments) {
        state.payments = payments;
    },
    setNewPaymentCode(state, newCode) {
        state.newPaymentCode = newCode;
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
                .post(`${LOCAL_API_URL}/CaPayments/full`, payment);
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
     * @param payment
     * @returns {Promise<AxiosResponse<any>|any>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async deletePayment({commit}, payment) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios.delete(
                `${LOCAL_API_URL}/CaPayments/${payment.ca_payment_id}`
            );
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
     * @param payment - Object (Value nhập từ input)
     * @returns {Promise<AxiosResponse<any>|any>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async updatePayment({commit}, payment) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios.put(`${LOCAL_API_URL}/CaPayments/full`, payment);
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
    async deletePayments({commit}, arrIds) {
        loading.show();
        try {
            const response = await axios.delete(
                `${LOCAL_API_URL}/CaPayments`, {data: arrIds}
            );
            loading.hide();
            return response;
        } catch (error) {
            loading.hide();
            return error.response;
        }
    },

    /**
     * Gọi api lấy mã mới
     * @param commit
     * @returns {Promise<AxiosResponse<any>|any>}
     * @since 14/03/2022
     * @author Nguyễn Văn Linh
     */
    async getNewPaymentCode({commit}) {
        loading.show();
        try {
            const response = await axios.get(`${LOCAL_API_URL}/CaPayments/newPaymentCode`);
            loading.hide();
            commit("setNewPaymentCode", response.data);
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