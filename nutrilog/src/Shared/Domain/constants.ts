export const EVENTS_HANDLER_METADATA = '__eventsHandler';
export const COMMANDS_HANDLER_METADATA = '__commandsHandler';
export const QUERY_HANDLER_METADATA = '__queriesHandler';

export const TABLE_NAME_METADATA = '__tableNameMetadata';
export const TABLE_FIELD_METADATA = '__tableFieldMetadata';
export const TABLE_RELATION_METADATA = '__tableRelationMetadata';

export const PRIMARY_KEY = 'primaryKey';

export const ONE_TO_MANY_RELATION = 'oneToMany';
export const ONE_TO_ONE_RELATION = 'oneToOne';

export enum OPERATORS {
  equal = 'equals',
  gt = 'gt',
  lt = 'lt',
  gte = 'gte',
  lte = 'lte',
  ne = 'notIn',
  and = 'AND',
  or = 'OR',
  like = 'contains',
  order = 'orderBy',
  in = 'in'
}