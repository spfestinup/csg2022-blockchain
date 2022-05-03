import axios from 'axios';

export default {
    async getAllQueries() {
        return axios.get('http://localhost:8080/api/queries')
    },

    async addQuery(query) {
        return axios.post(`http://localhost:8080/api/queries`, query)
    },

    async updateUserId(params) {
        const { id, userid } = params

        return axios.put(`http://localhost:8080/api/query/${id}/userid`, { userid })
    },

    async updateTimestamp(params) {
        const { id, timestamp } = params

        return axios.put(`http://localhost:8080/api/query/${id}/timestamp`, { timestamp })
    },
}