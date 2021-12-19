import { TableProps } from "./TableProps";
import { StyledTable } from './Styles';
import Header from "./Header/Header";
import Body from "./Body/Body";

export const Table = ({ columns }: TableProps<any>) => {
  return (
    <StyledTable>
      <Header/>
      <Body users={columns}/>
    </StyledTable>
  );
}

export default Table;