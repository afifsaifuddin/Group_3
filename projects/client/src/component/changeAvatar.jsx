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
import React from "react";

export const ChangeAvatar = ({ isOpen, onClose }) => {
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="10%"
          backdropBlur="10px"
        />
        <ModalContent>
          <ModalHeader>Ganti Avatar</ModalHeader>
          <ModalBody>
            <Stack>
              <Avatar />
              <input type="file"></input>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button>Upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
