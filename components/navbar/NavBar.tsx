import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { AccountCircle } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { JSX } from "react";

export default function NavBar(): JSX.Element {
  return (
    <Box
      width={"100vw"}
      height={`${NAVBAR_HEIGHT_IN_VH}vh`}
      sx={{
        background: "#372483",
        boxShadow: "2",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
      }}
    >
      <Stack
        direction={"row"}
        width={"100vw"}
        height={"100%"}
        justifyContent="space-between"
        alignItems="center"
        px={2}
      >
        <Typography>jobseekr.</Typography>
        <AccountCircle sx={{ fontSize: "32px" }} />
      </Stack>
    </Box>
  );
}
