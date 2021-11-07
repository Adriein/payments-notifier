export interface IUserModel {
  id: string;
  username: string;
  email: string;
  password: string
  owner_id: string
  subscriptions?: any[];
  role?: any;
  role_id: string
  config?: any;
  app_config?: any;
  created_at: Date;
  updated_at: Date;
}