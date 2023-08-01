import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Welcome from "./welcome";
import Produk from "./produk";
import Admin from "./admin";

import { GoHome } from "react-icons/go";
import { MdProductionQuantityLimits, MdOutlineAdminPanelSettings, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/reducer/authreducer";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.authreducer.user.role);
  const [activePage, setActivePage] = useState("home");
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Welcome />;
      case "produk":
        return <Produk />;
      case "admin":
        return <Admin />;
      default:
        return null;
    }
  };

  const handleLogout = (e) => {
    dispatch(logoutSuccess());
  };

  return (
    <Flex height={"100%"} width={"100%"}>
      <VStack p={3} gap={"20px"} bg={"blue.500"} height={"90vh"} width={"5%"}>
        <Button onClick={() => setActivePage("home")} _hover={{ bgColor: "blue.700" }} variant={""} size={"50px"}>
          <GoHome size={"75px"} />
        </Button>
        <Button onClick={() => setActivePage("produk")} _hover={{ bgColor: "blue.700" }} variant={""} size={"50px"}>
          <MdProductionQuantityLimits size={"75px"} />
        </Button>
        {role === "admin" ? (
          <Button onClick={() => setActivePage("admin")} _hover={{ bgColor: "blue.700" }} variant={""} size={"50px"}>
            <MdOutlineAdminPanelSettings size={"75px"} />
          </Button>
        ) : null}

        <Button onClick={handleLogout} _hover={{ bgColor: "blue.700" }} variant={""} size={"50px"}>
          <MdLogout size={"75px"} />
        </Button>
      </VStack>
      <Box bgColor={"green.100"} width={"95%"}>
        {renderPage()}
      </Box>
    </Flex>
  );
};
export default Sidebar;
