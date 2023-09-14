import React, { useEffect, useState } from "react";
import { Progress } from "@mantine/core";

const ProgressBar = (data) => {
  //   console.log("nar", data);
  //   console.log("val", val);
  const initialYValue = data.data.length > 0 ? data.data[0].y : 0;
  //   console.log("yval", initialYValue);

  const [latestYValue, setLatestYValue] = useState(initialYValue);

  const getColor = (yValue) => {
    if (yValue < 50) {
      return "green";
    } else if (yValue >= 50 && yValue <= 60) {
      return "yellow";
    } else {
      return "red";
    }
  };

  useEffect(() => {
    if (data.data.length > 0) {
      const lastDataPoint = data.data[data.data.length - 1];
      const initialPercentage = lastDataPoint.y; // Initial percentage
      const timeToReduce = 10 * 60 * 1000; // 10 minutes in milliseconds

      // Calculate the percentage reduction required per minute
      const percentageReductionPerMinute =
        initialPercentage / (timeToReduce / (1000 * 60));

      const currentTime = new Date().getTime();
      const triggerTime = new Date(lastDataPoint.x).getTime();
      const timeDifference = currentTime - triggerTime;

      // Calculate the reduced percentage based on time difference
      const calculatedPercentage = Math.max(
        initialPercentage -
          percentageReductionPerMinute * (timeDifference / (1000 * 60)),
        0
      );
      setLatestYValue(calculatedPercentage);

      const intervalId = setInterval(() => {
        setLatestYValue((prevYValue) =>
          Math.max(prevYValue - percentageReductionPerMinute, 0)
        );
      }, 1 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [data.data]);

  // Calculate the color based on the latestYValue
  const color = getColor(latestYValue);

  return (
    <div>
      <h3>Lightning Warning</h3>
      <Progress
        value={latestYValue}
        max={100} // Assuming yValue is already a percentage
        color={color}
        label={Math.round(latestYValue) + "%"}
        animate
        size="xl"
        style={{ borderRadius: "35px", width: "100%" }}
      />
    </div>
  );
};

export default ProgressBar;
