export interface TableFooterProps {
  itemPerPage: number;
  totalItems: number;
  currentPage: number;
  setPage: (page: number) => void;
}