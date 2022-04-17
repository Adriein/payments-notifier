import { JSObject } from "../../Domain/types";

export class PrismaQueryBuilder<WhereType extends JSObject> {
  private prismaWhereInput!: WhereType;

  public build(attributes: WhereType): WhereType {
    for (const key in attributes) {
      if (this.isAJoin(key)) {

      }

      this.prismaWhereInput = { ...this.prismaWhereInput, [key]: attributes[key] }
    }

    return this.prismaWhereInput;
  }

  private isAJoin(key: string): boolean {
    return key.includes('.');
  }

  private createJoin(attributes: WhereType): void {

  }
}