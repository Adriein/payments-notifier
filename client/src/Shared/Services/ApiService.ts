import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CustomError } from "./CustomError";

export class ApiService {
  private static _instance: ApiService;

  private readonly basePath: string = 'http://localhost:5000/api/v1/';
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

  public async get<T>(path: string): Promise<T> {
    try {
      const result = await this.api.get<T, AxiosResponse<T>>(path);

      return result.data;
    } catch (error: any) {
      throw new CustomError(error.response.status, error.response.data.errors)
    }
  }

  public async post<R, P>(path: string, payload: P): Promise<R> {
    try {
      const result = await this.api.post<R, AxiosResponse<R>>(path, payload);

      return result.data;
    } catch (error: any) {
      throw new CustomError(error.response.status, error.response.data.errors)
    }
  }
}