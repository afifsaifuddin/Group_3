import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduk, updateProduk } from "../redux/reducer/produkreducer";
import AdminCreateproduct from "./adminCreateproduct";
import { Pagination } from "./pagination";

export const AdminProduk = () => {
  const [index, setIndex] = useState(1);
  const { page } = useSelector((state) => state.produkreducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalProduk, setModalProduk] = useState({});
  const { produk } = useSelector((state) => state.produkreducer);
  const [urlImage, setUrlImage] = useState("");
  const dispatch = useDispatch();
  const [orderBy, setOrderby] = useState("name");
  const [order, setOrder] = useState("ASC");
  const handleImage = (e) => {
    const [file] = document.getElementById("image").files;
    const avaURL = URL.createObjectURL(file);
    setUrlImage(avaURL);
  };
  const handleUpdate = async () => {
    const data = {
      name: document.getElementById("namaProduk").value,
      description: document.getElementById("deskripsi").value,
      modal_produk: document.getElementById("hargaBeli").value,
      harga_produk: document.getElementById("hargaJual").value,
      quantity: document.getElementById("quantity").value,
      isActive: modalProduk.isActive,
    };
    const file = document.getElementById("image").files[0];
    await dispatch(updateProduk(data, modalProduk.id, file));
    await dispatch(getProduk({ limit: 7, index, orderBy }));
  };

  const switchChange = (e) => {
    setModalProduk({ ...modalProduk, isActive: e });
  };

  function handleCategoryClick() {
    setOrderby("categoryId");
  }

  function handleNameClick() {
    setOrderby("name");
    setOrder(order === "ASC" ? "ASC" : "DESC");
  }

  useEffect(() => {
    dispatch(getProduk({ limit: 7, index, orderBy }));
  }, [index]);

  return (
    <Box>
      <Flex justifyContent={"end"} mr={"100px"}>
        <AdminCreateproduct />
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Nama</Th>
            <Link onClick={handleCategoryClick}>
              <Th>Kategori</Th>
            </Link>
            <Th>Deskripsi</Th>
            <Th>Harga Beli</Th>
            <Th>Harga Jual</Th>
            <Th>Quantity</Th>
            <Th>Tampilkan?</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {produk.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.Category.name}</Td>
              <Td>{item.description}</Td>
              <Td>{item.modal_produk}</Td>
              <Td>{item.harga_produk}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.isActive ? "Ya" : "Tidak "}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setModalProduk(item);
                    setUrlImage(`${process.env.REACT_APP_API_BASE_URL}/` + item.productImg);
                    onOpen();
                  }}>
                  EDIT
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen} size={"3xl"}>
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalHeader>Edit Produk</ModalHeader>
          <ModalBody>
            <Flex gap={"30px"}>
              <Box>
                <Image
                  width={"20vw"}
                  height={"40vh"}
                  src={urlImage}
                  mb={"10px"}
                  objectFit={"cover"}
                  overflow={"hidden"}
                />
                <Input type="file" id="image" variant={""} onChange={handleImage} />
              </Box>
              <Box>
                <Text fontWeight={"bold"} mb={"10px"}>
                  Nama Produk :{" "}
                </Text>
                <Input id="namaProduk" mb={"10px"} placeholder={modalProduk.name} />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Deskripsi :{" "}
                </Text>
                <Input id="deskripsi" mb={"10px"} placeholder={modalProduk.description} />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Harga Beli :{" "}
                </Text>
                <Input id="hargaBeli" mb={"10px"} placeholder={modalProduk.modal_produk} />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Harga Jual :{" "}
                </Text>
                <Input id="hargaJual" mb={"10px"} placeholder={modalProduk.harga_produk} />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Quantity :{" "}
                </Text>
                <Input id="quantity" mb={"10px"} placeholder={modalProduk.quantity} />
                <Switch isChecked={modalProduk.isActive} onChange={() => switchChange(!modalProduk.isActive)} />
              </Box>
            </Flex>
            <ModalFooter>
              <Button onClick={handleUpdate}>Save</Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Pagination page={page} index={index} setIndex={setIndex} />
    </Box>
  );
};

export default AdminProduk;
