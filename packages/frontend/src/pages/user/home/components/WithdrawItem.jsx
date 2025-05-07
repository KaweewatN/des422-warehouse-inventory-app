import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Input,
  Stack,
  Text,
  Flex,
  Image,
  Mark,
  Badge,
} from "@chakra-ui/react";
import {SELECTED_COLOUR} from "../../../../constants/Constants";
import {ToastContainer, toast} from "react-toastify";
// ui
import {useForm} from "react-hook-form";
//api-Service
import apiService from "../../../../service/apiService";
export default function WithdrawItem({item}) {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log("response", data);
    try {
      await apiService.post("/items/withdrawal", {
        item_id: item.item_id,
        quantity: Number(data.quantity),
      });

      toast.success("Item withdrawn successfully!");
      reset();
      window.location.reload();
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "An error occurred. Please try again.";
      toast.error(message);
    }
  });

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button
          type="button"
          variant="solid"
          bg={SELECTED_COLOUR}
          color="white"
          disabled={item.quantity <= 0}
          mt="2"
        >
          {item.quantity > 0 ? "Withdraw" : "Out of Stock"}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content size="sm" bg="white" borderRadius="md" boxShadow="lg">
            <Dialog.Header>
              <Dialog.Title>Withdraw an Item</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {/* Display full item information */}
              <Stack spacing="4" mb="6">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="2xl" fontWeight="bold">
                    {item.item_name}
                  </Text>
                  <Badge py="1" px="2" bg="gray.700">
                    {item.item_type}
                  </Badge>
                </Flex>
                <Flex justifyContent="center" alignItems="center" height="20rem" p="2" mt="3">
                  <Image
                    src={item.item_image}
                    alt={item.item_name}
                    objectFit="cover"
                    height="full"
                    width="full"
                    borderRadius="lg"
                  />
                </Flex>
                <Flex flexDirection="column" gap="3">
                  <Text fontSize="md" fontWeight="medium" mt="3">
                    SKU:&nbsp;
                    <Mark color="teal.600" fontWeight="semibold">
                      {item.sku}
                    </Mark>
                  </Text>
                  <Text fontSize="md" color="gray.600" fontWeight="medium">
                    {item.description}
                  </Text>
                  <Text
                    fontSize="md"
                    color={item.quantity > 0 ? "green.600" : "red.600"}
                    fontWeight="semibold"
                  >
                    {item.quantity > 0 ? `${item.quantity} in stock` : "Out of stock"}
                  </Text>
                </Flex>
              </Stack>

              {/* Form to withdraw quantity */}
              <form onSubmit={onSubmit}>
                <Stack gap="6" align="flex-start" maxW="xl">
                  <Field.Root invalid={!!errors.quantity} required>
                    <Field.Label fontSize={16}>
                      Quantity to Withdraw
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      {...register("quantity", {
                        required: "Quantity is required",
                        min: {
                          value: 1,
                          message: "Quantity must be at least 1",
                        },
                        max: {
                          value: item.quantity,
                          message: `Cannot withdraw more than ${item.quantity}`,
                        },
                      })}
                      color="gray.800"
                      _focus={{
                        borderColor: SELECTED_COLOUR,
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                    />
                    <Field.ErrorText>{errors.quantity?.message}</Field.ErrorText>
                  </Field.Root>
                </Stack>
                <Button type="submit" bg={SELECTED_COLOUR} color="white" mt="10">
                  Withdraw
                </Button>
              </form>
            </Dialog.Body>
            <ToastContainer />
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
