import {useEffect, useState} from "react";
import ListItemTable from "./components/ListItemTable";
import {Box, Heading, Spinner, Mark, Text} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {SELECTED_COLOUR} from "../../../constants/Constants";
// files
import DashboardStats from "./components/DashboardStats";

// api
import apiService from "../../../service/apiService";

export default function AdminDashboard() {
  const {uname = "admin"} = useSelector((state) => state.auth);
  const [summary, setSummary] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get("/admin/summary");
        if (response) {
          setSummary(response.data);
        }
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setSummary({});
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummary();
  }, []);

  console.log("summary", summary);

  return (
    <Box>
      <Heading fontSize={26}>
        Welcome, <Mark color={SELECTED_COLOUR}>{uname}</Mark> to Admin Dashboard
      </Heading>
      <Text color="gray.600">Here’s what happening in the warehouse !</Text>
      {isLoading && <Spinner color="teal.500" size="lg" />}
      {!isLoading && (
        <>
          <DashboardStats stats={summary} />
          <ListItemTable />
        </>
      )}
    </Box>
  );
}
