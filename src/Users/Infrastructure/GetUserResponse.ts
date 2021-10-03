export type GetUserResponse = {
  id: string,
  username: string,
  email: string,
  defaulter: string,
  subscription: GetSubscriptionResponse,
  config: GetConfigResponse,
};

type GetSubscriptionResponse = {}

type GetConfigResponse = {
  sendNotifications: string,
  sendWarnings: string,
  language: string,
  role: string,
}