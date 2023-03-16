import React from "react";
import { Card, Box, Skeleton, CardHeader, CardContent } from "@mui/material";

const ProfileFeedSkeleton = () => {
  return (
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "25%",
          width: "100%",
          marginBottom: "45px",
        }}
      >
        <Card
          sx={{
            width: "80%",
            height: "100%",
            m: 2,
            mb: 7,
            position: "relative",
            overflow: "visible",
          }}
        >
          <Skeleton
            sx={{ height: "100%" }}
            animation="wave"
            variant="rectangular"
          />
          <Card
            sx={{
              width: "150px",
              height: "150px",
              backgroundColor: "white",
              position: "absolute",
              bottom: "-50px",
              left: "42%",
              borderRadius: "50%",
              p: "2px",
            }}
          >
            <Skeleton
              animation="wave"
              variant="circular"
              width={"100%"}
              height={"100%"}
            />
          </Card>
        </Card>
      </Box>

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
  );
};

export default ProfileFeedSkeleton;
