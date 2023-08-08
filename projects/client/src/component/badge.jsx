import { Avatar, Box, Button, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ChangeAvatar } from "./changeAvatar";

export const AvatarKasir = () => {
  const { user } = useSelector((state) => state.authreducer);
  const { isOpen, onClose, onOpen } = useDisclosure();

  let imgProfile;
  if (user.imgProfile) imgProfile = `${process.env.REACT_APP_API_BASE_URL}/` + user.imgProfile;
  return (
    <Box mr={"50px"}>
      <Button
        variant={"unstyled"}
        onClick={() => {
          onOpen();
        }}>
        <Flex borderRadius={"8px"} px={"20px"} py={"10px"} justifyContent={"left"} bgColor="#FC2947" color={"white"}>
          <Avatar color="white" name={user.username} src={`${imgProfile}`} />
          <Stack ml={"15px"} fontSize={"sm"} spacing={"0.5px"} alignContent={"flex-end"}>
            <Box>Welcome, {user.role}</Box>
            <Box>{user.username}</Box>
          </Stack>
        </Flex>
        <ChangeAvatar isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      </Button>
    </Box>
  );
};

export default AvatarKasir;
