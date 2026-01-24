"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { NAVBAR_HEIGHT_IN_VH } from "@/constants/layout";
import { useState } from "react";
import axios from "axios";

export default function TestPage() {
    const [testName, setTestName] = useState("");

    const createTestEntry = async () => {
        const res = await axios.post("http://localhost:3000/api/test", { "test": testName })
        console.log(res)
    }

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
            <TextField onChange={(e) => setTestName(e.target.value)} defaultValue={"enter test value..."}/>
            <Button variant="contained" onClick={() => createTestEntry()}>
            Login with Google
            </Button>
        </Stack>
        </Box>
    )
}