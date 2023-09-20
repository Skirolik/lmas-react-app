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

import Data_table from "./components/Data_table";
import Progress_card from "./components/Progress_card";
import Lmap from "./components/Lmap";
import Progress_bar from "./components/Progress_bar";
import Field_values from "./components/Field_values";
import Battery_status from "./components/Battery_status";
import Variable_count from "./components/Variable_count";
import { Divide } from "tabler-icons-react";

function Home() {
  const theme = useMantineTheme();
  const [chartData, setChartData] = useState([]);
  const [email, setEmail] = useState("admin");

  const [data, setData] = useState([]);
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

  useEffect(() => {
    //const socket = new WebSocket("ws://52.172.4.41:7000");

    const socket = new WebSocket(`ws://localhost:7000`);

    console.log("Email", email);

    socket.onopen = () => {
      console.log("WebSocket connection established.");
      socket.send(email);
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
      // console.log("Received data:", newData);
      const lastTenData = newData.slice(-1);
      setChartData(lastTenData);
    };

    socket.onclose = () => {
      // console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close();
    };
  }, []);

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

  return (
    <>
      <Grid mb="xl">
        <Grid.Col md={4} lg={1}></Grid.Col>
        <Grid.Col md={2} lg={10}>
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
        <Grid.Col md={2} lg={2}></Grid.Col>
      </Grid>

      <Grid mt="xl" mb="xl">
        <Grid.Col md={4} lg={1}></Grid.Col>
        <Grid.Col md={4} lg={4}>
          <Card withBorder radius="lg" shadow="xl" padding="md">
            <Data_table data={data} />
          </Card>
        </Grid.Col>

        <Grid.Col md={2} lg={2}>
          <Card shadow="xl" padding="lg" radius="lg" withBorder>
            <h1>Static</h1>

            <Center>
              <Variable_count
                data={staticData}
                color={"#66a80f"}
                color2={"#e9fac8"}
              />
            </Center>
          </Card>
          <Card mt="xl" shadow="xl" padding="lg" radius="lg" withBorder>
            <h1>Count</h1>
            <Center>
              <Battery_status
                data={transformerData}
                color={"#66a80f"}
                color2={"#e9fac8"}
              />
            </Center>
          </Card>
        </Grid.Col>
        <Grid.Col md={2} lg={2}>
          <Card shadow="xl" padding="lg" radius="lg" withBorder>
            <h1>Spark</h1>
            <Center>
              <Variable_count
                data={sparkData}
                color={"#66a80f"}
                color2={"#e9fac8"}
              />
            </Center>
          </Card>
          <Card mt="xl" shadow="xl" padding="lg" radius="lg" withBorder>
            <h1>Battery</h1>
            <Center>
              <Battery_status
                data={transformerData}
                color={"#ff6b6b"}
                color2={"#ffc9c9"}
              />
            </Center>
          </Card>
        </Grid.Col>
        <Grid.Col md={2} lg={2}>
          <Card shadow="xl" padding="lg" radius="lg" withBorder>
            <h1>Weather</h1>
            <Center>
              <Variable_count
                data={envData}
                color={"#66a80f"}
                color2={"#e9fac8"}
              />
            </Center>
          </Card>
          <Card mt="xl" shadow="xl" padding="lg" radius="lg" withBorder>
            <h1>Smart Pit</h1>
            <div style={blockedStyle}>
              <Center>
                <Battery_status
                  data={transformerData}
                  color={"#66a80f"}
                  color2={"#e9fac8"}
                />
              </Center>
            </div>
            <Center>
              <Button>Register</Button>
            </Center>
          </Card>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col md={4} lg={1}></Grid.Col>
        <Grid.Col md={4} lg={10}>
          {" "}
          <Card mt="xl" shadow="xl" padding="lg" radius="lg" withBorder>
            <Lmap data={mapData} />
          </Card>
        </Grid.Col>
        <Grid.Col></Grid.Col>
      </Grid>
    </>
  );
}

export default Home;
