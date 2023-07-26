import React, { useEffect, useState } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { useMantineTheme } from "@mantine/core";

const Calender = ({ data }) => {
  // console.log("calender", data);
  const theme = useMantineTheme();
  //data is x:date and Y greater than 40%
  // Function to count the number of calls made on each date
  const countCallsByDate = () => {
    const callCounts = {};

    // Iterate through the call data
    data.forEach((row) => {
      if (row.y >= 40) {
        const dateTime = new Date(row.x); // Assuming `row.x` contains the date and time information
        // console.log("datetime", dateTime);
        console.log(row.x);

        // Extract the date (year, month, day) from the DateTime object
        const date = dateTime.toISOString().substring(0, 10);

        // Increment the count for the corresponding date
        if (callCounts[date]) {
          callCounts[date]++;
        } else {
          callCounts[date] = 1;
        }
      }
    });

    return callCounts;
  };
  // Count the calls by date
  const callCounts = countCallsByDate();
  const calendarData = Object.keys(callCounts).map((date) => ({
    value: callCounts[date],
    day: date,
  }));
  // console.log(calendarData);

  return (
    <div className="calendar-wrapper" style={{ height: 600, width: "100%" }}>
      <h1>Calander</h1>
      <ResponsiveCalendar
        data={calendarData}
        from="2023-07-01"
        to="2025-12-31"
        emptyColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[2]
            : theme.colors.gray[2]
        }
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
        }}
        yearSpacing={40}
        monthBorderColor={theme.colorScheme === "dark" ? "white" : "#909296"}
        dayBorderWidth={2}
        dayBorderColor={
          theme.colorScheme === "dark"
            ? theme.colors.gray[2]
            : theme.colors.dark[1]
        }
      />
      <style>
        {`
        .calendar-wrapper text {
          fill: ${theme.colorScheme === "dark" ? "white" : "black"} !important;
        }
      `}
      </style>
    </div>
  );
};

export default Calender;
