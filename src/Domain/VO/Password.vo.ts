import { CryptoService } from '../Services/CryptoService';

export class Password {
  private cryptoService = new CryptoService();
  constructor(public password: string) {}

  public async getHashedPassword(): Promise<string> {
    return await this.cryptoService.hash(this.password);
  }

}
