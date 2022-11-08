import React, { useState, useRef } from "react";
import { Slider, Paper, Stack, Box } from "@mui/material";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { audiosData } from "./audioData";
import styled from "styled-components";
import { ThemeProps } from "../../styles/Themes";

type GlobalThemeProps = {
  theme: ThemeProps;
};

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

  const togglePlay = (i: any, audioName: any) => {
    if (!isPlaying[audioName]) {
      setIsPlaying({ ...isPlaying, [audioName]: true });
      audioPlayer.current[i].play();
    } else {
      audioPlayer.current[i].pause();
      setIsPlaying({ ...isPlaying, [audioName]: ![audioName] });
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
        sx={{
          color: "#ece8e1",
          "&:hover": { color: "#6e38be" },
          cursor: "pointer",
        }}
        onClick={() => {
          if (!mute[i.audioName]) {
            setMute({ ...mute, [i.audioName]: true });
          } else {
            setMute({ ...mute, [i.audioName]: false });
          }
        }}
      />
    ) : volume[i.audioName] <= 20 ? (
      <VolumeMuteIcon
        sx={{
          color: `color: ${({ theme }: GlobalThemeProps) => theme.color};`,
          "&:hover": { color: "#6e38be" },
          cursor: "pointer",
        }}
        onClick={() => {
          if (!mute[i.audioName]) {
            setMute({ ...mute, [i.audioName]: true });
          } else {
            setMute({ ...mute, [i.audioName]: false });
          }
        }}
      />
    ) : volume[i.audioName] <= 75 ? (
      <VolumeDownIcon
        sx={{
          color: `color: ${({ theme }: GlobalThemeProps) => theme.color};`,
          "&:hover": { color: "#6e38be" },
          cursor: "pointer",
        }}
        onClick={() => {
          if (!mute[i.audioName]) {
            setMute({ ...mute, [i.audioName]: true });
          } else {
            setMute({ ...mute, [i.audioName]: false });
          }
        }}
      />
    ) : (
      <VolumeUpIcon
        sx={{
          color: `color: ${({ theme }: GlobalThemeProps) => theme.color};`,
          "&:hover": { color: "#6e38be" },
          cursor: "pointer",
        }}
        onClick={() => {
          if (!mute[i.audioName]) {
            setMute({ ...mute, [i.audioName]: true });
          } else {
            setMute({ ...mute, [i.audioName]: false });
          }
        }}
      />
    );
  }

  return (
    <AudiosContainer>
      {audiosData.map((item, i) => (
        <section key={i}>
          <audio
            muted={mute[item.propsName]}
            ref={(audioPlayer1): any => (audioPlayer.current[i] = audioPlayer1)}
            loop
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
              <PSlider>
                <Slider
                  min={0}
                  valueLabelDisplay="auto"
                  max={100}
                  value={volume[`${item.propsName}`]}
                  onChange={(e: any, v: any) => {
                    toggleVolume(i, volume[`${item.propsName}`]);
                    setVolume({ ...volume, [item.propsName]: v });
                  }}
                />
              </PSlider>
            </Stack>
          </CustomPaper>
        </section>
      ))}
    </AudiosContainer>
  );
}

const AudiosContainer = styled.div`
  width: 90%;
  .css-187mznn-MuiSlider-root {
    color: #3f3d3d;
  }
`;

const CustomPaper = styled.div`
  background-color: "transparent";

  margin-top: 20px;
  padding: 2px;
  color: ${({ theme }: GlobalThemeProps) => theme.color};
`;

const PSlider = styled.div`
  height: 25px;
  width: 100%;
  &:hover {
    cursor: auto;
  }
  & .MuiSlider-thumb {
    width: 13px;
    height: 13px;
    display: block;
    color: ${({ theme }: GlobalThemeProps) => theme.color};
  }
`;
