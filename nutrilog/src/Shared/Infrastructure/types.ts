export type PrismaPagination = {
  take: number;
  skip: number;
}

export type PrismaOrderBy = {
  orderBy: {
    [field: string]: string
  }
}