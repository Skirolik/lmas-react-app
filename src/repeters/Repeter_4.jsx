import React, { useState, useEffect } from "react";
import { Grid, Button, Text, Card, Divider, Badge } from "@mantine/core";
import Each_slave_layout from "../components/Each_slave_layout";
import { Link, useNavigate } from "react-router-dom";
import TableComponent from "../components/Table_comp";
import useErrorList from "../maintenance/useErrorList";
import axios from "axios";
const Repeter_4 = () => {
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
          "sl303",
          "sl304",
          "sl305",
          "sl306",
          "sl307",
          "sl308",
          "sl309",
          "sl310",
          "sl311",
          "sl312",
          "sl313",
          "sl314",
          "sl315",
          "sl316",
          "sl317",
          "sl318",
          "sl319",
          "sl320",
          "sl321",
          "sl322",
          "sl323",
          "sl324",
          "sl325",
          "sl326",
          "sl327",
          "sl328",
          "sl329",
          "sl330",
          "sl331",
          "sl332",
          "sl333",
          "sl334",
          "sl335",
          "sl336",
          "sl337",
          "sl338",
          "sl339",
          "sl340",
          "sl341",
          "sl342",
          "sl343",
          "sl344",
          "sl345",
          "sl346",
          "sl347",
          "sl348",
          "sl349",
          "sl350",
          "R4",
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

  const apiVal = "http://192.168.10.251:3000/api/error_table";

  const startSlaveId = "sl-303";
  const endSlaveID = "sl-350";

  const errorValues = useErrorList(apiVal, startSlaveId, endSlaveID);
  const errorTableData = errorValues.filteredData;
  console.log("Err values in r4", errorValues.totalCount);

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
  const cols = {
    id: "ID",
    slave_id: "Slave ID",

    error_date: "Error Date",

    error_time: "Error Time",
  };

  const visCols = ["id", "slave_id", "error_date", "error_time"];

  const handleButtonClick = () => {
    console.log("button clicked");
    navigate("/Rectractable");
  };
  return (
    <div>
      <h1>Repeater-4: Details</h1>
      <div>
        <Button
          mt="xl"
          radius="xl"
          ml="xl"
          variant="gradient"
          onClick={handleButtonClick}
        >
          Overview
        </Button>
        <Grid mb="xl">
          <Grid.Col md={1.5} lg={1.5}></Grid.Col>
          <Grid.Col md={3} lg={3}>
            <Card withBorder radius="lg" shadow="xl" padding="md">
              <Grid justify="flex-start" align="stretch">
                <Grid.Col md={4} lg={2}>
                  <Badge color="pink" size="xl" variant="light">
                    {" "}
                    Total
                  </Badge>
                </Grid.Col>
                <Grid.Col md={8} lg={8}>
                  <Text ta="center" size="xl" fw={800} td="underline">
                    Total Errors
                  </Text>
                  <Text ta="center" mt="xl" fw={800}>
                    {errorValues.totalCount}
                  </Text>
                </Grid.Col>

                <Grid.Col md={1} lg={2}></Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
          <Grid.Col md={3} lg={3}></Grid.Col>
          <Grid.Col md={3} lg={3}>
            <Card withBorder radius="lg" shadow="xl" padding="md">
              <Grid justify="flex-start" align="stretch">
                <Grid.Col md={4} lg={2}>
                  <Badge color="pink" size="xl" variant="light">
                    {" "}
                    Max
                  </Badge>
                </Grid.Col>
                <Grid.Col md={8} lg={8}>
                  <Text ta="center" size="xl" fw={800} td="underline">
                    slave: {errorValues.maxSlaveId}
                  </Text>
                  <Text ta="center" mt="xl" size="lg" fw={700}>
                    Count : {errorValues.maxCount}
                  </Text>
                </Grid.Col>

                <Grid.Col md={1} lg={2}></Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
          <Grid.Col md={2} lg={1.5}></Grid.Col>
        </Grid>
        <Divider />
        <Grid mb="xl">
          <Grid.Col md={4} lg={1}></Grid.Col>
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
              data={errorTableData}
              columns={cols}
              visibleColumns={visCols}
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
          <Each_slave_layout start={303} end={350} repeterId="R-4" />
        </Card>
      </div>
    </div>
  );
};

export default Repeter_4;
