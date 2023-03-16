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
  Switch,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authentification/AuthContext";

const LeftBar = ({ mode, setMode }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
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
              <ListItemText primary="Homepage" />
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
              <ListItemText primary="Friends" />
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
              <ListItemText primary="Settings" />
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
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {mode === "light" ? <ModeNight /> : <LightMode />}
              </ListItemIcon>
              <Switch
                defaultChecked={mode === "light" ? false : true}
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default LeftBar;
