import React, {useEffect, useState} from "react";
import {
  Box,
  Grid,
  Spinner,
  Alert,
  Image,
  Text,
  Button,
  Input,
  Flex,
  Heading,
} from "@chakra-ui/react";
import apiService from "../../../service/apiService";
import Greeting from "../components/Greeting";
import WithdrawItem from "./components/WithdrawItem";

export default function Home() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(16);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiService.get(`/items?page=${currentPage}&limit=${pageSize}`);
        setItems(response.items);
        setTotalPages(response.pages || 1);
      } catch (err) {
        setError("Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await apiService.get("/items/items_type?limit=30");
        setCategories(response.types);
      } catch (err) {
        console.error("Failed to fetch categories.");
      }
    };

    fetchItems();
    fetchCategories();
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (searchType === "category" && Array.isArray(categories) && categories.length > 0) {
      setSearchQuery(categories[0].item_type_id);
    } else {
      setSearchQuery("");
    }
  }, [searchType, categories]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);

    try {
      let response;
      if (searchType === "name") {
        if (!searchQuery.trim()) {
          response = await apiService.get(`/items?page=1&limit=${pageSize}`);
        } else {
          response = await apiService.get(
            `/items/search?name=${searchQuery}&page=1&limit=${pageSize}`,
          );
        }
      } else if (searchType === "category") {
        if (!searchQuery.trim()) {
          throw new Error("Please select a category.");
        }
        response = await apiService.get(
          `/items/search/category?category=${searchQuery}&page=1&limit=${pageSize}`,
        );
      }
      setItems(response.items);
      setTotalPages(response.pages || 1);
    } catch (err) {
      setError(err.message || "Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" color="teal.600" />
        <Text mt="4">Loading items...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="20">
        <Alert status="error" borderRadius="md">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Greeting />
      <Box maxW="1200px" mx="auto" mt="10" px="4">
        <Heading fontSize="2xl" mb="10" textAlign="center">
          Available Items
        </Heading>

        {/* Search Section */}
        <Flex mb="6" gap="4" align="center">
          <select
            width="fit-content"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: ".5rem",
              fontSize: ".9rem",
              fontWeight: "500",
            }}
          >
            <option value="name">Search by Name</option>
            <option value="category">Search by Category</option>
          </select>
          {searchType === "name" ? (
            <Input
              placeholder="Enter item name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              width="50%"
            />
          ) : (
            <select
              placeholder="Select category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: ".5rem",
                fontSize: ".9rem",
                fontWeight: "500",
              }}
            >
              {categories.map((category) => (
                <option key={category.type_name} value={category.item_type_id}>
                  {category.type_name}
                </option>
              ))}
            </select>
          )}
          <Button variant="solid" colorPalette="teal" onClick={handleSearch}>
            Search
          </Button>
        </Flex>

        {/* Items Grid */}
        <Grid
          templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)"}}
          gap="8"
        >
          {items.map((item) => (
            <Box
              key={item.item_id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              borderColor="teal.500"
            >
              <Flex justifyContent="center" alignItems="center" height="10rem" p="2">
                <Image
                  src={item.item_image}
                  alt={item.item_name}
                  objectFit="cover"
                  height="9rem"
                  width="full"
                  borderRadius="lg"
                />
              </Flex>
              <Box p="4" height="fit-content">
                <Flex flexDirection="column" gap="1" fontWeight="semibold">
                  <Text fontSize="lg" fontWeight="bold">
                    {item.item_name}
                  </Text>
                  <Text fontSize="sm" fontWeight="medium" color="teal.600">
                    SKU: {item.sku}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {item.description.substring(0, 28)}...
                  </Text>
                  <Text
                    fontSize="md"
                    color={item.quantity > 0 ? "green.600" : "red.600"}
                    fontWeight="semibold"
                    mt="2"
                  >
                    {item.quantity > 0 ? `${item.quantity} in stock` : "Out of stock"}
                  </Text>
                </Flex>
                <WithdrawItem item={item} />
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Pagination */}
        <Flex justifyContent="center" mt="16">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            variant="outline"
            color="gray.700"
            _hover={{bg: "gray.200"}}
            isDisabled={currentPage === 1}
            mr="4"
          >
            Previous
          </Button>
          <Text alignSelf="center">
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            variant="outline"
            color="gray.700"
            _hover={{bg: "gray.200"}}
            isDisabled={currentPage === totalPages}
            ml="4"
          >
            Next
          </Button>
        </Flex>
      </Box>
    </>
  );
}
