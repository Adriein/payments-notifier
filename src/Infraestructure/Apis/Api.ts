import axios from 'axios';

export class Api {
  public async get(url: string, params: any): Promise<any> {
    try {
      return (await axios.get(url, params)).data;
    } catch (e) {
      console.log(e);
    }
  }
}
