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
import { Divide } from "tabler-icons-react";
import TotalCount from "./components/TotalCount";

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
        const socket = new WebSocket(`ws://52.172.4.41:7000`);

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
          console.log("Received data:", newData);
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

  const BatteryData = data.map((row) => ({
    x: row[4],
    y: Number(row[20]),
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
            <Grid.Col md={4} lg={1}></Grid.Col>
            <Grid.Col md={2} lg={10}>
              <ProgressBar
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
              <Card withBorder radius="lg" shadow="xl" padding="xs">
                <DataTable data={data} />
              </Card>
            </Grid.Col>

            <Grid.Col md={2} lg={2}>
              <Card shadow="xl" padding="lg" radius="lg" withBorder>
                <h1>Static</h1>

                <Center>
                  <VariableCount
                    data={staticData}
                    color={"#66a80f"}
                    color2={"#e9fac8"}
                  />
                </Center>
              </Card>
              <Card mt="xl" shadow="xl" padding="lg" radius="lg" withBorder>
                <h1>Count</h1>
                <Center>
                  <TotalCount
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
                  <VariableCount
                    data={sparkData}
                    color={"#66a80f"}
                    color2={"#e9fac8"}
                  />
                </Center>
              </Card>
              <Card mt="xl" shadow="xl" padding="lg" radius="lg" withBorder>
                <h1>Battery</h1>
                <Center>
                  <BatteryStatus
                    data={BatteryData}
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
                  <VariableCount
                    data={envData}
                    color={"#66a80f"}
                    color2={"#e9fac8"}
                  />
                </Center>
              </Card>
              <Card mt="xl" shadow="xl" padding="lg" radius="lg" withBorder>
                <h1>Smart Pit</h1>
                <div style={{ position: "relative" }}>
                  <div style={blockedStyle}>
                    <Center>
                      <BatteryStatus
                        data={transformerData}
                        color={"#66a80f"}
                        color2={"#e9fac8"}
                      />
                    </Center>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Button>Register</Button>
                  </div>
                </div>
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
      )}
    </>
  );
}

export default Home;
