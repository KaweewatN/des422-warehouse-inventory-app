import {Text, Flex, Heading} from "@chakra-ui/react";

export default function TotalRecords({name, totalRecords}) {
  return (
    <Flex
      width="fit"
      flexDirection="column"
      paddingY="1rem"
      paddingX="1.5rem"
      backgroundColor="green.100"
      borderRadius="xl"
      gap="0.2rem"
      marginBottom="1rem"
    >
      <Text fontSize={16} fontWeight="medium" color="green.900">
        Total {name}
      </Text>
      <Heading fontSize="2xl" color="green.900">
        {totalRecords}
      </Heading>
    </Flex>
  );
}
