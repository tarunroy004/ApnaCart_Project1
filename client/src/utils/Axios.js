import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

// ----------------------
// 1) SEND ACCESS TOKEN
// ----------------------
Axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accesstoken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// -----------------------------------
// 2) HANDLE 401 → USE REFRESH TOKEN
// -----------------------------------
Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If access token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) return Promise.reject(error);

            // Refresh token using a normal axios (not interceptors)
            try {
                const refreshResponse = await axios({
                    ...SummaryApi.refreshToken,
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });

                const newAccessToken =
                    refreshResponse.data.data.accessToken;

                // Save new token
                localStorage.setItem("accesstoken", newAccessToken);

                // Attach new token to original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Retry the original API
                return Axios(originalRequest);
            } catch (refreshError) {
                console.log("Refresh Failed:", refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default Axios;
