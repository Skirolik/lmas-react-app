import React, { useEffect, useState } from "react";
import axios from "axios";
import Data_table from "../components/Data_table";
import Table_comp from "../components/Table_comp";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

import {
  TextInput,
  Select,
  Button,
  Table,
  Grid,
  Card,
  useMantineTheme,
  Text,
} from "@mantine/core";

const Inventory = () => {
  const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("electrical");
  const [installedDate, setInstalledDate] = useState("");
  const [lastMaintenance, setLastMaintenance] = useState("");
  const [nextMaintenance, setNextMaintenance] = useState("");

  const columns = {
    id: "ID",
    device_name: "Device Name",
    device_type: "Device Type",

    last_maintenance_date: "Last",
    next_maintenance_date: "Next Date",
  };

  const visibleColumns = [
    "id",
    "device_name",
    "device_type",

    "last_maintenance_date",
    "next_maintenance_date",
  ];

  useEffect(() => {
    console.log("hiwir");
    axios
      .get("http://192.168.10.251:3000/api/inventory")
      .then((response) => {
        setDevices(response.data);
        console.log("rea", response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  }, []);

  const addDevices = () => {
    const newDevices = {
      device_name: deviceName,
      device_type: deviceType,
      installed_date: installedDate,
      last_maintenance_date: lastMaintenance,
      next_maintenance_date: nextMaintenance,
    };
    console.log(newDevices);

    axios
      .post("http://192.168.10.251:3000/api/devices", newDevices)
      .then((response) => {
        setDevices([...devices, response.data]);
      })
      .catch((error) => {
        console.error("Error adding task: ", error);
        notifications.show({
          title: "Request Failed",
          message:
            "An Error has occured , try again if not please contact us by clicking on contact us page",
          color: "red",
          icon: <AlertCircle size={24} color="black" />,
        });
      });
    notifications.show({
      title: "Success!!",
      message: "Inventory Updated sucessfully",
      color: "teal",
      icon: <CircleCheck size={24} color="white" />,
    });
    setDeviceName("");
    setDeviceType("electrical");
    setInstalledDate("");
    setLastMaintenance("");
    setNextMaintenance("");
  };

  return (
    <div>
      <Grid m="xl">
        <Grid.Col md={1} lg={1}></Grid.Col>
        <Grid.Col md={4} lg={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <h2>Add Devices to Inventory</h2>
            <TextInput
              label="Device Name"
              value={deviceName}
              onChange={(event) => setDeviceName(event.target.value)}
              required
            />
            <Select
              label="Device Type"
              data={["electrical", "mechanical", "other"]}
              value={deviceType}
              onChange={(value) => setDeviceType(value)}
              required
            />

            <TextInput
              label="Installed on Date"
              type="date"
              value={installedDate}
              onChange={(event) => setInstalledDate(event.target.value)}
              required
            />
            <TextInput
              label="Last Maintenance"
              type="date"
              value={lastMaintenance}
              onChange={(event) => setLastMaintenance(event.target.value)}
              required
            />
            <TextInput
              label="Next Maintenance"
              type="date"
              value={nextMaintenance}
              onChange={(event) => setNextMaintenance(event.target.value)}
              required
            />

            <Button
              mt="xl"
              radius="xl"
              ml="xl"
              variant="gradient"
              onClick={addDevices}
            >
              Add Devices
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col md={6} lg={6}>
          <Text mb="xl" ta="center" size="xl" fw={700}>
            Inventory List
          </Text>
          <Table_comp
            data={devices}
            columns={columns}
            visibleColumns={visibleColumns}
          />
        </Grid.Col>
        <Grid.Col md={1} lg={1}></Grid.Col>
      </Grid>
    </div>
  );
};

export default Inventory;
