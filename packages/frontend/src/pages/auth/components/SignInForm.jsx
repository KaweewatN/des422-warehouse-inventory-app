import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
// ui
import {Button, Card, Field, Input, Stack, Checkbox, Text, Link, Box} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {PasswordInput} from "../../../components/chakra-ui/Password-input";
import toast, {Toaster} from "react-hot-toast";

// constants
import {DEFAULT_COLOR, SELECTED_COLOUR} from "../../../constants/Constants";
// api
import apiService from "../../../service/apiService";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    if (apiService.isLogin()) {
      const role = apiService.getUserRole();
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const onSubmit = handleSubmit(async (credentials) => {
    try {
      const response = await apiService.login(credentials);
      toast.success("Login Successful!");
      if (response.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
      reset();
    } catch (error) {
      const message =
        error?.response?.data?.message || // from Axios or custom API error
        error?.message || // generic error
        "Username or password is incorrect. Please try again.";
      toast.error(message);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Card.Root
        minW={{sm: "xs", md: "sm", xl: "lg"}}
        border="none"
        background="transparent"
        color={DEFAULT_COLOR}
      >
        <Card.Header>
          <Card.Title fontSize={26}>Sign in</Card.Title>
          <Card.Description fontSize={15}>
            Please fill in your email and password below
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="6" align="flex-start" maxW="xl">
            <Field.Root invalid={!!errors.uname} required>
              <Field.Label fontSize={16}>
                Username
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="text"
                placeholder="johndoe"
                {...register("uname")}
                color="gray.800"
                _focus={{
                  borderColor: SELECTED_COLOUR,
                  boxShadow: "0 0 0 1px teal.500",
                }}
              />
              <Field.ErrorText>{errors.uname?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.password} required>
              <Field.Label fontSize={16}>
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <PasswordInput
                {...register("password")}
                color="gray.800"
                _focus={{
                  borderColor: SELECTED_COLOUR,
                  boxShadow: "0 0 0 1px teal.500",
                }}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              mt="2"
            >
              <Checkbox.Root value="remember me" colorPalette={"teal"}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>Remember me</Checkbox.Label>
              </Checkbox.Root>
              <Link
                href="https://chakra-ui.com"
                color={SELECTED_COLOUR}
                fontSize={14}
                fontWeight="medium"
              >
                Forget password?
              </Link>
            </Box>
          </Stack>
        </Card.Body>
        <Card.Footer marginTop="4" display="flex" flexDirection="column" gap="4">
          <Button
            type="submit"
            width="100%"
            fontSize={16}
            bg={SELECTED_COLOUR}
            color="white"
            _hover={{bg: "teal.600"}}
            _active={{bg: "teal.700"}}
          >
            Submit
          </Button>
          <Text fontSize={14} color="gray.500" mt="4">
            Don't have an account?{" "}
            <Link href="#" color={SELECTED_COLOUR} fontWeight="bold">
              Sign up
            </Link>
          </Text>
          <Toaster />
        </Card.Footer>
      </Card.Root>
    </form>
  );
};

export default SignInForm;
