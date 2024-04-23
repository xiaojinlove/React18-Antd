import axios from "axios"

const instanceAxios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000
})

export const get = (url, params = {}) => instanceAxios.get(url, {params})