import {Button, CloseButton, Dialog, HStack, Portal, Field, Input, Stack} from "@chakra-ui/react";
import {ToastContainer, toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {SELECTED_COLOUR} from "../../../../constants/Constants";
// files
import FileUploadBox from "./FileUploadBox";
// api
import apiService from "../../../../service/apiService";

const AddItemDialog = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (newItems) => {
    console.log("Form submitted with values:", newItems);
    try {
      await apiService.post("/items/add", newItems);
      toast.success("Add new item Successful!");
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
    <HStack wrap="wrap" gap="4">
      <Dialog.Root placement="center" motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Button
            variant="solid"
            bg={SELECTED_COLOUR}
            fontSize={14}
            fontWeight={600}
            color="white"
            _hover={{bg: "green.700"}}
          >
            Add Item
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content bg="white">
              <Dialog.Header>
                <Dialog.Title>Add a new item</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap="6" align="flex-start" maxW="xl">
                  <Field.Root invalid={!!errors.item_name} required>
                    <Field.Label fontSize={16}>
                      Username
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="text"
                      placeholder="banana"
                      {...register("item_name", {required: "Item name is required"})}
                      color="gray.800"
                      _focus={{
                        borderColor: SELECTED_COLOUR,
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                    />
                    <Field.ErrorText>{errors.item_name?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.description} required>
                    <Field.Label fontSize={16}>
                      Description
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="text"
                      placeholder="johndoe"
                      {...register("description", {required: "Description is required"})}
                      color="gray.800"
                      _focus={{
                        borderColor: SELECTED_COLOUR,
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                    />
                    <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.item_type_id} required>
                    <Field.Label fontSize={16}>
                      Item type
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="number"
                      placeholder="johndoe"
                      {...register("item_type_id", {required: "Iyem type ID is required"})}
                      color="gray.800"
                      _focus={{
                        borderColor: SELECTED_COLOUR,
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                    />
                    <Field.ErrorText>{errors.item_type_id?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.sku} required>
                    <Field.Label fontSize={16}>
                      Sku
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="text"
                      placeholder="johndoe"
                      {...register("sku", {required: "Sku is required"})}
                      color="gray.800"
                      _focus={{
                        borderColor: SELECTED_COLOUR,
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                    />
                    <Field.ErrorText>{errors.sku?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.quantity} required>
                    <Field.Label fontSize={16}>
                      Quantity
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="number"
                      placeholder="johndoe"
                      {...register("quantity", {
                        required: "Quantity is required",
                        valueAsNumber: true,
                        validate: (value) => value > 0 || "Quantity must be a positive number",
                      })}
                      color="gray.800"
                      _focus={{
                        borderColor: SELECTED_COLOUR,
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                    />
                    <Field.ErrorText>{errors.quantity?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.image} required>
                    <Field.Label fontSize={16}>
                      Upload an image
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <FileUploadBox {...register("image")} />
                    <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
                  </Field.Root>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button bg="red.600" fontWeight="medium" color="white" _hover={{bg: "red.700"}}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  bg={SELECTED_COLOUR}
                  fontWeight="medium"
                  color="white"
                  _hover={{bg: "green.700"}}
                  onClick={onSubmit}
                >
                  Save
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
              <ToastContainer />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
};

export default AddItemDialog;
