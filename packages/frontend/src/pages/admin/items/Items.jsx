import {Alert, Box, Text, Heading, Stack, Flex} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import apiService from "../../../service/apiService";
import ListItemTable from "./components/ListItemTable";
import Greeting from "../components/Greeting";
import AddNewItemForm from "./components/AddNewItemForm";

const Items = () => {
  const [items, setItems] = useState([]);
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

  if (error) {
    return (
      <Alert status="error" variant="solid">
        <Alert.Description>{error}</Alert.Description>
      </Alert>
    );
  }

  return (
    <Greeting>
      <Box display="flex" flexDirection="column" gap="2rem">
        <Box bg="green.100" width="fit-content" padding="1rem" borderRadius="md">
          <Text color="green.900" fontSize={14}>
            Total Item types
          </Text>
          <Heading color="green.900">{totalItems}</Heading>
        </Box>
        <Stack width="full" gap="5">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="2xl">All items</Heading>
            <AddNewItemForm />
          </Flex>
          <ListItemTable
            items={items}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            isLoading={isLoading}
            handlePageChange={handlePageChange}
          />
        </Stack>
      </Box>
    </Greeting>
  );
};

export default Items;
