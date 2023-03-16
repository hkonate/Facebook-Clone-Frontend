import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import FeedSkeleton from "./FeedSkeleton";
import axios from "axios";
import Add from "./Add";
import { AuthContext } from "../context/authentification/AuthContext";
import { Typography, Box } from "@mui/material";

const Feed = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user: CurrentUser } = useContext(AuthContext);
  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchPosts = async () => {
        const res = await axios.get(
          "facebook-clone-backend-production.up.railway.app/feed",
          {
            headers: {
              Authorization: `Bearer ${CurrentUser?.authTokens[0][0].authToken}`,
            },
          }
        );

        if (res.data.data.length > 1) {
          setPosts(
            res?.data?.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        } else if (res?.data?.data.length > 0) {
          setPosts([res?.data?.data]);
        }
        setIsLoading(false);
      };
      if (CurrentUser) fetchPosts();
    } catch (error) {}
  }, [CurrentUser]);
  return (
    <>
      {isLoading ? (
        <FeedSkeleton />
      ) : !posts ? (
        <Box
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
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
        </Box>
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
