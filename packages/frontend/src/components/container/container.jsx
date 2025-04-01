import Container from "./container";

const Container = ({
  display,
  flexDirection,
  justifyContent,
  alignItems,
  padding,
  margin,
  width,
  height,
  bgColor,
  border,
  borderRadius,
  boxShadow,
  overflow,
  position,
  top,
  left,
  right,
  bottom,
  zIndex,
  opacity,
  children,
  ...props
}) => (
  <StyledContainer
    display={display}
    flexDirection={flexDirection}
    justifyContent={justifyContent}
    alignItems={alignItems}
    padding={padding}
    margin={margin}
    width={width}
    height={height}
    bgColor={bgColor}
    border={border}
    borderRadius={borderRadius}
    boxShadow={boxShadow}
    overflow={overflow}
    position={position}
    top={top}
    left={left}
    right={right}
    bottom={bottom}
    zIndex={zIndex}
    opacity={opacity}
    {...props}
  >
    {children}
  </StyledContainer>
);

export default Container;
