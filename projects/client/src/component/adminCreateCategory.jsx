import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { createCategory, getCategory } from "../redux/reducer/categoryreducer";

export const AdminCreateCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const handleCreateCategory = async () => {
    const name = document.getElementById("name").value;
    await dispatch(createCategory(name));
    await dispatch(getCategory());
    onClose();
  };

  return (
    <Box>
      <Button colorScheme={"red"} mb={"20px"} onClick={onOpen}>
        Add New Category
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Category</ModalHeader>
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
                    <Input placeholder="Category Name" id="name"></Input>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCreateCategory}>SAVE</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default AdminCreateCategory;
