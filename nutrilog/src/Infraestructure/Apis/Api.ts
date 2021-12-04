import axios from 'axios';
import { IApi } from "../../Domain/Interfaces/IApi";

export class Api implements IApi {
  public async get(url: string, params: any): Promise<any> {
    try {
      return (await axios.get(url, params)).data;
    } catch (e) {
      console.log(e);
    }
  }
}
