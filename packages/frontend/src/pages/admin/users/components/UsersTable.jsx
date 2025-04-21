import {ButtonGroup, IconButton, Spinner, Table, Text, Flex} from "@chakra-ui/react";
import {Pagination} from "@ark-ui/react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {SELECTED_COLOUR} from "../../../../constants/Constants";

export default function UsersTable({
  users,
  currentPage,
  totalPages,
  totalUsers,
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
              ID
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Username
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              First Name
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Last Name
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Phone
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body bg="gray.200">
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={5} textAlign="center">
                <Spinner size="xl" />
              </Table.Cell>
            </Table.Row>
          ) : users.length > 0 ? (
            users.map((user) => (
              <Table.Row
                key={user.user_id}
                bg={"white"}
                borderColor="gray.300"
                _hover={{bg: "gray.100", cursor: "pointer"}}
              >
                <Table.Cell>{user.user_id}</Table.Cell>
                <Table.Cell>{user.uname}</Table.Cell>
                <Table.Cell>{user.fname}</Table.Cell>
                <Table.Cell>{user.lname}</Table.Cell>
                <Table.Cell>{user.phone}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={5} textAlign="center">
                <Text>No users found.</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      {totalUsers > 0 && totalPages > 1 && (
        <Pagination.Root
          count={totalUsers}
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
