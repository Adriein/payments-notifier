import React from "react";

export interface TableBodyProps<T> {
  collection: T[];
  renderRow: (item: T) => React.ReactNode;
}