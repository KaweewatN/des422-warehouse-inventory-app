import {
  ButtonGroup,
  Heading,
  IconButton,
  Spinner,
  Stack,
  Table,
  Text,
  Alert,
  Box,
  Badge,
} from "@chakra-ui/react";
import {Pagination} from "@ark-ui/react";
import {useEffect, useState} from "react";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import apiService from "../../../../service/apiService";
import {SELECTED_COLOUR} from "../../../../constants/Constants";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  // UseEffect to fetch data when the component mounts or when currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      // Check if data for the current page is already cached
      if (cache[currentPage]) {
        const cachedData = cache[currentPage];
        setUsers(cachedData.users);
        setTotalItems(cachedData.totalItems);
        setTotalPages(cachedData.totalPages);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await apiService.get(
          `/admin/list_users?page=${currentPage}&limit=${pageSize}`,
        );

        const data = {
          users: response.users || [],
          totalItems: response.total || 0,
          totalPages: response.pages || 1,
        };

        // Update state with the fetched data
        setUsers(data.users);
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
        setUsers([]);
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

  if (error) {
    return (
      <Alert status="error" variant="solid">
        <Alert.Description>{error}</Alert.Description>
      </Alert>
    );
  }

  return (
    <Box marginTop="2rem" display="flex" flexDirection="column" gap="2rem">
      <Box bg="green.100" width="fit-content" padding="1rem" borderRadius="md">
        <Text color="green.900">Total Users</Text>
        <Heading color="green.900">{totalItems}</Heading>
      </Box>
      <Stack width="full" gap="5">
        <Heading size="2xl">All Users in the system</Heading>

        <Table.Root size="sm" variant="outline" interactive>
          <Table.Header bg="#EAECF0">
            <Table.Row>
              <Table.ColumnHeader color="black" fontWeight="bold">
                User ID
              </Table.ColumnHeader>
              <Table.ColumnHeader color="black" fontWeight="bold">
                Username
              </Table.ColumnHeader>
              <Table.ColumnHeader color="black" fontWeight="bold">
                Firstname
              </Table.ColumnHeader>
              <Table.ColumnHeader color="black" fontWeight="bold">
                Lastname
              </Table.ColumnHeader>
              <Table.ColumnHeader color="black" fontWeight="bold">
                Phone
              </Table.ColumnHeader>
              <Table.ColumnHeader color="black" fontWeight="bold">
                Role
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
                  <Table.Cell>
                    <Badge
                      bg={
                        user.role === "admin"
                          ? "teal.600"
                          : user.role === "user"
                            ? "blue.600"
                            : "yellow.600"
                      }
                      fontSize="0.8em"
                      fontWeight="semibold"
                      padding="0.5rem"
                      borderRadius="md"
                    >
                      {user.role}
                    </Badge>
                  </Table.Cell>
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
    </Box>
  );
};

export default UsersTable;
