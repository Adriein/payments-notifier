export interface IHttpApi<T> {
  get(url: string): Promise<T>;

  post<T, C>(url: string, body: C): Promise<T>;
}