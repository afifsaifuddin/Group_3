import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ChangeAvatar } from "./changeAvatar";
import ColorModeToggle from "./colorMode";

export const AvatarKasir = () => {
  const { user } = useSelector((state) => state.authreducer);
  const { isOpen, onClose, onOpen } = useDisclosure();

  let imgProfile;
  if (user.imgProfile)
    imgProfile = "http://localhost:8000/" + user.imgProfile.replace(/\\/g, "/");
  return (
    <Box>
      <Flex
        borderRadius={"8px"}
        padding={"7px"}
        maxW={"250px"}
        w={"100%"}
        justifyContent={"left"}
        bgColor="#FC2947"
        color={"white"}
      >
        <Button
          ml={"10px"}
          variant={"unstyled"}
          onClick={() => {
            onOpen();
          }}
        >
          <Avatar color="white" name={user.username} src={`${imgProfile}`} />
        </Button>
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
      <ChangeAvatar isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Box>
  );
};

export default AvatarKasir;
