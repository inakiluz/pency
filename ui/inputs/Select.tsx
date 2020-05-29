import React from "react";
import {Select as ChakraSelect, SelectProps} from "@chakra-ui/core";

const Select: React.FC<SelectProps> = React.forwardRef((props, ref) => (
  <ChakraSelect ref={ref} focusBorderColor="primary.300" paddingX={2} variant="filled" {...props} />
));

export default Select;
