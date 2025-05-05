import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Input,
  Stack,
  Textarea,
  FileUpload,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {SELECTED_COLOUR} from "../../../../constants/Constants";
import {HiUpload} from "react-icons/hi";
import {ToastContainer, toast} from "react-toastify";
// ui
import {useForm} from "react-hook-form";
//api-Service
import apiService from "../../../../service/apiService";

export default function AddNewItemForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const [itemTypeId, setItemTypeId] = useState();

  useEffect(() => {
    const fetchItemTypes = async () => {
      try {
        const data = await apiService.get("/items/items_type?limit=100"); // limit to 100 for testing
        if (data) {
          setItemTypeId(data.types);
        }
      } catch (error) {
        console.error("Error fetching item types:", error);
      }
    };
    fetchItemTypes();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log("response", data);
    try {
      const formData = new FormData();
      formData.append("item_name", data.item_name);
      formData.append("item_type_id", data.item_type_id);
      formData.append("sku", data.sku);
      formData.append("description", data.description);
      formData.append("quantity", data.quantity);
      formData.append("image", data.image?.[0]);

      const response = await apiService.post("/items/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Item added successfully!");
      reset();
      window.location.reload();
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "An error occurred. Please try again.";
      toast.error(message);
    }
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button outline="solid" bg={SELECTED_COLOUR} color="white" size="sm">
          Add new item
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content size="sm" bg="white" borderRadius="md" boxShadow="lg">
            <Dialog.Header>
              <Dialog.Title>Add new item</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={onSubmit}>
                <Stack gap="6" align="flex-start" maxW="xl">
                  <Field.Root invalid={!!errors.item_name} required>
                    <Field.Label fontSize={16}>
                      Item Name
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="text"
                      placeholder="Enter item name"
                      {...register("item_name")}
                      color="gray.800"
                      _focus={{
                        borderColor: SELECTED_COLOUR,
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                    />
                    <Field.ErrorText>{errors.item_name?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.sku} required>
                    <Field.Label fontSize={16}>
                      SKU
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="text"
                      placeholder="Enter SKU"
                      {...register("sku")}
                      color="gray.800"
                      _focus={{
                        borderColor: SELECTED_COLOUR,
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                    />
                    <Field.ErrorText>{errors.sku?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.item_type_id} required>
                    <Field.Label fontSize={16}>
                      Item Type
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <select
                      {...register("item_type_id", {required: "Item type is required"})}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderWidth: "1px",
                        borderColor: errors.item_type_id ? "red" : "black",
                        borderRadius: "4px",
                        backgroundColor: "white",
                      }}
                    >
                      <option value="">Select item type</option>
                      {itemTypeId &&
                        itemTypeId.map((type) => (
                          <option key={type.item_type_id} value={type.item_type_id}>
                            {type.type_name}
                          </option>
                        ))}
                    </select>
                    <Field.ErrorText>{errors.item_type_id?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.description} required>
                    <Field.Label fontSize={16}>
                      Description
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea
                      placeholder="Enter description"
                      {...register("description")}
                      color="gray.800"
                      _focus={{
                        borderColor: SELECTED_COLOUR,
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                    />
                    <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.quantity} required>
                    <Field.Label fontSize={16}>
                      Quantity
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      {...register("quantity")}
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
                      Image
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <FileUpload.Root>
                      <FileUpload.HiddenInput
                        {...register("image", {
                          required: "Image is required",
                          validate: (value) => value.length > 0 || "Please upload a file",
                        })}
                        type="file"
                        accept="image/*"
                      />
                      <FileUpload.Trigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          color="gray.800"
                          _hover={{bg: "gray.100"}}
                        >
                          <HiUpload /> Upload file
                        </Button>
                      </FileUpload.Trigger>
                      <FileUpload.List />
                    </FileUpload.Root>
                    <Field.ErrorText>{errors.image?.message}</Field.ErrorText>
                  </Field.Root>
                </Stack>
                <Button type="submit" bg={SELECTED_COLOUR} color="white" mt="10">
                  Save
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
