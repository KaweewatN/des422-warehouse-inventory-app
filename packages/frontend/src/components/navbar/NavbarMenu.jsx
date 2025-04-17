import React from "react";
import {Box, Flex, Text, Avatar, Spacer, Link, Image} from "@chakra-ui/react";
import {useSelector} from "react-redux";
//icons
import {LuChevronDown} from "react-icons/lu";
//constants
import {DEFAULT_COLOR} from "../../constants/Constants";
//components

const NavbarMenu = () => {
  const {uname = "-", role = "user"} = useSelector((state) => state.auth);
  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="4rem"
      bg="white"
      boxShadow="0 2px 2px rgba(0, 0, 0, 0.07)"
      zIndex="20"
      paddingX="0.7rem"
      paddingY="0.1rem"
    >
      <Flex align="center">
        {/* App Logo */}
        <Link href="/" display="flex" alignItems="center">
          <Image
            src="/assets/images/app-logo.png"
            alt="Logo"
            width={{base: "7rem", md: "8rem"}}
            objectFit="contain"
          />
        </Link>

        <Spacer />

        {/* User Info */}
        <Flex align="center" gap="0.5rem">
          <Avatar.Root height="2.2rem" width="2.2rem">
            <Avatar.Fallback name={`${uname}-image`} />
            <Avatar.Image
              src={
                role === "admin"
                  ? "./assets/images/default-user-image.avif"
                  : "./assets/images/default-user-image.avif"
              }
            />
          </Avatar.Root>
          <Box display="flex" alignItems="center" gap="0.5rem" cursor={"pointer"}>
            <Box display="flex" flexDirection="column" paddingX="0.5rem" textAlign="center">
              <Text fontSize="md" fontWeight="medium">
                {uname}
              </Text>
              <Text fontSize="sm" fontWeight="medium" color="gray.700">
                ({role})
              </Text>
            </Box>
            <Text color={DEFAULT_COLOR}>
              <LuChevronDown />
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavbarMenu;
