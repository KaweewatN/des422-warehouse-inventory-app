import {Flex, Heading, Text, Box} from "@chakra-ui/react";

export default function DashboardStats({stats}) {
  return (
    <Flex flexDirection="column" gap={4} paddingTop={3} bg="white" borderRadius="md">
      <Text fontSize={24} fontWeight="bold" mt={2}>
        Summary
      </Text>
      <Flex flexDirection={{base: "column", md: "row"}} gap={4}>
        {Object.entries(stats).map(([key, value]) => (
          <Box key={key} bg="green.100" width="11rem" padding="1rem" borderRadius="md">
            <Text color="green.900" fontSize={16} fontWeight="medium">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </Text>
            <Heading color="green.900" fontSize={22}>
              {value}
            </Heading>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
