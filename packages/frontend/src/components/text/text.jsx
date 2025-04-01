import {StyledText, StyledHeading, StyledSubHeading, StyledSmallText} from "./text.styles";

export const Text = ({fontSize, color, fontWeight, children}) => (
  <StyledText fontSize={fontSize} color={color} fontWeight={fontWeight}>
    {children}
  </StyledText>
);

export const Heading = ({fontSize, color, fontWeight, children}) => (
  <StyledHeading fontSize={fontSize} color={color} fontWeight={fontWeight}>
    {children}
  </StyledHeading>
);

export const SubHeading = ({fontSize, color, fontWeight, children}) => (
  <StyledSubHeading fontSize={fontSize} color={color} fontWeight={fontWeight}>
    {children}
  </StyledSubHeading>
);

export const SmallText = ({fontSize, color, fontWeight, children}) => (
  <StyledSmallText fontSize={fontSize} color={color} fontWeight={fontWeight}>
    {children}
  </StyledSmallText>
);
