import {Button, FileUpload, Float, useFileUploadContext} from "@chakra-ui/react";
import {LuFileImage, LuX} from "react-icons/lu";

const FileUploadList = () => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;
  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item w="auto" boxSize="20" p="2" file={file} key={file.name}>
          <FileUpload.ItemPreviewImage />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

const FileUploadBox = () => {
  return (
    <FileUpload.Root accept="image/*">
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button
          size="sm"
          variant="outline"
          borderColor="blue.500"
          color="blue.500"
          fontWeight={600}
          _hover={{bg: "blue.500", color: "white"}}
        >
          <LuFileImage /> Upload Images
        </Button>
      </FileUpload.Trigger>
      <FileUploadList />
    </FileUpload.Root>
  );
};
export default FileUploadBox;
