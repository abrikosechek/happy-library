import axios from "axios";

const instance = axios.create({
  baseURL: "https://6712a5e16c5f5ced662443cb.mockapi.io/api/v2/"
})

export default instance;