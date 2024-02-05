import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Card,
  useMantineTheme,
  Grid,
  Group,
  Center,
  Button,
  Text,
  Divider,
} from "@mantine/core";

import { Link, useNavigate } from "react-router-dom";

import Data_table from "./components/Data_table";
import Progress_card from "./components/Progress_card";
import Lmap from "./components/Lmap";
import Progress_bar from "./components/Progress_bar";
import Field_values from "./components/Field_values";
import Battery_status from "./components/Battery_status";
import Variable_count from "./components/Variable_count";
import { Divide } from "tabler-icons-react";
import Calender from "./components/Calender";
import useWebsocket from "./components/useWebsocket";

import Summary_timeline from "./maintenance/Summary_timeline";

function Home() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin");

  const blockedStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    filter: "blur(8px)",
    borderRadius: "10px",
  };

  // useEffect(() => {
  //   console.log("email");
  //   // Check if user is logged in (e.g., by checking session storage, authentication token, etc.)
  //   const isLoggedIn = "true";

  //   if (!isLoggedIn) {
  //     window.location.href = "/login"; // Redirect to login page if not logged in
  //   } else {
  //     setLoggedIn(true);
  //     const userEmail = sessionStorage.getItem("userEmail");

  //     if (userEmail) {
  //       setEmail(userEmail);
  //       const socket = new WebSocket(`ws://127.0.0.1:7000`);

  //       console.log("Email", userEmail);

  //       socket.onopen = () => {
  //         console.log("WebSocket connection established.");
  //         socket.send(userEmail); // Send the email to the WebSocket server
  //       };

  //       socket.onmessage = (event) => {
  //         const newData = JSON.parse(event.data);
  //         setData(newData);
  //         // console.log("Received data:", newData);
  //         const lastTenData = newData.slice(-1);
  //         setChartData(lastTenData);
  //       };

  //       socket.onclose = () => {
  //         console.log("WebSocket connection closed.");
  //       };

  //       return () => {
  //         socket.close();
  //       };
  //     }
  //   }
  // }, []);

  const { data, chartData } = useWebsocket(email);

  const transformedData = chartData
    .map((row) => ({
      x: row[4],
      y: Number(row[13]),
    }))
    .reverse();

  const diaDataElectroStatic = chartData
    .map((row) => ({
      x: row[4],
      y: row[5],
    }))
    .reverse();

  const diaDataSpark = chartData
    .map((row) => ({
      x: row[4],
      y: row[6],
    }))
    .reverse();

  const diaDataEnvironment = chartData
    .map((row) => ({
      x: row[4],
      y: row[7],
    }))
    .reverse();

  const transformerData = data.map((row) => ({
    x: row[4],
    y: Number(row[13]),
  }));

  const mapData = chartData.map((row) => ({
    x: Number(row[2]),
    y: Number(row[3]),
    z: Number(row[13]),
  }));

  const staticData = data.map((row) => ({
    x: row[4],
    y: row[5],
  }));
  const sparkData = data.map((row) => ({
    x: row[4],
    y: row[6],
  }));
  const envData = data.map((row) => ({
    x: row[4],
    y: row[7],
  }));
  const temp = data.map((row) => ({
    x: row[4],
    y: Number(row[14]),
  }));
  const pressure = data.map((row) => ({
    x: row[4],
    y: Number(row[15]),
  }));
  const humidity = data.map((row) => ({
    x: row[4],
    y: Number(row[16]),
  }));
  const calenderData = data.map((row) => ({
    x: row[4],
    y: Number(row[13]),
  }));

  const handleClick = () => {
    navigate("/maintenance/Summary");
  };

  const handleOverClick = () => {
    navigate("/Lmas");
  };

  return (
    <>
      <Grid mb="xl">
        <Grid.Col md={2} lg={1}></Grid.Col>
        <Grid.Col md={10} lg={10}>
          <Progress_bar
            data={transformedData}
            value={diaDataSpark}
            env={diaDataEnvironment}
            diac={diaDataElectroStatic}
            temp={temp}
            pressure={pressure}
            humidity={humidity}
          />
        </Grid.Col>
        <Grid.Col md={1} lg={2}></Grid.Col>
      </Grid>

      <Grid mt="xl" mb="xl">
        <Grid.Col md={1} lg={1}></Grid.Col>
        <Grid.Col md={4} lg={4}>
          <Card withBorder radius="lg" shadow="xl" padding="md">
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              <Text ta="center" fw={700} td="underline" size="xl">
                {" "}
                Testing
              </Text>
            </div>

            <Summary_timeline />
          </Card>
        </Grid.Col>

        <Grid.Col md={2} lg={6}>
          <Card mt="xl" shadow="xl" padding="lg" radius="lg" withBorder>
            <div onClick={handleOverClick} style={{ cursor: "pointer" }}>
              <Text ta="center" fw={700} td="underline" size="xl">
                {" "}
                OverView
              </Text>
              <Center>
                <Battery_status
                  data={transformerData}
                  name={"Count"}
                  color={"#66a80f"}
                  color2={"#e9fac8"}
                />
                <Battery_status
                  data={transformerData}
                  name={"Battery"}
                  color={"#ff6b6b"}
                  color2={"#ffc9c9"}
                />
                <Battery_status
                  data={envData}
                  name={"Weather"}
                  color={"#66a80f"}
                  color2={"#e9fac8"}
                />
              </Center>
            </div>
          </Card>
        </Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
        <Grid.Col md={2} lg={1}></Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col md={1} lg={1}></Grid.Col>
        <Grid.Col md={12} lg={10}>
          {" "}
        </Grid.Col>
        <Grid.Col md={1} lg={1}></Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col md={1} lg={1}></Grid.Col>
        <Grid.Col md={10} lg={10}>
          {" "}
          <Card mt="xl" shadow="xl" padding="lg" radius="lg" withBorder>
            <Lmap data={mapData} />
          </Card>
        </Grid.Col>
        <Grid.Col md={1} lg={1}></Grid.Col>
      </Grid>
    </>
  );
}

export default Home;
