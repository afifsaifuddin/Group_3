import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Pembayaran from "./pembayaran";

export const ButtonBayar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box>
      <Button
        onClick={() => {
          onOpen();
        }}
        width={"100%"}
        bgColor={"#FC2947"}
      >
        Bayar
      </Button>
      <Pembayaran isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Box>
  );
};
export default ButtonBayar;
