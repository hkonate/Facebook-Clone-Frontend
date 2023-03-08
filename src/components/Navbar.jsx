import { AuthContext } from "../context/authentification/AuthContext";
import axios from "axios";
import { Mail, Notifications, Facebook } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      console.log(user?.data?.authTokens[0][0].authToken);
      await axios.delete("http://localhost:3000/user/logout", {
        headers: {
          Authorization: `Bearer ${user?.data?.authTokens[0][0].authToken}`,
        },
      });

      setOpen((prev) => !prev);
      navigate("/login");
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
      setOpen((prev) => !prev);
    }
  };
  console.log(user);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          onClick={() => {
            navigate("/");
          }}
          variant="h6"
          sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
        >
          FB
        </Typography>
        <Facebook sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase
            placeholder="looking for friends..."
            sx={{ color: "black" }}
          />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={user?.data?.profilePicture}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={() => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={user?.data?.profilePicture}
          />
          <Typography variant="span" textTransform={"capitalize"}>
            {user?.data?.firstname}
          </Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        aria-labelledby="demo-positioned-button"
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            setOpen((prev) => !prev);
            navigate(`profile/${user.data._id}`);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          My account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
