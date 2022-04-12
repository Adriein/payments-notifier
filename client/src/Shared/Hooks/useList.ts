import { useListState } from '@mantine/hooks';
import { isEqual } from "lodash";
import { UseListStateHandler } from "@mantine/hooks/lib/use-list-state/use-list-state";

type ExtendedUseListStateHandler<T> = [ T[], UseListStateHandler<T> & {
  get: (findFn: (item: T) => boolean) => T | undefined,
  has: (item: T) => boolean
} ]

const useList = <T>(list: T[]): ExtendedUseListStateHandler<T> => {
  const [ value, handlers ]: [ T[], UseListStateHandler<T> & { get?: Function, has?: Function } ] = useListState<T>(list);

  handlers.get = (findFn: (item: T) => boolean) => value.find(findFn);

  handlers.has = (item: T) => !!value.find((current: T) => isEqual(item, current));

  return [
    value,
    handlers
  ] as ExtendedUseListStateHandler<T>;
}

export default useList;