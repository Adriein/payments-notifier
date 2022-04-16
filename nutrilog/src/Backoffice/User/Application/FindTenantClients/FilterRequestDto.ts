import { UserFilters } from "../../Domain/constants";

export class FilterRequestDto {
  constructor(public entity: string, public field: string, public operation: string, public value: string) {
  }
}