import { TableProps } from "./TableProps";
import { TableBody } from './Styles';
import Header from "./Header/Header";

export const Table = <T extends unknown>({ columns }: TableProps<T>) => {
  return (
    <TableBody>
      <Header/>
    </TableBody>
  );
}

export default Table;