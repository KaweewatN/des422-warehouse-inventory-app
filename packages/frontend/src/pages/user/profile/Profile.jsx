import React, {useEffect, useState} from "react";
import {Box, Text, Heading, Spinner, Alert, Mark, Avatar, Flex, Badge} from "@chakra-ui/react";
import apiService from "../../../service/apiService";
import {useSelector} from "react-redux";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {role = "user"} = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiService.get("/user/info");
        setUser(response.user);
      } catch (err) {
        setError("Failed to fetch user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" color="teal.600" />
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
    <Box
      maxW="4/6"
      mx="auto"
      mt="10"
      py="6"
      px="10"
      borderWidth="2px"
      borderColor="teal.300"
      borderRadius="md"
      boxShadow="xs"
    >
      <Heading as="h1" size="2xl" mb="6" textAlign="center">
        User Profile
      </Heading>
      <Flex flexDirection="column" alignItems="center" mt={2} gapY={3}>
        <Avatar.Root height="9rem" width="9rem">
          <Avatar.Fallback
            name={`${user.uname}-image`}
            style={{
              fontSize: "3rem",
              fontWeight: "normal",
              color: "white",
            }}
          />
          <Avatar.Image src={null} />
        </Avatar.Root>
        <Badge
          variant="solid"
          colorPalette={role === "admin" ? "teal" : "blue"}
          mt={4}
          width="fit-content"
          fontSize="sm"
          p={2}
        >
          {role === "admin" ? "Admin" : "User"}
        </Badge>
      </Flex>

      {user && (
        <Box color="teal.600" fontWeight="medium" mt={7}>
          <Text fontSize="lg" mb="2">
            <Mark color="black">User ID:</Mark> {user.user_id}
          </Text>
          <Text fontSize="lg" mb="2">
            <Mark color="black">Username:</Mark> {user.uname}
          </Text>
          <Text fontSize="lg" mb="2">
            <Mark color="black">First Name:</Mark> {user.fname}
          </Text>
          <Text fontSize="lg" mb="2">
            <Mark color="black">Last Name:</Mark> {user.lname}
          </Text>
        </Box>
      )}
    </Box>
  );
}
