import { useState, useEffect } from "react";

import { CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { useMantineTheme } from "@mantine/core";

const VariableCount = ({ data, color, color2 }) => {
  const theme = useMantineTheme();
  console.log("sData:", data);

  const [currentMonth, setCurrentMonth] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const currentDate = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(currentDate.getDate() - 30);
      console.log("3o days ago", thirtyDaysAgo);

      let count = 0;

      data.forEach((row) => {
        const date = new Date(row.x);

        // Check if the date is within the last 30 days
        if (date >= thirtyDaysAgo && date <= currentDate && row.y >= 1) {
          count++;
        }
      });

      setTotalCount(count);
      setProgress((count / data.length) * 100);
    };

    calculateProgress();
  }, [data]);

  const progressData = [{ id: "progress", value: progress }];
  // console.log(progressData);
  // console.log("hi", totalCount);

  return (
    <div style={{ width: "50%", height: "50%", position: "relative" }}>
      <CircularProgressbar
        value={totalCount}
        text={totalCount}
        maxValue={1000}
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
export default VariableCount;
