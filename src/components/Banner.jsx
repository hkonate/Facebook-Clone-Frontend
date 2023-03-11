import { Link } from "react-router-dom";
import { Box, Card, Avatar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  LocationOnRounded,
  LocationCityRounded,
  EmailRounded,
  Twitter,
  Instagram,
  Pinterest,
  LinkedIn,
  Facebook,
} from "@mui/icons-material";
import Update from "./Update";

const Banner = ({ user, ownProfile, setUser }) => {
  console.log(user, "okf");
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "350px",
            m: 2,
            position: "relative",
            overflow: "visible",
            background: `center / cover no-repeat url(${
              user?.coverPicture
                ? user?.coverPicture
                : "https://images.pexels.com/photos/12366046/pexels-photo-12366046.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            })`,
          }}
        >
          <Card
            sx={{
              width: "150px",
              height: "150px",
              backgroundColor: "white",
              position: "absolute",
              bottom: "-100px",
              left: "calc(50% - 75px)",
              borderRadius: "50%",
              p: "2px",
            }}
          >
            {user?.profilePicture ? (
              <Avatar
                src={user?.profilePicture}
                sx={{ bgcolor: "red", width: "100%", height: "100%" }}
              />
            ) : (
              <Avatar
                src={user?.profilePicture}
                sx={{ bgcolor: "red", width: "100%", height: "100%" }}
              >
                {user?.firstname[0].toUpperCase()}
              </Avatar>
            )}
          </Card>
        </Card>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "250px",
            m: 5,
            display: "flex",
            alignItems: "center",
            paddingX: 5,
            paddingTop: 4,
          }}
        >
          <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
            <Link to="https://www.facebook.com/" target="_blank">
              <Facebook sx={{ color: "silver" }} />
            </Link>
            <Link to="https://www.instagram.com/" target="_blank">
              <Instagram sx={{ color: "silver" }} />
            </Link>
            <Link to="https://twitter.com/" target="_blank">
              <Twitter sx={{ color: "silver" }} />
            </Link>
            <Link to="https://www.linkedin.com/" target="_blank">
              <LinkedIn sx={{ color: "silver" }} />
            </Link>
            <Link to="https://www.pinterest.com/" target="_blank">
              <Pinterest sx={{ color: "silver" }} />
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: !ownProfile ? 2 : 5,
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography
                component="span"
                fontSize="35px"
                textTransform={"capitalize"}
              >
                {user?.firstname}
              </Typography>

              <Typography
                component="span"
                fontSize="35px"
                textTransform={"capitalize"}
              >
                {user?.lastname}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "silver",
                gap: 5,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <LocationCityRounded />
                <Typography>{user?.city}</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <LocationOnRounded />
                <Typography>{user?.from}</Typography>
              </Box>
            </Box>
            <Box>
              {!ownProfile && (
                <LoadingButton
                  variant="contained"
                  aria-label="outlined primary"
                >
                  follow
                </LoadingButton>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {!ownProfile ? (
              <Link to={`mailto:${user?.email}`}>
                <EmailRounded sx={{ color: "silver" }} />
              </Link>
            ) : (
              <Update setUser={setUser} />
            )}
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Banner;
