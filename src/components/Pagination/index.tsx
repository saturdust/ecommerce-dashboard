import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useReactTable } from "@tanstack/react-table";
import { Select } from "@chakra-ui/react";

interface PaginationProps {
  table: ReturnType<typeof useReactTable<any>>;
}

const Pagination: React.FC<PaginationProps> = ({ table }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent={{ base: "center", md: "end" }}
      gap={2}
      p={4}
      fontSize="sm"
    >
      <Flex alignItems="center" gap={1} display={{ base: "none", md: "flex" }}>
        <Text>Rows per page: </Text>
        <Select
          size="sm"
          w={75}
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex alignItems="center" gap={1}>
        <strong>
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}
          -
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            table.getFilteredRowModel().rows.length}
          &nbsp;of&nbsp;
          {table.getFilteredRowModel().rows.length * table.getPageCount()}
        </strong>
      </Flex>
      <Button
        size="sm"
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.setPageIndex(0)}
      >
        {"<<"}
      </Button>
      <Button
        size="sm"
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        {"<"}
      </Button>
      <Button
        size="sm"
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        {">"}
      </Button>
      <Button
        size="sm"
        disabled={!table.getCanNextPage()}
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      >
        {">>"}
      </Button>
      <Flex alignItems="center" gap={1}>
        <Text>Go to</Text>
        <Input
          size="sm"
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          w={50}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Pagination;
