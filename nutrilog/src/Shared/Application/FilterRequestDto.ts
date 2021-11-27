export class FilterRequestDto {
  constructor(public field: string, public value: string, public operation: string) {
  }
}