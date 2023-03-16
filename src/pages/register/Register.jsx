import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Avatar,
  styled,
} from "@mui/material";
import { Visibility, VisibilityOff, AccountCircle } from "@mui/icons-material";
import { CardCover } from "@mui/joy";
import { LoadingButton } from "@mui/lab";

const CustomCard = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "row-reverse",
  borderRadius: "10px",
  overflow: "hiden",
  p: 0,
  [theme.breakpoints.up("md")]: { minHeight: "600px", width: "50%" },
  [theme.breakpoints.down("lg")]: { width: "100%", minHeight: "100%" },
}));

const CustomTitle = styled("h1")(({ theme }) => ({
  variant: "h4",
  color: "#555",
  fontWeight: "bold",
  [theme.breakpoints.up("xs")]: {
    fontSize: "40px",
  },
  [theme.breakpoints.only("xs")]: {
    fontSize: "18px",
  },
  mx: "20px",
  mb: "10px",
}));

const Register = () => {
  //states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  //handle all submit information
  const handleSubmit = async (e) => {
    e.preventDefault();
    //prevent page to refresh and start loading
    try {
      setIsFetching(true);
      if (error) setError((prev) => !prev);
      //checking if passwords are the same
      if (e.target[7].value !== e.target[9].value)
        throw new Error("Passwords are not the same");
      const fileSize = e.target[3].files[0].size; // file size in bytes
      const maxSize = 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit of 1 MB");
        setIsFetching((prev) => !prev);
        return;
      }
      //append all user info in formdata
      const formdata = new FormData();

      formdata.append("firstname", e.target[0].value);
      formdata.append("lastname", e.target[1].value);
      formdata.append("email", e.target[2].value);
      formdata.append("age", e.target[4].value);
      formdata.append("city", e.target[5].value);
      formdata.append("from", e.target[6].value);
      formdata.append("password", e.target[7].value);
      formdata.append("confirmPassword", e.target[9].value);
      formdata.append("img", e.target[3].files[0]);

      //send formdata info in order to pre-register user
      const res = await axios.post(
        "facebook-clone-backend-production.up.railway.app/register",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //user has been pre-register and mail of verification has been sent, end loading and move to verificationAcount page
      setIsFetching((prev) => !prev);
      navigate(`/verifyAccount/${res.data.data._id}`);
    } catch (error) {
      //set Error in order to signal under some fields and stop loading
      setError(true);
      setIsFetching(false);
    }
  };

  //handle if passwords are show or not
  const handleClickShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  //handle if confirm passwords are show or not
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prevState) => !prevState);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(193, 190, 255)",
      }}
    >
      <CustomCard>
        <Card
          component="li"
          sx={{
            position: "relative",
            flex: "1",
            borderRadius: "0",
          }}
        >
          <CardCover>
            <Paper
              sx={{
                background: `linear-gradient(rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5)),
                url(
                  "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=160"
                ) center`,
                backgroundSize: "cover",
              }}
            />
          </CardCover>
          <CardContent
            sx={{
              position: "absolute",
              p: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              color: "white",
              ml: "15px",
            }}
          >
            <Typography
              variant={"h2"}
              component={"h1"}
              fontWeight={"bold"}
              mt={"70px"}
              mb={"70px"}
            >
              FACEBOOK CLONE
            </Typography>
            <Typography component={"p"} mb={"90px"}>
              With Facebook, share and stay in touch with those around you.
            </Typography>
            <Typography component={"span"} fontSize={"14px"} mb={"10px"}>
              Do you have an account ?
            </Typography>
            <Link to="/login">
              <Button
                variant="contained"
                sx={{
                  width: "50%",
                  color: "rebeccapurple",
                  bgcolor: "white",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "rebeccapurple",
                    color: "white",
                  },
                }}
              >
                login
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card
          component="li"
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: "0",
          }}
        >
          <CustomTitle>Register</CustomTitle>
          <Box
            component={"form"}
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: "20px",
            }}
          >
            <TextField
              type="text"
              required
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
              required
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
              required
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
            <Box sx={{ display: "flex", alignItems: "center", gap: "25px" }}>
              <Box
                component={"label"}
                htmlFor="file"
                sx={{ cursor: "pointer" }}
              >
                {!file ? (
                  <AccountCircle
                    fontSize="large"
                    sx={{ mt: "15px", color: "silver" }}
                  />
                ) : (
                  <Avatar
                    alt="User's avatar"
                    src={file}
                    sx={{ mt: "15px", color: "silver" }}
                  />
                )}
                <Box
                  component={"input"}
                  type="file"
                  id="file"
                  accept=".png, .jpeg,.jpg"
                  sx={{ display: "none" }}
                  onChange={(e) =>
                    setFile(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </Box>
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
            </Box>
            <TextField
              type="text"
              required
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
              required
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
            <TextField
              type={showConfirmPassword ? "text" : "password"}
              required
              inputProps={{ minLength: "8" }}
              placeholder="password"
              variant="standard"
              error={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={error ? "Incorrect entry." : null}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "rebeccapurple",
                },
              }}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              required
              inputProps={{ minLength: "8" }}
              placeholder="Confirm password"
              variant="standard"
              error={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={error && "Incorrect entry."}
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "rebeccapurple",
                },
              }}
            />
            <LoadingButton
              variant="contained"
              type="submit"
              sx={{
                width: "50%",
                color: "white",
                bgcolor: "rebeccapurple",
                border: "none",
                "&:hover": {
                  backgroundColor: "white",
                  color: "rebeccapurple",
                },
                ml: "20px",
                my: "20px",
              }}
              loading={isFetching}
            >
              <Typography conponent={"span"}>register</Typography>
            </LoadingButton>
          </Box>
        </Card>
      </CustomCard>
    </Box>
  );
};
export default Register;
