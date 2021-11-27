import { CryptoService } from '../Services/CryptoService';
import { ValueObject } from './ValueObject';
import { ArrayUtils } from "../Helper/Array.utils";

export class Password extends ValueObject {
  private readonly password: string;

  constructor(password: string) {
    super();
    this.password = password;
  }

  public get value(): string {
    return this.password;
  }

  protected validate(): boolean {
    return true;
  }

  public static generate(): Password {
    const words = ["bakasta", "noelle", "yami", "vanessa", "yuno", "julius"];
    const chars = "!@#$%^&*0123456789";

    const randomIndex = Math.floor(Math.random() * words.length);

    const basePassword = words[randomIndex];

    const password = ArrayUtils.times<string>(5, () => {
      const randomNumber = Math.floor(Math.random() * chars.length);
      const passArray = basePassword.split('');

      passArray.push(chars.split('')[randomNumber]);

      return passArray.join('');
    });

    return new Password(password);
  }
}
