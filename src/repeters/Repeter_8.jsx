import React, { useEffect, useState } from "react";
import Each_slave_layout from "../components/Each_slave_layout";
import { Grid, Button, Text, Card } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TableComponent from "../components/Table_comp";

const Repeter_8 = () => {
  const navigate = useNavigate();

  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.10.251:3000/api/inventory"
        );
        const data = response.data;

        const specificcDeviceNames = [
          "sl351",
          "sl352",
          "sl353",
          "sl354",
          "sl355",
          "sl356",
          "sl357",
          "sl358",
          "sl359",
          "sl360",
          "sl361",
          "sl362",
          "sl363",
          "sl364",
          "sl365",
          "sl366",
          "sl367",
          "sl368",
          "sl369",
          "sl370",
          "sl371",
          "sl372",
          "sl373",
          "sl374",
          "sl375",
          "R8",
        ];

        const filterData = data.filter((entry) =>
          specificcDeviceNames.includes(entry.device_name)
        );

        console.log("fd", filterData);
        setInventoryData(filterData);
      } catch (error) {
        console.log("hi-bye");
      }
    };
    fetchData();
  }, []);

  const columns = {
    id: "ID",
    device_name: "Device Name",
    device_type: "Device Type",
    next_maintenance_date: "Next Date",
    Issues: "Issues",
  };

  const visibleColumns = [
    "id",
    "device_name",
    "device_type",
    "next_maintenance_date",
    "Issues",
  ];

  const handleButtonClick = () => {
    console.log("button clicked");
    navigate("/Rectractable");
  };
  return (
    <div>
      <h1>Repeater-1: Details</h1>
      <Button
        mt="xl"
        radius="xl"
        ml="xl"
        variant="gradient"
        onClick={handleButtonClick}
      >
        Overview
      </Button>
      <div>
        <Grid mb="xl">
          <Grid.Col md={2} lg={1}></Grid.Col>
          <Grid.Col md={4} lg={4}>
            <h1>Component Details</h1>
            <TableComponent
              data={inventoryData}
              columns={columns}
              visibleColumns={visibleColumns}
            />
          </Grid.Col>
          <Grid.Col md={4} lg={2}></Grid.Col>
          <Grid.Col md={4} lg={4}>
            <h1>Error Details</h1>
            <TableComponent
              data={inventoryData}
              columns={columns}
              visibleColumns={visibleColumns}
            />
          </Grid.Col>
          <Grid.Col md={2} lg={1}></Grid.Col>
        </Grid>
      </div>
      <div>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text ta="center" size="xl" td="underline" fw={700}>
            Layout
          </Text>
          <Each_slave_layout start={351} end={375} repeterId="R-8" />
        </Card>
      </div>
    </div>
  );
};

export default Repeter_8;
