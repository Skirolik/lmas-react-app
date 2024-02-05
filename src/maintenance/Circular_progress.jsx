import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import { useMantineTheme } from "@mantine/core";

const Circular_progress = ({ data }) => {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        width: "70%",
        height: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "22px 33px ", // Adjust margins as needed
        padding: "35px ", // Adjust paddings as needed
      }}
    >
      <CircularProgressbar
        value={data}
        text={`${data}%`}
        maxValue={100}
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
        strokeWidth={15}
      />
    </div>
  );
};

export default Circular_progress;
