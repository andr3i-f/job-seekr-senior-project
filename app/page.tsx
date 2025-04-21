import { Box, Button, Stack, Typography } from "@mui/material";
import NavBar from "./ui/NavBar";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "200vh",
      }}
    >
      <Stack direction={"column"} alignItems={"center"}>
        <NavBar />
        <Typography fontSize={"64px"} sx={{ mt: "25vh" }}>
          find your next job.
        </Typography>
        <Typography fontSize={"32px"} sx={{ mt: "1vh" }}>
          123,456 jobs found
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: "2vh", backgroundColor: "purple" }}
        >
          get started
        </Button>
        <Typography fontSize={"64px"} sx={{ mt: "75vh" }}>
          how does it work?
        </Typography>
      </Stack>
    </Box>
  );
}
