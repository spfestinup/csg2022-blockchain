import axios from 'axios';

export default {
    async getAllDrugs() {
        return axios.get('http://localhost:8080/api/queryalldrugs')
    },

    async addDrug(drug) {
        return axios.post(`http://localhost:8080/api/adddrug`, drug)
    },
}