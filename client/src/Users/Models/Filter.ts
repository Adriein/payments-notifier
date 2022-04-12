export interface Filter {
  entity: string;
  operations: string[];
  fields: Record<string, string[]>;
}

