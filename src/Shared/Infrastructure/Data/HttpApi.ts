import axios from 'axios';

export class HttpApi<T> {
    public async get(url: string): Promise<T>{
        return await axios.get(url);
    }
}