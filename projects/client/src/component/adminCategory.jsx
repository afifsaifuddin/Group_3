import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminCreateCategory from "./adminCreateCategory";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, updateCategory } from "../redux/reducer/produkreducer";

export const AdminCategory = () => {
  const { category } = useSelector((state) => state.produkreducer);
  const [modalCategory, setModalCategory] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newname, setNewName] = useState("");
  const dispatch = useDispatch();
  const handleUpdate = async (id, name) => {
    await dispatch(updateCategory(id, name));
    await dispatch(getCategory());
    onClose();
  };

  useEffect(() => {
    dispatch(getCategory());
  }, []);
  return (
    <Box>
      <Flex justifyContent={"end"} mr={"100px"}>
        <AdminCreateCategory />
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {category.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setModalCategory(item);
                    onOpen();
                  }}
                >
                  EDIT
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Input
                      placeholder={modalCategory.name}
                      value={newname}
                      onChange={(e) => {
                        setNewName(e.target.value);
                      }}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                handleUpdate(modalCategory.id, newname);
              }}
            >
              SAVE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminCategory;
