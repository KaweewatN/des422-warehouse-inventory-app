import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor || "#3b82f6"};
  color: ${(props) => props.textColor || "white"};
  padding: ${(props) => props.padding || "0.5rem 1rem"};
  font-size: ${(props) => props.fontSize || "0.9rem"};
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hoverBgColor || "#2563eb"};
    color: ${(props) => props.hoverTextColor || "white"};
  }
`;
