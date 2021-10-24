import { GetUserResponse } from "./GetUserResponse";
import { User } from "../Domain/User.entity";
import { Translations } from "../../Shared/Domain/Entities/Translations";

export class GetUserPresenter {
  private translations: Translations = new Translations();

  public execute(user: User): GetUserResponse {
    return {
      id: user.id(),
      username: user.name(),
      email: user.email(),
      defaulter: '',
      config: {
        sendNotifications: this.sendNotifications(user),
        sendWarnings: this.sendWarnings(user),
        role: this.translator(user.language(), user.role()),
        language: user.language()
      },
      subscription: {
        pricing: {
          price: 10,
          name: '10',
          duration: 10
        },
        isNotified: user.isNotified(),
        isWarned: user.isWarned(),
        lastPayment: user.paymentDate(),
        isActive: user.isActive()
      },
    }
  }

  private translator(lang: string, word: string): string {
    const dictionary = this.translations.dictionary.get(lang)!;

    const translation = dictionary.get(word);

    if (!translation) {
      throw new Error('No translation for this word');
    }

    return translation;
  }

  private sendNotifications(user: User): string {
    if (user.sendNotifications()) {
      return this.translator(user.language(), 'Si');
    }

    return this.translator(user.language(), 'No')
  }

  private sendWarnings(user: User): string {
    if (user.sendWarnings()) {
      return this.translator(user.language(), 'Si');
    }

    return this.translator(user.language(), 'No')
  }
}