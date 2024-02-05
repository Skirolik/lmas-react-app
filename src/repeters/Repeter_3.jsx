import React, { useState, useEffect } from "react";
import { Grid, Button, Text, Card } from "@mantine/core";
import Each_slave_layout from "../components/Each_slave_layout";
import { Link, useNavigate } from "react-router-dom";
import TableComponent from "../components/Table_comp";
import axios from "axios";

const Repeter_3 = () => {
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
          "sl202",
          "sl203",
          "sl204",
          "sl205",
          "sl206",
          "sl207",
          "sl208",
          "sl209",
          "sl210",
          "sl211",
          "sl212",
          "sl213",
          "sl214",
          "sl215",
          "sl216",
          "sl217",
          "sl218",
          "sl219",
          "sl220",
          "sl221",
          "sl222",
          "sl223",
          "sl224",
          "sl225",
          "sl226",
          "sl227",
          "sl228",
          "sl229",
          "sl230",
          "sl231",
          "sl232",
          "sl233",
          "sl234",
          "sl235",
          "sl236",
          "sl237",
          "sl238",
          "sl239",
          "sl240",
          "sl241",
          "sl242",
          "sl243",
          "sl244",
          "sl245",
          "sl246",
          "sl247",
          "sl248",
          "sl249",
          "sl250",
          "sl251",
          "sl252",
          "sl253",
          "sl254",
          "sl255",
          "sl256",
          "sl257",
          "sl258",
          "sl259",
          "sl260",
          "sl261",
          "sl262",
          "sl263",
          "sl264",
          "sl265",
          "sl266",
          "sl267",
          "sl268",
          "sl269",
          "sl270",
          "sl271",
          "sl272",
          "sl273",
          "sl274",
          "sl275",
          "sl276",
          "sl277",
          "sl278",
          "sl279",
          "sl280",
          "sl281",
          "sl282",
          "sl283",
          "sl284",
          "sl285",
          "sl286",
          "sl287",
          "sl288",
          "sl289",
          "sl290",
          "sl291",
          "sl292",
          "sl293",
          "sl294",
          "sl295",
          "sl296",
          "sl297",
          "sl298",
          "sl299",
          "sl300",
          "sl301",
          "sl302",
          "R3",
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
      <h1>Repeater-3: Details</h1>
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
          <Each_slave_layout start={202} end={302} repeterId="R-3" />
        </Card>
      </div>
    </div>
  );
};

export default Repeter_3;
