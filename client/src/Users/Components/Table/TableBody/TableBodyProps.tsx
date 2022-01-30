import React from "react";

export interface TableBodyProps<T> {
  collection: T[];
  rows: string[];
  renderRow: (item: T, index: number) => React.ReactNode;
}