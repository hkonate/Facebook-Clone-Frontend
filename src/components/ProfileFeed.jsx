import * as React from "react";
import { useContext, useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";
import axios from "axios";
import Add from "./Add";
import { AuthContext } from "../context/authentification/AuthContext";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Skeleton,
} from "@mui/material";
import Banner from "./Banner";

const ProfileFeed = ({ userID }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const { user: CurrentUser } = useContext(AuthContext);
  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:3000/post/${userID}`, {
        headers: {
          Authorization: `Bearer ${CurrentUser?.data?.authTokens[0][0].authToken}`,
        },
      });

      if (res.data.data.length > 1) {
        setPosts(
          res?.data?.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } else {
        setPosts([res?.data?.data]);
      }
      setIsLoading(false);
    };
    if (CurrentUser) fetchPosts();
  }, [CurrentUser.data._id, CurrentUser?.data?.authTokens, CurrentUser]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: "4",
            flexDirection: "column",
            height: "100vh",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "25%",
              width: "100%",
              marginBottom: "45px",
            }}
          >
            <Card
              sx={{
                width: "80%",
                height: "100%",
                m: 2,
                mb: 7,
                position: "relative",
                overflow: "visible",
              }}
            >
              <Skeleton
                sx={{ height: "100%" }}
                animation="wave"
                variant="rectangular"
              />
              <Card
                sx={{
                  width: "150px",
                  height: "150px",
                  backgroundColor: "white",
                  position: "absolute",
                  bottom: "-50px",
                  left: "42%",
                  borderRadius: "50%",
                  p: "2px",
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={"100%"}
                  height={"100%"}
                />
              </Card>
            </Card>
          </Box>

          <Card sx={{ width: "80%", height: "40%", m: 2 }}>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="40%" />}
            />
            <Skeleton
              sx={{ height: "63%" }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            </CardContent>
          </Card>
          <Card sx={{ width: "80%", height: "40%", m: 2 }}>
            <CardHeader
              avatar={
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              }
              title={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              }
              subheader={<Skeleton animation="wave" height={10} width="40%" />}
            />
            <Skeleton
              sx={{ height: "63%" }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            </CardContent>
          </Card>
        </Box>
      ) : posts.length === 0 ? (
        <Typography
          sx={{
            color: "silver",
            fontWeight: "bold",
            fontSize: "85px",
            textAlign: "center",
          }}
        >
          NO CONTENT
        </Typography>
      ) : (
        <>
          <Banner user={user} ownProfile={CurrentUser?.data?._id === userID} />
          {posts?.map((post) => {
            return (
              <ProfilePost
                key={post?._id}
                post={post}
                setPosts={setPosts}
                posts={posts}
                setUser={setUser}
                user={user}
              />
            );
          })}
        </>
      )}
      {CurrentUser?.data?._id === userID && (
        <Add posts={posts} setPosts={setPosts} />
      )}
    </>
  );
};

export default ProfileFeed;
