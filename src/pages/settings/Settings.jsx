import { LoadingButton } from "@mui/lab";
import { Box, Typography, Divider } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authentification/AuthContext";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // Handle logout
  const handleLogout = async () => {
    try {
      setLoading((prev) => !prev);
      // Make a DELETE request to the server to logout the user
      await axios.delete("http://localhost:3000/user/logout", {
        headers: {
          Authorization: `Bearer ${user?.authTokens[0][0].authToken}`,
        },
      });

      // Navigate to the login page, and remove user info from local storage

      localStorage.removeItem("user");
      setLoading((prev) => !prev);
      navigate("/login");
    } catch (error) {
      setLoading((prev) => !prev);
    }
  };

  //handle devices
  const handleDisconnectDevices = async () => {
    try {
      setLoading((prev) => !prev);
      //Delete all user's devices
      await axios.post("http://localhost:3000/user/logout/all", {
        headers: {
          Authorization: `Bearer ${user?.authTokens[0][0].authToken}`,
        },
      });

      // Navigate to the login page, and remove user info from local storage

      localStorage.removeItem("user");
      setLoading((prev) => !prev);
      navigate("/login");
    } catch (error) {
      setLoading((prev) => !prev);
    }
  };

  //Function that delete user's account

  const handleDeleteAccount = async () => {
    try {
      setLoading((prev) => !prev);

      //Delete users account
      await axios.delete("http://localhost:3000/user/delete", {
        headers: {
          Authorization: `Bearer ${user?.authTokens[0][0].authToken}`,
        },
      });

      // Navigate to the register page, and remove user info from local storage

      localStorage.removeItem("user");
      setLoading((prev) => !prev);
      navigate("/login");
      setLoading((prev) => !prev);
    } catch (error) {
      setLoading((prev) => !prev);
    }
  };

  return (
    <Box flex={"4"} height={"100vh"}>
      <Typography
        variant="h5"
        component={"h1"}
        fontWeight="bold"
        mt={5}
        mb={10}
        paddingLeft="10px"
      >
        General account settings
      </Typography>
      <Divider />
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingX="10px"
        height={"18%"}
      >
        <Typography fontWeight={"bold"}>Disconnect</Typography>
        <Typography>Disconnect user's account</Typography>
        <LoadingButton
          onClick={handleLogout}
          loading={loading}
          variant="contained"
          color="error"
        >
          Logout
        </LoadingButton>
      </Box>
      <Divider light />
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingX="10px"
        height={"18%"}
      >
        <Typography fontWeight={"bold"}>Devices</Typography>
        <Typography>
          Control access to this account, by sign out all devices.
        </Typography>
        <LoadingButton
          onClick={handleDisconnectDevices}
          loading={loading}
          variant="contained"
          color="error"
        >
          Sign out
        </LoadingButton>
      </Box>
      <Divider light />
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingX="10px"
        height={"18%"}
      >
        <Typography fontWeight={"bold"}>Account</Typography>
        <Typography>
          Permanently delete your account, you cannot come back after it.
        </Typography>
        <LoadingButton
          onClick={handleDeleteAccount}
          loading={loading}
          variant="contained"
          color="error"
        >
          delete account
        </LoadingButton>
      </Box>
      <Divider />
    </Box>
  );
};

export default Settings;
