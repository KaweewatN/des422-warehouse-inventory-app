import {Grid, GridItem, Box} from "@chakra-ui/react";
import AuthForm from "./components/AuthForm";

export default function Auth() {
  return (
    <Grid templateColumns="repeat(3, 1fr)" h="100vh">
      <GridItem colSpan={2}>
        <Box
          backgroundImage="url('assets/images/annimated-login-image.png')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          h="100%"
        ></Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box p={{base: "4", md: "8"}}>
          <AuthForm />
        </Box>
      </GridItem>
    </Grid>
  );
}
