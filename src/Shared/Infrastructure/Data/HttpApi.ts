import axios, { AxiosRequestConfig } from 'axios';

export abstract class HttpApi {
  protected abstract BASE_URL: string;

  public async get<T>(endPoint: string, config?: AxiosRequestConfig): Promise<T> {
    return await axios.get(`${this.BASE_URL}${endPoint}`, config ? config : {});
  }
}
