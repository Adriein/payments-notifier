export interface IHttpApi<T> {
    get(url: string): Promise<T>;
}