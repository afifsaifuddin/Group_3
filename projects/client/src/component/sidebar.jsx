import { Box, Button, Flex, Spacer, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import Welcome from "./welcome";
import Produk from "./produk";
import Admin from "./admin";
import { Link } from "react-router-dom";
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
  return (
    <Flex>
      <Box
        bg={"blue.100"}
        height={"100vh"}
      >
        <Stack
          p={3}
          wrap={"wrap"}
        >
          <Link onClick={() => setActivePage("home")}>
            <GoHome size={"100px"} />
          </Link>
          <Link onClick={() => setActivePage("produk")}>
            <MdProductionQuantityLimits size={"100px"} />
          </Link>
          {role === "admin" ? (
            <Link onClick={() => setActivePage("admin")}>
              <MdOutlineAdminPanelSettings size={"100px"} />
            </Link>
          ) : null}
          <Box mt={"45vh"}>
            <Button onClick={() => dispatch(logoutSuccess)}>
              <MdLogout size={"100px"} />
            </Button>
          </Box>
        </Stack>
      </Box>
      <Box
        bgColor={"green.100"}
        w={"100%"}
      >
        {renderPaage()}
      </Box>
    </Flex>
  );
};
export default Sidebar;
