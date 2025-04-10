import {Grid, GridItem, Box, Image} from "@chakra-ui/react";
import AuthTab from "./components/AuthTab";

export default function Auth() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" h="100vh">
      <GridItem colSpan={2}>
        <Box
          backgroundImage="url('assets/images/login-image.avif')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          h="100%"
        ></Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box p={{base: "4", md: "8"}} display={"flex"} flexDirection="column" gapY="5" h="100%">
          <Image
            src="/assets/images/app-logo.png"
            alt="Logo"
            width={{base: "12rem", md: "15rem"}}
            objectFit="contain"
          />
          <AuthTab />
        </Box>
      </GridItem>
    </Grid>
  );
}
