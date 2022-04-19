import axios from "axios";
import {loading} from "@/lib/loading";
import {API_URL, LOCAL_API_URL} from "../../../public/config";

const state = {
    employees: null,
    employeesPaging: null,
};

const getters = {
    employees: (state) => {
        return state.employees;
    },
    employeesPaging: (state) => {
        return state.employeesPaging;
    },
};

const mutations = {
    setEmployees(state, employees) {
        state.employees = employees;
    },
    setEmployeesPaging(state, employees) {
        state.employeesPaging = employees;
    },
    // created(state, employee) {
    //     state.employees.unshift(employee);
    // },
    deleted(state, employee_id) {
        state.employeesPaging.data = state.employeesPaging.data.filter((employee) => {
            return employee.employee_id !== employee_id;
        });
    },
};

const actions = {
    /**
     * Gọi api lấy tất cả nhân viên
     * @param commit
     * @returns {Promise<void>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async getEmployees({commit}) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios.get(
                `${LOCAL_API_URL}/Employees`
            );
            commit("setEmployees", response.data);
            // Tắt loading
            loading.hide();
        } catch (error) {
            loading.hide();
        }
    },

    /**
     * Gọi api lấy nhân viên theo phân trang
     * @param commit
     * @param pageSize - Number (số bản ghi trên 1 trang)
     * @param pageNumber - Number (trang hiện tại)
     * @param txtSearch - String (txt tìm kiếm thông tin)
     * @returns {Promise<void>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async getEmployeesPaging({commit}, {pageSize = 10, pageNumber = 1, txtSearch = ""}) {
        try {
            const response = await axios.get(
                `${LOCAL_API_URL}/Employees/filter?pageSize=${pageSize}&pageNumber=${pageNumber}&txtSearch=${txtSearch}`
            );
            commit("setEmployeesPaging", response.data);
        } catch (error) {
            console.log(error)
        }
    },

    /**
     * Gọi api thêm mới nhân viên
     * @param commit
     * @param employee - object
     * @returns {Promise<void>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async createEmployee({commit}, employee) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios
                .post(`${LOCAL_API_URL}/Employees`, employee);
            loading.hide();
            return response;
        } catch (error) {
            loading.hide();
            return error.response;
        }
    },

    /**
     * Gọi api lấy thông tin nhân viên theo ID
     * @param commit
     * @param employeeId - string
     * @returns {Promise<void>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async getEmployeeById({commit}, employeeId) {
        try {
            const response = await axios.get(
                `${LOCAL_API_URL}/Employees/${employeeId}`
            );
            return response;
        } catch (error) {
            console.log(error)
        }
    },

    /**
     *
     * @param commit
     * @param employeeId - String (Id nhân viên cần cập nhật)
     * @param employee - Object (Value nhập từ input)
     * @returns {Promise<AxiosResponse<any>|any>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async updateEmployee({commit}, {employeeId, employee}) {
        try {
            const response = await axios.put(
                `${LOCAL_API_URL}/Employees`,
                employee,
            );
            return response;
        } catch (error) {
            return error.response;
        }
    },

    /**
     * Gọi api xóa nhân viên
     * @param commit
     * @param employee
     * @returns {Promise<AxiosResponse<any>|any>}
     * @since 27/02/2022
     * @author Nguyễn Văn Linh
     */
    async deleteEmployee({commit}, employee) {
        // Hiển thị loading
        loading.show();
        try {
            const response = await axios.delete(
                `${LOCAL_API_URL}/Employees/${employee.employee_id}`
            );
            commit("deleted", employee.employee_id);
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
    async deleteEmployees({commit}, arrIds) {
        loading.show();
        try {
            const response = await axios.delete(
                `${LOCAL_API_URL}/Employees`, {data: arrIds}
            );
            loading.hide();
            return response;
        } catch (error) {
            loading.hide();
            return error.response;
        }
    },

    /**
     * Gọi api lấy mã nhân viên mới
     * @returns {Promise<any>}
     * @since 15/03/2022
     * @author Nguyễn Văn Linh
     */
    async getNewEmployeeCode() {
        loading.show();
        try {
            const response = await axios.get(`${LOCAL_API_URL}/Employees/newEmployeeCode`);
            loading.hide();
            return response.data;
        } catch (error) {
            loading.hide();
            return error.response;
        }
    },

    /**
     * Gọi api export dữ liệu ra file excel
     * @param {*} tableExport - object
     * @returns {Promise<any>}
     * @since 15/03/2022
     * @author Nguyễn Văn Linh
     */
    async exportToExcel({commit}, tableExport) {
        loading.show();
        try {
            const response = await axios.post(`${LOCAL_API_URL}/Employees/export`, tableExport, {responseType: 'blob'});
            loading.hide();
            return response.data;
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
