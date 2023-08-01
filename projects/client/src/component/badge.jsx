import { Avatar, Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

export const AvatarKasir = () => {
  const { user } = useSelector((state) => state.authreducer);
  console.log(user);
  let imgProfile;
  if (user.imgProfile)
    imgProfile = "http://localhost:8000/" + user.imgProfile.replace(/\\/g, "/");
  return (
    <Flex
      borderRadius={"8px"}
      padding={"7px"}
      maxW={"250px"}
      w={"100%"}
      justifyContent={"left"}
      bgColor="blue.500"
      color={"white"}
    >
      <Box ml={"10px"}>
        <Avatar color="white" name={user.username} src={`${imgProfile}`} />
      </Box>
      <Stack
        ml={"15px"}
        fontSize={"sm"}
        spacing={"0.5px"}
        alignContent={"flex-end"}
      >
        <Box>Welcome, {user.role}</Box>
        <Box>{user.username}</Box>
      </Stack>
    </Flex>
  );
};

export default AvatarKasir;
