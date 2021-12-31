import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CustomError } from "./CustomError";
import { DEFAULT_ERROR_MESSAGE, DEFAULT_STATUS_ERROR } from "../constants";

export class ApiService {
  private static _instance: ApiService;

  private readonly basePath: string = 'api/v1/';
  private readonly api: AxiosInstance;

  public static instance(): ApiService {
    if (!this._instance) {
      this._instance = new ApiService();
    }

    return this._instance;
  }

  private constructor() {
    this.api = axios.create({
      baseURL: this.basePath,
    });
  }

  public async get<R>(path: string): Promise<R> {
    return this.call<R>(async () => await this.api.get<R, AxiosResponse<R>>(path));
  }

  public async post<R, P>(path: string, payload: P): Promise<R> {
    return await this.call(async () => await this.api.post<R, AxiosResponse<R>>(path, payload));
  }

  private async call<R>(fn: () => Promise<AxiosResponse<R>>): Promise<R> {
    try {
      const result = await fn();

      return result.data;
    } catch (error: any) {
      const status = error.response.status ?? DEFAULT_STATUS_ERROR;
      const message = error.response.data.errors ?? [ DEFAULT_ERROR_MESSAGE ];
      const key = error.response.data.errors[0].key ?? DEFAULT_ERROR_MESSAGE;
      throw new CustomError(status, message, key);
    }
  }
}