import { useContext, useEffect, useState } from "react";
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

const Post = ({ post, setPosts, posts }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post ? post?.likes?.length : 0);
  const [isLiked, setIsLiked] = useState(
    post?.likes?.includes(currentUser._id)
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    //fecth user's informations for each post
    const fetchUser = async () => {
      try {
        //if the current user is the owner of this post state it
        if (currentUser.data._id === post?.userId) setUser(currentUser.data);
        //else if post's user info is already in user state and state does exist do not fecth again otherwise fecth
        else if ((user && user._id !== post?.userId) || !user) {
          const res = await axios.get(
            `http://localhost:3000/user/${post?.userId}`,
            {
              headers: {
                Authorization: `Bearer ${currentUser?.data?.authTokens[0][0].authToken}`,
              },
            }
          );
          setUser(res.data.data);
        }
        setIsLiked(post?.likes?.length);
      } catch (error) {}
    };
    //if we got a post fetch for user's info
    if (post) fetchUser();
  }, [post?.userId]);

  //if a post is not like, like it otherwise dislike
  const likeHandler = async () => {
    try {
      await axios.post(`http://localhost:3000/post/affinities/${post?._id}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.data?.authTokens[0][0].authToken}`,
        },
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  //send request to delete post
  const requestDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/post/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.data?.authTokens[0][0].authToken}`,
        },
      });

      //hide menu and render new Post list
      setAnchorEl(null);
      setPosts(posts.filter((el) => el._id !== postId));
    } catch (error) {
      console.log(error);
    }
  };

  //display menu on click
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //hide menu on close
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //capitalize users name
  const capitalizeFirstname =
    user?.firstname[0]?.toUpperCase() + user?.firstname?.slice(1);
  const capitalizeLastname =
    user?.lastname[0]?.toUpperCase() + user?.lastname?.slice(1);

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          user?.profilePicture ? (
            <Avatar
              sx={{ bgcolor: "red" }}
              src={user?.profilePicture}
              aria-label="recipe"
            />
          ) : (
            <Avatar
              sx={{ bgcolor: "red", textTransform: "uppercase" }}
              aria-label="recipe"
            >
              {user?.firstname[0]}
            </Avatar>
          )
        }
        action={
          <>
            <IconButton
              disabled={post?.userId !== currentUser?.data?._id}
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
        }
        title={user && capitalizeFirstname + " " + capitalizeLastname}
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
            {like + (post?.likes?.length > 0 ? " Likes" : " Like")}
          </Typography>
        </CardContent>
      </CardActions>
    </Card>
  );
};

export default Post;
