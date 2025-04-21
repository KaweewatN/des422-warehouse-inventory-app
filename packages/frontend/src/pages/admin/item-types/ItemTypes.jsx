import {Alert, Stack, Heading, Flex} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import apiService from "../../../service/apiService";
// constants
import {DEFAULT_API_PAGE_SIZE} from "../../../constants/Constants";
//files
import ItemTypesTable from "./components/ItemTypesTable";
import Greeting from "../components/Greeting";

const ItemTypes = () => {
  const [itemtypes, setItemTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItemTypes, setTotalItemTypes] = useState(0);
  const [pageSize] = useState(DEFAULT_API_PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  // UseEffect to fetch data when the component mounts or when currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      // Check if data for the current page is already cached
      if (cache[currentPage]) {
        const cachedData = cache[currentPage];
        setItemTypes(cachedData.itemtypes);
        setTotalItemTypes(cachedData.totalItemTypes);
        setTotalPages(cachedData.totalPages);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await apiService.get(
          `/items/items_type?page=${currentPage}&limit=${pageSize}`,
        );

        const data = {
          itemtypes: response.types || [],
          totalItemTypes: response.total || 0,
          totalPages: response.pages || 1,
        };

        // Update state with the fetched data
        setItemTypes(data.itemtypes);
        setTotalItemTypes(data.totalItemTypes);
        setTotalPages(data.totalPages);

        // Cache the response
        setCache((prevCache) => ({
          ...prevCache,
          [currentPage]: data,
        }));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data. Please try again.");
        setItemTypes([]);
        setTotalItemTypes(0);
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
    <>
      <Greeting />
      <Stack width="full" gap="5" marginTop="2rem">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="2xl">All Items Types</Heading>
          <Heading>Hello</Heading>
        </Flex>

        <ItemTypesTable
          itemtypes={itemtypes}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItemTypes={totalItemTypes}
          pageSize={pageSize}
          isLoading={isLoading}
          handlePageChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

export default ItemTypes;
