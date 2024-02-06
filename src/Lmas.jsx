import React, { useEffect, useState } from "react";

import { Card, useMantineTheme, Grid, Center, Button } from "@mantine/core";

import Data_table from "./components/Data_table";

import Lmap from "./components/Lmap";
import Progress_bar from "./components/Progress_bar";

import Battery_status from "./components/Battery_status";
import Variable_count from "./components/Variable_count";

import Calender from "./components/Calender";
import useWebsocket from "./components/useWebsocket";

const Lmas = () => {
  const theme = useMantineTheme();

  const [email, setEmail] = useState("admin");

  const blockedStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    filter: "blur(8px)",
    borderRadius: "10px",
  };

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
              <Variable_count
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
              <Variable_count
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
                <Variable_count
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
        <Grid.Col md={1} lg={1}></Grid.Col>
        <Grid.Col md={12} lg={10}>
          {" "}
          <Card mt="xl" shadow="xl" padding="lg" radius="lg" withBorder>
            <Calender data={calenderData} />
          </Card>
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
};

export default Lmas;
