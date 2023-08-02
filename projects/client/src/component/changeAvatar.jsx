import {
  Avatar,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePicture } from "../redux/reducer/authreducer";

export const ChangeAvatar = ({ isOpen, onClose }) => {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const handleInput = (e) => {
    const data = e.target.files[0];
    // const [file] = document.getElementById("file").files;
    // const avaURL = URL.createObjectURL(file);
    // console.log(avaURL);
    setImage(data);
  };
  function handleSubmit() {
    const file = image;
    console.log(file);
    dispatch(changePicture(file));
  }
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="10%"
          backdropBlur="1px"
        />
        <ModalContent>
          <ModalHeader align={"center"}>Ganti Avatar</ModalHeader>
          <ModalBody align={"center"}>
            <Stack align={"center"}>
              <Avatar src={image} size={"xl"} />
              <input onChange={handleInput} type="file"></input>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit}>Upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
