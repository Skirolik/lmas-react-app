import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMantineTheme } from "@mantine/core";
import Calender from "./components/Calender";

const Calendar_tab = () => {
  const theme = useMantineTheme();
  const [chartData, setChartData] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://52.172.4.41:7000");

    socket.onopen = () => {
      // console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
      // console.log("Received data:", newData);
      const lastTenData = newData.slice(-10);
      setChartData(lastTenData);
    };

    console.log("chartdata:", chartData);

    socket.onclose = () => {
      // console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close();
    };
  }, []);
  const transformerData = data.map((row) => ({
    x: row[4],
    y: Number(row[13]),
  }));

  return (
    <>
      <div>
        <Calender data={transformerData} />
      </div>
    </>
  );
};

export default Calendar_tab;
