import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authentification/AuthContext";
import { format } from "timeago.js";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Menu,
  MenuItem,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";

const ProfilePost = ({ post, setPosts, posts, setUser, user }) => {
  // Get the current user from the AuthContext
  const { user: currentUser } = useContext(AuthContext);

  // Initialize state variables
  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the delete post menu
  const [capitalizeName, setCapitalizeName] = useState(null); // Capitalized name of the user who created the post
  const [like, setLike] = useState(post ? post?.likes?.length : 0); // Number of likes for this post
  const [isLiked, setIsLiked] = useState(false);

  // Get the navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if the delete post menu is open
  const open = Boolean(anchorEl);

  // Fetch the user information for the post
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // If the current user is the owner of this post, set the user state to the current user
        if (currentUser._id === post?.userId) setUser(currentUser);
        // Else if the user state already exists and is not the post creator, do not fetch again. Otherwise, fetch the user data.
        else if ((user && user?._id !== post?.userId) || !user) {
          const res = await axios.get(
            `https://facebook-clone-backend-dev-tzqz.1.ie-1.fl0.io/user/${post?.userId}`,
            {
              headers: {
                // Include the user's authentication token in the request headers
                Authorization: `Bearer ${currentUser?.authTokens[0][0].authToken}`,
              },
            }
          );

          setUser(res.data.data);
        }
        setIsLiked(post?.likes?.includes(currentUser?._id));
      } catch (error) {}
    };
    // If a post exists, fetch user information for that post
    if (post) fetchUser();
  }, [post, currentUser, setUser, user]);

  // Update the capitalized name state variable for each post
  useEffect(() => {
    if (user) {
      const { firstname, lastname } = user;
      setCapitalizeName(
        firstname && lastname
          ? `${firstname[0].toUpperCase()}${firstname.slice(
              1
            )} ${lastname[0].toUpperCase()}${lastname.slice(1)}`
          : null
      );
    }
  }, [user]);

  // Handle like button clicks
  const likeHandler = async () => {
    try {
      await axios.post(
        `https://facebook-clone-backend-dev-tzqz.1.ie-1.fl0.io/post/affinities/${post?._id}`,
        null,
        {
          headers: {
            // Include the user's authentication token in the request headers
            Authorization: `Bearer ${currentUser?.authTokens[0][0].authToken}`,
          },
        }
      );
      setIsLiked((prevIsLiked) => !prevIsLiked);
      setLike(isLiked ? like - 1 : like + 1);
    } catch (err) {}
  };

  // Function to send a request to delete a post
  const requestDeletePost = async (postId) => {
    try {
      // Send a DELETE request to the server to delete the post with the specified ID
      await axios.delete(
        `https://facebook-clone-backend-dev-tzqz.1.ie-1.fl0.io/post/delete/${postId}`,
        {
          headers: {
            // Include the user's authentication token in the request headers
            Authorization: `Bearer ${currentUser?.authTokens[0][0].authToken}`,
          },
        }
      );

      // If the request is successful, hide the menu and update the list of posts
      setAnchorEl(null);
      setPosts([...posts].filter((el) => el._id !== postId));
    } catch (error) {
      // If the request fails, hide the menu
      setAnchorEl(null);
    }
  };

  // Function to display the menu when the user clicks on the ellipsis button
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to hide the menu when the user clicks outside of it or selects an option
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to navigate to the profile of the user who created the post
  const handleNavigateToProfile = () => {
    navigate(`/profile/${post?.userId}`);
  };

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          user?.profilePicture ? (
            <Avatar
              onClick={handleNavigateToProfile}
              sx={{ bgcolor: "red", cursor: "pointer" }}
              src={user?.profilePicture}
              aria-label="recipe"
            />
          ) : (
            <Avatar
              onClick={handleNavigateToProfile}
              sx={{
                bgcolor: "red",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
              aria-label="recipe"
            >
              {user?.firstname[0]}
            </Avatar>
          )
        }
        action={
          currentUser?._id === post?.userId && (
            <>
              <IconButton
                disabled={post?.userId !== currentUser?._id}
                onClick={(e) => handleClick(e)}
                aria-label="more"
              >
                <MoreVert />
              </IconButton>
              <Menu
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <MenuItem
                  onClick={() => {
                    requestDeletePost(post?._id);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </>
          )
        }
        title={
          user && (
            <Typography
              component={"span"}
              onClick={handleNavigateToProfile}
              sx={{ cursor: "pointer" }}
            >
              {capitalizeName}
            </Typography>
          )
        }
        subheader={format(post?.createdAt)}
      />
      <CardMedia
        component="img"
        height="20%"
        image={
          post?.img
            ? post?.img
            : "https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
        alt={post?._id}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post?.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={likeHandler}>
          <Checkbox
            checked={isLiked}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <CardContent sx={{ mt: "5px" }}>
          <Typography variant="body2" color="text.secondary" fontSize={"16px"}>
            {like + (post?.likes?.length > 1 ? " Likes" : " Like")}
          </Typography>
        </CardContent>
      </CardActions>
    </Card>
  );
};

export default ProfilePost;
