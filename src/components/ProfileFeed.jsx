import * as React from "react";
import ProfilePost from "./ProfilePost";
import axios from "axios";
import Add from "./Add";
import ProfileFeedSkeleton from "./ProfileFeedSkeleton";
import { AuthContext } from "../context/authentification/AuthContext";
import { Box, Typography } from "@mui/material";
import Banner from "./Banner";

const ProfileFeed = ({ userID }) => {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const { user: CurrentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      const res = await axios.get(`http://localhost:3000/post/${userID}`, {
        headers: {
          Authorization: `Bearer ${CurrentUser?.authTokens[0][0].authToken}`,
        },
      });
      if (res.data.data.length > 1) {
        console.log(res.data.data, "hohoh");
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
  }, [CurrentUser?._id, CurrentUser?.authTokens]);
  console.log(CurrentUser, "feed");
  return (
    <>
      {isLoading ? (
        <ProfileFeedSkeleton />
      ) : posts.length === 0 ? (
        <Box
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          (
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
          )
        </Box>
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
