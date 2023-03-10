import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ProfileFeed from "../../components/ProfileFeed";

const Profile = () => {
  const userID = useParams().id;
  return (
    <Box flex="4">
      <ProfileFeed userID={userID} />
    </Box>
  );
};
export default Profile;
