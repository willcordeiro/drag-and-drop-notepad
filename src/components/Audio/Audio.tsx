import React, { useState, useRef, useEffect } from "react";
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
  margin: "20px",
  padding: theme.spacing(2),
  color: "white",
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

const musicinitialState: any = {
  LofiStudy: false,
  campfire: false,
  emptyMindLofi: false,
  lofiHipHop: false,
  spiritBlossomLofi: false,
  street: false,
  sunnyDay: false,
  summerRain: false,
};
const muteinitialState: any = {
  LofiStudy: false,
  campfire: false,
  emptyMindLofi: false,
  lofiHipHop: false,
  spiritBlossomLofi: false,
  street: false,
  sunnyDay: false,
  summerRain: false,
};

const volumeStack: any = {
  LofiStudy: 30,
  campfire: 30,
  emptyMindLofi: 30,
  lofiHipHop: 30,
  spiritBlossomLofi: 30,
  street: 30,
  sunnyDay: 30,
  summerRain: 30,
};

export default function Player() {
  const audioPlayer: any = useRef([]);
  const [isPlaying, setIsPlaying] = useState(musicinitialState);
  const [volume, setVolume] = useState(volumeStack);
  const [mute, setMute] = useState(muteinitialState);
  const [player, setPlayer] = useState(false);

  const togglePlay = (i: any, audioName: any) => {
    if (!player) {
      setPlayer(true);
      setIsPlaying({ ...musicinitialState, [audioName]: true });
      audioPlayer.current[i].play();
    } else {
      audioPlayer.current[i].pause();
      setIsPlaying({ ...musicinitialState, [audioName]: ![audioName] });
      setPlayer((prev) => !prev);
    }
  };

  const toggleVolume = (i: any, audioName: any) => {
    if (audioPlayer) {
      audioPlayer.current[i].volume = audioName / 100;
    }
  };

  function VolumeBtns(i: any, audioName: any) {
    return mute[i.audioName] ? (
      <VolumeOffIcon
        sx={{ color: "#ece8e1", "&:hover": { color: "#6e38be" } }}
        onClick={() => {
          if (!mute[i.audioName]) {
            setMute({ ...muteinitialState, [i.audioName]: true });
          } else {
            setMute({ ...muteinitialState, [i.audioName]: false });
          }
        }}
      />
    ) : volume <= 20 ? (
      <VolumeMuteIcon
        sx={{ color: "#ece8e1", "&:hover": { color: "#6e38be" } }}
        onClick={() => {
          if (!mute[i.audioName]) {
            setMute({ ...muteinitialState, [i.audioName]: true });
          } else {
            setMute({ ...muteinitialState, [i.audioName]: false });
          }
        }}
      />
    ) : volume <= 75 ? (
      <VolumeDownIcon
        sx={{ color: "#ece8e1", "&:hover": { color: "#6e38be" } }}
        onClick={() => {
          if (!mute[i.audioName]) {
            setMute({ ...muteinitialState, [i.audioName]: true });
          } else {
            setMute({ ...muteinitialState, [i.audioName]: false });
          }
        }}
      />
    ) : (
      <VolumeUpIcon
        sx={{ color: "#ece8e1", "&:hover": { color: "#6e38be" } }}
        onClick={() => {
          if (!mute[i.audioName]) {
            setMute({ ...muteinitialState, [i.audioName]: true });
          } else {
            setMute({ ...muteinitialState, [i.audioName]: false });
          }
        }}
      />
    );
  }

  return (
    <div>
      {audiosData.map((item, i) => (
        <Div key={i}>
          <audio
            muted={mute[item.propsName]}
            ref={(audioPlayer1): any => (audioPlayer.current[i] = audioPlayer1)}
          >
            <source src={item.audio} type="audio/mpeg" />
          </audio>

          <CustomPaper>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {item.audioName}
              {!isPlaying[item.propsName] ? (
                <PlayArrowIcon
                  fontSize={"large"}
                  sx={{
                    color: "#ece8e1",
                    "&:hover": { color: "#6e38be" },
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    togglePlay(i, item.propsName);
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
                    togglePlay(i, item.propsName);
                  }}
                />
              )}
            </Box>
            <Stack
              spacing={1}
              direction="row"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <VolumeBtns i={i} audioName={item.propsName} />

              <PSlider
                min={0}
                max={100}
                value={volume[`${item.propsName}`]}
                onChange={(e: any, v: any) => {
                  toggleVolume(i, volume[`${item.propsName}`]);
                  setVolume({ ...volumeStack, [item.propsName]: v });
                }}
                thumbless={""}
              />
            </Stack>
          </CustomPaper>
        </Div>
      ))}
    </div>
  );
}
