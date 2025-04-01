import styled from "styled-components";

export const StyledText = styled.p`
  font-size: ${(props) => props.fontSize || "1rem"};
  color: ${(props) => props.color || "black"};
  font-weight: ${(props) => props.fontWeight || "normal"};
`;

export const StyledHeading = styled.h1`
  font-size: ${(props) => props.fontSize || "2rem"};
  color: ${(props) => props.color || "black"};
  font-weight: ${(props) => props.fontWeight || "bold"};
`;

export const StyledSubHeading = styled.h2`
  font-size: ${(props) => props.fontSize || "1.5rem"};
  color: ${(props) => props.color || "black"};
  font-weight: ${(props) => props.fontWeight || "bold"};
`;

export const StyledSmallText = styled.small`
  font-size: ${(props) => props.fontSize || "0.8rem"};
  color: ${(props) => props.color || "gray"};
  font-weight: ${(props) => props.fontWeight || "normal"};
`;
