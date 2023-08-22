import React, { useEffect, useState } from "react";
// import axios from "axios";
import {
  Paper,
  Card,
  useMantineTheme,
  Grid,
  Group,
  Center,
  Button,
  Loader,
} from "@mantine/core";

import DataTable from "./components/DataTable";
import ProgressCard from "./components/ProgressCard";
import Lmap from "./components/Lmap";
import ProgressBar from "./components/ProgressBar";
import FieldValues from "./components/FieldValues";
import BatteryStatus from "./components/BatteryStatus";
import VariableCount from "./components/VariableCount";
import { notifications } from "@mantine/notifications";

function Home() {
  const theme = useMantineTheme();
  const [chartData, setChartData] = useState([]);

  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  // Set the loading state to true initially
  const [loading, setLoading] = useState(true);

  const blockedStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    filter: "blur(8px)",
    borderRadius: "10px",
  };

  useEffect(() => {
    // Check if user is logged in (e.g., by checking session storage, authentication token, etc.)
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      window.location.href = "/"; // Redirect to login page if not logged in
    } else {
      setLoggedIn(true);

      const userEmail = sessionStorage.getItem("userEmail");
      const userFirstname = sessionStorage.getItem("userFirstname");

      if (userEmail) {
        setEmail(userEmail);
        const socket = new WebSocket(`ws://127.0.0.1:7000`);

        console.log("Email", userEmail);
        console.log(userFirstname);

        socket.onopen = () => {
          // Simulate loading delay with setTimeout
          const delay = 250; // Adjust the delay as needed
          setTimeout(() => {
            setLoading(false);
            console.log("WebSocket connection established.");
            socket.send(userEmail); // Send the email to the WebSocket server
          }, delay);
        };

        socket.onmessage = (event) => {
          const newData = JSON.parse(event.data);
          setData(newData);
          // console.log("Received data:", newData);
          const lastTenData = newData.slice(-1);
          setChartData(lastTenData);
        };

        socket.onclose = () => {
          console.log("WebSocket connection closed.");
        };

        return () => {
          socket.close();
        };
      }
    }
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

  return (
    <>
      {loading ? (
        // Show loading icon while waiting for the WebSocket connection and data
        <Loader
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <>
          <Grid mb="xl">
            <Grid.Col md={4} lg={3}></Grid.Col>
            <Grid.Col md={2} lg={6}>
              <ProgressBar data={transformedData} />
            </Grid.Col>
            <Grid.Col md={2} lg={2}></Grid.Col>
          </Grid>

          <Grid mt="xl" mb="xl">
            <Grid.Col md={4} lg={1}></Grid.Col>
            <Grid.Col md={4} lg={4}>
              <DataTable data={data} />
            </Grid.Col>
            <Grid.Col md={2} lg={1}></Grid.Col>
            <Grid.Col md={2} lg={4}>
              <FieldValues
                data={diaDataElectroStatic}
                color="yellow"
                title="Electro-Static"
              />
              <FieldValues data={diaDataSpark} color="green" title="Spark" />
              <FieldValues
                data={diaDataEnvironment}
                color="blue"
                title="Environment"
              />
            </Grid.Col>
          </Grid>

          <Grid p="50px" mt="xl">
            <Grid.Col md={4} lg={1}></Grid.Col>
            <Grid.Col md={4} lg={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h1>Static Count </h1>

                <Center>
                  <VariableCount data={staticData} color={"#66a80f"} />
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col md={4} lg={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h1>Spark Count</h1>
                <Center>
                  <VariableCount
                    data={sparkData}
                    color={"#be4bdb"}
                    color2={"#f3d9fa"}
                  />
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col md={4} lg={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h1>Weather</h1>
                <Center>
                  <VariableCount
                    data={envData}
                    color={"#0ca678"}
                    color2={"#c3fae8"}
                  />
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col md={4} lg={2}></Grid.Col>
          </Grid>
          <Grid p="50px" mt="xl">
            <Grid.Col md={4} lg={1}></Grid.Col>
            <Grid.Col md={4} lg={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h1>Total Predictions</h1>
                <Center>
                  <BatteryStatus
                    data={transformerData}
                    color={"#fcc419"}
                    color2={"#fff3bf"}
                  />
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col md={4} lg={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h1>Battery status</h1>
                <Center>
                  <BatteryStatus
                    data={transformerData}
                    color={"#ff6b6b"}
                    color2={"#ffc9c9"}
                  />
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col md={4} lg={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <h1>SMART Protection </h1>
                <div style={blockedStyle}>
                  <Center>
                    <BatteryStatus data={transformerData} color={"#66a80f"} />
                  </Center>
                </div>
                <Center>
                  <Button>Register</Button>
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col md={4} lg={2}></Grid.Col>
          </Grid>

          <Lmap data={mapData} />
        </>
      )}
    </>
  );
}

export default Home;
