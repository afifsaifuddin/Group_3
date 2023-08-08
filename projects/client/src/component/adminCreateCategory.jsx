import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text, // Tambahkan impor ini
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { createCategory, getCategory } from "../redux/reducer/categoryreducer";
import Toast from "./toast";
import * as Yup from "yup";
import { useFormik } from "formik";

export const AdminCreateCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const categorySchema = Yup.object().shape({
    name: Yup.string().required("Nama harus diisi"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      try {
        await dispatch(createCategory(values.name));
        await dispatch(getCategory());
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Box>
      <Button colorScheme={"red"} mb={"20px"} onClick={onOpen}>
        Add New Category
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Category</ModalHeader>
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <FormControl
                isInvalid={formik.errors.name && formik.touched.name}
              >
                <FormLabel htmlFor="name" fontSize={"bold"}>
                  Category Name
                </FormLabel>
                <Input
                  placeholder="Category Name"
                  id="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <Text color="red">{formik.errors.name}</Text>
                ) : null}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit">SAVE</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default AdminCreateCategory;
