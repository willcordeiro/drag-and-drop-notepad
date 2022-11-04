import React, { useState, useRef } from "react";
import { styled, Slider, Paper, Stack, Box } from "@mui/material";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { audiosData } from "./audioData";

const Div = styled("div")(({ theme }) => ({
  width: "30%",
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  marginLeft: theme.spacing(6),
  marginRight: theme.spacing(6),
  padding: theme.spacing(2),
  border: "solid #ece8e1 2px",
}));

type PSlider = {
  thumbless: any;
  min: any;
  max: any;
  value: any;
  onChange: any;
};

const PSlider = styled(Slider)<PSlider>(({ theme, ...props }: any) => ({
  color: "#ece8e1",
  height: 2,
  "&:hover": {
    cursor: "auto",
  },
  "& .MuiSlider-thumb": {
    width: "13px",
    height: "13px",
    display: props.thumbless ? "none" : "block",
  },
}));

export default function Player() {
  const audioPlayer: any = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [mute, setMute] = useState(false);

  const togglePlay = (i: any) => {
    if (!isPlaying) {
      audioPlayer.current[i].play();
    } else {
      audioPlayer.current[i].pause();
    }
    setIsPlaying((prev) => !prev);
  };

  function VolumeBtns() {
    return mute ? (
      <VolumeOffIcon
        sx={{ color: "#ece8e1", "&:hover": { color: "#6e38be" } }}
        onClick={() => setMute(!mute)}
      />
    ) : volume <= 20 ? (
      <VolumeMuteIcon
        sx={{ color: "#ece8e1", "&:hover": { color: "#6e38be" } }}
        onClick={() => setMute(!mute)}
      />
    ) : volume <= 75 ? (
      <VolumeDownIcon
        sx={{ color: "#ece8e1", "&:hover": { color: "#6e38be" } }}
        onClick={() => setMute(!mute)}
      />
    ) : (
      <VolumeUpIcon
        sx={{ color: "#ece8e1", "&:hover": { color: "#6e38be" } }}
        onClick={() => setMute(!mute)}
      />
    );
  }

  return (
    <div>
      {audiosData.map((item, i) => (
        <Div key={i}>
          <audio
            muted={mute}
            ref={(audioPlayer0): any => (audioPlayer.current[i] = audioPlayer0)}
          >
            <source src={item.audio} type="audio/mpeg" />
          </audio>
          <CustomPaper>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {item.audioName}{" "}
              {!isPlaying ? (
                <PlayArrowIcon
                  fontSize={"large"}
                  sx={{
                    color: "#ece8e1",
                    "&:hover": { color: "#6e38be" },
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    togglePlay(i);
                  }}
                />
              ) : (
                <PauseIcon
                  fontSize={"large"}
                  sx={{
                    color: "#ece8e1",
                    "&:hover": { color: "#6e38be" },
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    togglePlay(i);
                  }}
                />
              )}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "25%",
                  alignItems: "center",
                }}
              ></Stack>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: "flex",
                  width: "40%",
                  alignItems: "center",
                }}
              ></Stack>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              />
            </Box>
            <Stack
              spacing={1}
              direction="row"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <VolumeBtns />

              <PSlider
                min={0}
                max={100}
                value={volume}
                onChange={(e: any, v: any) => setVolume(v)}
                thumbless={undefined}
              />
            </Stack>
          </CustomPaper>
        </Div>
      ))}
    </div>
  );
}
