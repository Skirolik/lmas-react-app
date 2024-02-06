import React, { useEffect, useState } from "react";
import Each_slave_layout from "./components/Each_slave_layout";
import { Grid, Button, Text, Card, Divider, Badge } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TableComponent from "./components/Table_comp";
import useErrorList from "./maintenance/useErrorList";

const Repeter_1 = () => {
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
          "sl1",
          "sl2",
          "sl3",
          "sl4",
          "sl5",
          "sl6",
          "sl7",
          "sl8",
          "sl9",
          "sl10",
          "sl11",
          "sl12",
          "sl13",
          "sl14",
          "sl15",
          "sl16",
          "sl17",
          "sl18",
          "sl19",
          "sl20",
          "sl21",
          "sl22",
          "sl23",
          "sl24",
          "sl25",
          "sl26",
          "sl27",
          "sl28",
          "sl29",
          "sl30",
          "sl31",
          "sl32",
          "sl33",
          "sl34",
          "sl35",
          "sl36",
          "sl37",
          "sl38",
          "sl39",
          "sl40",
          "sl41",
          "sl42",
          "sl43",
          "sl44",
          "sl45",
          "sl46",
          "sl47",
          "sl48",
          "sl49",
          "sl50",
          "sl51",
          "sl52",
          "sl53",
          "sl54",
          "sl55",
          "sl56",
          "sl57",
          "sl58",
          "sl59",
          "sl60",
          "sl61",
          "sl62",
          "sl63",
          "sl64",
          "sl65",
          "sl66",
          "sl67",
          "sl68",
          "sl69",
          "sl70",
          "sl71",
          "sl72",
          "sl73",
          "sl74",
          "sl75",
          "sl76",
          "sl77",
          "sl78",
          "sl79",
          "sl80",
          "sl81",
          "sl82",
          "sl83",
          "sl84",
          "sl85",
          "sl86",
          "sl87",
          "sl88",
          "sl89",
          "sl90",
          "sl91",
          "sl92",
          "sl93",
          "sl94",
          "sl95",
          "sl96",
          "sl97",
          "sl98",
          "sl99",
          "sl100",
          "R1",
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

  const startSlaveId = "sl-1";
  const endSlaveID = "sl-100";

  const errorValues = useErrorList(apiVal, startSlaveId, endSlaveID);
  const errorTableData = errorValues.filteredData;

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
          <Each_slave_layout start={1} end={100} repeterId="R-1" />
        </Card>
      </div>
    </div>
  );
};

export default Repeter_1;
