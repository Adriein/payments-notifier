import { TableBodyProps } from "./TableBodyProps";
import { ListItemHasId } from "../../../../Shared/types";

const TableBody = <T extends ListItemHasId>({ collection, renderRow }: TableBodyProps<T>) => {
  return (
    <div>
      {collection.map((item: T) => renderRow(item))}
    </div>
  );
}

export default TableBody;