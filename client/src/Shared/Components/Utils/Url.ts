import queryString from 'query-string';
import { omit } from 'lodash';

export const queryStringToObject = (query: string, options: Object = {}) => queryString.parse(query, {
  arrayFormat: 'bracket',
  ...options,
});

export const objectToQueryString = (obj: Object, options: Object = {}) => queryString.stringify(obj, {
  arrayFormat: 'bracket',
  ...options,
});

export const omitFromQueryString = (query: string, keys: any) => objectToQueryString(omit(
  queryStringToObject(query),
  keys
));

export const addToQueryString = (query: string, fields: any) => objectToQueryString({
  ...queryStringToObject(query),
  ...fields,
});