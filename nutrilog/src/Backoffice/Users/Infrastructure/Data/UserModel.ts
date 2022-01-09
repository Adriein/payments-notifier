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
    joinType: 'array',
    field: 'subscriptions.active',
    type: 'boolean'
  },
  sendWarnings: {
    field: 'config.send_warnings',
    type: 'boolean'
  },
  roleId: {
    field: 'role_id',
    type: 'string'
  },
  active: {
    field: 'active',
    type: 'string'
  }
}