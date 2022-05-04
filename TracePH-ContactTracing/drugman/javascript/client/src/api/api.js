import axios from 'axios';

export default {
    async getAllUsers() {
        return axios.get('http://localhost:8080/api/users')
    },

    async addUser(user) {
        return axios.post(`http://localhost:8080/api/users`, user)
    },

    async updateEmail(params) {
        const { id, email } = params

        return axios.put(`http://localhost:8080/api/user/${id}/email`, { email })
    },

    async updatePhone(params) {
        const { id, phone } = params

        return axios.put(`http://localhost:8080/api/user/${id}/phone`, { phone })
    },

    async updateLocation(params) {
        const { id, location } = params

        return axios.put(`http://localhost:8080/api/user/${id}/location`,{ location })
    }

}