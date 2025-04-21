import { AccountCircle } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { JSX } from "react";

export default function NavBar(): JSX.Element {
  return (
    <Box
      width={"100vw"}
      height={"6vh"}
      sx={{
        background: "#372483",
        boxShadow: "2",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
      }}>
        <Stack direction={"row"} width={"100vw"} height={"100%"} justifyContent="flex-end" alignItems="center" px={2}>
            <AccountCircle sx={{ fontSize: "32px" }} />
        </Stack>
      </Box>
  );
}
