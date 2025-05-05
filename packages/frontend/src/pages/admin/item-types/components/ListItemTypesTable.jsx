import {ButtonGroup, Heading, IconButton, Spinner, Stack, Table, Text} from "@chakra-ui/react";
import {Pagination} from "@ark-ui/react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {SELECTED_COLOUR} from "../../../../constants/Constants";

const ListItemTypesTable = ({
  types,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  isLoading,
  handlePageChange,
}) => {
  return (
    <Stack width="full" gap="5">
      <Heading size="2xl">All Item Types</Heading>

      <Table.Root size="sm" variant="outline" interactive>
        <Table.Header bg="#EAECF0">
          <Table.Row>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Item Type ID
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Type Name
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Number of items
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body bg="gray.200">
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={3} textAlign="center">
                <Spinner size="xl" />
              </Table.Cell>
            </Table.Row>
          ) : types.length > 0 ? (
            types.map((type) => (
              <Table.Row
                key={type.item_type_id}
                bg={"white"}
                borderColor="gray.300"
                _hover={{bg: "gray.100", cursor: "pointer"}}
              >
                <Table.Cell>{type.item_type_id}</Table.Cell>
                <Table.Cell>{type.type_name}</Table.Cell>
                <Table.Cell>{type.item_count}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={2} textAlign="center">
                <Text>No item types found.</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      {totalItems > 0 && totalPages > 1 && (
        <Pagination.Root
          count={totalItems}
          pageSize={pageSize}
          page={currentPage}
          onPageChange={handlePageChange}
        >
          <ButtonGroup variant="ghost" size="sm" wrap="wrap" justifyContent="center">
            <Pagination.PrevTrigger asChild>
              <IconButton aria-label="Previous page" isDisabled={isLoading || currentPage === 1}>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Context>
              {(pagination) =>
                pagination.pages.map((page, index) =>
                  page.type === "page" ? (
                    <Pagination.Item key={index} {...page} asChild>
                      <IconButton
                        aria-label={`Page ${page.value}`}
                        variant={page.value === currentPage ? "outline" : "ghost"}
                        borderColor={page.value === currentPage ? SELECTED_COLOUR : "transparent"}
                        isDisabled={isLoading}
                        color={page.value === currentPage ? SELECTED_COLOUR : "gray.500"}
                      >
                        {page.value}
                      </IconButton>
                    </Pagination.Item>
                  ) : (
                    <Pagination.Ellipsis key={index} index={index}>
                      &#8230;
                    </Pagination.Ellipsis>
                  ),
                )
              }
            </Pagination.Context>

            <Pagination.NextTrigger asChild>
              <IconButton
                aria-label="Next page"
                isDisabled={isLoading || currentPage === totalPages}
              >
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      )}
    </Stack>
  );
};

export default ListItemTypesTable;
