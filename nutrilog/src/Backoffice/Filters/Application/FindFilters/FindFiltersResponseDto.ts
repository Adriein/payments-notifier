export interface FindFiltersResponseDto {
  entity: string;
  operations: string[];
  values: Record<string, string[]>;
  fields: Record<string, string[]>;
}