import { Link } from "react-router-dom";
import { Box, Card, Avatar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  LocationOnRounded,
  LocationCityRounded,
  EmailRounded,
  Twitter,
  Instagram,
  LinkedIn,
  Facebook,
} from "@mui/icons-material";
import Update from "./Update";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authentification/AuthContext";
import axios from "axios";
import UpdatePicture from "./UpdatePicture";

const Banner = ({ user, ownProfile, setUser }) => {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  //Follow a user
  const handleFollow = async () => {
    try {
      setLoading(true);
      await axios.patch(
        "https://facebook-clone-backend-dev-tzqz.1.ie-1.fl0.io/user/connections",
        {
          id: user._id,
          action: "follow",
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.authTokens[0][0].authToken}`,
          },
        }
      );
      dispatch({ type: "FOLLOW", payload: user._id });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  //Unfollow a user
  const handleUnfollow = async () => {
    try {
      setLoading(true);
      await axios.patch(
        "https://facebook-clone-backend-dev-tzqz.1.ie-1.fl0.io/user/connections",
        {
          id: user._id,
          action: "unfollow",
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.authTokens[0][0].authToken}`,
          },
        }
      );
      dispatch({ type: "UNFOLLOW", payload: user._id });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {ownProfile && (
          <Card
            sx={{
              position: "absolute",
              bottom: "30px",
              right: "30px",
              zIndex: "1",
            }}
          >
            <UpdatePicture />
          </Card>
        )}
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
            paddingX: 2,
            paddingTop: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flex: 1,
              flexDirection: { xs: "column" },
            }}
          >
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
                gap: 3,
                mt: { xs: 7 },
                ml: { xs: 3 },
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
              {!ownProfile &&
                (currentUser.followings.findIndex((el) => el === user?._id) ===
                -1 ? (
                  <LoadingButton
                    loading={loading}
                    onClick={handleFollow}
                    variant="contained"
                    aria-label="outlined primary"
                  >
                    follow
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    loading={loading}
                    onClick={handleUnfollow}
                    variant="contained"
                    aria-label="outlined"
                    sx={{ backgroundColor: "silver" }}
                  >
                    unfollow
                  </LoadingButton>
                ))}
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
