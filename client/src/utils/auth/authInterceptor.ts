import { AxiosInstance } from "axios";

/**
 * Simple interceptor for axios requests.
 * This version doesn't handle token refresh since Firebase has been removed.
 */
export const authInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Just pass through errors for now
      return Promise.reject(error);
    }
  );
};
