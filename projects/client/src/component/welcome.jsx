import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

export const Welcome = () => {
  return (
    <Flex justify={"space-evenly"}>
      <Box>
        <Image
          width={"40vw"}
          height={"80vh"}
          src="https://img.freepik.com/premium-vector/welcome-illustration-creative_633317-133.jpg?w=2000"
          alt=""
        />
      </Box>
      <Box mt={"250px"}>
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
