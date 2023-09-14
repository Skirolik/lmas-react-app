import React, { useEffect, useState } from "react";
import { Progress } from "@mantine/core";

const FieldValues = ({ data, color, title }) => {
  // console.log("nar", data);
  //   console.log("val", val);
  const initialYValue = data.length > 0 ? data[0].y : 0;
  // console.log("dia_value", initialYValue);
  const initialPercentage = initialYValue * 100;

  const [latestPercentage, setLatestPercentage] = useState(initialPercentage);

  useEffect(() => {
    if (data.length > 0) {
      const lastDataPoint = data[data.length - 1];
      const initialPercentage = lastDataPoint.y * 100; // Initial percentage
      const timeToReduce = 10 * 60 * 1000; // 10 minutes in milliseconds

      // Calculate the percentage reduction required per minute
      const percentageReductionPerMinute =
        initialPercentage / (timeToReduce / (1000 * 60));

      const currentTime = new Date().getTime();
      const triggerTime = new Date(lastDataPoint.x).getTime();
      const timeDifference = currentTime - triggerTime;

      const timeDifferenceMinutes = (currentTime - triggerTime) / (1000 * 60);

      // Calculate the reduced percentage based on time difference
      const calculatedPercentage = Math.max(
        initialPercentage -
          percentageReductionPerMinute * (timeDifference / (1000 * 60)),
        0
      );
      setLatestPercentage(calculatedPercentage);

      const intervalId = setInterval(() => {
        setLatestPercentage((prevPercentage) =>
          Math.max(prevPercentage - 0.16667, 0)
        );
      }, 1 * 10 * 100);

      return () => clearInterval(intervalId);
    }
  }, [data]);

  // Calculate the color based on the latestYValue

  return (
    <div>
      <h3>{title}</h3>
      <Progress
        value={latestPercentage}
        max={100} // Assuming yValue is already a percentage
        color={color}
        label={Math.round(latestPercentage) + "%"}
        animate
        size="xl"
        style={{ borderRadius: "35px", width: "100%" }}
      />
    </div>
  );
};

export default FieldValues;
