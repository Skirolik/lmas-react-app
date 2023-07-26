import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useMantineTheme } from "@mantine/core";

const Chart = ({ data }) => {
  const theme = useMantineTheme();

  const darkColor = "#cc5de8";
  const lightColor = "#339af0";
  const textColor = theme.colorScheme === "dark" ? "white" : "black";

  const colors = theme.colorScheme === "dark" ? darkColor : lightColor;

  const themes = {
    background: "transparent",
    axis: {
      fontSize: "14px",
      tickColor: textColor,
      ticks: {
        line: {
          stroke: "#555555",
        },
        text: {
          fill: textColor,
        },
      },
      legend: {
        text: {
          fill: textColor,
        },
      },
    },
    grid: {
      line: {
        stroke: "#555555",
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <style>
        {`
          .axis-label {
            fill: ${textColor};
          }
        `}
      </style>
      <ResponsiveBar
        data={data}
        keys={["y"]}
        indexBy="x"
        enableGridX={false}
        enableGridY={true}
        layout="vertical"
        colors={colors}
        margin={{ top: 50, right: 50, bottom: 100, left: 60 }}
        padding={0.7}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickValues: 5,
          legend: "Value",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        axisBottom={{
          tickRotation: -45,
          legend: "Date",
          legendPosition: "middle",
          legendOffset: 40,
          format: (value) => value.substring(5),
        }}
        tooltip={({ data }) => (
          <strong>
            {data.x}:{data.y}
          </strong>
        )}
        theme={themes}
      />
    </div>
  );
};

export default Chart;
