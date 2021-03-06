import React from "react";
import {Box, BoxProps} from "@chakra-ui/core";

const ClockIcon: React.FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <svg fill="none" height={40} viewBox="0 0 40 40" width={40}>
        <path
          d="M28.333 35v-3.333A6.667 6.667 0 0021.667 25H8.333a6.667 6.667 0 00-6.666 6.667V35M15 18.333A6.667 6.667 0 1015 5a6.667 6.667 0 000 13.333zM38.333 35v-3.333a6.667 6.667 0 00-5-6.45M26.667 5.217a6.667 6.667 0 010 12.916"
          stroke="#319795"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </svg>
    </Box>
  );
};

export default ClockIcon;
