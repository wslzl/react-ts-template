import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpRequest {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 5000,
    });
  }

  private interceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (config.url !== "/login") {
          // config.headers!["Authorization"] = user.access_token;
        }
        return config;
      },
      (error: any) => {
        Promise.reject(error);
      }
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.status === 200) {
          return response;
        }
        return Promise.reject(response);
      },
      (error: any) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              break;
            case 403:
              break;
            case 404:
              break;
            case 500:
              break;
            default:
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }
  private request(options: AxiosRequestConfig): Promise<AxiosResponse> {
    this.interceptors();
    return this.axiosInstance(options);
  }
  public get(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.request({ ...config, method: "GET" });
  }
  public post(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.request({
      ...config,
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default HttpRequest;
