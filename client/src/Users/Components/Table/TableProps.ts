import { Pagination } from "../../../Shared/types";

export interface TableProps<T> {
  pagination: Pagination;
  collection: T[];
  children: any;
  addFilter: any
}