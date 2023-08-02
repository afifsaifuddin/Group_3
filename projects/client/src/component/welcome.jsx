import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

export const Welcome = () => {
  return (
    <Flex justify={"space-evenly"}>
      <Box>
        <Image src="" />
      </Box>
      <Box mt={"100px"}>
        <Text fontWeight={"bold"} fontSize={"50px"}>
          Selamat Datang di
        </Text>
        <Text color={"#FC2947"} fontWeight={"bold"} fontSize={"100px"}>
          Magfirah Cell
        </Text>
      </Box>
    </Flex>
  );
};
export default Welcome;
