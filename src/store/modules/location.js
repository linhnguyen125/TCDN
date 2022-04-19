import axios from "axios";
import {loading} from "@/lib/loading";
import {LOCATION_API_URL} from "../../../public/config";

const state = {
    location: null,
};

const getters = {
    location: (state) => {
        return state.location;
    },
};

const mutations = {
    setLocation(state, location) {
        state.location = location;
    },
};

const actions = {
    /**
     * Gọi api lấy location
     * @param commit
     * @since 12/04/2022
     * @author Nguyễn Văn Linh
     */
    async getLocation({commit}) {
        loading.show();
        try {
            const response = await axios.get(`${LOCATION_API_URL}`);
            let location = response.data;
            commit("setLocation", location);
            loading.hide();
        } catch (error) {
            console.log(error)
            loading.hide();
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};