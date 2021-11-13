import { GetUserResponse } from "./GetUserResponse";
import { User } from "../Domain/User.entity";
import { Translations } from "../../../Shared/Domain/Entities/Translations";
import { PricingResponseDto } from "../../Pricing/Application/PricingResponse.dto";

export class GetUserPresenter {
  public execute(user: User): GetUserResponse {
    return {
      id: user.id(),
      username: user.name(),
      email: user.email(),
      defaulter: '',
      config: {
        sendNotifications: user.sendNotifications(),
        sendWarnings: user.sendWarnings(),
        role: user.roleId(),
        language: user.language()
      },
      subscription: {
        pricing: {
          price: user.pricingId(),
          name: pricing.name,
          duration: pricing.duration
        },
        isNotified: user.isNotified(),
        isWarned: user.isWarned(),
        lastPayment: user.paymentDate(),
        isActive: user.isActive()
      },
    }
  }

  /* private translator(lang: string, word: string): string {
   const dictionary = this.translations.dictionary.get(lang)!;

   const translation = dictionary.get(word);

   if (!translation) {
   throw new Error('No translation for this word');
   }

   return translation;
   }*/

  /*private sendNotifications(user: User): string {
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
   }*/
}