import {
  AccountBox,
  Home,
  ModeNight,
  Person,
  Settings,
  LightMode,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Switch,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authentification/AuthContext";

const ListText = styled(ListItemText)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ListIcon = styled(ListItemIcon)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const LeftBar = ({ mode, setMode }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box flex={1} p={2} zIndex={2}>
      <Box position="fixed">
        <List>
          <ListItem
            onClick={() => {
              navigate("/");
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate(`/friends`);
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate(`/settings`);
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => {
              navigate(`/profile/${user?._id}`);
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListIcon>
                {mode === "light" ? <ModeNight /> : <LightMode />}
              </ListIcon>
              <Switch
                defaultChecked={mode === "light" ? false : true}
                onChange={() => {
                  localStorage.setItem(
                    "mode",
                    mode === "light" ? "dark" : "light"
                  );
                  setMode(mode === "light" ? "dark" : "light");
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default LeftBar;
