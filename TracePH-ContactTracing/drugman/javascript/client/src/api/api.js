import axios from 'axios';

export default {
    async getAllDrugs() {
        return axios.get('http://localhost:8080/api/queryalldrugs')
    },

    async addDrug(drug) {
        return axios.post(`http://localhost:8080/api/adddrug`, drug)
    },

    async updateHolder(params) {
        const { id, holder } = params

        return axios.put(`http://localhost:8080/api/changeholder/${id}`,{ holder })
    },

    async updateLocation(params) {
        const { id, location } = params

        return axios.put(`http://localhost:8080/api/changelocation/${id}`,{ location })
    }

}