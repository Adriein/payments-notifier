import { Pagination } from "../../../Shared/types";
import React from "react";

export interface TableProps<T> {
  pagination: Pagination;
  collection: T[];
  renderRow: (item: T) => React.ReactNode;
  addFilter: any;
  itemPerPage: number;
}