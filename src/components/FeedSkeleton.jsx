import { Card, CardHeader, Skeleton, Box, CardContent } from "@mui/material";

import React from "react";

const FeedSkeleton = () => {
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

export default FeedSkeleton;
