import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useMantineTheme } from "@mantine/core";
import Calender from "./components/Calender";

const CalendarTab = () => {
  const theme = useMantineTheme();

  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      window.location.href = "/";
    } else {
      setLoggedIn(true);
      const userEmail = sessionStorage.getItem("userEmail");

      if (userEmail) {
        setEmail(userEmail);
        const socket = new WebSocket(`ws://127.0.0.1:7000`);

        console.log("Email", userEmail);

        socket.onopen = () => {
          console.log("WebSocket connection established.");
          socket.send(userEmail); // Send the email to the WebSocket server
        };

        socket.onmessage = (event) => {
          const newData = JSON.parse(event.data);
          setData(newData);
          // console.log("Received data:", newData);
          // const lastTenData = newData.slice(-10);
          // setChartData(lastTenData);
        };

        // console.log("chartdata:", chartData);

        socket.onclose = () => {
          console.log("WebSocket connection closed.");
        };

        return () => {
          socket.close();
        };
      }
    }
  }, []);

  const transformerData = data.map((row) => ({
    x: row[4],
    y: Number(row[13]),
  }));

  return <Calender data={transformerData} />;
};

export default CalendarTab;
