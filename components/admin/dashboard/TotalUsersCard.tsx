import { getTotalUsers } from "@/app/queries/admin";
import { CardContent, CircularProgress, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function TotalUsersCard() {
  const { isPending, data } = useQuery({
    queryKey: ["total-users"],
    queryFn: getTotalUsers,
  });

  return (
    <React.Fragment>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          color={deepPurple[100]}
          mt={1}
        >
          Total Users
        </Typography>
        {!isPending && data && (
          <Typography sx={{ color: "white" }}>{data} total users</Typography>
        )}
        {isPending && <CircularProgress size={15} sx={{ color: "white" }} />}
      </CardContent>
    </React.Fragment>
  );
}
