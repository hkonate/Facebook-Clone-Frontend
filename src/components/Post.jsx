import axios from "axios";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import { format } from "timeago.js";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authentification/AuthContext";
const Post = ({ post }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(post?.likes.includes(currentUser._id));
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/${post?.userId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.data?.authTokens[0][0].authToken}`,
            },
          }
        );
        console.log(post);
        if (res.data) {
          setUser(res.data.data);
          setIsLiked(post.likes.length);
        }
      } catch (error) {}
    };
    if (post) fetchUser();
  }, [post?.userId]);

  const likeHandler = async () => {
    try {
      console.log("coco");
      await axios.post(`http://localhost:3000/post/affinities/${post?._id}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.data?.authTokens[0][0].authToken}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const capitalizeFirstname =
    user?.firstname[0]?.toUpperCase() + user?.firstname?.slice(1);
  const capitalizeLastname =
    user?.lastname[0]?.toUpperCase() + user?.lastname?.slice(1);
  console.log(user, "letter");
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
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {"S"}
            </Avatar>
          )
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={user && capitalizeFirstname + " " + capitalizeLastname}
        subheader={format(post?.createdAt)}
      />
      <CardMedia
        component="img"
        height="20%"
        image={
          post?.img
            ? process.env.PUBLIC_URL + "/images/" + post?.img
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
            {like + (post?.likes.length > 0 ? " Likes" : " Like")}
          </Typography>
        </CardContent>
      </CardActions>
    </Card>
  );
};

export default Post;
