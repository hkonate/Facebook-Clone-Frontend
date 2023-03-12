import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Post from "./Post";
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

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user: CurrentUser } = useContext(AuthContext);
  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchPosts = async () => {
        const res = await axios.get("http://localhost:3000/feed", {
          headers: {
            Authorization: `Bearer ${CurrentUser?.authTokens[0][0].authToken}`,
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
    } catch (error) {}
  }, [CurrentUser?._id, CurrentUser?.authTokens]);

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
          {posts?.map((post) => {
            return (
              <Post
                key={post?._id}
                post={post}
                setPosts={setPosts}
                posts={posts}
              />
            );
          })}
        </>
      )}
      <Add posts={posts} setPosts={setPosts} />
    </>
  );
};

export default Feed;
