import React from "react";
import { useMantineTheme } from "@mantine/core";
import { ResponsivePie } from "@nivo/pie";

const Responseive_pie = ({ chartData }) => {
  const theme = useMantineTheme();
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={-6}
        innerRadius={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={2}
        arcLinkLabelsTextColor={
          theme.colorScheme === "dark" ? "white" : "black"
        }
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color", modifiers: [] }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 20]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Ongoing",
            },
            id: "lines",
          },
          {
            match: {
              id: "Finished",
            },
            id: "dots",
          },
        ]}
        motionConfig="wobbly"
        transitionMode="middleAngle"
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Responseive_pie;
