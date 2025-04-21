import {Alert, Stack, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import apiService from "../../../service/apiService";
// constants
import {DEFAULT_API_PAGE_SIZE} from "../../../constants/Constants";
//files
import UsersTable from "./components/UsersTable";
import Greeting from "../components/Greeting";
import TotalRecords from "../components/TotalRecords";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
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
        setUsers(cachedData.users);
        setTotalUsers(cachedData.totalUsers);
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
          totalUsers: response.total || 0,
          totalPages: response.pages || 1,
        };

        // Update state with the fetched data
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
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
        setTotalUsers(0);
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
        <TotalRecords name="users" totalRecords={users.length} />
        <Heading size="2xl">All users</Heading>
        <UsersTable
          users={users}
          currentPage={currentPage}
          totalPages={totalPages}
          totalUsers={totalUsers}
          pageSize={pageSize}
          isLoading={isLoading}
          handlePageChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

export default Users;
