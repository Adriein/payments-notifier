import { TableProps } from "./TableProps";
import { StyledTable } from './Styles';
import Header from "./Header/Header";
import Body from "./Body/Body";

export const Table = <T extends unknown>({ columns }: TableProps<T>) => {
  return (
    <StyledTable>
      <Header/>
      <Body users={[ { name: 'adri' }, { name: 'adri' }, { name: 'adri' }, { name: 'adri' } ]}/>
    </StyledTable>
  );
}

export default Table;