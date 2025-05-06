import {Box, Heading, Mark, Text} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {SELECTED_COLOUR} from "../../../constants/Constants";

export default function Greeting({children}) {
  const {uname = "admin"} = useSelector((state) => state.auth);
  return (
    <Box>
      <Heading fontSize={26}>
        Welcome, <Mark color={SELECTED_COLOUR}>{uname}</Mark> to KongKlang
      </Heading>
      <Text color="gray.600" marginBottom="2rem">
        The smart way to manage your warehouse!
      </Text>
      {children}
    </Box>
  );
}
