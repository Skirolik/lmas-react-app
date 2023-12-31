import { useState, useEffect } from "react";

import { CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { useMantineTheme } from "@mantine/core";

const BatteryStatus = ({ data, color, color2 }) => {
  const theme = useMantineTheme();
  // console.log("sData:", data);

  const [batteryCount, setBatteryCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const latestBatteryReading = data.reduce((latest, current) => {
    if (!latest || current.x > latest.x) {
      return current;
    }
    return latest;
  }, null);

  let batteryReading = latestBatteryReading ? latestBatteryReading.y : null;

  useEffect(() => {
    const calculateProgress = () => {
      const maxBattery = 14.0;
      const batteryReadingPercent = (batteryReading / maxBattery) * 100;
      batteryReading = batteryReadingPercent.toFixed(0);

      console.log("Battery", batteryReading);

      setBatteryCount(batteryReading + "%");
      setProgress(batteryReading);
    };

    calculateProgress();
  }, [data]);

  const progressData = [{ id: "progress", value: progress }];

  return (
    <div style={{ width: "50%", height: "50%", position: "relative" }}>
      <CircularProgressbar
        value={batteryCount}
        text={batteryCount}
        maxValue={100}
        circleRatio={1}
        styles={{
          trail: {
            strokeLinecap: "initial",
            transform: "rotate(-126deg)",
            transformOrigin: "center center",
            stroke: theme.colorScheme === "dark" ? color2 : "#a5d8ff",
          },
          path: {
            strokeLinecap: "butt",
            transform: "rotate(-126deg)",
            transformOrigin: "center center",
            stroke: theme.colorScheme === "dark" ? color : "#339af0",
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

export default BatteryStatus;
