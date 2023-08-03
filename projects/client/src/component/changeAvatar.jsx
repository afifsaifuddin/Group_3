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
  const [imgURL, setImgURL] = useState("");
  const dispatch = useDispatch();
  const handleInput = (e) => {
    const [file] = document.getElementById("file").files;
    const urlPreview = URL.createObjectURL(file);
    setImgURL(urlPreview);
  };
  function handleSubmit() {
    const file = document.getElementById("file").files[0];
    dispatch(changePicture(file));
  }

  function handleClose() {
    onClose();
    setImgURL("");
  }
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="10%" backdropBlur="1px" />
        <ModalContent>
          <ModalHeader align={"center"}>Ganti Avatar</ModalHeader>
          <ModalBody align={"center"}>
            <Stack align={"center"}>
              <Avatar src={imgURL} size={"xl"} />
              <input type="file" id="file" onChange={handleInput}></input>
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
