import React from "react";
import { audiosData } from "./audioData";
function Audio() {
  return (
    <div className="audio-container">
      {audiosData.map((item, index) => (
        <audio controls key={index}>
          <source src={item.audio} type="audio/mpeg" />
        </audio>
      ))}
    </div>
  );
}

export default Audio;
