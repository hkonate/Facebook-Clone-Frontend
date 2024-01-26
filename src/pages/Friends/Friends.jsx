import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Typography, Card, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { AuthContext } from "../../context/authentification/AuthContext";

const Friends = () => {
  const { user, dispatch } = useContext(AuthContext);

  const [friends, setFriends] = useState(null);
  const [loading, setLoading] = useState(false);

  const fecthFriends = useCallback(async () => {
    try {
      setLoading((prev) => !prev);
      const res = await axios.get(
        "https://facebook-clone-backend-dev-tzqz.1.ie-1.fl0.io/users",
        {
          headers: {
            Authorization: `Bearer ${user?.authTokens[0][0].authToken}`,
          },
        }
      );
      setFriends(res.data);
      setLoading((prev) => !prev);
    } catch (error) {
      setLoading((prev) => !prev);
    }
  }, [user?.authTokens]);

  useEffect(() => {
    fecthFriends();
  }, [fecthFriends]);

  const handleFollow = async (id) => {
    try {
      setLoading(true);
      await axios.patch(
        "https://facebook-clone-backend-dev-tzqz.1.ie-1.fl0.io/user/connections",
        {
          id: id,
          action: "follow",
        },
        {
          headers: {
            Authorization: `Bearer ${user?.authTokens[0][0].authToken}`,
          },
        }
      );
      dispatch({ type: "FOLLOW", payload: id });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box flex="4" bgcolor={"#F0F2F5"} height="100vh" padding={"15px"}>
      <Typography
        variant={"h6"}
        mt={5}
        mb={2}
        fontWeight={"bold"}
        sx={{ color: "gray" }}
      >
        You may know
      </Typography>
      <Box display="flex" bgcolor={"#F0F2F5"} gap={1} sx={{ flexWrap: "wrap" }}>
        {friends?.length > 0 ? (
          friends.map((friend, idx) => {
            return (
              <Card key={idx} sx={{ height: "300px", flexBasis: "200px" }}>
                {friend?.profilePicture ? (
                  <Avatar
                    sx={{
                      borderRadius: "0px",
                      height: "50%",
                      width: "100%",
                      mb: "15px",
                      backgroundColor: "red",
                    }}
                    src={friend && friend.profilePicture}
                  />
                ) : (
                  <Avatar
                    sx={{
                      borderRadius: "0px",
                      height: "50%",
                      width: "100%",
                      mb: "15px",
                      fontSize: "45px",
                      backgroundColor: "red",
                    }}
                    src={friend && friend.profilePicture}
                  >
                    {friend.firstname[0].toUpperCase()}
                  </Avatar>
                )}
                <Box display={"flex"} gap={1} paddingLeft={"10px"} mb={6}>
                  <Typography
                    sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                  >
                    {friend.firstname}
                  </Typography>
                  <Typography
                    sx={{ textTransform: "capitalize", fontWeight: "bold" }}
                  >
                    {friend.lastname}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <LoadingButton
                    onClick={() => handleFollow(friend._id)}
                    variant="contained"
                    sx={{ width: "90%" }}
                    loading={loading}
                  >
                    Follow
                  </LoadingButton>
                </Box>
              </Card>
            );
          })
        ) : (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent="center"
            width={"100%"}
            mt={"25%"}
          >
            <Typography
              variant="h3"
              component={"span"}
              sx={{ color: "gray", textTransform: "uppercase" }}
            >
              no friends to add
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Friends;
