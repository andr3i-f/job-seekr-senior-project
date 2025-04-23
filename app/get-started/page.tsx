"use client";

import {
  Box,
  Button,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "94vh",
      }}
    >
      <Stack direction={"column"} alignItems={"center"}>
        <Typography
          fontSize={"32px"}
          sx={{
            mt: "100px",
          }}
        >
          first upload your resume
        </Typography>
        <Stack direction={"row"}>
          <Typography>upload resume text</Typography>
          <UploadFileIcon />
        </Stack>
        <Typography
          fontSize={"32px"}
          sx={{
            mt: "100px",
          }}
        >
          then add any missing skill
        </Typography>
        <TextField
          label="Skills"
          variant="standard"
          multiline
          slotProps={{
            input: {
              style: {
                color: "white",
              },
            },
            inputLabel: {
              style: {
                color: "white",
              },
            },
          }}
          sx={{
            "& .MuiInput-root": {
              "&:before": {
                borderBottomColor: "white",
              },
              "&:hover:before": {
                borderBottomColor: "white",
              },
              "&:after": {
                borderBottomColor: "white",
              },
            },
          }}
        />
        <Typography
          fontSize={"32px"}
          sx={{
            mt: "100px",
          }}
        >
          optionally select your preferences
        </Typography>
        <TextField
          label="Preferences"
          variant="standard"
          multiline
          slotProps={{
            input: {
              style: {
                color: "white",
              },
            },
            inputLabel: {
              style: {
                color: "white",
              },
            },
          }}
          sx={{
            "& .MuiInput-root": {
              "&:before": {
                borderBottomColor: "white",
              },
              "&:hover:before": {
                borderBottomColor: "white",
              },
              "&:after": {
                borderBottomColor: "white",
              },
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            mt: "15vh",
            width: "12vw",
            backgroundColor: "#3E269E",
            color: "white",
            textTransform: "lowercase",
            borderRadius: "13px",
          }}
          onClick={() => {
            console.log("hi :)");
          }}
        >
          find jobs!
        </Button>
      </Stack>
    </Box>
  );
}
