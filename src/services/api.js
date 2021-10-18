import axios from "axios";

export default axios.create({
  baseURL: `https://bootcampapi.techcs.io/api/fe/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 100000,
});
