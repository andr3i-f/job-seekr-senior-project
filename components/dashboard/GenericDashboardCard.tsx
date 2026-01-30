import { Card, CardContent, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";

export default function GenericDashboardCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        border: `2px solid ${deepPurple[300]}`,
        borderRadius: 4,
        height: "100%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      {children}
    </Card>
  );
}
