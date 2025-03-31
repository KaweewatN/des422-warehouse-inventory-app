import {StyledButton} from "./button.styles";

export default function Button({
  label,
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
      {label}
    </StyledButton>
  );
}

// can customize the button with props example <Button label="Click Me" bgColor="red" textColor="white" hoverBgColor="blue" hoverTextColor="black" padding="1rem 2rem"/>
