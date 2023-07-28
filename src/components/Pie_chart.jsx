import React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data }) => {
  // Function to count the number of occurrences on each day
  const countOccurrencesByDay = () => {
    const counts = {
      safe: 0,
      Warning: 0,
      Alert: 0,

      //   "50-60": 0,
      //   "60-70": 0,
      //   "70-80": 0,
      //   "80+": 0,
      //   "1-2": 0,
      //   "3-4": 0,
    };

    data.forEach((row) => {
      const value = row.y;

      if (value >= 40 && value < 50) {
        counts["Warning"]++;
      } else if (value >= 50 && value < 60) {
        counts["Warning"]++;
      } else if (value >= 60 && value < 70) {
        counts["Warning"]++;
      } else if (value >= 70 && value < 80) {
        counts["Alert"]++;
      } else if (value >= 80) {
        counts["Alert"]++;
      } else if (value >= 1 && value < 2) {
        counts["safe"]++;
      } else if (value >= 3 && value < 4) {
        counts["safe"]++;
      }
    });
    // console.log(counts);

    return counts;
  };

  // Count the occurrences by day
  const occurrencesByDay = countOccurrencesByDay();

  // Prepare the data for the pie chart
  const pieData = Object.keys(occurrencesByDay).map((key) => ({
    id: key,
    value: occurrencesByDay[key],
  }));

  const colorMapping = {
    safe: "green",
    Warning: "yellow",
    Alert: "Red",
  };

  return (
    <div style={{ height: "400px" }}>
      <ResponsivePie
        data={pieData}
        innerRadius={0.5}
        padAngle={0.7}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        colors={({ id }) => colorMapping[id]}
        theme={{ fontSize: 14 }}
      />
    </div>
  );
};

export default PieChart;
