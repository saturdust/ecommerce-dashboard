import { useSearchParams } from "next/navigation";
import type { FC } from "react";

import { Flex, Input } from "@chakra-ui/react";
import type { Column, Table as ReactTable } from "@tanstack/react-table";

interface FilterProps {
  column: Column<any, any>;
  table: ReactTable<any>;
}

const Filter: FC<FilterProps> = (props) => {
  const { column, table } = props;
  const searchParams = useSearchParams()!;

  const queryParams: Record<string, string> = {};

  for (const [name, value] of (searchParams as any).entries()) {
    queryParams[name] = value;
  }

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const createQueryParams = (name: string, value: string) => {
    // TODO: fix the static filter issues
    // const params = new URLSearchParams(searchParams as unknown as string);
    // const updatedQueryParams = updateQueryParams(params, {
    //   [name]: value,
    // });
    // router.push(pathname + "?" + updatedQueryParams);
  };

  return typeof firstValue === "number" ? (
    <Flex gap={2}>
      <Input
        variant="flushed"
        size="xs"
        w={50}
        type="number"
        placeholder="Min"
        defaultValue={queryParams[`${column.id}Min`]}
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) => {
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ]);

          createQueryParams(`${column.id}Min`, e.target.value);
        }}
      />
      <Input
        variant="flushed"
        size="xs"
        w={50}
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        placeholder="Max"
        onChange={(e) => {
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ]);

          createQueryParams(`${column.id}Max`, e.target.value);
        }}
      />
    </Flex>
  ) : (
    <Input
      variant="flushed"
      size="xs"
      w="auto"
      mx={1}
      type="text"
      placeholder="Search..."
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => {
        column.setFilterValue(e.target.value);
        createQueryParams(`${column.id}`, e.target.value);
      }}
    />
  );
};

export default Filter;
