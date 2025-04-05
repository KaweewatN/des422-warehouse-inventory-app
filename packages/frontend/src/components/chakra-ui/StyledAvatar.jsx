import {Avatar} from "@chakra-ui/react";

const StyledAvatar = ({src, name}) => {
  return (
    <Avatar.Root>
      <Avatar.Fallback name={name} />
      <Avatar.Image src={src} />
    </Avatar.Root>
  );
};

export default StyledAvatar;
