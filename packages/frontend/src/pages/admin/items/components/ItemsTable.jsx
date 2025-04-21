import {ButtonGroup, IconButton, Spinner, Table, Text, Image, Flex, Badge} from "@chakra-ui/react";
import {Pagination} from "@ark-ui/react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {SELECTED_COLOUR} from "../../../../constants/Constants";

export default function ItemsTable({
  items,
  currentPage,
  totalPages,
  totalItems,
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
              Item name
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Description
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Item type
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Quantity
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Sku
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Created by
            </Table.ColumnHeader>
            <Table.ColumnHeader color="black" fontWeight="bold">
              Item image
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body bg="gray.200">
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={9} textAlign="center">
                <Spinner size="xl" />
              </Table.Cell>
            </Table.Row>
          ) : items.length > 0 ? (
            items.map((item) => (
              <Table.Row
                key={item.item_id}
                bg={"white"}
                borderColor="gray.300"
                _hover={{bg: "gray.100", cursor: "pointer"}}
              >
                <Table.Cell>{item.item_id}</Table.Cell>
                <Table.Cell>{item.item_name}</Table.Cell>
                <Table.Cell whiteSpace="normal" maxWidth="200px">
                  {item.description}
                </Table.Cell>
                <Table.Cell>{item.item_type}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>
                  {item.quantity > 0 ? (
                    <Badge variant="solid" colorPalette="green">
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="solid" colorPalette="red">
                      Unavailable
                    </Badge>
                  )}
                </Table.Cell>
                <Table.Cell>{item.sku}</Table.Cell>
                <Table.Cell>{item.created_by}</Table.Cell>
                <Table.Cell>
                  {item.item_image ? (
                    <Image
                      src={item.item_image}
                      alt={item.item_name}
                      boxSize="50px"
                      objectFit="cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={9} textAlign="center">
                <Text>No products found.</Text>
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
    </Flex>
  );
}
