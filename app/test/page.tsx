"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { useState } from "react";
import axios from "axios";

export default function TestPage() {
  const [testName, setTestName] = useState("");
  const [returnValue, setReturnValue] = useState("");
  const createTestEntry = async () => {
    const res = await axios.post("/api/test", { test: testName });
    setReturnValue(res.data.message);
  };

  const getTestEntry = async () => {
    const res = await axios.get("/api/test", { params: { test: testName } });
    setReturnValue(res.data.message.test_name);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: `${100 - NAVBAR_HEIGHT_IN_VH}vh`,
      }}
    >
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        <TextField
          onChange={(e) => setTestName(e.target.value)}
          defaultValue={"enter test value..."}
        />
        <Button variant="contained" onClick={() => createTestEntry()}>
          send data
        </Button>
        <Button variant="contained" onClick={() => getTestEntry()}>
          get data
        </Button>
        <Typography variant="h3">{returnValue}</Typography>
      </Stack>
    </Box>
  );
}
