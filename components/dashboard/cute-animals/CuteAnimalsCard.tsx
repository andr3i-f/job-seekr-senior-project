import { Refresh } from "@mui/icons-material";
import {
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React, { useState } from "react";

export default function CuteAnimalsCard() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);

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

  const showRandomImage = () => {
    setCurrentImage(animals[Math.floor(Math.random() * animals.length)]);
  };

  return (
    <React.Fragment>
      <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          color={deepPurple[100]}
          mt={1}
        >
          old meme or cute cat :3
        </Typography>
        {currentImage && (
          <CardMedia
            component="img"
            image={currentImage}
            alt="fun"
            sx={{
              width: "100%",
              aspectRatio: "16 / 9",
              objectFit: "contain",
              backgroundColor: "rgba(0,0,0,0.1)",
              mt: 2,
            }}
          />
        )}
      </CardContent>
      <CardActions>
        <IconButton sx={{ color: deepPurple[100] }} onClick={showRandomImage}>
          <Refresh />
        </IconButton>
      </CardActions>
    </React.Fragment>
  );
}
