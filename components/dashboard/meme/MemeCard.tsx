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

export default function MemeCard() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const showRandomImage = () => {
    let next;
    do {
      next = media[Math.floor(Math.random() * media.length)];
    } while (next === currentImage && media.length > 1);

    setCurrentImage(next);
  };

  const onRefresh = async () => {
    setLoading(true);
    showRandomImage();
  };

  const animals = [
    "/cats/apple-cat.webp",
    "/cats/birthday-cat.webp",
    "/cats/bruh-cat.webp",
    "/cats/cat-in-the-tree.webp",
    "/cats/chilling-cat.webp",
    "/cats/coca-cola-cat.webp",
    "/cats/shark-cat.webp",
    "/cats/sleepy-cat.webp",
    "/cats/sleepy-cat2.webp",
    "/cats/juju.webp",
  ];

  const gifs = [
    "/gifs/cheeky-cute.gif",
    "/gifs/chill-chicken.gif",
    "/gifs/cooked.gif",
    "/gifs/emoji-holy-moly.gif",
    "/gifs/emoji-meme.gif",
    "/gifs/esqueleto.gif",
    "/gifs/f.gif",
    "/gifs/homer-tweaking.gif",
    "/gifs/magnet-motor-spin.gif",
    "/gifs/MONKE.gif",
    "/gifs/romanian-anti-air-romania.gif",
    "/gifs/shark.gif",
    "/gifs/simpsons-homer.gif",
    "/gifs/skeleton-mad-skeleton.gif",
    "/gifs/spongebob-meme.gif",
    "/gifs/wooooooo.gif",
    "/gifs/yummy.gif",
  ];

  const media = [...animals, ...gifs];

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
          funny gif or cute cat :3
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {loading && (
            <Skeleton
              variant="rounded"
              width="100%"
              height="80%"
              sx={{ aspectRatio: "16 / 9", borderRadius: 2 }}
            />
          )}
          {currentImage && (
            <CardMedia
              component="img"
              image={currentImage}
              onLoad={() => setLoading(false)}
              alt="fun"
              sx={{
                width: { sm: "70%", lg: "80%" },
                aspectRatio: "16 / 9",
                objectFit: "cover",
                backgroundColor: "rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
                borderRadius: 2,
              }}
            />
          )}
        </Box>
      </CardContent>
      <CardActions>
        <IconButton sx={{ color: deepPurple[100] }} onClick={onRefresh}>
          <Refresh />
        </IconButton>
      </CardActions>
    </React.Fragment>
  );
}
