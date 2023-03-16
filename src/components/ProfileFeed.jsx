import * as React from "react";
import ProfilePost from "./ProfilePost";
import axios from "axios";
import Add from "./Add";
import ProfileFeedSkeleton from "./ProfileFeedSkeleton";
import { AuthContext } from "../context/authentification/AuthContext";
import { Box, Typography } from "@mui/material";
import Banner from "./Banner";
const ProfileFeed = ({ userID }) => {
  const [posts, setPosts] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const { user: CurrentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    try {
      setIsLoading(true);
      const fetchPosts = async () => {
        const res = await axios.get(`http://localhost:3000/post/${userID}`, {
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
        } else if (res?.data?.data.length > 0) {
          setPosts([res?.data?.data]);
        } else if (res?.data?.data.length === 0) {
          // Fetch the user information for the post
          const res = await axios.get(`http://localhost:3000/user/${userID}`, {
            headers: {
              // Include the user's authentication token in the request headers
              Authorization: `Bearer ${CurrentUser?.authTokens[0][0].authToken}`,
            },
          });
          setUser(res?.data?.data);
        }
        setIsLoading(false);
      };
      if (CurrentUser) fetchPosts();
    } catch (error) {
      setIsLoading(false);
    }
  }, [CurrentUser?._id, CurrentUser?.authTokens]);

  return (
    <>
      {isLoading ? (
        <ProfileFeedSkeleton />
      ) : !posts ? (
        <>
          <Banner
            setUser={setUser}
            user={user}
            ownProfile={CurrentUser?._id === userID}
          />
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
        </>
      ) : (
        <Box sx={{ width: { xs: "100%" } }}>
          <Banner
            setUser={setUser}
            user={user}
            ownProfile={CurrentUser?._id === userID}
          />
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
        </Box>
      )}
      {CurrentUser?._id === userID && <Add posts={posts} setPosts={setPosts} />}
    </>
  );
};

export default ProfileFeed;
