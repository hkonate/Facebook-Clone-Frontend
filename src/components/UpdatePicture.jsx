import axios from "axios";
import { useContext, useState } from "react";
import {
  Button,
  Modal,
  styled,
  Avatar,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import { AuthContext } from "../context/authentification/AuthContext";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UpdatePicture = () => {
  //states
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useState(null);
  const [picture, setPicture] = useState(null);
  const { user, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //prevent page to refresh and start loading

      setLoading(true);
      if (error) setError((prev) => !prev);

      let isFormDataEmpty = true;
      const formdata = new FormData();

      //append all post info in formdata
      if (picture) {
        if (isFormDataEmpty) isFormDataEmpty = false;
        formdata.append("profilePicture", picture);
      }
      if (cover) {
        if (isFormDataEmpty) isFormDataEmpty = false;
        formdata.append("coverPicture", cover);
      }

      //Update user current user's infos passed in formdata
      if (isFormDataEmpty) {
        setLoading(false);
        return;
      }

      const res = await axios.patch(
        "http://localhost:3000/user/update",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${user?.authTokens[0][0].authToken}`,
          },
        }
      );
      dispatch({ type: "UPDATE_PROFILE", payload: res.data });

      //close post modal and stop enable submit btn
      setOpen((prev) => !prev);
      setLoading((prev) => !prev);
    } catch (error) {
      //in case is error enable submit btn again
      setError(true);
      setLoading(false);
    }
  };
  return (
    <>
      <Tooltip onClick={(e) => setOpen(true)} title="Modify Profile">
        <Button variant="contained" sx={{ fontSize: "10px" }}>
          Modify
        </Button>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={"auto"}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
          sx={{ outline: "none" }}
        >
          <Typography variant="h6" color="gray" textAlign="center" mb={5}>
            Modify Profile
          </Typography>

          <Box
            component={"form"}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 5 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography component={"span"} sx={{ fontWeight: "bold" }}>
                Avatar
              </Typography>
              <Box
                component={"label"}
                htmlFor="avatar"
                sx={{ cursor: "pointer" }}
              >
                <Box
                  variant="outlined"
                  sx={{ border: "none", color: "#1976d2", cursor: "pointer" }}
                >
                  Modify
                </Box>
                <Box
                  component={"input"}
                  type="file"
                  id="avatar"
                  accept=".png, .jpeg,.jpg"
                  sx={{ display: "none" }}
                  onChange={(e) => {
                    setPicture(e.target.files[0]);
                  }}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              {picture ? (
                <Avatar
                  sx={{ height: "100px", width: "100px" }}
                  src={URL.createObjectURL(picture)}
                  alt="user's avatar"
                />
              ) : (
                <Avatar
                  sx={{ height: "100px", width: "100px" }}
                  alt="user's avatar"
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography component={"span"} sx={{ fontWeight: "bold" }}>
                Cover
              </Typography>
              <Box
                component={"label"}
                htmlFor="cover"
                sx={{ cursor: "pointer" }}
              >
                <Box
                  variant="outlined"
                  sx={{ border: "none", color: "#1976d2", cursor: "pointer" }}
                >
                  Modify
                </Box>
                <Box
                  component={"input"}
                  type="file"
                  id="cover"
                  accept=".png, .jpeg,.jpg"
                  sx={{ display: "none" }}
                  onChange={(e) => {
                    setCover(e.target.files[0]);
                  }}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              {cover ? (
                <Avatar
                  fullWidth
                  sx={{
                    height: "100px",
                    width: "100%",
                    borderRadius: "0px",
                  }}
                  src={URL.createObjectURL(cover)}
                  alt="user's avatar"
                />
              ) : (
                <Avatar
                  fullWidth
                  sx={{
                    height: "100px",
                    width: "100%",
                    borderRadius: "0px",
                  }}
                  alt="user's avatar"
                />
              )}
            </Box>
            <LoadingButton
              loading={loading}
              variant="contained"
              aria-label="outlined primary"
              fullWidth
              type="submit"
            >
              Update
            </LoadingButton>
          </Box>
        </Box>
      </SytledModal>
    </>
  );
};

export default UpdatePicture;
