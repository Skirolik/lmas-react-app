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
      setLatestYValue(data.data[data.data.length - 1].y);
    }
  }, [data.data]);

  // Function to reduce the percentage by 1% every 5 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLatestYValue((prevYValue) => Math.max(prevYValue - 5, 0));
    }, 2 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

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
