import { Box, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";

const Toast = ({ status, message }) => {
  const toast = useToast();

  useEffect(() => {
    if (status === "success") {
      toast({
        title: "Berhasil",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Gagal",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [status, message, toast]);

  return <Box />;
};

export default Toast;
