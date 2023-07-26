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
} from "@mantine/core";

import Data_table from "./components/Data_table";
import Progress_card from "./components/Progress_card";
import Lmap from "./components/Lmap";
import Progress_bar from "./components/Progress_bar";
import Field_values from "./components/Field_values";
import Battery_status from "./components/Battery_status";
import Variable_count from "./components/Variable_count";

function Home() {
  const theme = useMantineTheme();
  const [chartData, setChartData] = useState([]);

  const [data, setData] = useState([]);
  const blockedStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    filter: "blur(8px)",
    borderRadius: "10px",
  };

  useEffect(() => {
    const socket = new WebSocket("ws://52.172.4.41:7000");

    socket.onopen = () => {
      // console.log("WebSocket connection established.");
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

  return (
    <>
      <Grid mb="xl">
        <Grid.Col md={4} lg={3}></Grid.Col>
        <Grid.Col md={2} lg={6}>
          <Progress_bar data={transformedData} />
        </Grid.Col>
        <Grid.Col md={2} lg={2}></Grid.Col>
      </Grid>

      <Grid mt="xl" mb="xl">
        <Grid.Col md={4} lg={1}></Grid.Col>
        <Grid.Col md={4} lg={4}>
          <Data_table data={data} />
        </Grid.Col>
        <Grid.Col md={2} lg={1}></Grid.Col>
        <Grid.Col md={2} lg={4}>
          <Field_values
            data={diaDataElectroStatic}
            color="yellow"
            title="Electro-Static"
          />
          <Field_values data={diaDataSpark} color="green" title="Spark" />
          <Field_values
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
              <Variable_count data={staticData} color={"#66a80f"} />
            </Center>
          </Card>
        </Grid.Col>
        <Grid.Col md={4} lg={3}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <h1>Spark Count</h1>
            <Center>
              <Variable_count
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
              <Variable_count
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
              <Battery_status
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
              <Battery_status
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
                <Battery_status data={transformerData} color={"#66a80f"} />
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
  );
}

export default Home;
