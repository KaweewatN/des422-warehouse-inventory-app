import {ButtonGroup, IconButton, Spinner, Table, Text, Flex} from "@chakra-ui/react";
import {Pagination} from "@ark-ui/react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {SELECTED_COLOUR} from "../../../../constants/Constants";

export default function WithdrawHistoryTable({
  withdraws,
  currentPage,
  totalPages,
  totalWithdraws,
  isLoading,
  handlePageChange,
  pageSize,
}) {
  return (
    <Flex direction="column" width="100%" gapY="1rem" paddingX="1rem">
      <Table.Root size="sm" variant="outline" interactive>
        <Table.Header bg="#EAECF0">
          <Table.Row>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Withdraw ID
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Withdraw ID
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Withdraw Name
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              User ID
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Withdraw by
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Quantity
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Created at
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body bg="gray.200">
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={7} textAlign="center">
                <Spinner size="xl" />
              </Table.Cell>
            </Table.Row>
          ) : withdraws.length > 0 ? (
            withdraws.map((withdraw) => (
              <Table.Row
                key={withdraw.withdraw_id}
                bg={"white"}
                borderColor="gray.300"
                _hover={{bg: "gray.100", cursor: "pointer"}}
              >
                <Table.Cell paddingY="1rem">{withdraw.withdraw_id}</Table.Cell>
                <Table.Cell paddingY="1rem">{withdraw.item_id}</Table.Cell>
                <Table.Cell whiteSpace="normal" maxWidth="200px" paddingY="1rem">
                  {withdraw.item_name}
                </Table.Cell>
                <Table.Cell paddingY="1rem">{withdraw.user_id}</Table.Cell>
                <Table.Cell paddingY="1rem">{withdraw.withdrawn_by}</Table.Cell>
                <Table.Cell paddingY="1rem">{withdraw.quantity}</Table.Cell>
                <Table.Cell paddingY="1rem">{withdraw.created_at}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={8} textAlign="center">
                <Text>No products found.</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      {totalWithdraws > 0 && totalPages > 1 && (
        <Pagination.Root
          count={totalWithdraws}
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
    </Flex>
  );
}
