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

// Define styled components
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
  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the delete post menu
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if the delete post menu is open
  const open = Boolean(anchorEl);

  // Handle logout
  const handleLogout = async () => {
    try {
      // Make a DELETE request to the server to logout the user
      await axios.delete(
        "https://facebook-clone-backend-production.up.railway.app/user/logout",
        {
          headers: {
            Authorization: `Bearer ${user?.authTokens[0][0].authToken}`,
          },
        }
      );

      // Close the menu, navigate to the login page, and remove user info from local storage
      setAnchorEl(null);
      navigate("/login");
      localStorage.removeItem("user");
    } catch (error) {
      setAnchorEl(null);
    }
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    navigate(`profile/${user._id}`);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    navigate(`settings`);
  };

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
            sx={{ width: 30, height: 30, cursor: "pointer" }}
            src={user?.profilePicture}
            onClick={handleMenuOpen}
          />
        </Icons>
        <UserBox onClick={(e) => handleMenuOpen(e)}>
          <Avatar sx={{ width: 30, height: 30 }} src={user?.profilePicture} />
          <Typography variant="span" textTransform={"capitalize"}>
            {user?.firstname}
          </Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
