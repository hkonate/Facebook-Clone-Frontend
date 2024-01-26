import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authentification/AuthContext";
import { loginCall } from "../../api";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CardCover } from "@mui/joy";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const navigate = useNavigate();
  const { error, isFetching, dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();

  //handle log in
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: e.target[0].value, password: e.target[1].value },
      dispatch
    );
    navigate("/");
  };

  //hide or show password
  const handleClickShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  //reset password and navigate to newPassword page
  const handlePassword = async () => {
    try {
      const { data } = await axios.post(
        "https://facebook-clone-backend-dev-tzqz.1.ie-1.fl0.io/password/Reset",
        { email: emailRef.current.children[0].children[0].value }
      );
      navigate(`/newPassword/${data.data._id}`);
    } catch (error) {}
  };
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
      <Card
        component="ul"
        sx={{
          minHeight: { xs: "100%", sm: "100%", md: "100%", lg: "600px" },
          width: { xs: "100%", sm: "100%", md: "100%", lg: "50%" },
          display: "flex",
          borderRadius: "10px",
          overflow: "hidden",
          p: 0,
        }}
      >
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
              Don't you have an account ?
            </Typography>
            <Link to="/register">
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
                register
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
            gap: "90px",
            borderRadius: "0",
          }}
        >
          <Typography
            variant="h4"
            component={"h1"}
            color={"#555"}
            fontWeight={"bold"}
            mx={"20px"}
            mb={"35px"}
          >
            Login
          </Typography>
          <Box
            onSubmit={handleClick}
            component={"form"}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              mx: "20px",
            }}
          >
            <TextField
              type="email"
              required
              ref={emailRef}
              placeholder="Email"
              variant="standard"
              error={error}
              label={error ? "Error" : null}
              helperText={error ? "Incorrect entry." : null}
              inputProps={{ minLength: "3", maxLength: "320" }}
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
              placeholder="password"
              variant="standard"
              error={error}
              label={error ? "Error" : null}
              helperText={error ? "Incorrect entry." : null}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              }}
              loading={isFetching}
            >
              <Typography conponent={"span"}>login</Typography>
            </LoadingButton>
            <Box onClick={handlePassword} w={"50px"} sx={{ cursor: "pointer" }}>
              <Typography
                component={"span"}
                sx={{
                  color: "#1976d2",
                  borderBottom: "1px solid #1976d2",
                }}
              >
                You forgot your password ?
              </Typography>
            </Box>
          </Box>
        </Card>
      </Card>
    </Box>
  );
};
export default Login;
