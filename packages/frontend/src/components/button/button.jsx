import {StyledButton} from "./button.styles";

export default function Button({
  children,
  onClick = () => {},
  fontSize,
  bgColor,
  textColor,
  hoverBgColor,
  hoverTextColor,
  padding,
}) {
  return (
    <StyledButton
      onClick={onClick}
      fontSize={fontSize}
      bgColor={bgColor}
      textColor={textColor}
      hoverBgColor={hoverBgColor}
      hoverTextColor={hoverTextColor}
      padding={padding}
    >
      {children}
    </StyledButton>
  );
}

// can customize the button with props example <Button children="Click Me" bgColor="red" textColor="white" hoverBgColor="blue" hoverTextColor="black" padding="1rem 2rem"/>
