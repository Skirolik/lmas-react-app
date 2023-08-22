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
      const latestYValue = data[data.length - 1].y;
      setLatestPercentage(latestYValue * 100);
    }
  }, [data]);
  // Function to reduce the percentage by 1% every 5 minutes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLatestPercentage((prevYValue) => Math.max(prevYValue - 100, 0));
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

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
