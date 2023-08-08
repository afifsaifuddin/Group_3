import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import React, { useState } from "react";

const AdminLaporanPenjualan = ({ transactionItem }) => {
  const [productSoldD, setProductSold] = useState([]);
  const productMap = new Map();

  transactionItem.forEach((item) => {
    const productId = item.Product.id;
    const productName = item.Product.name;
    const price = item.Product.price;
    const totalQuantity = parseInt(item.totalQuantity);
    if (productMap.has(productId)) {
        // Jika produk sudah ada di Map, tambahkan jumlah quantity
        const existingItem = productMap.get(productId);
        existingItem.totalQuantity += totalQuantity;
        existingItem.totalPrice += totalQuantity * price;
    } else {
        // Jika produk belum ada di Map, tambahkan sebagai entri baru
        productMap.set(productId, {
            Product: { id: productId, name: productName, price: price },
            totalQuantity: totalQuantity,
            totalPrice: totalQuantity * price,
        });
    }
});

  console.log(transactionItem);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Barang</Th>
            <Th>Jumlah Jual</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default AdminLaporanPenjualan;
