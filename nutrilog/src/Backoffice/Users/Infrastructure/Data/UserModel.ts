export const UserModel = {
  ownerId: {
    field: 'owner_id',
    type: 'string'
  },
  email: {
    field: 'email',
    type: 'string'
  },
  isSubscriptionActive: {
    field: 'subscription.active',
    type: 'boolean'
  },
  sendWarnings: {
    field: 'config.send_warnings',
    type: 'boolean'
  },
  roleId: {
    field: 'role_id',
    type: 'string'
  }
}