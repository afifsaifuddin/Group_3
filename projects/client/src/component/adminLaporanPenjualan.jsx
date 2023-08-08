import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const AdminLaporanPenjualan = ({ transactionItem }) => {
  const [productSold, setProductSold] = useState([]);
  const [totalHargaJual, setTotalHargaJual] = useState(0);
  const productMap = new Map();

  console.log(transactionItem);

  useEffect(() => {
    setTotalHargaJual(0);
    transactionItem.forEach((item) => {
      const productId = item.Product.id;
      const productName = item.Product.name;
      const price = item.Product.harga_produk;
      const totalQuantity = parseInt(item.totalQuantity);

      if (productMap.has(productId)) {
        const existingItem = productMap.get(productId);
        existingItem.totalQuantity += totalQuantity;
        existingItem.totalPrice += totalQuantity * price;
      } else {
        productMap.set(productId, {
          Product: { id: productId, name: productName, price: price },
          totalQuantity: totalQuantity,
          totalPrice: +totalQuantity * +price,
        });
      }
      setTotalHargaJual((prevTotalHargaJual) => prevTotalHargaJual + totalQuantity * price);
      console.log(totalHargaJual);
    });
    setProductSold(Array.from(productMap.values()));
  }, [transactionItem]);

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
          {productSold.map((item) => (
            <Tr key={item.Product.id}>
              <Td>{item.Product.name}</Td>
              <Td>{item.totalQuantity}</Td>
              <Td>{item.totalPrice}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={2}>Total</Th>
            <Th>{totalHargaJual}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default AdminLaporanPenjualan;
