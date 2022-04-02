import { Dispatch } from "react";
import { ActionProps } from "../../../Shared/Action/ActionProps";
import { ASYNC_ACTION } from "../../../Shared/constants";
import { ApiService } from "../../../Shared/Services/ApiService";
import { RENEW_SUBSCRIPTION_ACTION } from "../../constants";
import { RenewSubscriptionRequest } from "./RenewSubscriptionRequest";

export const renewSubscription = (dispatch: Dispatch<ActionProps<void>>) => {
  return async ({ clientId, pricingId, paymentDate }: RenewSubscriptionRequest): Promise<void> => {
    try {
      dispatch({ type: ASYNC_ACTION });
      const api = ApiService.instance();

      await api.put<RenewSubscriptionRequest>(
        '/user/subscription/renew',
        { clientId, pricingId, paymentDate }
      );

    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: RENEW_SUBSCRIPTION_ACTION });
    }
  };
};