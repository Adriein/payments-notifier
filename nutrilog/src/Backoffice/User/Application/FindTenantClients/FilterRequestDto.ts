import { UserFilters } from "../../Domain/constants";

export class FilterRequestDto {
  constructor(public field: keyof UserFilters, public value: UserFilters[typeof field], public operation: string) {
  }
}