export type FindTenantClientsResponse = {
  id: string,
  username: string,
  email: string,
  active: boolean,
  lastPaymentDate: string,
  validTo: string,
  sendWarnings: boolean,
  pricingName: string
};
