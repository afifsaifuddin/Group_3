import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

export const Modalforgotpass = ({ isOpen, onClose }) => {
  const toast = useToast();
  const emailscheme = Yup.object().shape({
    email: Yup.string().required("Email harus diisi"),
  });
  const forgotpassword = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/pos-kasir/forgot-password",
        { email: values.email }
      );
      if (res.status === 200) {
        toast({
          title: "Cek email anda untuk reset password",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "terjadi kesalahan",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailscheme,
    onSubmit: (values) => {
      forgotpassword(values);
    },
  });
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Lupa Password ?</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  focusBorderColor="#FD8A8A"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="teal"
                bgColor={"#FD8A8A"}
                _hover={{ color: "#FD8A8A" }}
              >

                Kirim
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
