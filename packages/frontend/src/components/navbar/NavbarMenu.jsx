import React from "react";
import {Box, Flex, Text, Avatar, AvatarGroup, Spacer, Link, Image} from "@chakra-ui/react";

const NavbarMenu = ({userName, userAvatar}) => {
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
            <Avatar.Fallback name={`${userName}-image`} />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
          <Text fontSize="md" fontWeight="medium">
            {userName}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavbarMenu;
