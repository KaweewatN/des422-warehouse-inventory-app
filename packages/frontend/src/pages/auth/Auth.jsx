import {Grid, GridItem, Box} from "@chakra-ui/react";
import AuthForm from "./components/AuthForm";

export default function Auth() {
  return (
    <Grid templateColumns="repeat(2, 1fr)" h="100vh">
      <GridItem colSpan={1}>
        <Box bg="gray.100" p="4">
          Sidebar
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box
          backgroundImage="url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <AuthForm />
        </Box>
      </GridItem>
    </Grid>
  );
}
