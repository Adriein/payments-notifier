import { CryptoService } from '../../../Domain/Services/CryptoService';
import { ValueObject } from './ValueObject';

export class Password extends ValueObject {
  private cryptoService = new CryptoService();
  private password: string;

  constructor(password: string) {
    super();
    this.password = password;
  }

  public async getHashedPassword(): Promise<string> {
    return await this.cryptoService.hash(this.password);
  }

  public get value(): string {
    return this.password;
  }

  protected validate(): boolean {
    return true;
  }
}