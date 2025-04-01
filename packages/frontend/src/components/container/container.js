import styled from "styled-components";

export const StyledContainer = styled.div`
  display: ${(props) => props.display || "block"};
  flex-direction: ${(props) => props.flexDirection || "row"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "items-start"};
  padding: ${(props) => props.padding || "0"};
  margin: ${(props) => props.margin || "0"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  background-color: ${(props) => props.bgColor || "transparent"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.borderRadius || "0"};
  box-shadow: ${(props) => props.boxShadow || "none"};
  overflow: ${(props) => props.overflow || "visible"};
  position: ${(props) => props.position || "static"};
  top: ${(props) => props.top || "auto"};
  left: ${(props) => props.left || "auto"};
  right: ${(props) => props.right || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
  z-index: ${(props) => props.zIndex || "auto"};
  opacity: ${(props) => props.opacity || "1"};
`;
