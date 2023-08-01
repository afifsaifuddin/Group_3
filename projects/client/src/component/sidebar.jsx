import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import Welcome from "./welcome";
import Produk from "./produk";
import Admin from "./admin";

import { GoHome } from "react-icons/go";
import {
  MdProductionQuantityLimits,
  MdOutlineAdminPanelSettings,
  MdLogout,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/reducer/authreducer";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.authreducer.user.role);
  const [activePage, setActivePage] = useState("home");
  const renderPaage = () => {
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
    <Flex height={"100%"}>
      <Box bg={"blue.500"}>
        <Stack p={3} gap={"20px"}>
          <Button
            onClick={() => setActivePage("home")}
            _hover={{ bgColor: "blue.700" }}
            variant={""}
            size={"50px"}
          >
            <GoHome size={"100px"} />
          </Button>
          <Button
            onClick={() => setActivePage("produk")}
            _hover={{ bgColor: "blue.700" }}
            variant={""}
            size={"50px"}
          >
            <MdProductionQuantityLimits size={"100px"} />
          </Button>
          {role === "admin" ? (
            <Button
              onClick={() => setActivePage("admin")}
              _hover={{ bgColor: "blue.700" }}
              variant={""}
              size={"50px"}
            >
              <MdOutlineAdminPanelSettings size={"100px"} />
            </Button>
          ) : null}
          <Box mt={"40vh"}>
            <Button
              onClick={handleLogout}
              _hover={{ bgColor: "blue.700" }}
              variant={""}
              size={"50px"}
            >
              <MdLogout size={"100px"} />
            </Button>
          </Box>
        </Stack>
      </Box>
      <Box bgColor={"green.100"} w={"100%"}>
        {renderPaage()}
      </Box>
    </Flex>
  );
};
export default Sidebar;
