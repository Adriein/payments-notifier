import axios, { AxiosInstance, AxiosResponse } from 'axios';

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
    } catch (error) {
      throw new Error();
    }
  }

  public async post<T>(path: string): Promise<T> {
    try {
      const result = await this.api.post<T, AxiosResponse<T>>(path);

      return result.data;
    } catch (error) {
      throw new Error();
    }
  }
}