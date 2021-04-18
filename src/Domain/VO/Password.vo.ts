import { CryptoService } from '../Services/CryptoService';

export class Password {
  private cryptoService = new CryptoService();
  private password: string;
  constructor(password: string) {
    this.password = password;
  }

  public async getHashedPassword(): Promise<string> {
    return await this.cryptoService.hash(this.password);
  }

  public get value(): string {
    return this.password;
  }
}
