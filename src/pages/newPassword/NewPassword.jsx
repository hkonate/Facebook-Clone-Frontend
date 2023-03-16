import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  TextField,
  Typography,
  Container,
  Alert,
  Collapse,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Close,
  LockResetOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [send, setSend] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  const user = useParams();

  //handle if passwords are show or not
  const handleClickShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prevState) => !prevState);

  const handleReset = async (e) => {
    e.preventDefault();
    //Loading start
    setIsFetching(true);
    if (error) setError(false);
    try {
      //active account
      await axios.post(
        `facebook-clone-backend-production-25dd.up.railway.app/newPassword/${user.id}`,
        {
          otp: e.target[1].value,
          password: e.target[2].value,
          confirmPassword: e.target[4].value,
        }
      );
      //active the popper because the account has been active
      setOpen(true);
      //time the popper and navigate to login
      setTimeout(() => {
        if (open) setOpen(false);
        setIsFetching(false);
        navigate("/login");
      }, 5000);
    } catch (err) {
      setError(true);
      setIsFetching(false);
    }
  };

  const handleResendCode = async (e) => {
    //Loading start
    setIsFetching(true);
    if (error) setError(false);
    try {
      //send another code by mail
      const { data } = await axios.post(
        `facebook-clone-backend-production-25dd.up.railway.app/password/otpResend`,
        {
          email: emailRef.current.children[1].children[0].value,
        }
      );
      //display the popper because a new code has been sent
      setSend(true);
      //time the popper
      setTimeout(() => {
        setSend(false);
        setIsFetching(false);
        navigate(`/newPassword/${data.data._id}`);
      }, 3000);
    } catch (err) {
      setError(true);
      setIsFetching(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(193, 190, 255)",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "column" },
          backgroundColor: "white",
          height: { xs: "100%", sm: "100%", md: "70%", lg: "70%" },
          width: "40%",
        }}
      >
        <Box
          sx={{
            height: { xs: "5%", sm: "10%", md: "15%", lg: "20%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: { xs: "24px", sm: "24px", md: "lg", lg: "100px" },
          }}
        >
          <LockResetOutlined fontSize="inherit" sx={{ color: "gray" }} />
        </Box>
        <Typography
          variant="h3"
          component={"h1"}
          error={error}
          textAlign="center"
          color={"silver"}
          mt="10px"
          mb={{ xs: "0px", sm: "0px", md: "15px", lg: "15px" }}
          sx={{ fontSize: { xs: "20px", sm: "20px", md: "35px", lg: "35px" } }}
        >
          Reset Password
        </Typography>
        <Container
          component={"form"}
          onSubmit={handleReset}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "px", sm: "0px", md: "10px", lg: "10px" },
          }}
        >
          <TextField
            type="email"
            label="Email"
            variant="standard"
            ref={emailRef}
            required
            error={error}
            helperText={error ? "Incorrect entry." : null}
          />
          <TextField
            type="text"
            label="Code"
            variant="standard"
            required
            error={error}
            helperText={error ? "Incorrect entry." : null}
            inputProps={{ minLength: "6", maxLength: "6" }}
          />
          <TextField
            type={showConfirmPassword ? "text" : "password"}
            required
            inputProps={{ minLength: "8" }}
            label="password"
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
            label="Confirm password"
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
            helperText={error ? "Incorrect entry." : null}
            sx={{
              "& .MuiInput-underline:after": {
                borderBottomColor: "rebeccapurple",
              },
            }}
          />
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column-reverse",
              mt: error ? "10px" : "80px",
              gap: "20px",
            }}
          >
            <LoadingButton
              onClick={handleResendCode}
              error={error}
              helperText={error ? "Incorrect entry." : null}
              loading={isFetching}
              fullWidth={true}
              sx={{
                color: "white",
                bgcolor: isFetching ? "silver" : "rebeccapurple",
                "&:hover": {
                  color: "rebeccapurple",
                },
              }}
            >
              <Typography component={"span"}>Resend</Typography>
            </LoadingButton>
            <LoadingButton
              type="submit"
              error={error}
              helperText={error ? "Incorrect entry." : null}
              loading={isFetching}
              fullWidth={true}
              sx={{
                color: "white",
                bgcolor: isFetching ? "silver" : "rebeccapurple",
                "&:hover": {
                  color: "rebeccapurple",
                },
              }}
            >
              <Typography component={"span"}>Reset</Typography>
            </LoadingButton>
          </Box>
        </Container>
      </Card>
      <Collapse
        in={open}
        sx={{
          display: "flex",
          position: "absolute",
          bottom: "20px",
          right: "30px",
        }}
      >
        <Alert
          variant="filled"
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          Your password has been updated, you will be redirect in few seconds...
        </Alert>
      </Collapse>
      <Collapse
        in={send}
        sx={{
          display: "flex",
          position: "absolute",
          bottom: "20px",
          right: "30px",
        }}
      >
        <Alert
          variant="filled"
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSend(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          A new code has been sent. Check your mail !
        </Alert>
      </Collapse>
    </Box>
  );
};

export default NewPassword;
