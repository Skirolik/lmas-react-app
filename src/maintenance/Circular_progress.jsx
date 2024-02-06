import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import { useMantineTheme } from "@mantine/core";

const Circular_progress = ({ data }) => {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        width: "100%",
        height: "20vh",
        display: "flex",
      }}
    >
      <CircularProgressbar
        value={data}
        text={`${data}`}
        maxValue={10000}
        circleRatio={1}
        styles={{
          trail: {
            strokeLinecap: "initial",
            transform: "rotate(-126deg)",
            transformOrigin: "center center",
            stroke: "#a5d8ff",
          },
          path: {
            strokeLinecap: "butt",
            transform: "rotate(-126deg)",
            transformOrigin: "center center",
            stroke: "#339af0",
          },
          text: {
            fill: theme.colorScheme === "dark" ? "white" : "#339af0",
          },
        }}
        strokeWidth={10}
      />
    </div>
  );
};

export default Circular_progress;
