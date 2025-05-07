import {useForm} from "react-hook-form";
import {Button, Card, Field, Input, Stack} from "@chakra-ui/react";
import {PasswordInput} from "../../../components/chakra-ui/Password-input";
import {ToastContainer, toast} from "react-toastify";
// api
import apiService from "../../../service/apiService";
// constants
import {
  DEFAULT_COLOR,
  SELECTED_COLOUR,
  DEFAULT_SCROLLBAR_STYLES,
} from "../../../constants/Constants";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = handleSubmit(async (registerData) => {
    // Remove confirmPassword from registerData
    delete registerData.confirmPassword;
    try {
      await apiService.signup(registerData);
      toast.success("Login Successful!");
      reset();
    } catch (error) {
      const message =
        error?.response?.data?.message || // from Axios or custom API error
        error?.message || // generic error
        "Cannot create an account. Please try again.";
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
        maxHeight="65vh"
        overflowY="auto"
        css={DEFAULT_SCROLLBAR_STYLES}
      >
        <Card.Header>
          <Card.Title fontSize={26}>Sign up</Card.Title>
          <Card.Description fontSize={15}>Please fill in your information below</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="6" align="flex-start" width="100%">
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

            <Field.Root invalid={!!errors.fname} required>
              <Field.Label fontSize={16}>
                Firstname
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="text"
                placeholder="John"
                {...register("fname")}
                color="gray.800"
                _focus={{
                  borderColor: SELECTED_COLOUR,
                  boxShadow: "0 0 0 1px teal.500",
                }}
              />
              <Field.ErrorText>{errors.fname?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.lname} required>
              <Field.Label fontSize={16}>
                Lastname
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="text"
                placeholder="johndoe"
                {...register("lname")}
                color="gray.800"
                _focus={{
                  borderColor: SELECTED_COLOUR,
                  boxShadow: "0 0 0 1px teal.500",
                }}
              />
              <Field.ErrorText>{errors.lname?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.password} required>
              <Field.Label fontSize={16}>
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <PasswordInput
                {...register("password", {required: "Password is required"})}
                color="gray.800"
                _focus={{
                  borderColor: SELECTED_COLOUR,
                  boxShadow: "0 0 0 1px teal.500",
                }}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.confirmPassword || password !== confirmPassword} required>
              <Field.Label fontSize={16}>
                Confirm Password
                <Field.RequiredIndicator />
              </Field.Label>
              <PasswordInput
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === password || "Passwords do not match",
                })}
                color="gray.800"
                _focus={{
                  borderColor: SELECTED_COLOUR,
                  boxShadow: "0 0 0 1px teal.500",
                }}
              />
              <Field.ErrorText>
                {errors.confirmPassword?.message ||
                  (password !== confirmPassword && "Passwords do not match")}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.phone} required>
              <Field.Label fontSize={16}>
                Phone
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="text"
                placeholder="0xxxxxxxxx"
                {...register("phone")}
                color="gray.800"
                _focus={{
                  borderColor: SELECTED_COLOUR,
                  boxShadow: "0 0 0 1px teal.500",
                }}
              />
              <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>
        </Card.Body>

        <Card.Footer marginTop="4" display="flex" flexDirection="column" gap="4">
          <Button
            type="submit"
            width="100%"
            bg={SELECTED_COLOUR}
            fontSize={16}
            color="white"
            _hover={{bg: "teal.600"}}
            _active={{bg: "teal.700"}}
          >
            Submit
          </Button>
        </Card.Footer>
      </Card.Root>
      <ToastContainer />'
    </form>
  );
};

export default SignUpForm;
