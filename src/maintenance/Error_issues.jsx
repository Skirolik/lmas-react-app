import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Text,
  useMantineTheme,
  RingProgress,
  Button,
} from "@mantine/core";
import axios from "axios";
import TableComponent from "../components/Table_comp";

import EditableTable from "./EditableTable";
import { notifications } from "@mantine/notifications";
import { CircleCheck, AlertCircle } from "tabler-icons-react";

const Error_issues = () => {
  const theme = useMantineTheme();
  const [inventoryData, setInventoryData] = useState([]);
  const [errorData, setErrorData] = useState([]);
  const [totlaEntries, setTotalEnteries] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);
  const [diffrence, setDiffrence] = useState(0);

  //Updater code
  const [showUpdater, setShowUpdater] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.10.251:3000/api/inventory"
      );
      const data = response.data;
      console.log("datas", data);

      const filteredData = data.filter(
        (entry) => entry.Issues !== null && !isInvalidValue(entry.Issues)
      );
      console.log("FD", filteredData);

      const entriesCount = data.length;
      const issuesCount = filteredData.length;

      const percentage = Math.round((issuesCount / entriesCount) * 100);

      console.log("per", percentage);

      console.log(entriesCount);
      console.log(issuesCount);

      setTotalEnteries(entriesCount);
      setInventoryData(filteredData);
      setTotalIssues(issuesCount);
      setDiffrence(percentage);
    } catch (error) {
      console.log("Couldnt Fetch", error);
    }
    try {
      const response = await axios.get(
        "http://192.168.10.251:3000/api/error_table"
      );
      const data = response.data;
      console.log("error table data", data);
      setErrorData(data);
    } catch (error) {
      console.log("Error fetching error Table", error);
    }
  };
  const isInvalidValue = (value) => {
    const invalidValues = ["na", "n a ", "NA", "n/a", "none", "n o n e "];
    const lowercasedValue = value.toLowerCase().trim();
    return invalidValues.includes(lowercasedValue);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = {
    id: "ID",
    device_name: "Device Name",
    device_type: "Device Type",
    next_maintenance_date: "Next Date",
    Issues: "Issues",
    Checks: "Checks",
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

  const col = {
    id: "ID",
    device_name: "Device Name",
    device_type: "Device Type",

    Issues: "Issues",
  };

  const vbCol = ["id", "device_name", "device_type", "Issues"];

  const handleUpdate = async ({ deviceName, newIssues }) => {
    try {
      // Perform the API request to update the "Issues" value
      const response = await axios.put(
        `http://localhost:3000/api/inventory/${deviceName}`,
        {
          Issues: newIssues,
        }
      );

      // Handle the response from the server
      console.log("rep", response.data);

      // Fetch updated data after successful update
      fetchData();
    } catch (error) {
      console.error("Error updating Issues:", error);
      notifications.show({
        title: "Request Failed",
        message:
          "An Error has occured , try again if not please contact us by clicking on contact us page",
        color: "red",
        icon: <AlertCircle size={24} color="black" />,
      });
    }
    notifications.show({
      title: "Success!!",
      message: "Issue Updated sucessfully",
      color: "teal",
      icon: <CircleCheck size={24} color="white" />,
    });
  };

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Grid>
          <Grid.Col md={1} lg={0.5}></Grid.Col>
          <Grid.Col md={6} lg={5}>
            {/* <Text size="xl" ta="center" fw={700}>
              Error History{" "}
            </Text> */}
            <h1>Error History</h1>
            <TableComponent
              data={errorData}
              columns={cols}
              visibleColumns={visCols}
            />
          </Grid.Col>
          <Grid.Col md={1} lg={0}></Grid.Col>

          <Grid.Col md={6} lg={5}>
            <h1>Pending Issues</h1>
            <TableComponent
              data={inventoryData}
              columns={columns}
              visibleColumns={visibleColumns}
            />
          </Grid.Col>
          <Grid.Col md={1} lg={0.5}></Grid.Col>
        </Grid>

        <Button mt="xl" radius="xl" ml="xl" variant="gradient">
          Send Us this data!
        </Button>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder mt="xl">
        <Grid>
          <Grid.Col md={1} lg={2}></Grid.Col>
          <Grid.Col md={6} lg={8}>
            <EditableTable
              data={inventoryData}
              vbCol={vbCol}
              col={col}
              onUpdate={(updatedRow) => handleUpdate(updatedRow)}
            />
          </Grid.Col>
          <Grid.Col md={3} lg={3}></Grid.Col>
        </Grid>
      </Card>
    </div>
  );
};

export default Error_issues;
