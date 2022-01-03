import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface AxiosRequest {
  baseUrl?: string;
  url?: string;
  methods?: Method;
  data?: any;
  params?: any;
  headers?: any;
  timeout?: number;
}

class HttpRequest {
  private baseURL: string;
  private timeout: number;

  constructor(url: string) {
    this.baseURL = url;
    this.timeout = 10000;
  }

  interceptors(instance: AxiosInstance, url: string): void {
    instance.interceptors.request.use(
      (config) => {
        // config.header.AuthorizationToken = "";
        return config;
      },
      (error) => Promise.reject(error)
    );
    instance.interceptors.response.use(
      (response) => {
        if (response.status === 200) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      },
      (error) => {
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
          return Promise.reject(error);
        }
      }
    );
  }

  request = (options: AxiosRequestConfig) => {
    const instance = Axios.create();
    const config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout,
    };
    this.interceptors(instance, options.url);
    return instance(config);
  };

  get(config: object) {
    const conf: AxiosRequest = {
      ...config,
      methods: "GET",
    };
    return this.request(conf);
  }
  post(config) {
    const conf = {
      ...config,
      methods: "POST",
    };
    return this.request(conf);
  }
}

export default HttpRequest;
