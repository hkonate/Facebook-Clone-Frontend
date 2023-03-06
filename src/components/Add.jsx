import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import {
  Avatar,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Add as AddIcon,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { AuthContext } from "../context/authentification/AuthContext";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Add = () => {
  //states
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const desc = useRef();

  const handleSubmit = async (e) => {
    try {
      //prevent page to refresh and start loading
      e.preventDefault();
      setLoading(true);

      const formdata = new FormData();

      //append all post info in formdata
      formdata.append("desc", desc.current.children[0].childNodes[0].value);
      formdata.append("img", file);

      //create new post
      await axios.post("http://localhost:3000/post/create", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.data.authTokens[0][0].authToken}`,
        },
      });

      //close post modal and stop enable submit btn
      setOpen(false);
      setLoading(false);
    } catch (error) {
      //in case is error enable submit btn again
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Create Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => {
          setOpen(false);
          setFile(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          onBlur={() => (desc.current.value = null)}
          width={400}
          height={"auto"}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create post
          </Typography>
          <UserBox>
            <Avatar
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontWeight={500} variant="span">
              John Doe
            </Typography>
          </UserBox>
          {file && (
            <Avatar
              sx={{ width: "100%", height: "150px", borderRadius: "0px" }}
              src={URL.createObjectURL(file)}
              alt="img"
            />
          )}
          <Box
            component={"form"}
            onSubmit={(e) => {
              console.log("submit");
              handleSubmit(e);
            }}
          >
            <TextField
              onChange={() => {
                if (error) setError((prev) => !prev);
              }}
              ref={desc}
              sx={{ width: "100%" }}
              id="standard-multiline-static"
              multiline
              required
              error={error}
              helperText={error ? "Incorrect entry." : null}
              rows={3}
              placeholder="What's on your mind?"
              variant="standard"
            />
            <Stack direction="row" gap={1} mt={2} mb={3}>
              <EmojiEmotions color="primary" />
              <Box
                component={"label"}
                htmlFor="file"
                sx={{ cursor: "pointer" }}
              >
                <Image color="secondary" />
                <Box
                  component={"input"}
                  type="file"
                  id="file"
                  accept=".png, .jpeg,.jpg"
                  sx={{ display: "none" }}
                  onChange={(e) => {
                    console.log(
                      e.target.files[0],
                      "file",
                      typeof e.target.files[0]
                    );
                    setFile(e.target.files[0]);
                  }}
                />
              </Box>
              <VideoCameraBack color="success" />
              <PersonAdd color="error" />
            </Stack>
            <LoadingButton
              onClick={() => {
                if (!desc.current.children[0].childNodes[0].value && !error)
                  setError(true);
              }}
              loading={loading}
              variant="contained"
              aria-label="outlined primary"
              fullWidth
              type="submit"
            >
              Post
            </LoadingButton>
          </Box>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
