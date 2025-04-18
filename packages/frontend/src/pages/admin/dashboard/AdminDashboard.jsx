import ListItemTable from "./components/ListItemTable";
import {Box, Heading, Mark, Text} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {SELECTED_COLOUR} from "../../../constants/Constants";

export default function AdminDashboard() {
  const {uname = "admin"} = useSelector((state) => state.auth);
  return (
    <Box>
      <Heading fontSize={26}>
        Welcome, <Mark color={SELECTED_COLOUR}>{uname}</Mark> to Admin Dashboard
      </Heading>
      <Text color="gray.600">Here’s what happening in the warehouse !</Text>
      <ListItemTable />
    </Box>
  );
}
