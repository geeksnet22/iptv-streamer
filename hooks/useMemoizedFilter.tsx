/** @format */

import { useMemo } from 'react';

type ListItem = {
  [key: string]: any;
};

const useMemoizedFilter = <T extends ListItem>(
  list: T[],
  searchText: string,
  key: keyof T
): T[] => {
  return useMemo(
    () =>
      list?.filter((item) =>
        item[key]
          .toString()
          .toUpperCase()
          .includes(searchText.trim().toUpperCase())
      ),
    [searchText, list, key]
  );
};

export default useMemoizedFilter;
