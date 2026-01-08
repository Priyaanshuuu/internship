import axios from "axios";

// Root fix: Do not attach Authorization headers to ReqRes
// Attaching custom headers triggers a CORS preflight (OPTIONS), which ReqRes does not
// process for auth headers, causing the browser to fail with CORS errors.
const axiosInstance = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
