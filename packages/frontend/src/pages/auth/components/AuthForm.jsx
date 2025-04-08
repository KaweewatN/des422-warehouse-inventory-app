import {Button, Card, Field, Input, Stack} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {PasswordInput} from "../../../components/chakra-ui/Password-input";

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <Card.Root
        minW="md"
        borderRadius="lg"
        background="rgba(0,0,0,0.3)"
        backdropFilter="blur(7px)"
        border="none"
      >
        <Card.Header>
          <Card.Title fontSize={26}>Sign in</Card.Title>
          <Card.Description fontSize={15} color="gray.100">
            Fill in your email and password below
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="6" align="flex-start" maxW="sm">
            <Field.Root invalid={!!errors.username} required>
              <Field.Label fontSize={16}>
                Email
                <Field.RequiredIndicator />
              </Field.Label>
              <Input {...register("username")} background="white" color="gray.800" />
              <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.password} required>
              <Field.Label fontSize={16}>
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <PasswordInput {...register("password")} background="white" color="gray.800" />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end" marginTop="4">
          <Button type="submit" _hover={{bg: "teal.500", color: "white"}}>
            Submit
          </Button>
        </Card.Footer>
      </Card.Root>
    </form>
  );
};

export default Auth;
