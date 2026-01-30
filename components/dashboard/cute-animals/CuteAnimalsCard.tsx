import { Refresh } from "@mui/icons-material";
import {
  Box,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React, { useState } from "react";

export default function CuteAnimalsCard() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const showRandomImage = () => {
    setCurrentImage(animals[Math.floor(Math.random() * animals.length)]);
  };

  const randomDelay = () => Math.random() * (800 - 300) + 300;

  const onRefresh = async () => {
    setLoading(true);

    await new Promise((resolve) => {
      setTimeout(resolve, randomDelay());
    });

    showRandomImage();

    setLoading(false);
  };

  const animals = [
    "/cats/apple-cat.webp",
    "/cats/birthday-cat.webp",
    "/cats/birthday-cat2.webp",
    "/cats/bruh-cat.webp",
    "/cats/cat-in-the-tree.webp",
    "/cats/chilling-cat.webp",
    "/cats/coca-cola-cat.webp",
    "/cats/cool-looking-cat.webp",
    "/cats/shark-cat.webp",
    "/cats/silver-bengal.webp",
    "/cats/sleepy-cat.webp",
    "/cats/sleepy-cat2.webp",
  ];

  return (
    <React.Fragment>
      <CardContent
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={"bold"}
          color={deepPurple[100]}
          mt={1}
        >
          cute cat :3
        </Typography>
        {currentImage && !loading && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={currentImage}
              alt="fun"
              sx={{
                width: "100%",
                aspectRatio: "16 / 9",
                objectFit: "cover",
                backgroundColor: "rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
                borderRadius: 2,
              }}
            />
          </Box>
        )}
        {loading && (
          <Skeleton
            variant="rounded"
            width="100%"
            height="80%"
            sx={{ aspectRatio: "16 / 9", borderRadius: 2 }}
          />
        )}
      </CardContent>
      <CardActions>
        <IconButton sx={{ color: deepPurple[100] }} onClick={onRefresh}>
          <Refresh />
        </IconButton>
      </CardActions>
    </React.Fragment>
  );
}
