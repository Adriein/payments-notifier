import axios from 'axios';

export abstract class HttpApi {
    protected abstract BASE_URL: string;

    protected abstract getAuth(): string;

    public async get<T>(endPoint: string): Promise<T>{
        return await axios.get(`${this.BASE_URL}${endPoint}`);
    }
}