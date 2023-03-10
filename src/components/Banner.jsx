import { Box, Card, Avatar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Banner = ({ user, ownProfile }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "350px",
            m: 2,
            position: "relative",
            overflow: "visible",
            background: `center / cover no-repeat url(${
              user?.coverPicture
                ? user?.coverPicture
                : "https://images.pexels.com/photos/12366046/pexels-photo-12366046.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            })`,
          }}
        >
          <Card
            sx={{
              width: "150px",
              height: "150px",
              backgroundColor: "white",
              position: "absolute",
              bottom: "-100px",
              left: "calc(50% - 75px)",
              borderRadius: "50%",
              p: "2px",
            }}
          >
            {user?.profilePicture ? (
              <Avatar
                src={user?.profilePicture}
                sx={{ bgcolor: "red", width: "100%", height: "100%" }}
              />
            ) : (
              <Avatar
                src={user?.profilePicture}
                sx={{ bgcolor: "red", width: "100%", height: "100%" }}
              >
                {user?.firstname[0].toUpperCase()}
              </Avatar>
            )}
          </Card>
        </Card>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: "210px",
            backgroundColor: "red",
            m: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: 5,
            paddingTop: 4,
          }}
        >
          <Box>
            <Typography>ToTo</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Typography
                component="span"
                fontSize="35px"
                textTransform={"capitalize"}
              >
                {user?.firstname}
              </Typography>

              <Typography component="span" fontSize="35px">
                {user?.lastname}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 15,
                alignItems: "center",
              }}
            >
              <Box>
                <Typography>{user?.city}</Typography>
              </Box>
              <Box>
                <Typography>{user?.from}</Typography>
              </Box>
            </Box>
            <Box>
              {!ownProfile && (
                <LoadingButton
                  variant="contained"
                  aria-label="outlined primary"
                >
                  follow
                </LoadingButton>
              )}
            </Box>
          </Box>
          <Box>
            <Typography>Ty</Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Banner;
