export interface FindFiltersResponseDto {
  entity: string;
  operations: string[];
  fields: Record<string, string[]>;
}