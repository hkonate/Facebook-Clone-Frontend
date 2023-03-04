import * as React from "react";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Skeleton,
} from "@mui/material";
import Post from "./Post";
import axios from "axios";

import { AuthContext } from "../context/authentification/AuthContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log("step Feed");
    setIsLoading(true);
    const fetchPosts = async () => {
      console.log("step feedd 2");
      const res = await axios.get("http://localhost:3000/feed", {
        headers: {
          Authorization: `Bearer ${user?.data?.authTokens[0][0].authToken}`,
        },
      });
      console.log("lpm");
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
      console.log(res.data, "step fecth");
    };
    if (user) fetchPosts();
  }, [user.data._id, user?.data?.authTokens]);

  return (
    <Box
      sx={
        posts.length === 0 && {
          display: "flex",
          alignItems: "center",
          flexDirection: isLoading && "column",
          justifyContent: "center",
          height: "100vh",
        }
      }
    >
      {isLoading ? (
        <>
          <Card sx={{ width: "75%", height: "38%", m: 2 }}>
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
              sx={{ height: "65%" }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            </CardContent>
          </Card>
          <Card sx={{ width: "75%", height: "38%", m: 2 }}>
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
              sx={{ height: "65%" }}
              animation="wave"
              variant="rectangular"
            />
            <CardContent>
              <React.Fragment>
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            </CardContent>
          </Card>
        </>
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
        posts?.map((post) => {
          return <Post key={post?._id} post={post} />;
        })
      )}
    </Box>
  );
};

export default Feed;
