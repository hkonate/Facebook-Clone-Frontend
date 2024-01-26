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
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
const VerifyAccount = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [send, setSend] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  const user = useParams();

  const handleVerification = async (e) => {
    e.preventDefault();
    //Loading start
    setIsFetching(true);
    if (error) setError(false);
    try {
      //active account
      await axios.post(
        `https://facebook-clone-backend-dev-tzqz.1.ie-1.fl0.io/otpVerification/${user.id}`,
        {
          otp: e.target[1].value,
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
        "https://facebook-clone-backend-dev-tzqz.1.ie-1.fl0.io/otpResend",
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
        navigate(`/verifyAccount/${data.data._id}`);
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
            height: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "100px",
          }}
        >
          <MarkEmailReadOutlinedIcon
            fontSize="inherit"
            sx={{ color: "gray" }}
          />
        </Box>
        <Typography
          variant="h3"
          component={"h1"}
          error={error}
          textAlign="center"
          color={"silver"}
          mt="20px"
          mb={{ xs: "15px", sm: "45px", md: "45px", lg: "45px" }}
        >
          Verify Account
        </Typography>
        <Container
          component={"form"}
          onSubmit={handleVerification}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "5px", sm: "5px", md: "40px", lg: "40px" },
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
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column-reverse",
              mt: "60px",
              gap: "20px",
            }}
          >
            <LoadingButton
              onClick={handleResendCode}
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
              <Typography component={"span"}>Verify</Typography>
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
          You will be redirect in few seconds...
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

export default VerifyAccount;
