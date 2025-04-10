import {useState} from "react";
import {Tabs} from "@chakra-ui/react";
// components
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
// constants
import {SELECTED_COLOUR} from "../../../constants/Constants";
//icons
import {LuLogIn} from "react-icons/lu";
import {MdOutlineAccountCircle} from "react-icons/md";

export default function AuthTab({children}) {
  const [value, setValue] = useState("sign-in");

  return (
    <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)} colorPalette={"teal"}>
      <Tabs.List bg="white" mt="8">
        <Tabs.Trigger
          value="sign-in"
          color={"gray.800"}
          _selected={{bg: SELECTED_COLOUR, color: "white"}}
        >
          <LuLogIn />
          Sign in
        </Tabs.Trigger>
        <Tabs.Trigger
          value="sign-up"
          color={"gray.800"}
          _selected={{bg: SELECTED_COLOUR, color: "white"}}
        >
          <MdOutlineAccountCircle />
          Sign up
        </Tabs.Trigger>
        <Tabs.Indicator bg={SELECTED_COLOUR} />
      </Tabs.List>

      <Tabs.Content value="sign-in">
        <SignInForm />
      </Tabs.Content>
      <Tabs.Content value="sign-up">
        <SignUpForm />
      </Tabs.Content>
    </Tabs.Root>
  );
}
