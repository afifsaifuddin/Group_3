import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import AvatarKasir from "./badge";
export const Navbar = () => {
  return (
    <Box bgColor={"white"} borderBottom={"3px solid #FC2947"}>
      <Flex justifyContent={"space-between"} p={3}>
        <Flex>
          <Image
            boxSize={"60px"}
            ml={2}
            src="https://drive.google.com/uc?export=view&id=1d6wuXZewOB6z6UIFstfbrig0EylqhnPS"
          ></Image>
          <Text ml={"10px"} fontSize={"40px"} fontWeight={"bold"}>
            Magfirah
          </Text>
          <Text fontSize={"40px"} fontWeight={"bold"} color={"#FC2947"}>
            Cell
          </Text>
        </Flex>
        <AvatarKasir />
      </Flex>
    </Box>
  );
};
