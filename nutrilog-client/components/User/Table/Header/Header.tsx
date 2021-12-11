import { HeaderProps } from "./HeaderProps";
import { TableHeader } from './Styles';
import { FiSearch, FiBell } from 'react-icons/fi';
import Input from "../../../Shared/Input/Input";

const Header = (props: HeaderProps) => {
  return (
    <TableHeader>
      <Input icon={<FiSearch/>}/>
      <FiBell/>
    </TableHeader>
  );
}

export default Header;