import axios from "axios";
import { useContext, useState } from "react";
import { Modal, styled, TextField, Tooltip, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MoreVert } from "@mui/icons-material";
import { Box } from "@mui/system";
import { AuthContext } from "../context/authentification/AuthContext";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Update = () => {
  //states
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
      if (e.target[0].value) {
        if (isFormDataEmpty) isFormDataEmpty = false;
        formdata.append("firstname", e.target[0].value);
      }
      if (e.target[1].value) {
        if (isFormDataEmpty) isFormDataEmpty = false;
        formdata.append("lastname", e.target[1].value);
      }
      if (e.target[2].value) {
        if (isFormDataEmpty) isFormDataEmpty = false;
        formdata.append("email", e.target[2].value);
      }
      if (e.target[3].value) {
        if (isFormDataEmpty) isFormDataEmpty = false;
        formdata.append("age", e.target[3].value);
      }
      if (e.target[4].value) {
        if (isFormDataEmpty) isFormDataEmpty = false;
        formdata.append("city", e.target[4].value);
      }
      if (e.target[5].value) {
        if (isFormDataEmpty) isFormDataEmpty = false;
        formdata.append("from", e.target[5].value);
      }

      //Update user current user's infos passed in formdata
      if (isFormDataEmpty) {
        setLoading(false);
        return;
      }
      const res = await axios.patch(
        "facebook-clone-backend-production.up.railway.app/user/update",
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
        <MoreVert sx={{ color: "silver", cursor: "pointer" }} />
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
          <Typography variant="h6" color="gray" textAlign="center">
            Modify Profile
          </Typography>

          <Box
            component={"form"}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              type="text"
              placeholder="Firstname"
              variant="standard"
              error={error}
              helperText={error ? "Incorrect entry." : null}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "rebeccapurple",
                },
              }}
            />
            <TextField
              type="text"
              placeholder="Lastname"
              variant="standard"
              error={error}
              helperText={error ? "Incorrect entry." : null}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "rebeccapurple",
                },
              }}
            />
            <TextField
              type="email"
              placeholder="Email"
              variant="standard"
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "rebeccapurple",
                },
              }}
              inputProps={{ minLength: "3", maxLength: "320" }}
              error={error}
              helperText={error ? "Incorrect entry." : null}
            />

            <TextField
              type="number"
              inputProps={{ min: "13" }}
              label="Age"
              InputLabelProps={{ style: { color: "rgb(0,0,0,0.4)" } }}
              variant="standard"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "0",
                  border: "none",
                  borderBottom: "1px solid currentcolor",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "rebeccapurple",
                },
              }}
            />

            <TextField
              type="text"
              placeholder="City"
              variant="standard"
              error={error}
              helperText={error ? "Incorrect entry." : null}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "rebeccapurple",
                },
              }}
            />
            <TextField
              type="text"
              placeholder="Country"
              variant="standard"
              error={error}
              helperText={error ? "Incorrect entry." : null}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "rebeccapurple",
                },
              }}
            />
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

export default Update;
