import {Alert, Stack, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import apiService from "../../../service/apiService";
// constants
import {DEFAULT_API_PAGE_SIZE} from "../../../constants/Constants";
//files
import WithdrawHistoryTable from "./components/WithdrawHistoryTable";
import Greeting from "../components/Greeting";
import TotalRecords from "../components/TotalRecords";

export default function WithdrawHistory() {
  const [withdraws, setWithdraws] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalWithdraws, setTotalWithdraws] = useState(0);
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
        setWithdraws(cachedData.withdraws);
        setTotalWithdraws(cachedData.totalWithdraws);
        setTotalPages(cachedData.totalPages);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await apiService.get(
          `/admin/history?page=${currentPage}&limit=${pageSize}`,
        );

        const data = {
          withdraws: response.withdrawals || [],
          totalWithdraws: response.total || 0,
          totalPages: response.pages || 1,
        };

        // Update state with the fetched data
        setWithdraws(data.withdraws);
        setTotalWithdraws(data.totalWithdraws);
        setTotalPages(data.totalPages);

        // Cache the response
        setCache((prevCache) => ({
          ...prevCache,
          [currentPage]: data,
        }));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data. Please try again.");
        setWithdraws([]);
        setTotalWithdraws(0);
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
      <Stack width="full" gap="5" marginTop="2rem" paddingBottom="2rem">
        <TotalRecords name="withdraws" totalRecords={withdraws.length} />
        <Heading size="2xl">All withdraws</Heading>
        <WithdrawHistoryTable
          withdraws={withdraws}
          currentPage={currentPage}
          totalPages={totalPages}
          totalWithdraws={totalWithdraws}
          pageSize={pageSize}
          isLoading={isLoading}
          handlePageChange={handlePageChange}
        />
      </Stack>
    </>
  );
}
