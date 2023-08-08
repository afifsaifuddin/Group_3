import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { createProduct, getProduk } from "../redux/reducer/produkreducer";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

export const AdminCreateproduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categoryreducer.category);
  const [urlImage, setUrlImage] = useState("");
  const handleImage = (e) => {
    const [file] = document.getElementById("image").files;
    const avaURL = URL.createObjectURL(file);
    setUrlImage(avaURL);
  };
  const handleCreate = async () => {
    const data = {
      name: document.getElementById("namaProduk").value,
      description: document.getElementById("deskripsi").value,
      categoryId: document.getElementById("kategori").value,
      modal_produk: document.getElementById("hargaBeli").value,
      harga_produk: document.getElementById("hargaJual").value,
      quantity: document.getElementById("quantity").value,
    };
    const file = document.getElementById("image").files[0];
    await dispatch(createProduct(data, file));
    await dispatch(getProduk({}));
    onClose();
  };
  const createProductSchema = Yup.object().shape({
    name: Yup.string().required("Nama harus diisi"),
    description: Yup.string().required("Deskripsi harus diisi"),
    categoryId: Yup.string().required("Kategori harus diisi"),
    modal_produk: Yup.string().required("Modal harus diisi"),
    harga_produk: Yup.string().required("Harga harus diisi"),
    quantity: Yup.string().required("Quantity harus diisi"),
  });
  //   const formik = useFormik({
  //       initialValues: {
  //         name: "",
  //         description: "",
  //         categoryId: "",
  //         modal_produk: "",
  //         harga_produk: "",
  //         quantity: "",
  //       },
  //       validationSchema: createProductSchema,
  //       onSubmit: async (values) => {
  //         try {
  //           await dispatch(createProduct(values));
  //           await dispatch(getProduk({}));
  //           onClose();
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       }
  //   })

  return (
    <Box>
      <Button colorScheme={"red"} mb={"20px"} onClick={onOpen}>
        Add New Product
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalBody>
            <Flex gap={"20px"}>
              <Box>
                <Image
                  width={"20vw"}
                  height={"40vh"}
                  src={urlImage}
                  mb={"10px"}
                  objectFit={"cover"}
                  overflow={"hidden"}
                />
                <Input
                  type="file"
                  id="image"
                  variant={""}
                  onChange={handleImage}
                  alt="Product Image"
                />
              </Box>
              <Box>
                <Text fontWeight={"bold"} mb={"10px"}>
                  Nama Produk :{" "}
                </Text>
                <Input id="namaProduk" mb={"10px"} placeholder="nama produk" />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Deskripsi :{" "}
                </Text>
                <Input id="deskripsi" mb={"10px"} placeholder="deskripsi" />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Kategory :{" "}
                </Text>
                <Select id="kategori">
                  {category.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
                <Text fontWeight={"bold"} mb={"10px"}>
                  Harga Beli :{" "}
                </Text>
                <Input id="hargaBeli" mb={"10px"} placeholder="harga beli" />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Harga Jual :{" "}
                </Text>
                <Input id="hargaJual" mb={"10px"} placeholder="harga jual" />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Quantity :{" "}
                </Text>
                <Input id="quantity" mb={"10px"} placeholder="quantity" />
              </Box>
            </Flex>
            <ModalFooter>
              <Button onClick={handleCreate}>Save</Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default AdminCreateproduct;
