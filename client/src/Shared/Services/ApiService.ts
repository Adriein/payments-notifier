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

  public async get<Res>(path: string): Promise<Res> {
    return this.call<Res>(async () => await this.api.get<Res, AxiosResponse<Res>>(path));
  }

  public async post<Res, Payload>(path: string, payload: Payload): Promise<Res> {
    return await this.call(async () => await this.api.post<Res, AxiosResponse<Res>>(path, payload));
  }

  public async put<Payload, Res = any>(path: string, payload: Payload): Promise<Res> {
    return await this.call(async () => await this.api.put<Res, AxiosResponse<Res>>(path, payload))
  }

  private async call<Res>(fn: () => Promise<AxiosResponse<Res>>): Promise<Res> {
    try {
      const result = await fn();

      return result.data;

    } catch (error: any) {
      const axiosError = error?.response;

      const status = axiosError?.status ?? DEFAULT_STATUS_ERROR;
      const message = axiosError.data?.errors ?? [ DEFAULT_ERROR_MESSAGE ];
      const key = axiosError.data?.errors ? axiosError.data?.errors[0].key : DEFAULT_ERROR_MESSAGE;

      throw new CustomError(status, message, key);
    }
  }
}