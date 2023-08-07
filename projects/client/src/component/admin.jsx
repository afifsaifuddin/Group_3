import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import AdminCashier from "./adminCashier";
import AdminProduk from "./adminProduk";
import AdminCategory from "./adminCategory";

export const Admin = () => {
  return (
    <Box ml={"20px"} mt={"10px"}>
      <Box border={"1px"} p={"10px"} mb={"10px"}>
        <Heading>Cashier App - Admin Dashboard</Heading>
      </Box>
      <Box>
        <Tabs>
          <TabList borderColor={"#FC2947"}>
            <Tab
              _selected={{
                color: "#FC2947",
              }}
            >
              Cashier
            </Tab>
            <Tab
              _selected={{
                color: "#FC2947",
              }}
            >
              Product
            </Tab>
            <Tab
              _selected={{
                color: "#FC2947",
              }}
            >
              Category
            </Tab>
            <Tab
              _selected={{
                color: "#FC2947",
              }}
            >
              Laporan Keuangan
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box>
                <AdminCashier />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <AdminProduk />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <AdminCategory />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
export default Admin;
