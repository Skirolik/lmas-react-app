import React, { useState, useEffect } from "react";
import { Grid, Button, Text, Card } from "@mantine/core";
import Each_slave_layout from "../components/Each_slave_layout";
import { Link, useNavigate } from "react-router-dom";
import TableComponent from "../components/Table_comp";
import axios from "axios";

const Repeter_2 = () => {
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
          "sl101",
          "sl102",
          "sl103",
          "sl104",
          "sl105",
          "sl106",
          "sl107",
          "sl108",
          "sl109",
          "sl110",
          "sl111",
          "sl112",
          "sl113",
          "sl114",
          "sl115",
          "sl116",
          "sl117",
          "sl118",
          "sl119",
          "sl120",
          "sl121",
          "sl122",
          "sl123",
          "sl124",
          "sl125",
          "sl126",
          "sl127",
          "sl128",
          "sl129",
          "sl130",
          "sl131",
          "sl132",
          "sl133",
          "sl134",
          "sl135",
          "sl136",
          "sl137",
          "sl138",
          "sl139",
          "sl140",
          "sl141",
          "sl142",
          "sl143",
          "sl144",
          "sl145",
          "sl146",
          "sl147",
          "sl148",
          "sl149",
          "sl150",
          "sl151",
          "sl152",
          "sl153",
          "sl154",
          "sl155",
          "sl156",
          "sl157",
          "sl158",
          "sl159",
          "sl160",
          "sl161",
          "sl162",
          "sl163",
          "sl164",
          "sl165",
          "sl166",
          "sl167",
          "sl168",
          "sl169",
          "sl170",
          "sl171",
          "sl172",
          "sl173",
          "sl174",
          "sl175",
          "sl176",
          "sl177",
          "sl178",
          "sl179",
          "sl180",
          "sl181",
          "sl182",
          "sl183",
          "sl184",
          "sl185",
          "sl186",
          "sl187",
          "sl188",
          "sl189",
          "sl190",
          "sl191",
          "sl192",
          "sl193",
          "sl194",
          "sl195",
          "sl196",
          "sl197",
          "sl198",
          "sl199",
          "sl200",
          "sl201",
          "R2",
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
      <h1>Repeater-2: Details</h1>
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
          <Each_slave_layout start={101} end={201} repeterId="R-2" />
        </Card>
      </div>
    </div>
  );
};

export default Repeter_2;
