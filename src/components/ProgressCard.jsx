import React, { useState } from "react";
import {
  Paper,
  Card,
  useMantineTheme,
  Grid,
  Group,
  Center,
  Button,
} from "@mantine/core";

import BatteryStatus from "./BatteryStatus";

const ProgressCard = ({ data }) => {
  const theme = useMantineTheme();
  //console.log("progress_card", data);
  const blockedStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    filter: "blur(8px)",
    borderRadius: "10px",
  };

  return (
    <div>
      <Grid p="50px" ml="20px" mt="xl">
        <Grid.Col md={2} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <h1>SMART Protection </h1>
            <div style={blockedStyle}>
              <Center>
                <BatteryStatus data={data} color={"#66a80f"} />
              </Center>
            </div>
            <Center>
              <Button>Register</Button>
            </Center>
          </Card>
        </Grid.Col>
        <Grid.Col md={5} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <h1>Total Predictions</h1>
            <Center>
              <Battery_status
                data={data}
                color={"#be4bdb"}
                color2={"#f3d9fa"}
              />
            </Center>
          </Card>
        </Grid.Col>
        <Grid.Col md={5} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <h1>Battery status</h1>
            <Center>
              <BatteryStatus data={data} color={"#0ca678"} color2={"#c3fae8"} />
            </Center>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ProgressCard;
