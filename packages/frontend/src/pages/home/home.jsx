import {Box, Heading, Text} from "@chakra-ui/react";

export default function Home() {
  return (
    <Box
      p={{base: "4", md: "8", lg: "12"}}
      textAlign="center"
      bg={{base: "gray.100", md: "gray.200", lg: "gray.300"}}
    >
      <Heading fontSize={{base: "2xl", md: "4xl", lg: "6xl"}} color="teal.500">
        Welcome to the Home Page
      </Heading>
      <Text fontSize={{base: "sm", md: "md", lg: "lg"}} mt="4">
        This is the home page of our application.
      </Text>
    </Box>
  );
}
