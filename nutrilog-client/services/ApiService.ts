import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CustomError } from "./Shared/CustomError";

export class ApiService {
  private readonly basePath: string = 'http://localhost:5000/api/v1/';
  private readonly api: AxiosInstance;

  constructor() {
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

  public async post<T>(path: string): Promise<T> {
    try {
      const result = await this.api.post<T, AxiosResponse<T>>(path);

      return result.data;
    } catch (error: any) {
      throw new CustomError(error.response.status, error.response.data.errors)
    }
  }
}