const { default: axios } = require("axios");

const apiESports = axios.create({
  baseURL: 'http://localhost:3333/'
})

export default apiESports