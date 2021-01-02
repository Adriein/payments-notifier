import { CryptoService } from '../services/CryptoService';

export class Password {
  private cryptoService = new CryptoService();
  constructor(private password: string) {}

  public async getHashedPassword(): Promise<string> {
    return await this.cryptoService.hash(this.password);
  }

}
