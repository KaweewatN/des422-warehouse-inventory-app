import {Box, Text, Heading, Em} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {SELECTED_COLOUR} from "../../../constants/Constants";

export default function Greeting() {
  const uname = useSelector((state) => state.auth.uname);
  return (
    <Box>
      <Heading fontSize={28}>
        Welcome, <Em color={SELECTED_COLOUR}>{uname}</Em> to the Admin Dashboard!
      </Heading>
      <Text fontSize={17} color="gray.700">
        Here you can manage the warehouse!
      </Text>
    </Box>
  );
}
