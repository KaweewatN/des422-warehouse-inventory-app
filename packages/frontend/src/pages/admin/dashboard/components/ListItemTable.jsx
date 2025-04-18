import {
  ButtonGroup,
  Heading,
  IconButton,
  Spinner,
  Stack,
  Table,
  Text,
  Alert,
  Image,
} from "@chakra-ui/react";
import {Pagination} from "@ark-ui/react";
import {useEffect, useState} from "react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import apiService from "../../../../service/apiService";
import {SELECTED_COLOUR} from "../../../../constants/Constants";

const ListItemTable = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  const navigate = useNavigate();

  // UseEffect to fetch data when the component mounts or when currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      // Check if data for the current page is already cached
      if (cache[currentPage]) {
        const cachedData = cache[currentPage];
        setItems(cachedData.items);
        setTotalItems(cachedData.totalItems);
        setTotalPages(cachedData.totalPages);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await apiService.get(`/items?page=${currentPage}&limit=${pageSize}`);

        const data = {
          items: response.items || [],
          totalItems: response.total || 0,
          totalPages: response.pages || 1,
        };

        // Update state with the fetched data
        setItems(data.items);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);

        // Cache the response
        setCache((prevCache) => ({
          ...prevCache,
          [currentPage]: data,
        }));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data. Please try again.");
        setItems([]);
        setTotalItems(0);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize, cache]);

  // Function to handle page change
  const handlePageChange = (details) => {
    setCurrentPage(details.page);
  };

  // Function to handle row click
  const handleRowClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  if (error) {
    return (
      <Alert status="error" variant="solid">
        <Alert.Description>{error}</Alert.Description>
      </Alert>
    );
  }

  return (
    <Stack width="full" gap="5" marginTop="2rem">
      <Heading size="2xl">All items</Heading>

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
              <Table.Cell colSpan={8} textAlign="center">
                <Spinner size="xl" />
              </Table.Cell>
            </Table.Row>
          ) : items.length > 0 ? (
            items.map((item) => (
              <Table.Row
                key={item.item_id}
                onClick={() => handleRowClick(item.item_id)}
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
              <Table.Cell colSpan={8} textAlign="center">
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
    </Stack>
  );
};

export default ListItemTable;
