import axios, { AxiosRequestConfig } from 'axios';

export abstract class HttpApi {
  protected abstract BASE_URL: string;
  private config: AxiosRequestConfig = {};

  public async get<T>(endPoint: string): Promise<T> {
    return await axios.get(`${this.BASE_URL}${endPoint}`, this.config);
  }

  public headers(headers: any): void {
    this.config = { ...this.config, headers };
  }
}
